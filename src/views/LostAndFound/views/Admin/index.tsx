import styles from './LostAndFoundAdmin.module.css';
import { AuthGroup } from 'services/auth';
import { useAuthGroups } from 'hooks';
import {
  AppBar,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField,
} from '@mui/material';
import { Grid, Button } from '@mui/material';
import Header from 'views/LostAndFound/components/Header';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import GordonLoader from 'components/Loader';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import {
  getUrlParam,
  setUrlParam,
  clearUrlParams,
  formatDateString,
} from 'views/LostAndFound/components/Helpers';
import { Close, Person, StayPrimaryLandscapeSharp, Storage } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import { differenceInCalendarDays } from 'date-fns';
import lostAndFoundService, { MissingItemReport, FoundItem } from 'services/lostAndFound';
import { size } from 'lodash';

const LostAndFoundAdmin = () => {
  const isAdmin = useAuthGroups(AuthGroup.LostAndFoundAdmin);
  const isDev = useAuthGroups(AuthGroup.LostAndFoundDevelopers);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width:900px)');
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [missingReports, setMissingReports] = useState<MissingItemReport[]>([]);
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });

  const pageSize = 25;
  const [lazyLoading, setLazyLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [showMissingPopUp, setShowMissingPopUp] = useState(false);
  const [showFoundPopUp, setShowFoundPopUp] = useState(false);
  const [missingID, setMissingID] = useState('');
  const [foundID, setFoundID] = useState('');
  const [missingItem, setMissingItem] = useState<MissingItemReport | null>(null);
  const [foundItem, setFoundItem] = useState<FoundItem | null>(null);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (!isAdmin && !isDev) {
      navigate('/lostandfound'); // Leave the page if user is not an admin
    }
  });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Fetch the missing item report from the backend.
  const fetchItem = async (itemType: string) => {
    try {
      if (itemType === 'missing') {
        const fetchedItem = await lostAndFoundService.getMissingItemReport(
          parseInt(missingID || ''),
        );
        setMissingItem(fetchedItem);
      } else if (itemType === 'found') {
        const fetchedItem = await lostAndFoundService.getFoundItem(foundID || '');
        setFoundItem(fetchedItem);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  // Fetch initial reports when filters change
  useEffect(() => {
    const updateFilters = async () => {
      try {
        if (
          status === getUrlParam('status', location, searchParams) &&
          category === getUrlParam('category', location, searchParams) &&
          color === getUrlParam('color', location, searchParams) &&
          keywords === getUrlParam('keywords', location, searchParams)
        ) {
          const fetchedMissingReports = await lostAndFoundService.getMissingItemReports(
            status,
            category,
            color,
            keywords,
            undefined,
            pageSize,
          );
          const fetchedFoundReports = await lostAndFoundService.getFoundItems(
            undefined,
            status,
            color,
            category,
            keywords,
          );
          setMissingReports(fetchedMissingReports);
          setFoundItems(fetchedFoundReports);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching missing or found items', error);
        createSnackbar(`Failed to load missing or found items`, error);
      }
    };
    // Check if the keywords have changed, and make the API request only if they have been stable
    // to avoid making excessive API requests when users are typing keywords
    const checkForChanges = () => {
      if (currKeywords === keywords) {
        updateFilters();
      }
    };

    let currKeywords = keywords;
    if (pageLoaded) {
      setLoading(true);
      setTimeout(() => {
        checkForChanges();
      }, 700);
    }
  }, [status, category, color, keywords, pageLoaded]);

  useEffect(() => {
    const updateFilters = () => {
      // Set the filter values based on the url query params
      let queryValue = getUrlParam('status', location, searchParams);
      if (status !== queryValue) {
        setStatus(queryValue);
      }
      queryValue = getUrlParam('color', location, searchParams);
      if (color !== queryValue) {
        setColor(queryValue);
      }
      queryValue = getUrlParam('category', location, searchParams);
      if (category !== queryValue) {
        setCategory(queryValue);
      }
      queryValue = getUrlParam('keywords', location, searchParams);
      if (keywords !== queryValue) {
        setKeywords(queryValue);
      }
    };
    updateFilters();
  }, [category, color, keywords, searchParams, status]);

  // Intersection Observer to trigger lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreMissingReports();
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef, lazyLoading, hasMore, status, category, color, keywords, missingReports]);

  useEffect(() => {
    if (missingID) {
      fetchItem('missing');
    }
  }, [missingID]);

  useEffect(() => {
    if (foundID) {
      fetchItem('found');
    }
  }, [foundID]);

  const yellowDateThreshold = 7;
  const redDateThreshold = 14;

  // Return a color based on how long ago a date was.
  const dateAgeColor = (date: string) => {
    let dateGiven = Date.parse(date);
    let today = new Date();
    let dayDiff = differenceInCalendarDays(today, dateGiven);
    // Return the color corresponding to the age of the date
    if (dayDiff < yellowDateThreshold) {
      return 'var(--mui-palette-success-main)';
    } else if (dayDiff < redDateThreshold) {
      return 'var(--mui-palette-warning-main)';
    } else {
      return 'var(--mui-palette-error-main)';
    }
  };

  // Lazy loading helper: load more reports
  const loadMoreMissingReports = async () => {
    if (lazyLoading || !hasMore) return;
    setLazyLoading(true);
    // Use the last report's recordID as the lastId; if none, it remains undefined.
    const lastId =
      missingReports.length > 0 ? missingReports[missingReports.length - 1].recordID : undefined;
    try {
      const moreReports = await lostAndFoundService.getMissingItemReports(
        status,
        category,
        color,
        keywords,
        lastId,
        pageSize,
      );
      if (moreReports.length < pageSize) {
        setHasMore(false);
      } else {
        setMissingReports((prev) => [...prev, ...moreReports]);
      }
    } catch (error) {
      console.error('Error loading more reports', error);
      createSnackbar(`Failed to load more missing item reports`, error);
    } finally {
      setLazyLoading(false);
    }
  };

  // Find and format the last checked date based on the list of admin actions for a given report.
  const displayLastCheckedDate = (report: MissingItemReport) => {
    let dateString = report.adminActions?.findLast((action) => {
      return action.action === 'Checked';
    })?.actionDate;
    if (dateString !== '' && dateString !== undefined) {
      return formatDateString(dateString);
    }
    return 'Never';
  };

  const handleMissingItemClick = (missingID: string) => {
    setShowMissingPopUp(!showMissingPopUp);
    setMissingID(missingID);
  };

  const handleFoundItemClick = (foundID: string) => {
    setShowFoundPopUp(!showFoundPopUp);
    setFoundID(foundID);
  };

  const LostItemDatabase = (
    <>
      <Grid container rowGap={1}>
        <Grid item xs={12}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              navigate('missingitemdatabase?status=active');
            }}
          >
            <Storage />
            <span className={styles.spacing}></span>
            <b>Lost Items Database</b>
          </Button>
        </Grid>
      </Grid>
    </>
  );

  const ReportLostItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('reportitemforothers');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Report Item for Others</b>
    </Button>
  );

  const lostItemsCard = (
    <>
      <Card>
        <CardHeader title="Lost Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {LostItemDatabase}
            </Grid>
            <Grid container item xs={12}>
              {ReportLostItem}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const FoundItemDatabase = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemdatabase');
      }}
    >
      <Storage />
      <span className={styles.spacing}></span>
      <b>Found Items Database</b>
    </Button>
  );

  const EnterFoundItem = (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        navigate('founditemform');
      }}
    >
      <Person />
      <span className={styles.spacing}></span>
      <b>Enter Found Item</b>
    </Button>
  );

  const FoundItemsCard = (
    <>
      <Card>
        <CardHeader title="Found Items" />
        <CardContent>
          <Grid container rowGap={2}>
            <Grid container item xs={12}>
              {FoundItemDatabase}
            </Grid>
            <Grid container item xs={12}>
              {EnterFoundItem}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );

  const MissingItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'space-between'}>
        <Grid item xs={2}>
          Date Lost
        </Grid>
        <Grid item xs={2.5}>
          Location
        </Grid>
        <Grid item xs={2.5}>
          Category
        </Grid>
        <Grid item xs={3}>
          Description
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </>
  );

  const FoundItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'space-between'}>
        <Grid item xs={2}>
          Tag #
        </Grid>
        <Grid item xs={2}>
          Date Found
        </Grid>
        <Grid item xs={2.5}>
          Location
        </Grid>
        <Grid item xs={2.5}>
          Category
        </Grid>
        <Grid item xs={3}>
          Description
        </Grid>
        <Grid item xs={0.5} />
      </Grid>
    </>
  );

  const MissingItemPopUp = () => {
    if (!missingItem) return null;

    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item fontSize={'1.3em'}>
              <div>{formatDateString(missingItem.dateLost)}</div>
            </Grid>
            <Grid item fontSize={'1.2em'}>
              <div>
                <b>
                  {missingItem.firstName}
                  <span>&nbsp;</span>
                  {missingItem.lastName}
                </b>
              </div>
            </Grid>
            <Grid item fontSize={'0.8em'}>
              <div>{missingItem.email}</div>
              <div>{missingItem.phone}</div>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  setShowMissingPopUp(!showMissingPopUp);
                  setMissingID('');
                }}
              >
                <CloseIcon className={styles.xIcon} />
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'}>
            <Grid container direction={'column'} className={styles.popUpBodyLeft}>
              <Grid item>
                <span className={styles.smallText}>Category:</span>
                <div className={styles.bolderText}>{missingItem.category}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Brand/Make:</span>
                <div className={styles.bolderText}>{missingItem.brand}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Colors:</span>
                <div className={styles.bolderText}>{missingItem.colors.join(', ')}</div>
              </Grid>
            </Grid>
            <Grid container direction={'column'} className={styles.popUpBodyRight}>
              <Grid item xs={6.5}>
                <Grid item>
                  <span className={styles.smallText}>Location:</span>
                  <div className={styles.regText}>{missingItem.locationLost}</div>
                </Grid>
                <Grid item>
                  <span className={styles.smallText}>Description:</span>
                  <div className={styles.regText}>{missingItem.description}</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={styles.buttonAlign}>
            <Button
              color="success"
              variant="contained"
              className={styles.markButton}
              onClick={() => {
                //no match found code will go here
              }}
            >
              <b>Mark No Match Found</b>
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  const FoundItemPopUp = () => {
    if (!foundItem) return null;

    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item fontSize={'1.3em'}>
              <div>{formatDateString(foundItem.dateFound)}</div>
            </Grid>
            <Grid item fontSize={'1.2em'}>
              <div>
                <b>
                  {foundItem.ownerFirstName || foundItem.ownerLastName
                    ? `${foundItem.ownerFirstName || ''} ${foundItem.ownerLastName || ''}`
                    : 'Unknown'}
                </b>
              </div>
            </Grid>
            <Grid item fontSize={'0.8em'}>
              <div>{foundItem.ownerEmail}</div>
              <div>{foundItem.ownerPhone}</div>
            </Grid>
            <Grid item fontSize={'1.4em'}>
              <div>{foundItem.recordID}</div>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                variant="contained"
                onClick={() => {
                  setShowFoundPopUp(!showFoundPopUp);
                  setFoundID('');
                }}
              >
                <CloseIcon className={styles.xIcon} />
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={'row'}>
            <Grid container direction={'column'} className={styles.popUpBodyLeft}>
              <Grid item>
                <span className={styles.smallText}>Category:</span>
                <div className={styles.bolderText}>{foundItem.category}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Brand/Make:</span>
                <div className={styles.bolderText}>{foundItem.brand}</div>
              </Grid>
              <Grid item>
                <span className={styles.smallText}>Colors:</span>
                <div className={styles.bolderText}>{foundItem.colors.join(', ')}</div>
              </Grid>
            </Grid>
            <Grid container direction={'column'} className={styles.popUpBodyRight}>
              <Grid item xs={6.5}>
                <Grid item>
                  <span className={styles.smallText}>Location:</span>
                  <div className={styles.regText}>{foundItem.locationFound}</div>
                </Grid>
                <Grid item>
                  <span className={styles.smallText}>Description:</span>
                  <div className={styles.regText}>{foundItem.description}</div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={styles.padding} />
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <Header />
      <Grid container justifyContent={'center'}>
        <Grid item xs={11}>
          <Card>
            <CardHeader title={'Gordon Lost & Found Admin'} className={styles.title}></CardHeader>
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {lostItemsCard}
                </Grid>
                <Grid item xs={12} md={6}>
                  {FoundItemsCard}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={11} marginTop={5}>
          <CardHeader title={'Comparison View'} className={styles.title}></CardHeader>
        </Grid>
        <Grid item xs={11} marginTop={3}>
          <Card className={styles.filterCardPosition}>
            <CardHeader
              title={
                <span className={styles.filterTitleText}>
                  <b>Filters: </b>
                </span>
              }
              className={styles.filterTitle}
            ></CardHeader>
            <CardContent className={styles.filterContainer}>
              {/* Keywords, Status, Color, Category, and Clear button on a single row */}
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={isMobile} lg={4}>
                  <TextField
                    label="Keywords"
                    variant="outlined"
                    size="small"
                    value={keywords}
                    onChange={(e) => setUrlParam('keywords', e.target.value, setSearchParams)}
                    className={styles.textField}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={isMobile}>
                  <FormControl size="small" className={styles.formControl} fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      onChange={(e) => setUrlParam('status', e.target.value, setSearchParams)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="expired">Expired</MenuItem>
                      <MenuItem value="found">Found</MenuItem>
                      <MenuItem value="deleted">Deleted</MenuItem>
                      <MenuItem value="PickedUp">PickedUp</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile}>
                  <FormControl size="small" className={styles.formControl} fullWidth>
                    <InputLabel>Color</InputLabel>
                    <Select
                      value={color}
                      onChange={(e) => setUrlParam('color', e.target.value, setSearchParams)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {LFColors.map((colorOption) => (
                        <MenuItem key={colorOption} value={colorOption}>
                          {colorOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile}>
                  <FormControl size="small" className={styles.formControl} fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setUrlParam('category', e.target.value, setSearchParams)}
                    >
                      <MenuItem value="">All</MenuItem>
                      {LFCategories.map((categoryOption) => (
                        <MenuItem key={categoryOption} value={categoryOption}>
                          {categoryOption}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={isMobile}>
                  <Button
                    onClick={() => {
                      clearUrlParams(setSearchParams);
                    }}
                    variant="contained"
                    color="error"
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container className={styles.itemsList} spacing={6}>
        <Grid item>
          <CardHeader
            className={styles.titleSecondary}
            title={
              <span>
                Pending{' '}
                <b>
                  <u>Lost</u>
                </b>{' '}
                Item Reports
              </span>
            }
          ></CardHeader>
          {showMissingPopUp ? (
            <>
              <CardContent className={styles.infoText} />
              <MissingItemPopUp />
            </>
          ) : (
            <>
              <CardContent className={styles.infoText}>
                <InfoOutlinedIcon />
                <span>&nbsp;</span>
                <span>Click on a report to view details</span>
              </CardContent>
              {MissingItemsListHeader}
              <div className={styles.scrollBox}>
                {missingReports.map((missingReport) => (
                  <Grid
                    container
                    justifyContent={'space-between'}
                    key={missingReport.recordID}
                    className={`${styles.reportRow} ${styles.clickableRow}`}
                    onClick={() => handleMissingItemClick(String(missingReport.recordID))}
                  >
                    <Grid item xs={2}>
                      {formatDateString(missingReport.dateLost)}
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{missingReport.locationLost}</div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{missingReport.category}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className={styles.dataCell}>{missingReport.description}</div>
                    </Grid>
                    <Grid item xs={0.5} className={styles.dataCell}>
                      <CircleIcon
                        sx={{
                          color: dateAgeColor(displayLastCheckedDate(missingReport)),
                          fontSize: 10,
                        }}
                      />
                    </Grid>
                  </Grid>
                ))}
                {/* Sentinel element for lazy loading */}
                <div ref={loadMoreRef} />

                {/*Show a loader when lazy loading */}
                {lazyLoading && <GordonLoader />}
              </div>
            </>
          )}
        </Grid>

        <Grid item>
          <CardHeader
            className={styles.titleSecondary}
            title={
              <span>
                Active{' '}
                <b>
                  <u>Found</u>
                </b>{' '}
                Item Reports
              </span>
            }
          >
            <span>View All</span>
          </CardHeader>
          {showFoundPopUp ? (
            <>
              <CardContent className={styles.infoText} />
              <FoundItemPopUp />
            </>
          ) : (
            <>
              <CardContent className={styles.infoText}>
                <InfoOutlinedIcon />
                <span>&nbsp;</span>
                <span>Click on an item to view details</span>
              </CardContent>
              {FoundItemsListHeader}
              <div className={styles.scrollBox}>
                {foundItems.map((foundItem) => (
                  <Grid
                    container
                    justifyContent={'space-between'}
                    key={foundItem.recordID}
                    className={`${styles.reportRow} ${styles.clickableRow}`}
                    onClick={() => handleFoundItemClick(String(foundItem.recordID))}
                  >
                    <Grid item xs={2}>
                      <div className={styles.dataCell}>{foundItem.recordID}</div>
                    </Grid>
                    <Grid item xs={2}>
                      {formatDateString(foundItem.dateFound)}
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{foundItem.locationFound}</div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{foundItem.category}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className={styles.dataCell}>{foundItem.description}</div>
                    </Grid>
                    <Grid item xs={0.5} className={styles.dataCell}>
                      <div>
                        <>
                          <CircleIcon sx={{ fontSize: 10 }} />
                        </>
                      </div>
                    </Grid>
                  </Grid>
                ))}
                {/* Sentinel element for lazy loading */}
                <div ref={loadMoreRef} />

                {/*Show a loader when lazy loading */}
                {lazyLoading && <GordonLoader />}
              </div>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundAdmin;
