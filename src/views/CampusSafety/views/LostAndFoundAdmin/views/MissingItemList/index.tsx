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
} from '@mui/material';
import { useEffect, useState } from 'react';
import lostAndFoundService, { MissingItemReport } from 'services/lostAndFound';
import GordonLoader from 'components/Loader';
import Header from 'views/CampusSafety/components/Header';
import styles from './MissingItemList.module.scss';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<MissingItemReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<MissingItemReport[]>([]);
  const [status, setStatus] = useState(''); // Default value active
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const fetchMissingItems = async () => {
      setLoading(true);
      try {
        const fetchedReports = await lostAndFoundService.getMissingItemReports();
        const sortedReports = fetchedReports.sort(
          (a, b) => new Date(b.dateLost).getTime() - new Date(a.dateLost).getTime(),
        );
        setReports(sortedReports);
        setStatus('active'); // Set initial filter
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
    handleFilter();
  }, [status, category, color, keywords]);

  const formatDate = (date: string) => DateTime.fromISO(date).toFormat('MM/dd/yy');

  const displayLastCheckedDate = (report: MissingItemReport) => {
    var dateString = report.adminActions?.findLast((action) => {
      return action.action === 'Checked';
    })?.actionDate;
    if (dateString !== '' && dateString !== undefined) {
      return formatDate(dateString);
    }
    return 'Never';
  };

  return (
    <>
      <Header />
      {/* Filter Bar */}
      <Grid container justifyContent="center" spacing={2} marginBottom={2}>
        <Grid item xs={11}>
          <Card>
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
                        onChange={(e) => setKeywords(e.target.value)}
                        className={styles.textField}
                        fullWidth
                      />
                    </Grid>

                    {/* Status, Color, Category, and Clear button on a single row */}
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                          <MenuItem value="">All</MenuItem>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="expired">Expired</MenuItem>
                          <MenuItem value="found">Found</MenuItem>
                          <MenuItem value="deleted">Deleted</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={isMobile}>
                      <FormControl size="small" className={styles.formControl} fullWidth>
                        <InputLabel>Color</InputLabel>
                        <Select value={color} onChange={(e) => setColor(e.target.value)}>
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
                        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                          setStatus('');
                          setCategory('');
                          setColor('');
                          setKeywords('');
                          handleFilter();
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
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={11}>
          <Card>
            <CardContent className={styles.listContainer}>
              {loading ? (
                <GordonLoader />
              ) : (
                <>
                  {!isMobile && (
                    // Header Row for Larger Screens
                    <Grid container className={styles.tableHeader}>
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
                      <Grid item xs={1}>
                        Last Checked
                      </Grid>
                      <Grid item xs={1}></Grid>
                    </Grid>
                  )}
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
                            <Typography variant="body2" color="textSecondary">
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
                          {report.stolen && (
                            <Chip label="Stolen" color="error" className={styles.stolenBadge} />
                          )}
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
                          {displayLastCheckedDate(report)}
                        </Grid>
                        <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          {report.stolen && (
                            <Chip label="Stolen" color="error" className={styles.stolenBadge} />
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
