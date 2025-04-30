import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  Radio,
  FormControlLabel,
  FormGroup,
  Button,
  FormLabel,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  useMediaQuery,
  RadioGroup,
} from '@mui/material';
import quickSearchService, { SearchResult } from 'services/quickSearch';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { InfoOutlined, Add, Key, Launch } from '@mui/icons-material';
import { StatusChip } from 'views/LostAndFound/components/StatusChip';

import Header from 'views/LostAndFound/components/Header';
import lostAndFoundService, {
  FoundItem,
  FoundAdminAction,
  InitFoundAdminAction,
} from 'services/lostAndFound';
import GordonSnackbar from 'components/Snackbar';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';

import styles from './FoundItemFormEdit.module.scss';
import { useUser } from 'hooks';
import { LFCategories, LFColors } from 'views/LostAndFound/components/Constants';
import { CustomDatePicker } from 'views/LostAndFound/components/CustomDatePicker';
import { DateValidationError } from '@mui/x-date-pickers';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';
import { GordonPersonAutocomplete } from 'views/LostAndFound/components/GordonPersonAutocomplete';

const actionTypes = ['OwnerContact', 'Custom'];

interface ISnackbarState {
  message: string;
  severity: 'error' | 'success' | 'info' | 'warning' | undefined;
  open: boolean;
}

