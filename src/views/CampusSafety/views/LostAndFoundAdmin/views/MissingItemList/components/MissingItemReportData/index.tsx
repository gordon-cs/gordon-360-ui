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

const MissingItemReportData = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState({ AD_Username: '' });

  // Pull the itemId from the url
  const { itemId } = useParams<{ itemId: string }>();

  // Page State
  const [loading, setLoading] = useState<boolean>(true);
  const isWidescreen = useMediaQuery('(min-width:1000px)');
  const isMobile = useMediaQuery('(max-width:470px)');
  const [newActionFormData, setNewActionFormData] = useState({ action: '', actionNote: '' });
  const [actionDetailsModalOpen, setActionDetailsModalOpen] = useState<boolean>(false);
  const [newActionModalOpen, setNewActionModalOpen] = useState<boolean>(false);

  // Used for details modal with dynamic content that must be set asynchronously before modal opens
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
  }, [itemId]);

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
   * Modal lifecycle methods
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
    // for use in the modal
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

  const handleNewActionFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewActionFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNewActionSubmit = async () => {
    // Combine form data into the data format for the backend request
    let requestData = {
      ...newActionFormData,
      missingID: parseInt(itemId || ''),
      actionDate: DateTime.now().toISO(),
      username: username.AD_Username,
    };
    await lostAndFoundService.createAdminAction(parseInt(itemId ? itemId : ''), requestData);
    // Since a new action was created, trigger an update, which will fetch the new actions list
    // from the backend
    setActionsUpdated(true);
    closeModal();
  };

  // Format date strings for display
  const formatDate = (date: string) => DateTime.fromISO(date).toFormat('M/d/yy');

  if (!item) return null;

  const formattedDateLost = DateTime.fromISO(item.dateLost).toFormat('MM-dd-yy');

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
              <Grid item xs={2}>
                <div className={styles.dataCell}>Date</div>
              </Grid>
              <Grid item xs={3}>
                <div className={styles.dataCell}>Action</div>
              </Grid>
              <Grid item xs={3}>
                <div className={styles.dataCell}>User</div>
              </Grid>
              <Grid item xs={3}>
                <div className={styles.dataCell}>Notes</div>
              </Grid>
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
                    <>
                      <Grid
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
                        <Grid item xs={2} className={styles.tableColumn}>
                          <div className={styles.dataCell}>
                            {formatDate(adminAction.actionDate)}
                          </div>
                        </Grid>
                        <Grid item xs={3} className={styles.tableColumn}>
                          <div className={styles.dataCell}>{adminAction.action}</div>
                        </Grid>
                        <Grid item xs={3} className={styles.tableColumn}>
                          <div className={styles.dataCell}>{adminAction.username}</div>
                        </Grid>
                        <Grid item xs={3} className={styles.tableColumn}>
                          <div className={styles.dataCell}>{adminAction.actionNote}</div>
                        </Grid>
                      </Grid>
                    </>
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
        <Grid container>
          <Grid item xs={5}>
            <b>Date</b>{' '}
            {selectedAction.current ? formatDate(selectedAction.current.actionDate) : ''}
          </Grid>
          <Grid item xs={7}>
            <b>Action</b> {selectedAction.current ? selectedAction.current.action : ''}
          </Grid>
          <Grid item xs={5}>
            <b>User</b> {selectedAction.current ? selectedAction.current.username : ''}
          </Grid>
          <Grid item xs={7}>
            <b>Notes</b> {selectedAction.current ? selectedAction.current.actionNote : ''}
          </Grid>
        </Grid>
      </GordonDialogBox>
    );
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
            <TextField
              fullWidth
              variant="filled"
              label={'Action'}
              name="action"
              value={newActionFormData.action}
              onChange={handleNewActionFormChange}
            />
          </Grid>
          <Typography>Add notes to record what you did</Typography>
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
                    <Grid container alignItems="center">
                      <Grid item xs={1}>
                        <Button className={styles.backButton} onClick={() => navigate(-1)}>
                          Back
                        </Button>
                      </Grid>
                      <Grid item sm={11} xs={12}>
                        <div>
                          <b>Missing</b> Item Report Details
                        </div>
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
                          value={formattedDateLost}
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
    </>
  );
};

export default MissingItemReportData;
