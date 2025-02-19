import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  CardHeader,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@mui/material';
import { Add, Key, Launch } from '@mui/icons-material';
import styles from './MissingItemReportData.module.scss';
import { useEffect, useRef, useState } from 'react';
import lostAndFoundService from 'services/lostAndFound';
import type { MissingItemReport, MissingAdminAction } from 'services/lostAndFound';
import { DateTime } from 'luxon';
import Header from 'views/CampusSafety/components/Header';
import GordonLoader from 'components/Loader';
import GordonDialogBox from 'components/GordonDialogBox';
import userService from 'services/user';
import SimpleSnackbar from 'components/Snackbar';
import { formatDateString } from 'views/CampusSafety/components/Helpers';
import { StatusChip } from 'views/CampusSafety/components/StatusChip';

const MissingItemReportData = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState({ AD_Username: '' });

  // Pull the itemId from the url
  const { itemId } = useParams<{ itemId: string }>();
  const [reportUpdated, setReportUpdated] = useState<number>(0);

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState<boolean>(false);

  // Page State
  const [loading, setLoading] = useState<boolean>(true);
  const isWidescreen = useMediaQuery('(min-width:1000px)');
  const isMobile = useMediaQuery('(max-width:600px)');

  // New Action form state variables
  const [newActionFormData, setNewActionFormData] = useState({ action: '', actionNote: '' });
  const [checkedActionCustomResponseVisible, setCheckedActionCustomResponseVisible] =
    useState<boolean>(false);
  const [customCheckedActionResponseValue, setCustomCheckedActionResponseValue] = useState('');
  const [newActionModalOpen, setNewActionModalOpen] = useState<boolean>(false);
  const actionTypes = ['Checked', 'NotifiedOfficer', 'OwnerContact', 'Custom'];
  const checkedActionResponseTypes = [
    'Owner will pick up',
    'Owner does not want',
    'CheckedActionCustomResponse',
    'No response from owner',
  ];

  type AdminActionChecked = {
    foundID?: string; // ID of the in-stock found item
    contactMethod?: string; //Possible values [email, phone]
    response?: string; //Possible values [“owner will pick up”, “owner does not want”, "None"]
  };

  type AdminActionContact = {
    officerNotifed: string; // Radio code of the officer who was informed
    contactMethod: string; //Possible values [email, phone, radio]
    response: string; //Possible values [“owner will pick up”, “owner does not want”]
  };

  const [checkedItemNotFound, setcheckedItemNotFound] = useState<boolean>(false);
  const [checkedActionFormData, setCheckedActionFormData] = useState<AdminActionChecked>({
    foundID: undefined,
    contactMethod: undefined,
    response: undefined,
  });
  const [contactActionFormData, setContactActionFormData] = useState<AdminActionContact>({
    officerNotifed: '',
    contactMethod: '',
    response: '',
  });

  // Used for details modal with dynamic content that must be set asynchronously before modal opens
  const [actionDetailsModalOpen, setActionDetailsModalOpen] = useState<boolean>(false);
  const [actionDetailsModalLoading, setActionDetailsModalLoading] = useState<boolean>(false);

  // The missing item report
  const [item, setItem] = useState<MissingItemReport | null>(null);

  const [adminActionsArray, setAdminActionsArray] = useState<MissingAdminAction[] | null>(null);

  // Keeps track of whether the admin actions array was updated recently and hasn't been fetched
  const [actionsUpdated, setActionsUpdated] = useState<boolean>(false);

  const [selectedActionID, setSelectedActionID] = useState<number>(0);
  const selectedAction = useRef<MissingAdminAction | undefined>(undefined);

  // Triggered on first render
  useEffect(() => {
    // Get the username of the currently signed in user, for use in the AdminActions form
    const fetchUserData = async () => {
      try {
        const userInfo = await userService.getProfileInfo();
        setUsername({
          AD_Username: userInfo?.AD_Username || '', // Set AD_Username
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Fetch the missing item report from the backend.
    const fetchItem = async () => {
      try {
        const fetchedItem = await lostAndFoundService.getMissingItemReport(parseInt(itemId || ''));
        setItem(fetchedItem);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchUserData();
    fetchItem();
    setLoading(false);
  }, [itemId, reportUpdated]);

  // Triggered on first render, and whenever  actions have been updated
  // (i.e. when an admin user creates a new admin action).
  useEffect(() => {
    // Fetch admin actions array from the backend.
    const fetchAdminActions = async () => {
      try {
        const fetchedAdminActions = await lostAndFoundService.getAdminActions(
          parseInt(itemId || ''),
        );
        setAdminActionsArray(fetchedAdminActions);
      } catch (error) {
        console.error('Error fetching admin actions:', error);
      }
    };
    fetchAdminActions();
    // Reset actions updated
    setActionsUpdated(false);
  }, [actionsUpdated, itemId]);

  /*
   *
   * Lifecycle methods for all modals
   */

  // Close any open modals
  const closeModal = () => {
    setNewActionFormData({ action: '', actionNote: '' });
    setActionDetailsModalOpen(false);
    setNewActionModalOpen(false);
  };

  /*
   *
   * Action details modal lifecycle methods
   */

  // Set the ID of the action clicked, and set the modal to loading, to allow time for the selected
  // action object to update before the modal opens.
  const handleActionClicked = (id: number | undefined) => {
    setSelectedActionID(id || 0);
    setActionDetailsModalLoading(true);
  };

  useEffect(() => {
    // If the actions array, or the selected action ID are modified, update the selected action object
    // to store which action to display in the details modal
    var index = adminActionsArray?.findIndex((x) => x.ID === selectedActionID);
    !index ? (index = 0) : (index = index);
    selectedAction.current = adminActionsArray?.at(index);

    // if the modal is set to loading (when user clicks on an action), open the modal, and set modal
    // loading to false
    if (actionDetailsModalLoading) {
      setActionDetailsModalOpen(true);
      setActionDetailsModalLoading(false);
    }
  }, [selectedActionID, actionDetailsModalLoading, adminActionsArray]);

  /*
   *
   * New action form lifecycle methods
   */

  // Opens the create new action modal
  const newActionHandler = () => {
    setNewActionModalOpen(true);
  };

  useEffect(() => {
    // Update the main action form whenever one of the preset action forms are updated.
    if (newActionFormData.action === 'Checked') {
      if (checkedActionFormData.response === 'CheckedActionCustomResponse') {
        setNewActionFormData((prevData) => ({
          ...prevData,
          actionNote: JSON.stringify({
            ...checkedActionFormData,
            response: customCheckedActionResponseValue,
          }),
        }));
      } else {
        setNewActionFormData((prevData) => ({
          ...prevData,
          actionNote: JSON.stringify(checkedActionFormData),
        }));
      }
    } else if (
      newActionFormData.action === 'NotifiedOfficer' ||
      newActionFormData.action === 'OwnerContact'
    ) {
      setNewActionFormData((prevData) => ({
        ...prevData,
        actionNote: JSON.stringify(contactActionFormData),
      }));
    }
  }, [
    contactActionFormData,
    checkedActionFormData,
    newActionFormData.action,
    customCheckedActionResponseValue,
  ]);

  const updateForm = async (name: string, newValue: string) => {
    // When changing the action type
    if (name === 'action') {
      // Reset all form data, and update the action
      setcheckedItemNotFound(false);
      setCheckedActionFormData({
        foundID: undefined,
        contactMethod: undefined,
        response: undefined,
      });
      setContactActionFormData({
        officerNotifed: '',
        contactMethod: '',
        response: '',
      });

      setNewActionFormData((prevData) => ({
        ...prevData,
        action: newValue,
      }));

      // Clear the note field if changing to a custom action
      // Previously would display the empty JSON from the most recently selected preset form
      if (newValue === 'Custom') {
        newActionFormData.actionNote = '';
      }
    }

    // Update form, method is based on the action type.
    if (newActionFormData.action === 'Custom') {
      setNewActionFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else if (newActionFormData.action === 'Checked') {
      setCheckedActionFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else if (
      newActionFormData.action === 'NotifiedOfficer' ||
      newActionFormData.action === 'OwnerContact'
    ) {
      setContactActionFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  const handleNewActionFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;
    updateForm(name, value);
  };

  // Check if the form fields are valid.
  const isValidForm = () => {
    if (newActionFormData.action === 'Checked') {
      // If any of the form fields are empty
      if (
        !checkedItemNotFound &&
        (!checkedActionFormData.contactMethod ||
          !checkedActionFormData.foundID ||
          !checkedActionFormData.response)
      ) {
        return false;
      }
    } else if (
      newActionFormData.action === 'NotifiedOfficer' ||
      newActionFormData.action === 'OwnerContact'
    ) {
      // If any of the form fields are empty
      if (
        !contactActionFormData.contactMethod ||
        !contactActionFormData.officerNotifed ||
        !contactActionFormData.response
      ) {
        return false;
      }
    } else {
      if (!newActionFormData.actionNote) {
        return false;
      }
    }
    return true;
  };

  const handleNewActionSubmit = async () => {
    if (!checkedItemNotFound && newActionFormData.action === 'Checked') {
      await lostAndFoundService.updateReportStatus(parseInt(itemId ? itemId : ''), 'Found');
      setReportUpdated(reportUpdated + 1);
    }

    if (isValidForm()) {
      // Combine form data into the data format for the backend request
      let requestData = {
        ...newActionFormData,
        missingID: parseInt(itemId || ''),
        actionDate: DateTime.now().toISO(),
        username: username.AD_Username,
        isPublic: newActionFormData.action === 'Checked' && !checkedItemNotFound ? true : false,
      };
      await lostAndFoundService.createAdminAction(parseInt(itemId ? itemId : ''), requestData);
      // Since a new action was created, trigger an update, which will fetch the new actions list
      // from the backend
      setActionsUpdated(true);
      closeModal();
    } else {
      setErrorSnackbarOpen(true);
    }
  };
  // Set checked action custom "owner response" field to visible, if the user selects
  useEffect(() => {
    setCheckedActionCustomResponseVisible(
      checkedActionFormData.response === 'CheckedActionCustomResponse',
    );
  }, [checkedActionFormData]);

  if (!item) return null;

  // Component for admin actions card, holding the admin actions UI elements
  const adminActions = () => {
    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={
              <Grid container columnSpacing={1}>
                <Grid container item xs={5.5} justifyItems={'center'} columnSpacing={1}>
                  <Grid item>
                    <Typography variant="h5" sx={{ textAlign: 'left' }}>
                      Admin Actions
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`${adminActionsArray?.length} actions`}</Typography>
                  </Grid>
                </Grid>
                <Grid container item xs={6.5} direction="row-reverse">
                  <Button variant="contained" color="secondary" onClick={newActionHandler}>
                    <Add />
                    New Action
                  </Button>
                </Grid>
              </Grid>
            }
            className={`gc360_header ${styles.actionsHeader}`}
          ></CardHeader>
          <CardContent className={styles.actionsCard}>
            <Grid container className={styles.tableHeader}>
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
              {!isMobile ? (
                <Grid item xs={3}>
                  <div className={styles.dataCell}>Notes</div>
                </Grid>
              ) : null}
            </Grid>
            <Grid container>
              {adminActionsArray?.length === 0 ? (
                <>
                  <Grid item xs={0.5} />
                  <Grid item xs={11}>
                    <div className={styles.dataCell}>No actions yet...</div>
                  </Grid>
                </>
              ) : (
                adminActionsArray?.map((adminAction) => {
                  return (
                    <Grid
                      key={adminAction.ID}
                      container
                      item
                      className={styles.tableRow}
                      onClick={() => {
                        handleActionClicked(adminAction.ID);
                      }}
                    >
                      <Grid item xs={1} className={styles.tableColumn}>
                        <Launch color="secondary" />
                      </Grid>
                      <Grid item xs={3} sm={2} className={styles.tableColumn}>
                        <div className={styles.dataCell}>
                          {formatDateString(adminAction.actionDate)}
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={3} className={styles.tableColumn}>
                        <div className={styles.dataCell}>{adminAction.action}</div>
                      </Grid>
                      <Grid item xs={4} sm={3} className={styles.tableColumn}>
                        <div className={styles.dataCell}>{adminAction.username}</div>
                      </Grid>
                      {!isMobile ? (
                        <Grid item xs={3} className={styles.tableColumn}>
                          <div className={styles.dataCell}>{adminAction.actionNote}</div>
                        </Grid>
                      ) : null}
                    </Grid>
                  );
                })
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  const actionDetailsModal = () => {
    return (
      <GordonDialogBox
        open={actionDetailsModalOpen}
        title={'Action Details'}
        cancelButtonClicked={closeModal}
        cancelButtonName="close"
      >
        <Grid container rowGap={1}>
          <Grid item xs={12} sm={5}>
            <b>Date</b>{' '}
            {selectedAction.current ? formatDateString(selectedAction.current.actionDate) : ''}
          </Grid>
          <Grid item xs={12} sm={7}>
            <b>Action</b> {selectedAction.current ? selectedAction.current.action : ''}
          </Grid>
          <Grid item xs={12} sm={5}>
            <b>User</b> {selectedAction.current ? selectedAction.current.username : ''}
          </Grid>
          <Grid item xs={12} sm={7}>
            <b>Notes</b> {selectedAction.current ? selectedAction.current.actionNote : ''}
          </Grid>
        </Grid>
      </GordonDialogBox>
    );
  };

  // Conditional component of the new item form, form fields change based on the selected action type
  const newActionForm = () => {
    switch (newActionFormData.action) {
      case 'Custom': {
        return (
          <>
            <Typography>Describe what you did</Typography>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                multiline
                minRows={3}
                label={'Action Notes'}
                name="actionNote"
                value={newActionFormData.actionNote}
                onChange={handleNewActionFormChange}
              />
            </Grid>
          </>
        );
      }
      case 'Checked': {
        return (
          <>
            <Typography>
              Check the list of found items in FileMaker, to see if this item has been found
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  value={checkedItemNotFound}
                  onChange={() => {
                    setcheckedItemNotFound(checkedItemNotFound ? false : true);
                  }}
                />
              }
              label={'Mark Item as not found on this date'}
            />
            {!checkedItemNotFound ? (
              <>
                <Typography>If this item has been found, fill out this form:</Typography>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="filled"
                    label={'ID of the in-stock Found Item'}
                    name="foundID"
                    value={checkedActionFormData.foundID}
                    onChange={handleNewActionFormChange}
                  />
                </Grid>
                <Grid container item direction={'column'}>
                  <Typography>
                    And contact the owner {item.firstName} {item.lastName}.
                  </Typography>
                  <Typography variant="body1">Email: {item.email}</Typography>
                  <Typography>Phone: {item.phone}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Contact Method</InputLabel>
                    <Select
                      fullWidth
                      variant="filled"
                      label="Contact Method"
                      name="contactMethod"
                      value={checkedActionFormData.contactMethod}
                      onChange={handleNewActionFormChange}
                    >
                      <MenuItem value={'Email'}>Email</MenuItem>
                      <MenuItem value={'Phone'}>Phone</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Response</InputLabel>
                    <Select
                      fullWidth
                      variant="filled"
                      label="Response"
                      name="response"
                      value={checkedActionFormData.response}
                      onChange={handleNewActionFormChange}
                    >
                      {checkedActionResponseTypes.map((responseType) => (
                        <MenuItem value={responseType}>
                          {responseType === 'Owner will pick up'
                            ? 'Owner will pick up'
                            : responseType === 'Owner does not want'
                              ? 'Owner does not want'
                              : responseType === 'CheckedActionCustomResponse'
                                ? 'Enter response manually'
                                : responseType === 'No response from owner'
                                  ? 'No response'
                                  : responseType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {checkedActionCustomResponseVisible ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      label={"Owner's Response"}
                      name="customOwnerResponse"
                      value={customCheckedActionResponseValue}
                      onChange={(ev) => setCustomCheckedActionResponseValue(ev.target.value)}
                    />
                  </Grid>
                ) : undefined}
              </>
            ) : null}
          </>
        );
      }
      case 'NotifiedOfficer': {
        return (
          <>
            <Typography>
              If you've passed this report on to an officer, record the information below.
            </Typography>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                label={'Officer Notified'}
                name="officerNotifed"
                value={contactActionFormData.officerNotifed}
                onChange={handleNewActionFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Contact Method</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Contact Method"
                  name="contactMethod"
                  value={contactActionFormData.contactMethod}
                  onChange={handleNewActionFormChange}
                >
                  <MenuItem value={'Email'}>Email</MenuItem>
                  <MenuItem value={'Phone'}>Phone</MenuItem>
                  <MenuItem value={'Radio'}>Radio</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                label={'Notes on their Response'}
                name="response"
                value={contactActionFormData.response}
                onChange={handleNewActionFormChange}
              />
            </Grid>
          </>
        );
      }
      case 'OwnerContact': {
        return (
          <>
            <Grid container item direction={'column'}>
              <Typography>
                Contact owner {item.firstName} {item.lastName}?
              </Typography>
              <Typography variant="body1">Email: {item.email}</Typography>
              <Typography>Phone: {item.phone}</Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="filled"
                label={'Officer Notified of the Contact'}
                name="officerNotifed"
                value={contactActionFormData.officerNotifed}
                onChange={handleNewActionFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Contact Method</InputLabel>
                <Select
                  fullWidth
                  variant="filled"
                  label="Contact Method"
                  name="contactMethod"
                  value={contactActionFormData.contactMethod}
                  onChange={handleNewActionFormChange}
                >
                  <MenuItem value={'Email'}>Email</MenuItem>
                  <MenuItem value={'Phone'}>Phone</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="filled"
                  label={'Reason for Contact/Notes on their Response'}
                  name="response"
                  value={contactActionFormData.response}
                  onChange={handleNewActionFormChange}
                />
              </Grid>
            </Grid>
          </>
        );
      }
    }
  };

  const newActionModal = () => {
    return (
      <GordonDialogBox
        open={newActionModalOpen}
        title={'Record NEW Action'}
        buttonClicked={handleNewActionSubmit}
        buttonName="Submit"
        cancelButtonClicked={closeModal}
        cancelButtonName="close"
      >
        <Grid container className={styles.newActionModal} rowGap={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Action Type</InputLabel>
              <Select
                fullWidth
                variant="filled"
                label="Action Type"
                name="action"
                value={newActionFormData.action}
                onChange={handleNewActionFormChange}
              >
                {actionTypes.map((actionType) =>
                  !(
                    item.status.toLowerCase() === 'found' && actionType.toLowerCase() === 'checked'
                  ) ? (
                    <MenuItem value={actionType}>
                      {actionType === 'Checked'
                        ? 'Check if Item was Found'
                        : actionType === 'NotifiedOfficer'
                          ? 'Contact Officer'
                          : actionType === 'OwnerContact'
                            ? 'Contact Owner'
                            : actionType}
                    </MenuItem>
                  ) : (
                    // If item is already found, disallow the check if found action type.
                    <MenuItem disabled value={actionType}>
                      Check if Item was Found
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Grid>
          {newActionForm()}
        </Grid>
      </GordonDialogBox>
    );
  };

  return (
    <>
      <Header />
      {loading ? (
        <GordonLoader />
      ) : (
        <Grid container className={styles.container}>
          <Grid item xs={12} sm={11}>
            <Card className={styles.card}>
              <CardHeader
                title={
                  <>
                    <Grid container rowGap={1}>
                      <Grid container item xs={12} md={1}>
                        <Button className={styles.backButton} onClick={() => navigate(-1)}>
                          Back
                        </Button>
                      </Grid>
                      <Grid
                        container
                        item
                        columnGap={2}
                        rowGap={1}
                        xs={12}
                        md={10}
                        justifyContent="center"
                      >
                        <div>
                          <b className={styles.yellowText}>Lost</b> Item Report Details
                        </div>
                        <Typography>
                          <em>Status:</em> <StatusChip status={item.status} />
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                }
                className={`gc360_header ${styles.title}`}
              />
              <CardContent>
                <Grid container spacing={2} rowGap={1}>
                  {/* Left Column Content */}
                  <Grid item xs={12} sm={6}>
                    <Grid container rowGap={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Owner's Name"
                          variant="filled"
                          disabled
                          fullWidth
                          value={`${item.firstName} ${item.lastName}`}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      {/* Owner's contact info */}
                      <Grid item xs={12}>
                        <TextField
                          label="Owner's Contact Info"
                          variant="filled"
                          disabled
                          fullWidth
                          multiline
                          minRows={2}
                          value={`Email: ${item.email}\nPhone: ${item.phone}`}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      {/* Item Category */}
                      <Grid item xs={12} className={styles.boxBackground}>
                        <TextField
                          label="Category"
                          variant="filled"
                          disabled
                          fullWidth
                          value={`${item.category}`}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      {/*Color Category*/}
                      <Grid item xs={12} className={styles.boxBackground}>
                        <TextField
                          label="Colors"
                          variant="filled"
                          disabled
                          fullWidth
                          value={`${item.colors}`}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Brand or Make"
                          variant="filled"
                          disabled
                          fullWidth
                          value={item.brand || 'N/A'}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Description of Item"
                          variant="filled"
                          disabled
                          fullWidth
                          multiline
                          minRows={5}
                          value={item.description}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* Right Column */}
                  <Grid item xs={12} sm={6}>
                    <Grid container rowGap={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Location Lost"
                          variant="filled"
                          disabled
                          fullWidth
                          multiline
                          value={item.locationLost}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Date Lost"
                          variant="filled"
                          disabled
                          fullWidth
                          value={formatDateString(item.dateLost)}
                          InputProps={{ readOnly: true }}
                        />
                      </Grid>

                      {/* Stolen information (if marked stolen) */}
                      {item.stolen ? (
                        <>
                          <Grid item xs={12}>
                            <hr />
                          </Grid>
                          <Grid item xs={12}>
                            <div className={styles.stolenButton}>
                              {item.stolen ? 'This Item was Reported Stolen' : ''}
                            </div>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Stolen - Reason Given"
                              variant="filled"
                              disabled
                              fullWidth
                              multiline
                              minRows={4}
                              value={item.stolenDescription}
                              InputProps={{ readOnly: true }}
                            />
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={12} /> /*spacer to prevent formatting issues*/
                      )}
                      {isWidescreen ? adminActions() : <></>}
                    </Grid>
                  </Grid>
                  {isWidescreen ? <></> : adminActions()}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {actionDetailsModal()}
          {newActionModal()}
        </Grid>
      )}
      <SimpleSnackbar
        open={errorSnackbarOpen}
        onClose={() => {
          setErrorSnackbarOpen(false);
        }}
        severity="error"
        text="All fields must be filled out to create a new action!"
      />
    </>
  );
};

export default MissingItemReportData;
