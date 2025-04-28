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
  TextField,
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
  //Controls the contact-owner dialog visibility.
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  //Stores the selected contact method.
  const [contactMethod, setContactMethod] = useState('');
  //Tracks if the admin has confirmed contact.
  const [contactConfirmed, setContactConfirmed] = useState(false);
  const [contactAdditionalNote, setContactAdditionalNote] = useState('');

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
  const filteredMissingReports = missingReports.filter((report) => {
    const status = report.status ? report.status.toLowerCase().trim() : '';
    const reportCat = report.category ? report.category.toLowerCase().trim() : '';
    const filterCat = filterCategory ? filterCategory.toLowerCase().trim() : '';

    return status === 'active' && (filterCat ? reportCat === filterCat : true);
  });

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
    setContactDialogOpen(true);
  };

  // Called when the admin cancels the confirmation dialog.
  const cancelMatch = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirmAndContact = async () => {
    // close any open dialogs
    setConfirmDialogOpen(false);
    setContactDialogOpen(false);

    if (!foundItem || !selectedMissingReport) return;

    const missingID = selectedMissingReport.recordID;
    const foundID = foundItem.recordID.toString();

    // build your contact “response” string
    const response = contactAdditionalNote
      ? `Contacted owner via ${contactMethod}. Additional notes: ${contactAdditionalNote}`
      : `Contacted owner via ${contactMethod}.`;

    try {
      await lostAndFoundService.linkReports(
        missingID,
        foundID,
        // owner info comes from your foundItem
        foundItem.finderUsername || 'unknown',
        foundItem.ownerFirstName || '',
        foundItem.ownerLastName || '',
        foundItem.ownerPhone || '',
        foundItem.ownerEmail || '',
        contactMethod,
        response,
      );

      setSnackbar({
        message: `Successfully linked found item ${foundID} to missing report ${missingID} and recorded contact.`,
        severity: 'success',
        open: true,
      });
      setMatchConfirmed(true);
    } catch (err) {
      console.error('Error linking & contacting:', err);
      setSnackbar({
        message: 'Failed to confirm match and record contact.',
        severity: 'error',
        open: true,
      });
    } finally {
      // reset your contact form
      setContactMethod('');
      setContactAdditionalNote('');
    }
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
        <CardHeader
          title={
            <Typography variant="h6" align="center">
              Found Item Details
            </Typography>
          }
        />
        <CardContent>
          {isMobile ? (
            // Mobile view: render all details in a vertical card.
            <Box className={FoundItemConfirmationStyles.mobileFoundItemCard}>
              <Typography variant="body2">
                <b>Date Found:</b> {new Date(foundItem.dateFound).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                <b>Location:</b> {foundItem.locationFound}
              </Typography>
              <Typography variant="body2">
                <b>Category:</b> {foundItem.category}
              </Typography>
              <Typography variant="body2">
                <b>Description:</b> {foundItem.description}
              </Typography>
              {foundItem.colors && foundItem.colors.length > 0 && (
                <Typography variant="body2">
                  <b>Color:</b> {foundItem.colors.join(', ')}
                </Typography>
              )}
              <Typography variant="body2">
                <b>Brand/Make:</b> {foundItem.brand || 'N/A'}
              </Typography>
              {(foundItem.finderFirstName || foundItem.finderLastName) && (
                <Typography variant="body2">
                  <b>Finder:</b> {foundItem.finderFirstName || ''} {foundItem.finderLastName || ''}
                </Typography>
              )}
              {(foundItem.ownerFirstName || foundItem.ownerLastName) && (
                <Typography variant="body2">
                  <b>Owner:</b> {foundItem.ownerFirstName || ''} {foundItem.ownerLastName || ''}
                </Typography>
              )}
              <Typography variant="body2">
                <b>Storage Location:</b> {foundItem.storageLocation}
              </Typography>
            </Box>
          ) : (
            // Desktop view:
            <>
              {/* Table row displaying the basic details */}
              <Box className={FoundItemConfirmationStyles.foundItemTable}>
                <Paper>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell className={FoundItemConfirmationStyles.stickyHeaderFound}>
                          Date Found
                        </TableCell>
                        <TableCell className={FoundItemConfirmationStyles.stickyHeaderFound}>
                          Location
                        </TableCell>
                        <TableCell className={FoundItemConfirmationStyles.stickyHeaderFound}>
                          Category
                        </TableCell>
                        <TableCell className={FoundItemConfirmationStyles.stickyHeaderFound}>
                          Description
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow className={FoundItemConfirmationStyles.clickableRow}>
                        <TableCell>{new Date(foundItem.dateFound).toLocaleDateString()}</TableCell>
                        <TableCell>{foundItem.locationFound}</TableCell>
                        <TableCell>{foundItem.category}</TableCell>
                        <TableCell>{foundItem.description}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
              {/* Additional details below in a two-row grid layout */}
              <Box sx={{ mt: 2, px: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    {foundItem.colors && foundItem.colors.length > 0 && (
                      <Typography variant="body2" gutterBottom>
                        <b>Color:</b> {foundItem.colors.join(', ')}
                      </Typography>
                    )}
                    <Typography variant="body2">
                      <b>Brand/Make:</b> {foundItem.brand || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    {(foundItem.finderFirstName || foundItem.finderLastName) && (
                      <Typography variant="body2" gutterBottom>
                        <b>Finder:</b> {foundItem.finderFirstName || ''}{' '}
                        {foundItem.finderLastName || ''}
                      </Typography>
                    )}
                    {(foundItem.ownerFirstName || foundItem.ownerLastName) && (
                      <Typography variant="body2">
                        <b>Owner:</b> {foundItem.ownerFirstName || ''}{' '}
                        {foundItem.ownerLastName || ''}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2">
                      <b>Storage Location:</b> {foundItem.storageLocation}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
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
                  <MenuItem key={cat} value={cat.toLowerCase()}>
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
              {filterCategory
                ? `Check if Item has be reported in '${filterCategory}'`
                : 'All Missing Reports'}
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
            {/* Found Item Panel */}
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Found Item Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Category:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{foundItem.category}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Date Found:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {new Date(foundItem.dateFound).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Location:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{foundItem.locationFound}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Description:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{foundItem.description}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Owner:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {foundItem.ownerFirstName || foundItem.ownerLastName
                        ? `${foundItem.ownerFirstName || ''} ${foundItem.ownerLastName || ''}`
                        : 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Brand/Make:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{foundItem.brand || 'N/A'}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Storage Loc.:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{foundItem.storageLocation}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Missing Report Panel */}
            <Grid item xs={12} sm={6}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Missing Report Details
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Category:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{selectedMissingReport?.category}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Date Lost:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {new Date(selectedMissingReport?.dateLost || '').toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Location:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{selectedMissingReport?.locationLost}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Description:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">{selectedMissingReport?.description}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body2">
                      <b>Name:</b>
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body2">
                      {selectedMissingReport?.firstName || selectedMissingReport?.lastName
                        ? `${selectedMissingReport.firstName || ''} ${selectedMissingReport.lastName || ''}`
                        : 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* Confirmation Question */}
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

      {/* NEW: Contact Owner Dialog */}
      <Dialog open={contactDialogOpen} fullWidth maxWidth="sm">
        <DialogTitle>Contact Owner</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Please contact the reporting party using the details below:
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body2">
                <b>Owner's Name:</b> {selectedMissingReport?.firstName}{' '}
                {selectedMissingReport?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <b>Email:</b> {selectedMissingReport?.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                <b>Phone:</b> {selectedMissingReport?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="body2">How did you contact the owner?</Typography>
              <Select
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                fullWidth
              >
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                label="Additional Notes (Optional)"
                value={contactAdditionalNote}
                onChange={(e) => setContactAdditionalNote(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={contactConfirmed}
                    onChange={(e) => setContactConfirmed(e.target.checked)}
                    color="primary"
                  />
                }
                label="I confirm that I have contacted the owner or I'm awaiting a response."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleConfirmAndContact}
            variant="contained"
            color="primary"
            disabled={!contactConfirmed}
          >
            Done
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
