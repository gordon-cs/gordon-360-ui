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
import { useEffect, useState } from 'react';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import GordonLoader from 'components/Loader';
import Header from 'views/CampusSafety/components/Header';
import styles from './MissingItemList.module.scss';
import { DateTime } from 'luxon';
import { useLocation, useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSearchParams } from 'react-router-dom';

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

const MissingItemList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<MissingItemReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<MissingItemReport[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchMissingItems = async () => {
      setLoading(true);
      try {
        const fetchedReports = await lostAndFoundService.getMissingItemReports();
        const sortedReports = fetchedReports.sort(
          (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
        );
        setReports(sortedReports);
        setFilteredReports(sortedReports);
      } catch (error) {
        console.error('Error fetching missing items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMissingItems();
  }, []);

  const handleFilter = () => {
    let filtered = reports;

    // Set the filter values based on the url query params
    setStatus(getUrlParam('status'));
    setColor(getUrlParam('color'));
    setCategory(getUrlParam('category'));
    setKeywords(getUrlParam('keywords'));

    // Filter reports based on current active filters
    if (status) {
      filtered = filtered.filter((report) => report.status.toLowerCase() === status.toLowerCase());
    }
    if (category) {
      filtered = filtered.filter(
        (report) => report.category.toLowerCase() === category.toLowerCase(),
      );
    }
    if (color) {
      filtered = filtered.filter((report) =>
        report.colors?.some((col) => col.toLowerCase() === color.toLowerCase()),
      );
    }
    if (keywords) {
      const keywordLower = keywords.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          `${report.firstName} ${report.lastName}`.toLowerCase().includes(keywordLower) ||
          report.description.toLowerCase().includes(keywordLower) ||
          report.locationLost.toLowerCase().includes(keywordLower),
      );
    }
    setFilteredReports(filtered);
  };

  useEffect(() => {
    // Any time changes occur in the filters, or if the back button is used, or after data is first
    // loaded, run the code to set the filtered list.
    handleFilter();
  }, [status, category, color, keywords, searchParams, location, loading]);

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

  const dateFormat = 'MM/dd/yy';
  const formatDate = (date: string) => DateTime.fromISO(date).toFormat(dateFormat);

  // Find and format the last checked date based on the list of admin actions for a given report.
  const displayLastCheckedDate = (report: MissingItemReport) => {
    var dateString = report.adminActions?.findLast((action) => {
      return action.action === 'Checked';
    })?.actionDate;
    if (dateString !== '' && dateString !== undefined) {
      return formatDate(dateString);
    }
    return 'Never';
  };

  // Return a color based on how long ago a date was.
  // Green < 3 days, Yellow < 7 days, Red > 7 days.
  const dateAgeColor = (date: string) => {
    // Convert dates into milliseconds since 1/1/1970
    var dateGiven = Date.parse(DateTime.fromFormat(date, dateFormat).toString());
    var today = Date.parse(DateTime.now().toString());
    // Subtract the dates, and convert milliseconds to days.
    var dayDiff = (today - dateGiven) / (1000 * 3600 * 24);
    if (dayDiff < 3) {
      return 'var(--mui-palette-success-main)';
    } else if (dayDiff < 7) {
      return 'var(--mui-palette-warning-main)';
    } else {
      return 'var(--mui-palette-error-main)';
    }
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
                  {filteredReports.length} / {reports.length} reports
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
                  {filteredReports.map((report, index) =>
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
                          <div
                            className={styles.dataCell}
                          >{`${report.firstName} ${report.lastName}`}</div>
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
    </>
  );
};

export default MissingItemList;
