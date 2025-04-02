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
import GordonLoader from 'components/Loader';
import Header from 'views/LostAndFound/components/Header';
import styles from './FoundItemList.module.scss';
import { useLocation, useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';
import GordonSnackbar from 'components/Snackbar';
import lostAndFoundService, { FoundItem } from 'services/lostAndFound';
import { differenceInCalendarDays } from 'date-fns';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import { formatDateString } from 'views/LostAndFound/components/Helpers';
import { getUrlParam, setUrlParam, clearUrlParams } from 'views/LostAndFound/components/Helpers';
import { StatusChip } from 'views/LostAndFound/components/StatusChip';
import { useAuthGroups, useUser } from 'hooks';
import { AuthGroup } from 'services/auth';

const FoundItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<FoundItem[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);
  const readOnly = isKiosk;

  // Filters
  // "ID" is the Tag # filter
  const [tagID, setTagID] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');

  // For lazy loading
  const pageSize = 25;
  const [lazyLoading, setLazyLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // For user feedback
  const [snackbar, setSnackbar] = useState({
    message: '',
    severity: undefined as 'error' | 'success' | 'info' | 'warning' | undefined,
    open: false,
  });

  //state variables for counts
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filteredCount, setFilteredCount] = useState<number>(0);

  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');

  const createSnackbar = useCallback((message: string, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Mark the page as loaded
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  // Sync local states with URL query on mount & whenever searchParams changes
  useEffect(() => {
    const syncFiltersFromUrl = () => {
      // "ID" param for Tag #
      let paramVal = getUrlParam('ID', location, searchParams);
      if (tagID !== paramVal) {
        setTagID(paramVal);
      }
      paramVal = getUrlParam('status', location, searchParams);
      if (status !== paramVal) {
        setStatus(paramVal);
      }
      paramVal = getUrlParam('color', location, searchParams);
      if (color !== paramVal) {
        setColor(paramVal);
      }
      paramVal = getUrlParam('category', location, searchParams);
      if (category !== paramVal) {
        setCategory(paramVal);
      }
      paramVal = getUrlParam('keywords', location, searchParams);
      if (keywords !== paramVal) {
        setKeywords(paramVal);
      }
    };
    syncFiltersFromUrl();
  }, [searchParams, location]);

  // Whenever filters or pageLoaded changes, fetch the "first page"
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        if (!pageLoaded) return;
        setLoading(true);

        const fetched = await lostAndFoundService.getFoundItems(
          '',
          tagID || '',
          status || '',
          color || '',
          category || '',
          keywords || '',
        );

        // For now, since there is no real pagination.
        // Just store results. If the array is huge, we do no lazy loading or do a local slice.
        setReports(fetched);
        setHasMore(false); // Since the API doesn't do pagination, we can't "load more."
      } catch (err) {
        console.error('Error fetching found items', err);
        createSnackbar('Failed to load found item reports', 'error');
      } finally {
        setLoading(false);
      }
    };

    // Debounce keywords if needed, or just call directly
    const timer = setTimeout(() => {
      fetchInitial();
    }, 700);
    return () => clearTimeout(timer);
  }, [tagID, color, category, keywords, pageLoaded, status, createSnackbar]);

  const { profile } = useUser();
  const username = profile?.AD_Username || '';

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const totalResult = await lostAndFoundService.getFoundItemsCount(
          username,
          undefined,
          '', // status empty for total count
          '',
          '',
          '',
          '',
        );
        const filteredResult = await lostAndFoundService.getFoundItemsCount(
          username,
          undefined,
          status,
          color,
          category,
          tagID,
          keywords,
        );
        // Extract numeric counts from the returned objects.
        setTotalCount(totalResult);
        setFilteredCount(filteredResult);
      } catch (error) {
        console.error('Failed to fetch found items counts', error);
      }
    };
    fetchCounts();
  }, [tagID, status, color, category, keywords, username]);

  // Currently, we set hasMore = false. But if we do implement pagination:
  // 1. Add lastId to the service
  // 2. In IntersectionObserver, call fetchMore with lastId

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      let first = entries[0];
      if (first.isIntersecting && !lazyLoading && hasMore) {
        // Once we have pagination
        // fetchMoreReports();
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [lazyLoading, hasMore]);

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
            />
            <CardContent className={styles.filterContainer}>
              <Grid
                container
                spacing={isMobile ? 1 : 2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={12} sm={9}>
                  <Grid container spacing={isMobile ? 1 : 2}>
                    {/* Tag # (ID) filter */}
                    <Grid item xs={12}>
                      <TextField
                        label="Tag #"
                        variant="outlined"
                        size="small"
                        value={tagID}
                        onChange={(e) => setUrlParam('ID', e.target.value, setSearchParams)}
                        className={styles.textField}
                        fullWidth
                      />
                    </Grid>

                    {/* Keywords filter */}
                    <Grid item xs={12}>
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
                    {/* Status */}
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
                          <MenuItem value="deleted">Disposed</MenuItem>
                          <MenuItem value="pickedup">PickedUp</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Color, Category, Clear button row */}
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select
                          value={color}
                          onChange={(e) => setUrlParam('color', e.target.value, setSearchParams)}
                        >
                          <MenuItem value="">All</MenuItem>
                          {LFColors.map((color) => (
                            <MenuItem key={color} value={color}>
                              {color}
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
                          {LFCategories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={isMobile}>
                      <Button
                        onClick={() => clearUrlParams(setSearchParams)}
                        variant="contained"
                        color="error"
                        fullWidth
                      >
                        Clear
                      </Button>
                    </Grid>
                  </Grid>
                  {/* NEW: Display counts below the filters */}
                  <Typography
                    variant="body2"
                    className={styles.countText}
                    style={{ marginTop: '0.5rem', textAlign: 'right' }}
                  >
                    Showing {filteredCount} / {totalCount} found items
                  </Typography>
                </Grid>

                {/* Button: Enter New Found Item */}
                {!readOnly && (
                  <>
                    <Grid item xs={12} sm={3} style={{ textAlign: isMobile ? 'center' : 'right' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/lostandfound/lostandfoundadmin/founditemform')}
                        fullWidth={isMobile}
                        className={styles.reportButton}
                      >
                        Enter New Found Item
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table header for large screens */}
      {!isMobile && (
        <AppBar className={styles.stickyHeader}>
          <Grid container className={styles.tableHeader} justifyContent="center">
            <Grid container item xs={11.85}>
              <Grid item xs={1.5}>
                Tag #
              </Grid>
              <Grid item xs={2}>
                Date Found
              </Grid>
              <Grid item xs={3}>
                Location Found
              </Grid>
              <Grid item xs={1.5}>
                Category
              </Grid>
              <Grid item xs={4}>
                Description
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
                <Grid container className={styles.headerPlaceholder}>
                  <Grid item xs={2} className={styles.verticalSpacer} />
                </Grid>
              )}
              {loading ? (
                <GordonLoader />
              ) : (
                <>
                  {reports.map((report) =>
                    isMobile ? (
                      // MOBILE Card Layout
                      <Card
                        key={report.recordID}
                        className={styles.clickableRow}
                        onClick={() =>
                          navigate(
                            readOnly
                              ? `/lostandfound/kiosk/founditemdatabase/${report.recordID}`
                              : `/lostandfound/lostandfoundadmin/founditemdatabase/${report.recordID}`,
                          )
                        }
                      >
                        <CardContent>
                          <Typography variant="h6" className={styles.itemName}>
                            Tag #: {report.recordID}
                          </Typography>
                          <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="body2">
                              Found: {formatDateString(report.dateFound)}
                            </Typography>
                            <Typography variant="body2">
                              Created: {formatDateString(report.dateCreated)}
                            </Typography>
                          </Grid>
                          <Typography variant="body2">Location: {report.locationFound}</Typography>
                          <Typography variant="body2">Category: {report.category}</Typography>
                          <Grid item xs={12}>
                            <StatusChip status={report.status} />
                            {differenceInCalendarDays(new Date(), Date.parse(report.dateCreated)) <
                              3 && <Chip label="NEW" color="success" className={styles.chip} />}
                          </Grid>
                        </CardContent>
                      </Card>
                    ) : (
                      // DESKTOP Row Layout
                      <Grid
                        container
                        key={report.recordID}
                        className={`${styles.reportRow} ${styles.clickableRow}`}
                        onClick={() =>
                          navigate(
                            readOnly
                              ? `/lostandfound/kiosk/founditemdatabase/${report.recordID}`
                              : `/lostandfound/lostandfoundadmin/founditemdatabase/${report.recordID}`,
                          )
                        }
                      >
                        <Grid item xs={1.5}>
                          {report.recordID}
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>
                            {formatDateString(report.dateFound)}
                          </div>
                        </Grid>
                        <Grid item xs={3}>
                          <div className={styles.dataCell}>{report.locationFound}</div>
                        </Grid>
                        <Grid item xs={1.5}>
                          <div className={styles.dataCell}>{report.category}</div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className={styles.dataCell}>{report.description}</div>
                        </Grid>
                        <Grid item xs={12}>
                          <StatusChip status={report.status} />
                          {differenceInCalendarDays(new Date(), Date.parse(report.dateCreated)) <
                            3 && <Chip label="NEW" color="success" className={styles.chip} />}
                        </Grid>
                      </Grid>
                    ),
                  )}
                  {/* IntersectionObserver sentinel when we do real lazy loading */}
                  <div ref={loadMoreRef} style={{ height: '1px' }} />
                  {lazyLoading && <GordonLoader />}
                  {!hasMore && !loading && (
                    <Typography style={{ textAlign: 'center', marginTop: '1rem' }}>
                      No more items to load.
                    </Typography>
                  )}
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
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default FoundItemList;
