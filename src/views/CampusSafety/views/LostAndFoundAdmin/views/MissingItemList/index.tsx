import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardHeader,
  AppBar,
} from '@mui/material';
import { useEffect, useState, useCallback, useRef } from 'react';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import GordonLoader from 'components/Loader';
import Header from 'views/CampusSafety/components/Header';
import styles from './MissingItemList.module.scss';
import { useLocation, useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import GordonSnackbar from 'components/Snackbar';
import { differenceInCalendarDays, format } from 'date-fns';

const categories = [
  'Clothing/Shoes',
  'Electronics',
  'Jewelry/Watches',
  'Keys/Keychains',
  'Glasses',
  'Bottles/Mugs',
  'Books',
  'Bags/Purses',
  'Office Supplies',
  'IDs/Wallets',
  'Cash/Cards',
  'Other',
];

const colors = [
  'Black',
  'Blue',
  'Brown',
  'Gold',
  'Gray',
  'Green',
  'Maroon',
  'Orange',
  'Pink',
  'Purple',
  'Red',
  'Silver',
  'Tan',
  'White',
  'Yellow',
];

const dateFormat = 'MM/dd/yy';

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

const formatDate = (date: string) => format(Date.parse(date), dateFormat);

// Find and format the last checked date based on the list of admin actions for a given report.
const displayLastCheckedDate = (report: MissingItemReport) => {
  let dateString = report.adminActions?.findLast((action) => {
    return action.action === 'Checked';
  })?.actionDate;
  if (dateString !== '' && dateString !== undefined) {
    return formatDate(dateString);
  }
  return 'Never';
};

const statusChip = (report: MissingItemReport) => {
  return (
    <Chip
      label={report.status[0].toUpperCase() + report.status.slice(1)}
      //@ts-ignore
      color={
        report.status.toLowerCase() === 'active'
          ? 'secondary'
          : report.status.toLowerCase() === 'found'
            ? 'success'
            : 'primary'
      }
      className={styles.chip}
    />
  );
};

const MissingItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [reports, setReports] = useState<MissingItemReport[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: undefined, open: false });
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');

  const pageSize = 25;

  // Lazy loading state and ref
  const [lazyLoading, setLazyLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Reset lazy-loading when filters change
  useEffect(() => {
    setHasMore(true);
  }, [status, category, color, keywords]);

  // Fetch initial reports when filters change
  useEffect(() => {
    const updateFilters = async () => {
      try {
        if (
          status === getUrlParam('status') &&
          category === getUrlParam('category') &&
          color === getUrlParam('color') &&
          keywords === getUrlParam('keywords')
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
      let queryValue = getUrlParam('status');
      if (status !== queryValue) {
        setStatus(queryValue);
      }
      queryValue = getUrlParam('color');
      if (color !== queryValue) {
        setColor(queryValue);
      }
      queryValue = getUrlParam('category');
      if (category !== queryValue) {
        setCategory(queryValue);
      }
      queryValue = getUrlParam('keywords');
      if (keywords !== queryValue) {
        setKeywords(queryValue);
      }
    };
    updateFilters();
  }, [category, color, keywords, searchParams, status]);

  // Set the search url params, used for filtering
  const setUrlParam = (paramName: string, paramValue: string) => {
    if (paramValue === '') {
      // Delete the parameter if it's value is empty
      setSearchParams((params) => {
        params.delete(paramName);
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.set(paramName, paramValue);
        return params;
      });
    }
  };

  // Get the value of the url param
  const getUrlParam = (paramName: string) => {
    if (location.search.includes(paramName)) {
      return searchParams.get(paramName) || '';
    }
    return '';
  };

  // Delete the four filtering url params
  const clearUrlParams = () => {
    setSearchParams((params) => {
      params.delete('status');
      params.delete('category');
      params.delete('keywords');
      params.delete('color');
      return params;
    });
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

  return (
    <>
      <Header />
      {/* Filter Bar */}
      <Grid container justifyContent="center" spacing={2} marginBottom={2}>
        <Grid item xs={12} md={11}>
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
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={isMobile ? 1 : 2}>
                    {/* Keywords on a single row */}
                    <Grid item xs={12}>
                      <TextField
                        label="Keywords"
                        variant="outlined"
                        size="small"
                        value={keywords}
                        onChange={(e) => setUrlParam('keywords', e.target.value)}
                        className={styles.textField}
                        fullWidth
                      />
                    </Grid>

                    {/* Status, Color, Category, and Clear button on a single row */}
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={status}
                          onChange={(e) => setUrlParam('status', e.target.value)}
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
                          onChange={(e) => setUrlParam('color', e.target.value)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {colors.map((colorOption) => (
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
                          onChange={(e) => setUrlParam('category', e.target.value)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {categories.map((categoryOption) => (
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
                          clearUrlParams();
                        }}
                        variant="contained"
                        color="error"
                        fullWidth
                      >
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/*Button: Report Item for others */}
                <Grid item xs={12} sm={3} style={{ textAlign: isMobile ? 'center' : 'right' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/lostandfound/lostandfoundadmin/reportitemforothers')}
                    fullWidth={isMobile}
                    className={styles.reportButton}
                  >
                    Report Item for others
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Reports Table */}
      {!isMobile && (
        // Header row for larger screens, sticky to the top of the screen on scroll
        <AppBar className={styles.stickyHeader}>
          <Grid container className={styles.tableHeader} justifyContent={'center'}>
            <Grid container item xs={11.85}>
              <Grid item xs={2}>
                Date Lost
              </Grid>
              <Grid item xs={2}>
                Owner's Name
              </Grid>
              <Grid item xs={2}>
                Location
              </Grid>
              <Grid item xs={1.5}>
                Category
              </Grid>
              <Grid item xs={3}>
                Description
              </Grid>
              <Grid item xs={1} className={styles.noWrap}>
                Last Checked
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </Grid>
        </AppBar>
      )}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Card className={styles.listCard}>
            <CardContent className={styles.listContainer}>
              {!isMobile && (
                // Size Placeholder for sticky header for Larger Screens
                <Grid container className={styles.headerPlaceholder}>
                  <Grid item xs={2} className={styles.verticalSpacer}></Grid>
                </Grid>
              )}
              {loading ? (
                <GordonLoader />
              ) : (
                <>
                  {reports.map((report) =>
                    isMobile ? (
                      // Mobile Layout
                      <Card
                        key={report.recordID}
                        className={`${styles.clickableRow}`}
                        onClick={() =>
                          navigate(
                            `/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`,
                          )
                        }
                      >
                        <CardContent>
                          <Typography variant="h6" className={styles.itemName}>
                            {report.firstName} {report.lastName}
                          </Typography>
                          <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" color="textSecondary">
                              {formatDate(report.dateLost)}
                            </Typography>
                            <Typography
                              variant="body2"
                              color={dateAgeColor(displayLastCheckedDate(report))}
                            >
                              Last Checked: {displayLastCheckedDate(report)}
                            </Typography>
                          </Grid>
                          <Typography variant="body2" color="textSecondary">
                            Location:{' '}
                            {report.locationLost.length > 15
                              ? `${report.locationLost.slice(0, 15)}...`
                              : report.locationLost}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Category: {report.category}
                          </Typography>
                          <Grid item xs={12}>
                            {statusChip(report)}
                            {report.stolen && (
                              <Chip label="Stolen" color="error" className={styles.chip} />
                            )}
                            {Math.abs(Date.now() - new Date(report.dateCreated).getTime()) /
                              (1000 * 60 * 60 * 24) <
                              6 && <Chip label="NEW" color="success" className={styles.chip} />}
                          </Grid>
                        </CardContent>
                      </Card>
                    ) : (
                      // Original Layout for Larger Screens
                      <Grid
                        container
                        key={report.recordID}
                        className={`${styles.reportRow} ${styles.clickableRow}`}
                        onClick={() =>
                          navigate(
                            `/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`,
                          )
                        }
                      >
                        <Grid item xs={2}>
                          {formatDate(report.dateLost)}
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>
                            {`${report.firstName} ${report.lastName}`}
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>{report.locationLost}</div>
                        </Grid>
                        <Grid item xs={1.5}>
                          <div className={styles.dataCell}>{report.category}</div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className={styles.dataCell}>{report.description}</div>
                        </Grid>
                        <Grid item xs={1}>
                          <Typography color={dateAgeColor(displayLastCheckedDate(report))}>
                            {displayLastCheckedDate(report)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          {statusChip(report)}
                          {report.stolen && (
                            <Chip label="Stolen" color="error" className={styles.chip} />
                          )}
                          {Math.abs(Date.now() - new Date(report.dateCreated).getTime()) /
                            (1000 * 60 * 60 * 24) <
                            6 && <Chip label="NEW" color="success" className={styles.chip} />}
                        </Grid>
                      </Grid>
                    ),
                  )}
                  {/* Sentinel element for lazy loading */}
                  <div ref={loadMoreRef} />

                  {/*Show a loader when lazy loading */}
                  {lazyLoading && <GordonLoader />}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default MissingItemList;
