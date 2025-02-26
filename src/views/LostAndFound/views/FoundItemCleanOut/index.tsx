import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardHeader,
  AppBar,
  Typography,
  Chip,
  Checkbox,
} from '@mui/material';
import Header from 'views/LostAndFound/components/Header';
import styles from './FoundItemCleanOut.module.scss';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useCallback, useEffect } from 'react';
import { getUrlParam, setUrlParam, clearUrlParams } from 'views/LostAndFound/components/Helpers';
import { useSearchParams } from 'react-router-dom';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import GordonLoader from 'components/Loader';
import lostAndFoundService, { FoundItem } from 'services/lostAndFound';
import { useLocation, useNavigate } from 'react-router';
import { formatDateString } from 'views/LostAndFound/components/Helpers';
import { StatusChip } from 'views/LostAndFound/components/StatusChip';
import { differenceInCalendarDays } from 'date-fns';
import GordonSnackbar from 'components/Snackbar';

const FoundItemCleanOut = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<FoundItem[]>([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  // Filters
  // "ID" is the Tag # filter
  const [tagID, setTagID] = useState('');
  const [latestDate, setLatestDate] = useState('');
  const [keywords, setKeywords] = useState('');
  const [status, setStatus] = useState('');
  const [color, setColor] = useState('');
  const [category, setCategory] = useState('');

  // For user feedback
  const [snackbar, setSnackbar] = useState({
    message: '',
    severity: undefined as 'error' | 'success' | 'info' | 'warning' | undefined,
    open: false,
  });

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

        // Date set to April 9 for testing - uncomment next line once testing is completed
        // const d = new Date();
        const d = new Date(2025, 3, 9);
        d.setMonth(d.getMonth() - 2);
        setLatestDate(d.toDateString());

        const fetched = await lostAndFoundService.getFoundItems(
          tagID || '',
          latestDate || '',
          status || '',
          color || '',
          category || '',
          keywords || '',
        );

        // For now, since there is no real pagination.
        // Just store results. If the array is huge, we do no lazy loading or do a local slice.
        setReports(fetched);
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
  }, [tagID, latestDate, color, category, keywords, pageLoaded, status, createSnackbar]);

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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table header for large screens */}
      {!isMobile && (
        <>
          <Grid container className={styles.titleHeader} justifyContent="center">
            <Typography variant="h4" align="center">
              Found Item Clean Out
            </Typography>
          </Grid>
          <AppBar className={styles.stickyHeader}>
            <Grid container className={styles.tableHeader} justifyContent="center">
              <Grid container item xs={11.85}>
                <Grid item xs={1.5}>
                  Clean Out
                </Grid>
                <Grid item xs={1.5}>
                  Tag #
                </Grid>
                <Grid item xs={2}>
                  Date Found
                </Grid>
                <Grid item xs={2}>
                  Location Found
                </Grid>
                <Grid item xs={2}>
                  Category
                </Grid>
                <Grid item xs={3}>
                  Description
                </Grid>
              </Grid>
            </Grid>
          </AppBar>
        </>
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
                            `/lostandfound/lostandfoundadmin/founditemdatabase/${report.recordID}`,
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
                      <Grid container key={report.recordID} className={styles.reportRow}>
                        <Grid item xs={1.5}>
                          <Checkbox />
                        </Grid>
                        <Grid item xs={1.5}>
                          {report.recordID}
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>
                            {formatDateString(report.dateFound)}
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>{report.locationFound}</div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className={styles.dataCell}>{report.category}</div>
                        </Grid>
                        <Grid item xs={3}>
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
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end" padding={2}>
        <Button variant="contained" color="error">
          Clean Out All
        </Button>
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

export default FoundItemCleanOut;
