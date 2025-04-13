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
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  MenuItem,
  useMediaQuery,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { InfoOutlined, Launch } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Header from 'views/LostAndFound/components/Header';
import GordonSnackbar from 'components/Snackbar';
import GordonLoader from 'components/Loader';
import lostAndFoundService, { MissingItemReport, FoundItem } from 'services/lostAndFound';
import FoundItemConfirmationStyles from './FoundItemConfirmation.module.scss';
import { LFCategories } from 'views/LostAndFound/components/Constants';

interface IConfirmationSnackbar {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const FoundItemConfirmation = () => {
  const navigate = useNavigate();
  const { recordID } = useParams<{ recordID: string }>();
  const [foundItem, setFoundItem] = useState<FoundItem | null>(null);
  const [missingReports, setMissingReports] = useState<MissingItemReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Default filter: show missing reports matching the found item's category.
  const [filterCategory, setFilterCategory] = useState<string>('');
  // Selection for the matching missing report.
  const [selectedMissingReport, setSelectedMissingReport] = useState<MissingItemReport | null>(
    null,
  );
  const [matchConfirmed, setMatchConfirmed] = useState(false);
  const [checkedConfirm, setCheckedConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState<IConfirmationSnackbar>({
    message: '',
    severity: undefined,
    open: false,
  });
  // Controls the confirmation dialog visibility.
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:1000px)');