const FoundItemFormEdit = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isKiosk = useAuthGroups(AuthGroup.LostAndFoundKiosk);
  const readOnly = isKiosk;

  /** The found item object we are editing. */
  const [foundItem, setFoundItem] = useState<FoundItem | null>(null);
  const [originalItemData, setOriginalItemData] = useState<FoundItem | null>(null);
  const [displayFinderChange, setDisplayFinderChange] = useState<boolean>(false);
  const [displayOwnerChange, setdisplayOwnerChange] = useState<boolean>(false);
  const [isGordonFinder, setIsGordonFinder] = useState<string>('');
  const [isGordonOwner, setIsGordonOwner] = useState<string>('');

  const [snackbar, setSnackbar] = useState<ISnackbarState>({
    message: '',
    severity: undefined,
    open: false,
  });
  const createSnackbar = useCallback((message: string, severity: ISnackbarState['severity']) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  /** Validation errors for required fields. */
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [dateError, setDateError] = useState<DateValidationError | null>(null);

  /** Admin actions array & logic. */
  const [actionsLoading, setActionsLoading] = useState(true);
  const [adminActions, setAdminActions] = useState<FoundAdminAction[]>([]);
  const [actionsUpdated, setActionsUpdated] = useState(false); // re-fetch trigger

  // "Selected Action" details modal
  const [actionDetailsModalOpen, setActionDetailsModalOpen] = useState(false);
  const [actionDetailsModalLoading, setActionDetailsModalLoading] = useState(false);
  const [selectedActionID, setSelectedActionID] = useState<number>(0);
  const selectedAction = useRef<FoundAdminAction | undefined>(undefined);

  // "Add New Action" form
  const [newActionModalOpen, setNewActionModalOpen] = useState(false);
  const [newActionFormData, setNewActionFormData] = useState({
    action: '',
    actionNote: '',
  });

  const { profile } = useUser();

  // For checking screen size
  const isMobile = useMediaQuery('(max-width:600px)');

  /** 1) On mount, fetch found item & user data. */
  useEffect(() => {
    const fetchData = async () => {
      if (!itemId) {
        createSnackbar('No Found Item ID provided in route', 'error');
        setLoading(false);
        return;
      }

      try {
        const itemResponse = await lostAndFoundService.getFoundItem(itemId);
        setFoundItem(itemResponse);
        setOriginalItemData(itemResponse);
        setAdminActions(itemResponse.adminActions || []);

        // If the response has a username but no first name, the finder is from Gordon
        if (itemResponse.finderUsername !== null) setIsGordonFinder('yes');
        // If the response has a first name but no username, the finder is a guest
        else if (itemResponse.finderUsername === null && itemResponse.finderFirstName !== null)
          setIsGordonFinder('no');
        // If the response has neither, no finder was identified
        else setIsGordonFinder('');

        // If the response has a username but no first name, the owner is from Gordon
        if (itemResponse.ownerUsername !== null) setIsGordonOwner('yes');
        // If the response has a first name but no username, the owner is a guest
        else if (itemResponse.ownerUsername === null && itemResponse.ownerFirstName !== null)
          setIsGordonOwner('no');
        // If the response has neither, no owner was identified
        else setIsGordonOwner('');

        setActionsLoading(false);
      } catch (err) {
        console.error(err);
        createSnackbar('Failed to load found item from server', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId, createSnackbar]);

  /** 2) On mount or whenever `actionsUpdated` is set, fetch admin actions. */
  useEffect(() => {
    const fetchActions = async () => {
      if (!itemId || !actionsUpdated) return;
      setActionsLoading(true);
      try {
        const actionsResp = (await lostAndFoundService.getFoundItem(itemId)).adminActions;
        setAdminActions(actionsResp || []);
      } catch (err) {
        console.error(err);
        createSnackbar('Failed to load found item actions', 'error');
      } finally {
        setActionsLoading(false);
        setActionsUpdated(false);
      }
    };

    fetchActions();
  }, [actionsUpdated, itemId]);

  /** 3) Validate required fields. */
  const requiredFields = ['category', 'description', 'locationFound'];

  const validateForm = (): boolean => {
    if (!foundItem) return false;
    const errors: Record<string, string> = {};

    for (const field of requiredFields) {
      if (!foundItem[field as keyof FoundItem]) {
        errors[field] = 'This field is required';
      }
    }
    if (dateError !== null) {
      errors['dateLost'] = dateError;
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /** 4) Handlers for editing the found item. */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!foundItem) return;
    const { name, value, type, checked } = e.target;
    if (readOnly) return;
    setFoundItem((prev) => {
      if (!prev) return null;
      return { ...prev, [name]: type === 'checkbox' ? checked : value };
    });
  };

  // Colors
  const handleColorChange = (color: string) => {
    if (!foundItem || readOnly) return;
    const updated = foundItem.colors.includes(color)
      ? foundItem.colors.filter((c) => c !== color)
      : [...foundItem.colors, color];
    setFoundItem({ ...foundItem, colors: updated });
  };

  // Date Found
  const handleDateChange = (dateVal: Date | null) => {
    if (!foundItem || readOnly) return;
    setFoundItem((prev) => {
      if (!prev) return null;
      return { ...prev, dateFound: dateVal ? dateVal.toISOString() : '' };
    });
  };

  // Owner Gordon Person Select
  const handleOwnerSelect = (_event: any, selectedPerson: SearchResult | null) => {
    if (selectedPerson && foundItem) {
      setFoundItem((prevData) => ({
        ...prevData!,
        ownerFirstName: selectedPerson.FirstName,
        ownerLastName: selectedPerson.LastName,
        ownerUsername: selectedPerson.UserName,
        ownerPhone: '',
        ownerEmail: '',
        forOwnerGuest: false,
      }));
    }
  };

  // Finder Gordon Person Select
  const handleFinderSelect = (_event: any, selectedPerson: SearchResult | null) => {
    if (selectedPerson && foundItem) {
      setFoundItem((prevData) => ({
        ...prevData!,
        finderFirstName: selectedPerson.FirstName,
        finderLastName: selectedPerson.LastName,
        finderUsername: selectedPerson.UserName,
        finderPhone: '',
        finderEmail: '',
        forFinderGuest: false,
      }));
    }
  };

  const handleFinderChange = () => {
    setDisplayFinderChange(true);
  };

  const handleFinderClear = () => {
    if (foundItem) {
      setFoundItem((prevData) => ({
        ...prevData!,
        finderFirstName: '',
        finderLastName: '',
        finderPhone: '',
        finderEmail: '',
        finderUsername: '',
      }));
    }
  };

  const handleOwnerChange = () => {
    setdisplayOwnerChange(true);
  };

  const handleOwnerClear = () => {
    if (foundItem) {
      setFoundItem((prevData) => ({
        ...prevData!,
        ownerFirstName: '',
        ownerLastName: '',
        ownerPhone: '',
        ownerEmail: '',
        ownerUsername: '',
      }));
    }
  };

  /** 5) Save */
  const handleSave = async () => {
    if (!foundItem) return;
    if (readOnly) return;
    if (!validateForm()) return;

    try {
      await lostAndFoundService.updateFoundItem(foundItem, foundItem.recordID);
      if (location.state && (location.state as any).fromConfirmation) {
        navigate(`/lostandfound/lostandfoundadmin/founditemform/${foundItem?.recordID}`);
      } else {
        navigate('/lostandfound/lostandfoundadmin/founditemdatabase?status=active');
      }
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to save changes.', 'error');
    }
  };

  /** 6) Mark item as picked up / disposed */
  const handleMarkAsPickedUp = async () => {
    if (!foundItem) return;
    try {
      await lostAndFoundService.updateFoundReportStatus(foundItem.recordID, 'pickedup');
      navigate('/lostandfound');
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to mark as picked up.', 'error');
    }
  };

  const handleMarkAsDisposed = async () => {
    if (!foundItem) return;
    try {
      await lostAndFoundService.updateFoundReportStatus(foundItem.recordID, 'deleted');
      navigate('/lostandfound');
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to mark as disposed.', 'error');
    }
  };

  /** 7) Admin Actions logic. */

  const handleActionClicked = (actionID: number) => {
    setSelectedActionID(actionID);
    setActionDetailsModalLoading(true);
  };

  useEffect(() => {
    if (actionDetailsModalLoading) {
      const found = adminActions.find((a) => a.ID === selectedActionID);
      selectedAction.current = found;
      setActionDetailsModalOpen(true);
      setActionDetailsModalLoading(false);
    }
  }, [actionDetailsModalLoading, adminActions, selectedActionID]);

  const openNewActionModal = () => {
    if (readOnly) return;
    setNewActionFormData({ action: '', actionNote: '' });
    setNewActionModalOpen(true);
  };

  const closeModal = () => {
    setNewActionModalOpen(false);
    setActionDetailsModalOpen(false);
  };

  const handleNewActionSubmit = async () => {
    if (!foundItem) return;
    if (readOnly) return;
    const requestData = {
      ...newActionFormData,
      foundID: foundItem.recordID,
      actionDate: new Date().toISOString(),
      submitterUsername: profile?.AD_Username || '',
    };
    try {
      await lostAndFoundService.createFoundAdminAction(foundItem.recordID, requestData);
      setActionsUpdated(true);
      closeModal();
    } catch (err) {
      console.error(err);
      createSnackbar('Failed to create new admin action', 'error');
    }
  };

  /* Rendering. */
  if (loading) return <GordonLoader />;
  if (!foundItem) return <Typography>Could not find the requested Found Item</Typography>;

  /* Admin actions card on the right column */
  const adminActionsCard = (
    <Card>
      <CardHeader
        title={
          <Grid container columnSpacing={1}>
            <Grid item xs={7}>
              <Typography variant="h5">Admin Actions</Typography>
            </Grid>
            <Grid container item xs={5} justifyContent="flex-end">
              <Button
                variant="contained"
                color="secondary"
                onClick={openNewActionModal}
                disabled={readOnly}
              >
                <Add />
                New Action
              </Button>
            </Grid>
          </Grid>
        }
        className={`gc360_header ${styles.actionsHeader}`}
        disabled={readOnly}
      />
      <CardContent className={styles.actionsCard}>
        {actionsLoading ? (
          <GordonLoader />
        ) : adminActions.length === 0 ? (
          <Typography>No actions yet.</Typography>
        ) : (
          <Grid container>
            <Grid container item className={styles.tableHeader}>
              <Grid item xs={1}>
                <Key />
              </Grid>
              <Grid item xs={3} sm={2}>
                <div className={styles.dataCell}>Date</div>
              </Grid>
              <Grid item xs={4} sm={3}>
                <div className={styles.dataCell}>Action</div>
              </Grid>
              <Grid item xs={4} sm={3}>
                <div className={styles.dataCell}>User</div>
              </Grid>
              {!isMobile && (
                <Grid item xs={3}>
                  <div className={styles.dataCell}>Notes</div>
                </Grid>
              )}
            </Grid>
            {adminActions.map((action) => (
              <Grid
                container
                item
                key={action.ID}
                className={styles.tableRow}
                onClick={() => handleActionClicked(action.ID)}
              >
                <Grid item xs={1}>
                  <Launch color="secondary" />
                </Grid>
                <Grid item xs={3} sm={2}>
                  <div className={styles.dataCell}>
                    {new Date(action.actionDate).toLocaleDateString()}
                  </div>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <div className={styles.dataCell}>{action.action}</div>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <div className={styles.dataCell}>{action.submitterUsername}</div>
                </Grid>
                {!isMobile && (
                  <Grid item xs={3}>
                    <div className={styles.dataCell}>{action.actionNote}</div>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );

  /** The action details modal. */
  const actionDetailsModal = (
    <GordonDialogBox
      open={actionDetailsModalOpen}
      title="Action Details"
      cancelButtonClicked={closeModal}
      cancelButtonName="Close"
    >
      {selectedAction.current ? (
        <Grid container rowGap={2}>
          <Grid item xs={12} sm={6}>
            <b>Date:</b> {new Date(selectedAction.current.actionDate).toLocaleDateString()}
          </Grid>
          <Grid item xs={12} sm={6}>
            <b>Action:</b> {selectedAction.current.action}
          </Grid>
          <Grid item xs={12} sm={6}>
            <b>User:</b> {selectedAction.current.submitterUsername}
          </Grid>
          <Grid item xs={12} sm={6}>
            <b>Notes:</b> {selectedAction.current.actionNote}
          </Grid>
        </Grid>
      ) : (
        <Typography>No action selected!</Typography>
      )}
    </GordonDialogBox>
  );

  /* The "new action" modal. */
  const newActionModal = (
    <GordonDialogBox
      open={newActionModalOpen}
      title="Record New Action"
      buttonName="Submit"
      buttonClicked={handleNewActionSubmit}
      cancelButtonName="Close"
      cancelButtonClicked={closeModal}
    >
      <Grid container className={styles.newActionModal} rowGap={2}>
        <Grid item xs={12}>
          <FormLabel>Action Type</FormLabel>
          <Select
            variant="filled"
            fullWidth
            name="action"
            value={newActionFormData.action}
            onChange={(e) =>
              setNewActionFormData((prev) => ({
                ...prev,
                action: e.target.value as string,
              }))
            }
          >
            <MenuItem value="">(None)</MenuItem>
            {actionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="filled"
            fullWidth
            multiline
            minRows={4}
            label="Action Note"
            name="actionNote"
            value={newActionFormData.actionNote}
            onChange={(e) =>
              setNewActionFormData((prev) => ({
                ...prev,
                actionNote: e.target.value,
              }))
            }
          />
        </Grid>
      </Grid>
    </GordonDialogBox>
  );

  return (
    <>
      <Header />
      {loading ? (
        <GordonLoader />
      ) : (
        <Card className={styles.form_card}>
          <CardHeader
            title={
              <>
                <Grid container rowGap={1}>
                  <Grid container item xs={12} md={1}>
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={() => {
                        if (location.state && (location.state as any).fromConfirmation) {
                          navigate(
                            `/lostandfound/lostandfoundadmin/founditemform/${foundItem?.recordID}`,
                          );
                        } else if (!readOnly) {
                          navigate(
                            '/lostandfound/lostandfoundadmin/founditemdatabase?status=active',
                          );
                        } else if (readOnly) {
                          navigate('/lostandfound/kiosk/founditemdatabase?status=active');
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid
                    container
                    item
                    columnGap={2}
                    rowGap={1}
                    xs={12}
                    md={9}
                    justifyContent="center"
                  >
                    <b>
                      Found Item: <span className={styles.title_id}>#{foundItem.recordID}</span>
                    </b>
                    <Typography>
                      <em>Status:</em> <StatusChip status={foundItem.status} />
                    </Typography>
                  </Grid>
                  {!readOnly && (
                    <Grid container item xs={12} md={2}>
                      <Button
                        variant="contained"
                        className={styles.submit_button}
                        color="secondary"
                        onClick={handleSave}
                        fullWidth
                        disabled={foundItem === originalItemData || readOnly}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </>
            }
            titleTypographyProps={{ align: 'center' }}
            className="gc360_header"
          />
          <div className={styles.disclaimer}>
            <InfoOutlined />
            <Grid container item rowGap={1}>
              <Grid item xs={12}>
                <Typography variant="body1">Edit &amp; update this Found Item.</Typography>
              </Grid>
            </Grid>
          </div>

          {/* Two columns: left for category/colors/brand/description, right for location/date/finder/Actions */}
          <Grid container spacing={2} paddingX={3}>
            {/* LEFT COLUMN: Category & Colors & brand & description */}
            <Grid item xs={12} md={6}>
              <div className={styles.box_background}>
                <FormGroup>
                  <FormLabel>Item Category:</FormLabel>
                </FormGroup>
                <div className={styles.category_group}>
                  <FormGroup className={styles.radio_group}>
                    {LFCategories.map((cat) => {
                      const val = cat.toLowerCase().replace(/ /g, '/');
                      return (
                        <FormControlLabel
                          key={cat}
                          label={cat}
                          name="category"
                          className={styles.category_item}
                          control={
                            <Radio
                              value={val}
                              checked={foundItem.category === val}
                              onChange={handleChange}
                              disabled={readOnly}
                            />
                          }
                        />
                      );
                    })}
                  </FormGroup>
                </div>
                {validationErrors.category && (
                  <TextField
                    variant="standard"
                    error
                    helperText={validationErrors.category}
                    fullWidth
                    InputProps={{ style: { display: 'none' } }}
                  />
                )}
              </div>

              {/* Colors */}
              <div className={styles.box_background}>
                <FormGroup>
                  <FormLabel>
                    Item Color: Choose <u>ALL</u> that apply
                  </FormLabel>
                </FormGroup>
                <div className={styles.checkbox_group}>
                  <FormGroup className={styles.color_group}>
                    {LFColors.map((color) => (
                      <FormControlLabel
                        key={color}
                        label={color}
                        control={
                          <Checkbox
                            checked={foundItem.colors.includes(color)}
                            onChange={() => handleColorChange(color)}
                            disabled={readOnly}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                </div>
              </div>

              {/* Brand */}
              <TextField
                fullWidth
                variant="filled"
                label="Item Brand or Make"
                name="brand"
                value={foundItem.brand || ''}
                onChange={handleChange}
                sx={{ marginTop: '1rem' }}
                disabled={readOnly}
              />

              {/* Description */}
              <TextField
                fullWidth
                variant="filled"
                multiline
                minRows={4}
                label="Item Description"
                name="description"
                value={foundItem.description}
                onChange={handleChange}
                sx={{ marginTop: '1rem' }}
                error={!!validationErrors['description']}
                helperText={validationErrors['description'] || ''}
                disabled={readOnly}
              />
            </Grid>

            {/* RIGHT COLUMN: location/date/finder wants/storagelocation + AdminActions */}
            <Grid item xs={12} md={6}>
              {/* Basic item fields */}
              <TextField
                fullWidth
                variant="filled"
                multiline
                minRows={2}
                label="Location Found"
                name="locationFound"
                value={foundItem.locationFound}
                onChange={handleChange}
                sx={{ marginBottom: '1rem' }}
                error={!!validationErrors['locationFound']}
                helperText={validationErrors['locationFound'] || ''}
                disabled={readOnly}
              />
              <CustomDatePicker
                value={foundItem.dateFound ? foundItem.dateFound : null}
                onChange={(val) => handleDateChange(new Date(val || ''))}
                onError={(newError) => setDateError(newError)}
                disabled={readOnly}
              />

              {/* Finder Info */}
              <Grid item margin={1}>
                <Typography variant="h4">Finder</Typography>

                {!displayFinderChange && (
                  <>
                    <Typography>
                      <strong>Username:</strong> {foundItem.finderUsername}
                    </Typography>
                    <Typography>
                      <strong>First Name:</strong> {foundItem.finderFirstName}
                    </Typography>
                    <Typography>
                      <strong>Last Name:</strong> {foundItem.finderLastName}
                    </Typography>
                    <Typography>
                      <strong>Phone Number:</strong> {foundItem.finderPhone}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {foundItem.finderEmail}
                    </Typography>
                  </>
                )}

                {displayFinderChange && (
                  <>
                    <Grid item margin={1}>
                      <FormLabel component="legend" required>
                        Is the Finder a Gordon Person?
                      </FormLabel>
                      <RadioGroup
                        row
                        name="isGordonFinder"
                        value={isGordonFinder}
                        onChange={(e) => {
                          setIsGordonFinder(e.target.value);
                        }}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Grid>

                    {isGordonFinder === 'yes' && (
                      <Grid item margin={1}>
                        <GordonPersonAutocomplete onChange={handleFinderSelect} />
                      </Grid>
                    )}

                    {isGordonFinder === 'no' && (
                      <Grid container direction="column" rowSpacing={1}>
                        <Grid item>
                          <div className={styles.name_field}>
                            <TextField
                              label="Finder First Name"
                              sx={{ width: '49%' }}
                              name="finderFirstName"
                              value={foundItem.finderFirstName}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Finder Last Name"
                              sx={{ width: '49%' }}
                              name="finderLastName"
                              value={foundItem.finderLastName}
                              onChange={handleChange}
                            />
                          </div>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Finder Phone"
                            fullWidth
                            name="finderPhoneNumber"
                            value={foundItem.finderPhone}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Finder Email"
                            fullWidth
                            name="finderEmail"
                            value={foundItem.finderEmail}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    )}

                    <Grid item margin={1}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={foundItem.finderWants || false}
                            onChange={handleChange}
                            name="finderWants"
                            disabled={readOnly}
                          />
                        }
                        label="Finder Wants Item if not claimed"
                        sx={{ marginBottom: '0.5rem' }}
                      />

                      {foundItem.finderWants && (
                        <TextField
                          fullWidth
                          variant="filled"
                          label="Finder Phone Number (required if claiming later)"
                          name="finderPhoneNumber"
                          value={foundItem.finderPhone}
                          onChange={handleChange}
                          error={!!validationErrors.finderPhoneNumber}
                          helperText={validationErrors.finderPhoneNumber || ' '}
                          sx={{ marginBottom: '1rem' }}
                        />
                      )}
                    </Grid>
                  </>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleFinderChange}
                      disabled={readOnly}
                    >
                      Change
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleFinderClear}
                      disabled={readOnly}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              {/* Owner's Name */}
              <Grid item margin={1}>
                <Typography variant="h4">Owner</Typography>

                {!displayOwnerChange && (
                  <>
                    <Typography>
                      <strong>Username:</strong> {foundItem.ownerUsername}
                    </Typography>
                    <Typography>
                      <strong>First Name:</strong> {foundItem.ownerFirstName}
                    </Typography>
                    <Typography>
                      <strong>Last Name:</strong> {foundItem.ownerLastName}
                    </Typography>
                    <Typography>
                      <strong>Phone Number:</strong> {foundItem.ownerPhone}
                    </Typography>
                    <Typography>
                      <strong>Email:</strong> {foundItem.ownerEmail}
                    </Typography>
                  </>
                )}

                {displayOwnerChange && (
                  <>
                    <Grid item margin={2}>
                      <FormLabel component="legend">Is the Owner a Gordon Person?*</FormLabel>
                      <RadioGroup
                        row
                        name="isGordonOwner"
                        value={isGordonOwner}
                        onChange={(e) => {
                          setIsGordonOwner(e.target.value);
                        }}
                      >
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Grid>

                    {isGordonOwner === 'yes' && (
                      <Grid item margin={2}>
                        <GordonPersonAutocomplete onChange={handleOwnerSelect} />
                      </Grid>
                    )}

                    {isGordonOwner === 'no' && (
                      <Grid container direction="column" rowSpacing={1}>
                        <Grid item>
                          <div className={styles.name_field}>
                            <TextField
                              label="Owner First Name"
                              sx={{ width: '49%' }}
                              name="ownerFirstName"
                              value={foundItem.ownerFirstName}
                              onChange={handleChange}
                            />
                            <TextField
                              label="Owner Last Name"
                              sx={{ width: '49%' }}
                              name="ownerLastName"
                              value={foundItem.ownerLastName}
                              onChange={handleChange}
                            />
                          </div>
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Owner Phone"
                            fullWidth
                            name="ownerPhoneNumber"
                            value={foundItem.ownerPhone}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label="Owner Email"
                            fullWidth
                            name="ownerEmail"
                            value={foundItem.ownerEmail}
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    )}
                  </>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={handleOwnerChange}
                      disabled={readOnly}
                    >
                      Change
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleOwnerClear}
                      disabled={readOnly}
                    >
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <div style={{ marginBottom: '1rem' }}>
                <InputLabel>Storage Location</InputLabel>
                <Select
                  variant="filled"
                  name="storageLocation"
                  value={foundItem.storageLocation || ''}
                  onChange={(e) =>
                    setFoundItem((prev) =>
                      prev ? { ...prev, storageLocation: e.target.value as string } : null,
                    )
                  }
                  fullWidth
                  disabled={readOnly}
                >
                  <MenuItem value="">(None)</MenuItem>
                  <MenuItem value="Office Desk">Office Desk</MenuItem>
                  <MenuItem value="Police Office">Police Office</MenuItem>
                  <MenuItem value="Closet A">Closet A</MenuItem>
                </Select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                {foundItem.matchingMissingID !== null ? (
                  <Grid item xs={12}>
                    <TextField
                      label="Matching Missing Item"
                      variant="filled"
                      disabled
                      fullWidth
                      value={foundItem.matchingMissingID}
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                ) : (
                  <></>
                )}
              </div>

              {/* Mark as picked up / disposed */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="info"
                    fullWidth
                    onClick={handleMarkAsPickedUp}
                    disabled={readOnly}
                  >
                    Mark as Picked Up
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={handleMarkAsDisposed}
                    disabled={readOnly}
                  >
                    Mark as Disposed
                  </Button>
                </Grid>
              </Grid>

              {/* Show the status chip, then the Admin actions card below */}
              <Grid container spacing={1} marginTop={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Status: <StatusChip status={foundItem.status} />
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {adminActionsCard}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* The action details modal */}
      {actionDetailsModal}

      {/* The "new action" modal */}
      {newActionModal}

      {/* Info / error messages */}
      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default FoundItemFormEdit;
