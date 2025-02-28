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
  const [reports, setReports] = useState<MissingItemReport[]>([]);
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
  const [missingID, setMissingID] = useState('');
  const [item, setItem] = useState<MissingItemReport | null>(null);

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
  const fetchItem = async () => {
    try {
      const fetchedItem = await lostAndFoundService.getMissingItemReport(parseInt(missingID || ''));
      setItem(fetchedItem);
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
          const fetchedReports = await lostAndFoundService.getMissingItemReports(
            status,
            category,
            color,
            keywords,
            undefined,
            pageSize,
          );
          setReports(fetchedReports);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching missing items', error);
        createSnackbar(`Failed to load missing item reports`, error);
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
        loadMoreReports();
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
  }, [loadMoreRef, lazyLoading, hasMore, status, category, color, keywords, reports]);

  useEffect(() => {
    if (missingID) {
      fetchItem();
    }
  }, [missingID]);

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
  const loadMoreReports = async () => {
    if (lazyLoading || !hasMore) return;
    setLazyLoading(true);
    // Use the last report's recordID as the lastId; if none, it remains undefined.
    const lastId = reports.length > 0 ? reports[reports.length - 1].recordID : undefined;
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
        setReports((prev) => [...prev, ...moreReports]);
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
    fetchItem();
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
      <Grid container className={styles.tableHeader} justifyContent={'left'}>
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
      </Grid>
    </>
  );

  const FoundItemsListHeader = (
    <>
      <Grid container className={styles.tableHeader} justifyContent={'space-between'}>
        <Grid item>Tag #</Grid>
        <Grid item>Date Found</Grid>
        <Grid item>Location</Grid>
        <Grid item>Category</Grid>
        <Grid item>Description</Grid>
      </Grid>
    </>
  );

  const MissingItemPopUp = () => {
    if (!item) return null;

    return (
      <>
        <Grid container className={styles.popUpCard}>
          <Grid container className={styles.popUpHeader}>
            <Grid item>
              <div>{formatDateString(item.dateLost)}</div>
            </Grid>
            <Grid item>
              <div>
                {item.firstName}
                {item.lastName}
              </div>
            </Grid>
            <Grid item>
              <div>{item.email}</div>
              <div>{item.phone}</div>
            </Grid>
            <Grid item>
              <CloseIcon />
            </Grid>
          </Grid>
          <Grid container direction={'row'}>
            <Grid container direction={'column'} className={styles.popUpBody} xs={3}>
              <Grid item>
                Category:
                <div>{item.category}</div>
              </Grid>
              <Grid item>
                Location:
                <div>{item.locationLost}</div>
              </Grid>
              <Grid item>
                Brand/Make:
                <div>{item.brand}</div>
              </Grid>
              <Grid item>
                Colors:
                <div>{item.colors}</div>
              </Grid>
            </Grid>
            <Grid container className={styles.popUpBody} xs={5}>
              <Grid item>
                Description:
                <div>{item.description}</div>
              </Grid>
            </Grid>
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
          <CardContent className={styles.infoText}>
            <InfoOutlinedIcon />
            <span>Click on an item to view details</span>
          </CardContent>
          {showMissingPopUp ? (
            <MissingItemPopUp />
          ) : (
            <>
              {MissingItemsListHeader}
              <div className={styles.scrollBox}>
                {reports.map((report) => (
                  <Grid
                    key={report.recordID}
                    className={`${styles.reportRow} ${styles.clickableRow}`}
                    onClick={() => handleMissingItemClick(String(report.recordID))}
                  >
                    <Grid item xs={2}>
                      {formatDateString(report.dateLost)}
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{report.locationLost}</div>
                    </Grid>
                    <Grid item xs={2.5}>
                      <div className={styles.dataCell}>{report.category}</div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className={styles.dataCell}>{report.description}</div>
                    </Grid>
                    <Grid item xs={1} className={styles.dataCell}>
                      <div className={styles.dataCell}>
                        <>
                          <CircleIcon
                            sx={{
                              color: dateAgeColor(displayLastCheckedDate(report)),
                              fontSize: 10,
                            }}
                          />
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
          <CardContent className={styles.infoText}>
            <InfoOutlinedIcon />
            <span>Click on an item to view details</span>
          </CardContent>
          {FoundItemsListHeader}
          <div className={styles.scrollBox}>
            {reports.map((report) => (
              <Grid
                key={report.recordID}
                className={`${styles.reportRow} ${styles.clickableRow}`}
                onClick={() =>
                  navigate(`/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`)
                }
              >
                <Grid item xs={2}>
                  {formatDateString(report.dateLost)}
                </Grid>
                <Grid item xs={2.5}>
                  <div className={styles.dataCell}>{report.locationLost}</div>
                </Grid>
                <Grid item xs={2.5}>
                  <div className={styles.dataCell}>{report.category}</div>
                </Grid>
                <Grid item xs={3}>
                  <div className={styles.dataCell}>{report.description}</div>
                </Grid>
                <Grid item xs={1} className={styles.dataCell}>
                  <div className={styles.dataCell}>
                    <>
                      <CircleIcon
                        sx={{ color: dateAgeColor(displayLastCheckedDate(report)), fontSize: 10 }}
                      />
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
        </Grid>
      </Grid>
    </>
  );
};

export default LostAndFoundAdmin;