  // Load found item details and missing reports.
  useEffect(() => {
    const loadData = async () => {
      if (!recordID) {
        setSnackbar({
          message: 'No found item ID specified.',
          severity: 'error',
          open: true,
        });
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        // Fetch all missing reports (we filter on display).
        const missing: MissingItemReport[] = await lostAndFoundService.getMissingItemReports(
          '',
          '',
          '',
          '',
        );
        setMissingReports(missing);

        // Fetch the found item details.
        const fetchedFound = await lostAndFoundService.getFoundItem(recordID);
        setFoundItem(fetchedFound);
        // If the found item already has a match (or status "found"), disable further matching.
        if (fetchedFound.matchingMissingID || fetchedFound.status === 'found') {
          setMatchConfirmed(true);
        }
        // Set default filter to the found item's category.
        if (fetchedFound?.category) {
          setFilterCategory(fetchedFound.category);
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

  // Filter missing reports based on selected category.
  const filteredMissingReports = missingReports.filter((report) =>
    filterCategory ? report.category === filterCategory : true,
  );

  // Handle selecting a missing report.
  const handleSelectReport = (report: MissingItemReport) => {
    if (matchConfirmed) return;
    setSelectedMissingReport(report);
  };

  // Instead of calling the update directly, open the confirmation dialog.
  const openMatchConfirmation = () => {
    if (!selectedMissingReport) return;
    setConfirmDialogOpen(true);
  };

  // Called when the admin confirms in the dialog.
  const confirmMatch = async () => {
    setConfirmDialogOpen(false);
    if (!foundItem || !selectedMissingReport) return;
    const updatedFoundItem = {
      ...foundItem,
      matchingMissingID: selectedMissingReport.recordID.toString(),
      status: 'found',
    };
    try {
      await lostAndFoundService.updateFoundItem(updatedFoundItem, foundItem.recordID);
      await lostAndFoundService.updateReportStatus(selectedMissingReport.recordID, 'found');
      setSnackbar({
        message: `Match confirmed between found item ${foundItem.recordID} and missing report ${selectedMissingReport.recordID}`,
        severity: 'success',
        open: true,
      });
      setMatchConfirmed(true);
    } catch (err) {
      console.error(err);
      setSnackbar({
        message: 'Failed to confirm match.',
        severity: 'error',
        open: true,
      });
    }
  };

  // Called when the admin cancels the confirmation dialog.
  const cancelMatch = () => {
    setConfirmDialogOpen(false);
  };

  const handleFinish = () => {
    if (!checkedConfirm) {
      setSnackbar({
        message: 'Please confirm you have checked the missing reports before finishing.',
        severity: 'error',
        open: true,
      });
      return;
    }
    navigate('/lostandfound/lostandfoundadmin');
  };

  const handleEditEntry = () => {
    if (foundItem) {
      navigate(
        `/lostandfound/lostandfoundadmin/founditemform/founditemdatabase/${foundItem.recordID}`,
        {
          state: { fromConfirmation: true },
        },
      );
    }
  };

  if (loading) return <GordonLoader />;
  if (!foundItem)
    return (
      <>
        <Header />
        <Typography>No found item data to confirm!</Typography>
      </>
    );

  return (
    <>
      <Header />
      <Card className={FoundItemConfirmationStyles.confirmCard}>
        {/* Found Item Header & Edit Button */}
        <CardHeader
          title={
            <div className={FoundItemConfirmationStyles.titleBar}>
              <Typography
                variant="h4"
                component="span"
                className={FoundItemConfirmationStyles.pageTitle}
              >
                Confirm Found Item{' '}
                <span className={FoundItemConfirmationStyles.yellowText}>Entry</span>
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
        />
        <div className={FoundItemConfirmationStyles.disclaimer}>
          <InfoOutlined />
          <Typography variant="body1">
            <b className={FoundItemConfirmationStyles.serialTag}>{foundItem.recordID}</b>{' '}
            <em style={{ fontSize: '0.9rem' }}>Serial # for Tag</em> – please write this number on
            the item tag before proceeding.
          </Typography>
        </div>

        {/* Found Item Details */}
        <CardContent className={FoundItemConfirmationStyles.confirmCardContent}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>Item Category:</b> {foundItem.category.toLowerCase() || 'n/a'}
              </Typography>
              <Typography>
                <b>Brand/Make:</b> {foundItem.brand || 'N/A'}
              </Typography>
              <Typography>
                <b>Date Found:</b> {new Date(foundItem.dateFound).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>Item Color:</b>{' '}
                {foundItem.colors && foundItem.colors.length ? foundItem.colors.join(', ') : 'n/a'}
              </Typography>
              <Typography>
                <b>Location:</b> {foundItem.locationFound}
              </Typography>
              <Typography>
                <b>Description:</b> {foundItem.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Divider className={FoundItemConfirmationStyles.sectionDivider} />
        {/* Filter Options */}
        <CardContent className={FoundItemConfirmationStyles.filterContainer}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">Filter Missing Reports by Category:</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value={''}>All Categories</MenuItem>
                {LFCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </CardContent>
        {/* Missing Reports Listing */}
        <CardHeader
          title={
            <Typography variant="h6" align="center">
              {filterCategory ? `Missing Reports in '${filterCategory}'` : 'All Missing Reports'}
            </Typography>
          }
        />
        <CardContent>
          {isMobile ? (
            // Mobile view: render missing reports as cards.
            <Box className={FoundItemConfirmationStyles.mobileScrollBox}>
              {filteredMissingReports.map((report) => (
                <Paper
                  key={report.recordID}
                  className={`${FoundItemConfirmationStyles.mobileReportCard} ${FoundItemConfirmationStyles.clickableRow} ${
                    selectedMissingReport?.recordID === report.recordID
                      ? FoundItemConfirmationStyles.selectedCard
                      : ''
                  }`}
                  onClick={() => handleSelectReport(report)}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">
                        {new Date(report.dateLost).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{report.locationLost}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <b>{report.category}</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">{report.description}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`,
                          );
                        }}
                      >
                        <Launch color="secondary" />
                        <Typography variant="caption"> View Details</Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          ) : (
            /* Desktop view: render missing reports in a scrollable table with a sticky header. */
            <Box className={FoundItemConfirmationStyles.scrollBox}>
              <Paper>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell className={FoundItemConfirmationStyles.stickyHeader}>
                        View Details
                      </TableCell>
                      <TableCell className={FoundItemConfirmationStyles.stickyHeader}>
                        Date Lost
                      </TableCell>
                      <TableCell className={FoundItemConfirmationStyles.stickyHeader}>
                        Location
                      </TableCell>
                      <TableCell className={FoundItemConfirmationStyles.stickyHeader}>
                        Category
                      </TableCell>
                      <TableCell className={FoundItemConfirmationStyles.stickyHeader}>
                        Description
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredMissingReports.map((report) => (
                      <TableRow
                        key={report.recordID}
                        hover
                        selected={selectedMissingReport?.recordID === report.recordID}
                        onClick={() => handleSelectReport(report)}
                        style={{ cursor: matchConfirmed ? 'default' : 'pointer' }}
                        className={FoundItemConfirmationStyles.clickableRow}
                      >
                        <TableCell>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(
                                `/lostandfound/lostandfoundadmin/missingitemdatabase/${report.recordID}`,
                              );
                            }}
                          >
                            <Launch color="secondary" />
                          </Button>
                        </TableCell>
                        <TableCell>{new Date(report.dateLost).toLocaleDateString()}</TableCell>
                        <TableCell>{report.locationLost}</TableCell>
                        <TableCell>{report.category}</TableCell>
                        <TableCell>{report.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          )}
        </CardContent>
        {/* Match Confirmation Button */}
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={openMatchConfirmation}
            disabled={!selectedMissingReport || matchConfirmed}
          >
            Match Found
          </Button>
        </Grid>
        <Divider />
        {/* Confirmation Checkbox & Finish Button */}
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
              <Typography>
                I confirm that I have <b>checked</b> or <b>matched</b> these missing reports
                ,contacted the owner to verify it is not reported missing or pending confirmation.
              </Typography>
            }
          />
        </div>
        <Grid container justifyContent="flex-end" sx={{ p: 2 }}>
          <Grid item xs={6} sm={3} md={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleFinish}>
              Finish
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={cancelMatch} fullWidth maxWidth="md">
        <DialogTitle>Confirm Match</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Found Item Details
                </Typography>
                <Typography>
                  <b>Category:</b> {foundItem.category}
                </Typography>
                <Typography>
                  <b>Brand/Make:</b> {foundItem.brand || 'N/A'}
                </Typography>
                <Typography>
                  <b>Date Found:</b> {new Date(foundItem.dateFound).toLocaleDateString()}
                </Typography>
                <Typography>
                  <b>Location:</b> {foundItem.locationFound}
                </Typography>
                <Typography>
                  <b>Description:</b> {foundItem.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Missing Report Details
                </Typography>
                <Typography>
                  <b>Date Lost:</b>{' '}
                  {new Date(selectedMissingReport?.dateLost || '').toLocaleDateString()}
                </Typography>
                <Typography>
                  <b>Location:</b> {selectedMissingReport?.locationLost}
                </Typography>
                <Typography>
                  <b>Category:</b> {selectedMissingReport?.category}
                </Typography>
                <Typography>
                  <b>Description:</b> {selectedMissingReport?.description}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Are you sure you would like to mark this found item as a match to the selected
                missing report?
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelMatch} color="error" variant="contained">
            No, Cancel
          </Button>
          <Button onClick={confirmMatch} color="primary" variant="contained">
            Yes, Confirm
          </Button>
        </DialogActions>
      </Dialog>

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
