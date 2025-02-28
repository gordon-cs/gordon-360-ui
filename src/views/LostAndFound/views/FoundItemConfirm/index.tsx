import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
} from '@mui/material';
import { InfoOutlined, Launch } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import Header from 'views/LostAndFound/components/Header';
import GordonSnackbar from 'components/Snackbar';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';

import lostAndFoundService, {
  MissingItemReport,
  FoundItem,
} from 'services/lostAndFound';

import FoundItemConfirmationStyles from './FoundItemConfirmation.module.scss';
import { LFCategories } from 'views/LostAndFound/components/Constants';


type MissingItemRow = Pick<
  MissingItemReport,
  'recordID' | 'dateLost' | 'locationLost' | 'category' | 'description'
> & {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

interface IConfirmationSnackbar {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const FoundItemConfirmation = () => {
  const navigate = useNavigate();
  const { recordID } = useParams<{ recordID: string }>();

  const [foundItem, setFoundItem] = useState<FoundItem | null>(null);
  const [missingReports, setMissingReports] = useState<MissingItemRow[]>([]);
  const [loading, setLoading] = useState(true);

  // For category dropdown filter
  const [selectedCategory, setSelectedCategory] = useState('');

  // Track which missing report rows are expanded (by recordID)
  const [expandedReports, setExpandedReports] = useState<number[]>([]);

  const [matchDialogOpen, setMatchDialogOpen] = useState(false);
  const [selectedMatchReport, setSelectedMatchReport] = useState<MissingItemRow | null>(null);

  const [checkedConfirm, setCheckedConfirm] = useState(false);

  // For user feedback (snackbar)
  const [snackbar, setSnackbar] = useState<IConfirmationSnackbar>({
    message: '',
    severity: undefined,
    open: false,
  });

  const isMobile = useMediaQuery('(max-width:1000px)');

  /**
   * Toggle expansion of a given missing report.
   */
  const toggleExpand = (id: number) => {
    setExpandedReports((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /**
   * When the "Mark as Match" button is clicked,
   * open the match confirmation dialog with the selected report.
   */
  const handleMatchButtonClick = (report: MissingItemRow) => {
    setSelectedMatchReport(report);
    setMatchDialogOpen(true);
  };

  /**
   * If the user confirms the match, update the found item with matchingMissingID.
   */
  const handleMatchConfirmation = async () => {
    if (!foundItem || !selectedMatchReport) return;
    const updatedFoundItem = {
      ...foundItem,
      matchingMissingID: selectedMatchReport.recordID.toString(),
      status: 'found', 
    };
    try {
      await lostAndFoundService.updateFoundItem(updatedFoundItem, foundItem.recordID);
      await lostAndFoundService.updateReportStatus(Number(selectedMatchReport.recordID), 'found');
      setSnackbar({
        message: `Match confirmed for found item ${foundItem.recordID} with missing report ${selectedMatchReport.recordID}`,
        severity: 'success',
        open: true,
      });
      setMatchDialogOpen(false);
      setSelectedMatchReport(null);
    } catch (err) {
      console.error(err);
      setSnackbar({
        message: 'Failed to confirm match.',
        severity: 'error',
        open: true,
      });
    }
  };
  

  const handleMatchCancel = () => {
    setMatchDialogOpen(false);
    setSelectedMatchReport(null);
  };

  // 1) Fetch the Found Item data and all missing item reports
  useEffect(() => {
    const loadData = async () => {
      if (!recordID) {
        setSnackbar({
          message: 'No found item ID specified',
          severity: 'error',
          open: true,
        });
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch missing item reports (no limit)
        const missing = await lostAndFoundService.getMissingItemReports('', '', '', '');
        const rows: MissingItemRow[] = missing.map((m) => ({
          recordID: m.recordID,
          dateLost: m.dateLost,
          locationLost: m.locationLost,
          category: m.category,
          description: m.description,
          firstName: m.firstName,
          lastName: m.lastName,
          email: m.email,
          phone: m.phone,
        }));
        setMissingReports(rows);

        // Fetch the Found Item
        const fetchedFound = await lostAndFoundService.getFoundItem(recordID);
        setFoundItem(fetchedFound);

        // Default the category filter to the found item's category if available
        if (fetchedFound?.category) {
          const catValue = fetchedFound.category.toLowerCase().replace(/ /g, '/');
          setSelectedCategory(catValue);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setSnackbar({ message: 'Failed to load data', severity: 'error', open: true });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [recordID]);

  // If user wants to edit the entry
  const handleEditEntry = () => {
    if (foundItem) {
      navigate(
        `/lostandfound/lostandfoundadmin/founditemform/founditemdatabase/${foundItem.recordID}`,
        { state: { fromConfirmation: true } }
      );
    }
  };

  // Once user is done
  const handleFinish = () => {
    if (!checkedConfirm) {
      setSnackbar({
        message: 'Please confirm you have checked missing reports before finishing',
        severity: 'error',
        open: true,
      });
      return;
    }
    navigate('/lostandfound/lostandfoundadmin');
  };

  /**
   * Renders the expanded details for a missing report.
   */
  const renderExpandedDetails = (report: MissingItemRow) => {
    return (
      <Grid container item className={FoundItemConfirmationStyles.expandedDetails}>
        <Grid item xs={12}>
          <Typography variant="body2">
            <strong>Owner Name:</strong> {report.firstName} {report.lastName}
          </Typography>
          <Typography variant="body2">
            <strong>Owner Email:</strong> {report.email}
          </Typography>
          <Typography variant="body2">
            <strong>Owner Phone:</strong> {report.phone}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              // Instead of directly marking as match, open the confirmation dialog
              handleMatchButtonClick(report);
            }}
            sx={{ marginTop: '0.5rem' }}
          >
            Mark as Match
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <GordonLoader />
      ) : !foundItem ? (
        <Typography>No found item data to confirm!</Typography>
      ) : (
        <Card className={FoundItemConfirmationStyles.confirmCard}>
          {/* Page Title + Edit Button */}
          <CardHeader
            title={
              <div className={FoundItemConfirmationStyles.titleBar}>
                <Typography variant="h4" component="span" className={FoundItemConfirmationStyles.pageTitle}>
                  Confirm Found Item <span className={FoundItemConfirmationStyles.yellowText}>Entry</span>
                </Typography>
                <Button
                  variant="contained"
                  color="info"
                  className={FoundItemConfirmationStyles.editButton}
                  onClick={handleEditEntry}
                >
                  Edit Entry
                </Button>
              </div>
            }
            className="gc360_header"
          />
          {/* Tag ID + disclaimer */}
          <div className={FoundItemConfirmationStyles.disclaimer}>
            <InfoOutlined />
            <Grid container item rowGap={1}>
              <Grid item xs={12}>
                <Typography variant="body1" component="div">
                  <b>{foundItem.recordID}</b>{' '}
                  <em style={{ fontSize: '0.9rem' }}>
                    Serial # for Tag
                  </em>{' '}
                  — please write this number on the item tag <u>before proceeding</u>
                </Typography>
              </Grid>
            </Grid>
          </div>
          {/* Found item details */}
          <CardContent className={FoundItemConfirmationStyles.confirmCardContent}>
            <Grid container spacing={2} rowGap={2}>
              <Grid item xs={12} sm={6} className={FoundItemConfirmationStyles.itemDetailsColumn}>
                <Typography>
                  <b>Item category:</b>{' '}
                  {foundItem.category ? foundItem.category.toLowerCase() : 'n/a'}
                </Typography>
                <Typography>
                  <b>Item brand/make:</b> {foundItem.brand || 'N/A'}
                </Typography>
                <Typography>
                  <b>Date found:</b>{' '}
                  {foundItem.dateFound && new Date(foundItem.dateFound).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={FoundItemConfirmationStyles.itemDetailsColumn}>
                <Typography>
                  <b>Item color:</b>{' '}
                  {foundItem.colors && foundItem.colors.length
                    ? foundItem.colors.map((c) => c.toLowerCase()).join(', ')
                    : 'n/a'}
                </Typography>
                <Typography>
                  <b>Location lost:</b> {foundItem.locationFound}
                </Typography>
                <Typography>
                  <b>Description:</b> {foundItem.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider className={FoundItemConfirmationStyles.sectionDivider} />
          {/* Missing item reports section */}
          <div className={FoundItemConfirmationStyles.checkMissingHeading}>
            <Typography variant="h6" align="center">
              Check if item has been reported missing ↓
            </Typography>
          </div>
          {isMobile ? (
            <div className={FoundItemConfirmationStyles.mobileMissingReportsContainer}>
              {(selectedCategory
                ? missingReports.filter((r) => r.category.toLowerCase() === selectedCategory)
                : missingReports
              ).map((report) => (
                <div key={report.recordID}>
                  <Card
                    className={FoundItemConfirmationStyles.mobileReportCard}
                    onClick={() => toggleExpand(report.recordID)}
                  >
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Date Lost:</strong> {new Date(report.dateLost).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Location:</strong> {report.locationLost}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Category:</strong> {report.category.toLowerCase()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <strong>Description:</strong> {report.description}
                      </Typography>
                    </CardContent>
                  </Card>
                  {expandedReports.includes(report.recordID) && renderExpandedDetails(report)}
                </div>
              ))}
            </div>
          ) : (
            <div className={FoundItemConfirmationStyles.missingReportTableContainer}>
              <AppBar position="static" className={FoundItemConfirmationStyles.missingTableHeader}>
                <Toolbar
                  variant="dense"
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="h6" component="div">
                    Missing Item Reports
                  </Typography>
                  <Grid container alignItems="center" justifyContent="flex-end" sx={{ width: 'auto' }}>
                    <Typography variant="body2" sx={{ marginRight: '0.5rem' }}>
                      Filter By:
                    </Typography>
                    <Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      displayEmpty
                      size="small"
                      sx={{
                        color: 'white',
                        borderColor: 'white',
                        '.MuiSvgIcon-root': { color: 'white' },
                      }}
                    >
                      <MenuItem value="">All</MenuItem>
                      {LFCategories.map((cat) => (
                        <MenuItem key={cat} value={cat.toLowerCase().replace(/ /g, '/')}>
                          {cat}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Toolbar>
              </AppBar>
              <Grid container className={FoundItemConfirmationStyles.missingTableBody}>
                <Grid container item className={FoundItemConfirmationStyles.missingTableRowHeader}>
                  <Grid item xs={2}>View Details</Grid>
                  <Grid item xs={2}>Date Lost</Grid>
                  <Grid item xs={2}>Location</Grid>
                  <Grid item xs={2}>Category</Grid>
                  <Grid item xs={4}>Description</Grid>
                </Grid>
                {(selectedCategory
                  ? missingReports.filter((r) => r.category.toLowerCase() === selectedCategory)
                  : missingReports
                ).map((report) => (
                  <div key={report.recordID}>
                    <Grid
                      container
                      onClick={() => toggleExpand(report.recordID)}
                      className={`${FoundItemConfirmationStyles.missingTableRow} ${FoundItemConfirmationStyles.clickableRow}`}
                    >
                      <Grid item xs={2} className={FoundItemConfirmationStyles.tableCell}>
                      <Button
                      variant="text"
                      size="small"
                      color="info"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`);
                      }}
                    >
                      Details
                    </Button>
                      </Grid>
                      <Grid item xs={2} className={FoundItemConfirmationStyles.tableCell}>
                        {new Date(report.dateLost).toLocaleDateString()}
                      </Grid>
                      <Grid item xs={2} className={FoundItemConfirmationStyles.tableCell}>
                        {report.locationLost}
                      </Grid>
                      <Grid item xs={2} className={FoundItemConfirmationStyles.tableCell}>
                        {report.category.toLowerCase()}
                      </Grid>
                      <Grid item xs={4} className={FoundItemConfirmationStyles.tableCell}>
                        {report.description}
                      </Grid>
                    </Grid>
                    {expandedReports.includes(report.recordID) && renderExpandedDetails(report)}
                  </div>
                ))}
              </Grid>
            </div>
          )}
          {/* Confirmation checkbox */}
          <div className={FoundItemConfirmationStyles.confirmCheckboxArea}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedConfirm}
                  onChange={(e) => setCheckedConfirm(e.target.checked)}
                  color="secondary"
                />
              }
              label={
                <span>
                  I confirm that I have <b>checked</b> these missing reports or contacted the owner
                  to ensure it’s not reported missing.
                </span>
              }
            />
          </div>
          {/* Finish button */}
          <Grid container justifyContent="flex-end" padding={2}>
            <Grid item xs={6} sm={3} md={2}>
              <Button variant="contained" color="primary" fullWidth onClick={handleFinish}>
                Finish
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      {/* MATCH CONFIRMATION DIALOG */}
      {matchDialogOpen && foundItem && selectedMatchReport && (
        <GordonDialogBox
        open={matchDialogOpen}
        title="Confirm Match"
        buttonName="Yes"
        buttonClicked={handleMatchConfirmation}
        cancelButtonName="Cancel"
        cancelButtonClicked={handleMatchCancel}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>
              You would like to confirm that the current found item is a match with the selected missing report.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"><strong>Found Item Details:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Category:</strong> {foundItem.category}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Description:</strong> {foundItem.description}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1"><strong>Missing Report Details:</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Category:</strong> {selectedMatchReport.category}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <strong>Owner:</strong> {selectedMatchReport.firstName} {selectedMatchReport.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Contact:</strong> {selectedMatchReport.email} | {selectedMatchReport.phone}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Description:</strong> {selectedMatchReport.description}
            </Typography>
          </Grid>
        </Grid>
      </GordonDialogBox>
      )}
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default FoundItemConfirmation;
