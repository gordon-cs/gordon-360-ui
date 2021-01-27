//Main apartment application page
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Button,
  Typography,
} from '@material-ui/core/';
import GordonLoader from '../../../../components/Loader';
import AlertDialogBox from '../../../../components/AlertDialogBox';
import SimpleSnackbar from '../../../../components/Snackbar';
import ApplicantList from './components/ApplicantList';
import HallSelection from './components/HallSelection';
import housing from '../../../../services/housing';
import user from '../../../../services/user';
// import '../../apartmentApp.css';
const MAX_NUM_APPLICANTS = 8;

const InstructionsCard = () => (
  <Card>
    <CardHeader title="Apartment Application Instructions" className="card-header" />
    <CardContent>
      <Typography variant="body1">Placeholder Text</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde
        suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </CardContent>
  </Card>
);

const StudentApplication = (props) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [network, setNetwork] = useState('online');

  const [applicationID, setApplicationID] = useState(-1); // Default value of -1 indicate to backend that the application ID number is not yet known
  const [editorUsername, setEditorUsername] = useState(null); // The username of the application editor
  const [applicants, setApplicants] = useState([]);
  const [preferredHalls, setPreferredHalls] = useState([{ HallRank: 1, HallName: '' }]);
  // const [offCampusProgramInfo, setOffCampusProgramInfo] = useState(new Map());

  const [applicationCardsOpen, setApplicationCardsOpen] = useState(false);
  const [newEditorProfile, setNewEditorProfile] = useState(null); // Stores the StudentProfileInfo of the new editor before the user confirms the change
  const [changeEditorDialogOpen, setChangeEditorDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false); // Use this for submitting app (later feature)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [saveButtonAlertTimeout, setSaveButtonAlertTimeout] = useState(null);

  // const peopleSearchRef = useRef();

  let offCampusProgramInfo = new Map();
  applicants.forEach((profile) => offCampusProgramInfo.set(profile.AD_Username, ''));

  /**
   * Attempt to load an existing application from the database if one exists
   */
  useEffect(() => {
    loadSavedApplication();
  });

  const loadSavedApplication = async () => {
    // TODO: Implement this once save/load of application data has been implemented in the backend
    setLoading(true);
    // Check if the current user is on an application. Returns the application ID number if found
    let newApplicationID = -1; // await housing.getApplicationID();
    if (newApplicationID !== null && newApplicationID !== -1) {
      setApplicationID(newApplicationID);
      let applicationDetails = await housing.getApartmentApplication(newApplicationID);
      if (applicationDetails) {
        if (applicationDetails.Username) {
          setEditorUsername(applicationDetails.Username);
        }
        if (applicationDetails.Applicants) {
          setApplicants(applicationDetails.Username);
        }
      }
    } else {
      // No existing application was found in the database
      setApplicationID(-1);
      if (!editorUsername) {
        setEditorUsername(props.userProfile.AD_Username);
      }
      let newApplicants = applicants;
      if (
        newApplicants.every(
          (applicantProfile) => applicantProfile.AD_Username !== props.userProfile.AD_Username,
        )
      ) {
        newApplicants.push(props.userProfile);
        setApplicants(newApplicants);
      }
    }
    setLoading(false);
  };

  const handleShowApplication = () => {
    setApplicationCardsOpen(true);
  };

  /**
   * Callback for apartment people search submission
   * @param {String} searchSelection Username for student
   */
  const handleSearchSubmit = (searchSelection) => {
    if (searchSelection) {
      // The method is separated from callback because user API service must be handled inside an async method
      addApplicant(searchSelection);
    }
  };

  /**
   * Add an applicant to the list, identified by username
   * @param {String} username Username for student
   */
  const addApplicant = async (username) => {
    let newApplicants = applicants; // make a separate copy of the array
    try {
      // Get the profile of the selected user
      let newApplicantProfile = await user.getProfileInfo(username);
      if (newApplicants.length >= MAX_NUM_APPLICANTS) {
        // Display an error if the user try to add an applicant when the list is full
        setSnackbarText('You cannot add more than ' + MAX_NUM_APPLICANTS + ' applicants');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      } else if (!String(newApplicantProfile.PersonType).includes('stu')) {
        // Display an error if the selected user is not a student
        setSnackbarText(
          'Could not add ' +
            String(newApplicantProfile.fullName) +
            ' because they are not a student.',
        );
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      } else if (
        newApplicants.some((applicantProfile) => applicantProfile.AD_Username === username)
      ) {
        // Display an error if the selected user is already in the list
        setSnackbarText(String(newApplicantProfile.fullName) + ' is already in the list.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      } else {
        // Add the profile object to the list of applicants
        newApplicants.push(newApplicantProfile);
        setApplicants(newApplicants);
        if (applicants.some((applicantProfile) => applicantProfile.AD_Username === username)) {
          setSnackbarText(
            String(newApplicantProfile.fullName) + ' was successfully added to the list.',
          );
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        }
      }
    } catch (error) {
      setSnackbarText('Something went wrong while trying to add this person. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  const handleChangeEditor = (profile) => {
    if (profile) {
      if (applicants.includes(profile)) {
        setNewEditorProfile(profile);
        setChangeEditorDialogOpen(true);
      }
    }
  };

  const handleChangeEditorAccepted = () => {
    if (newEditorProfile && newEditorProfile.AD_Username) {
      // The method is separated from callback because the housing API service must be handled inside an async method
      changeApplicationEditor(applicationID, newEditorProfile.AD_Username);
      handleCloseOkay();
    } else {
      setSnackbarText('Something went wrong while trying to save the new application editor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
  };

  /**
   * Update the application editor of the application to the database
   * @param {Number} applicationID the application ID number
   * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
   */
  const changeApplicationEditor = async (applicationID, newEditorUsername) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      result = await housing.changeApplicationEditor(applicationID, newEditorUsername);
    } catch {
      result = false;
    }
    if (result) {
      console.log(result); //! DEBUG
      setEditorUsername(newEditorProfile.AD_Username);
      setSaving('success');
    } else {
      setSnackbarText('Something went wrong while trying to save the new application editor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
    if (saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      setSaveButtonAlertTimeout(
        setTimeout(() => {
          setSaveButtonAlertTimeout(null);
          setSaving(false);
        }, 6000),
      );
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  const handleApplicantRemove = (profileToRemove) => {
    if (profileToRemove) {
      let newApplicants = applicants; // make a separate copy of the array
      let index = newApplicants.indexOf(profileToRemove);
      if (index !== -1) {
        newApplicants.splice(index, 1);
        setApplicants(newApplicants);
      }
    }
  };

  /**
   * Callback for changes to hall list item name and/or rank
   * @param {Number} hallRankValue The rank value that the user assigned to this hall
   * @param {String} hallNameValue The name of the hall that was selected
   * @param {Number} index The index of the hall in the list
   */
  const handleHallInputChange = (hallRankValue, hallNameValue, index) => {
    console.log('Called "handleHallInputChange" in StudentApplication component'); //! DEBUG
    console.log('HallRank: ' + hallRankValue); //! DEBUG
    console.log('HallName: ' + hallNameValue); //! DEBUG
    console.log('index: ' + index); //! DEBUG
    if (index !== null && index >= 0) {
      console.log('Attempting to update preferred halls'); //! DEBUG

      let newPreferredHalls = preferredHalls; // make a separate copy of the array

      // Get the custom hallInfo object at the given index
      let newHallInfo = newPreferredHalls[index];

      // Error checking on the hallRankValue before modifying the newHallInfo object
      if (hallRankValue !== null) {
        newHallInfo.HallRank = Number(hallRankValue);
      } else {
        // Display an error if the selected rank value is less or equal to zero
        setSnackbarText(
          'The "Rank" value expected a positive number, but you entered "' +
            String(hallRankValue) +
            '"',
        );
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }

      // Error checking on the hallNameValue before modifying the newHallInfo object
      if (
        hallNameValue !== null &&
        hallNameValue !== preferredHalls[index].HallName &&
        newPreferredHalls.some((hallInfo) => hallInfo.HallName === hallNameValue)
      ) {
        // Display an error if the selected hall is already in the list
        setSnackbarText(String(hallNameValue) + ' is already in the list.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      } else if (hallNameValue !== null) {
        // Create a new custom hallInfo object
        newHallInfo.HallName = hallNameValue;
      }

      newPreferredHalls[index] = newHallInfo; // replace the element at index with the new hall info object
      // preferredHalls.splice(index, 1, newHallInfo);

      // Sort the list of halls by the rank numbers
      newPreferredHalls.sort(function(a, b) {
        return a.HallRank - b.HallRank;
      });

      console.log('Printing current list of preferred halls'); //! DEBUG
      newPreferredHalls.forEach((hall) => console.log(hall)); //! DEBUG

      setPreferredHalls(newPreferredHalls);
    } else {
      setSnackbarText('Something went wrong while trying to add this hall. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for hall list remove button
   * @param {Number} index The index of the hall to be removed from the list of perferred halls
   */
  const handleHallRemove = (index) => {
    console.log('Called "handleHallRemove" in StudentApplication component'); //! DEBUG
    console.log('index: ' + index); //! DEBUG
    if (index !== null && index !== -1) {
      let newPreferredHalls = preferredHalls; // make a separate copy of the array
      if (preferredHalls.length > 1) {
        // Remove the selected hall if the list has more than one element
        newPreferredHalls.splice(index, 1);
        // If any rank value is greater than the new maximum, then set it to that new max rank
        let maxRank = newPreferredHalls.length;
        newPreferredHalls.forEach((hallInfo, index) => {
          if (hallInfo.HallRank > maxRank) {
            newPreferredHalls[index].HallRank = maxRank;
          }
        });
      } else {
        // Reset the first and only element to "empty" if there is 1 or 0 elements in the list
        let newHallInfo = { HallRank: 1, HallName: '' };
        newPreferredHalls[0] = newHallInfo;
      }
      console.log('Printing current list of preferred halls'); //! DEBUG
      newPreferredHalls.forEach((hall) => console.log(hall)); //! DEBUG
      setPreferredHalls(newPreferredHalls);
    }
  };

  /**
   * Callback for hall list add button
   */
  const handleHallAdd = () => {
    console.log('Called "handleHallAdd" in StudentApplication component'); //1 DEBUG
    let newPreferredHalls = preferredHalls; // make a separate copy of the array
    let newHallRank = newPreferredHalls.length + 1;
    newPreferredHalls.push({ HallRank: newHallRank, HallName: '' });
    console.log('Printing current list of preferred halls'); //! DEBUG
    newPreferredHalls.forEach((hall) => console.log(hall)); //! DEBUG
    setPreferredHalls(newPreferredHalls);
  };

  /**
   * Callback for apartment application save button
   */
  const handleSaveButtonClick = () => {
    let debugMessage = 'DEBUG: Save button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    // The method is separated from callback because the housing API service must be handled inside an async method
    saveApplication(applicationID, editorUsername, applicants);
  };

  /**
   * Save the current state of the application to the database
   * @param {Number} applicationID the application ID number if it is known, else it is -1
   * @param {String} editorUsername the student username of the person filling out the application
   * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
   */
  const saveApplication = async (applicationID, editorUsername, applicants) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      result = await housing.saveApartmentApplication(applicationID, editorUsername, applicants);
    } catch {
      result = false;
    }
    if (result !== null && result !== false) {
      console.log('result of saving: ' + result); //! DEBUG
      setApplicationID(result);
      setSaving('success');
    } else {
      setSnackbarText('Something went wrong while trying to save the application.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
    if (saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      setSaveButtonAlertTimeout(
        setTimeout(() => {
          setSaveButtonAlertTimeout(null);
          setSaving(false);
        }, 6000),
      );
    }
  };

  /**
   * Callback for apartment application submit button
   */
  const handleSubmitButtonClick = () => {
    let debugMessage = 'DEBUG: Submit button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    setSubmitDialogOpen(true);
  };

  const handleSubmitAppAccepted = () => {
    // The method is separated from callback because the housing API service must be handled inside an async method
    submitApplication();
    handleCloseOkay();
  };

  const submitApplication = async () => {
    //! Placeholder
    setApplicationCardsOpen(false);
  };

  const handleCloseOkay = () => {
    setChangeEditorDialogOpen(false);
    setSubmitDialogOpen(false);
  };

  const handleCloseDialog = (event, reason) => {
    // Prevent the dialog box from closing if the user clicks outside the dialog box
    if (reason === 'clickaway') {
      return;
    }
    handleCloseOkay();
  };

  const handleCloseSnackbar = (event, reason) => {
    // Prevent the snackbar from closing if the user clicks outside the snackbar
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  /* Used to re-render the page when the network connection changes.
   *  The state's network variable is compared to the message received to prevent
   *  multiple re-renders that creates extreme performance lost.
   *  The origin of the message is checked to prevent cross-site scripting attacks
   */
  window.addEventListener('message', (event) => {
    if (
      event.data === 'online' &&
      network === 'offline' &&
      event.origin === window.location.origin
    ) {
      setNetwork('online');
    } else if (
      event.data === 'offline' &&
      network === 'online' &&
      event.origin === window.location.origin
    ) {
      setNetwork('offline');
    }
  });

  /* Gets status of current network connection for online/offline rendering
   *  Defaults to online in case of PWA not being possible
   */
  const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

  const changeEditorAlertText = (
    <span>
      If you change the application editor, you will no longer be able to edit this application
      yourself.
      <br />
      Are you sure you want to change the application editor?
    </span>
  );

  const submitAlertText = (
    <span>
      This feature is not yet implemented.
      <br />
      Clicking the "Accept" button will hide the application cards.
    </span>
  );

  if (networkStatus === 'online') {
    return (
      <div>
        {loading ? (
          <GordonLoader />
        ) : (
          <div className="apartment-application">
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} lg={10}>
                <Card>
                  <CardContent>
                    <Grid container direction="row" justify="flex-end">
                      <Grid item xs={6} sm={8}>
                        {applicationID === -1 ? (
                          <Typography variant="body1">
                            Placeholder Text
                            <br />
                            No existing applications found
                          </Typography>
                        ) : props.userProfile.AD_Username === editorUsername ? (
                          <Typography variant="body1">
                            Existing application for this semester:
                            <br />
                            Last Modified: [Insert Date Here]
                          </Typography>
                        ) : (
                          <Typography variant="body1">
                            Only the application editor may edit the application.
                            <br />
                            Last Modified: [Insert Date Here]
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        {applicationID === -1 ? (
                          <Button
                            variant="contained"
                            onClick={handleShowApplication}
                            color="primary"
                            disabled={applicationCardsOpen}
                          >
                            Create a new application
                          </Button>
                        ) : props.userProfile.AD_Username === editorUsername ? (
                          <Button
                            variant="contained"
                            onClick={handleShowApplication}
                            color="primary"
                            disabled={applicationCardsOpen}
                          >
                            Edit your application
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleShowApplication}
                            color="primary"
                            disabled={applicationCardsOpen}
                          >
                            View your application
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                {/* <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
                      <InstructionsCard />
                    </Collapse> */}
              </Grid>
              <Grid item xs={12} md={8}>
                <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
                  <InstructionsCard />
                </Collapse>
              </Grid>
              <Grid item>
                <Collapse in={applicationCardsOpen} timeout="auto" unmountOnExit>
                  <Grid container direction="row-reverse" justify="center" spacing={2}>
                    <Grid item xs={12} md={4}>
                      <InstructionsCard />
                    </Grid>
                    <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                      <Grid item>
                        <ApplicantList
                          maxNumApplicants={MAX_NUM_APPLICANTS}
                          userProfile={props.userProfile}
                          editorUsername={editorUsername}
                          applicants={applicants}
                          saving={saving}
                          onSearchSubmit={handleSearchSubmit}
                          onChangeEditor={handleChangeEditor}
                          onApplicantRemove={handleApplicantRemove}
                          onSaveButtonClick={handleSaveButtonClick}
                          authentication={props.authentication}
                        />
                        <AlertDialogBox
                          open={changeEditorDialogOpen}
                          onClose={handleCloseDialog}
                          severity={'warning'}
                          title={'Change application editor?'}
                          text={changeEditorAlertText}
                          cancelButtonClicked={handleCloseOkay}
                          cancelButtonName={'Cancel'}
                          confirmButtonClicked={handleChangeEditorAccepted}
                          confirmButtonName={'Accept'}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container direction="row" justify="center" spacing={2}>
                    <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                      <Grid item>
                        <HallSelection
                          editorUsername={editorUsername}
                          preferredHalls={preferredHalls}
                          saving={saving}
                          onHallInputChange={handleHallInputChange}
                          onHallRemove={handleHallRemove}
                          onHallAdd={handleHallAdd}
                          onSaveButtonClick={handleSaveButtonClick}
                          authentication={props.authentication}
                        />
                      </Grid>
                      <Grid item>
                        <Card>
                          <CardHeader title="Off-Campus Work Study" className="card-header" />
                          <CardContent>
                            <Typography variant="body1">Placeholder text</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card>
                        <CardHeader title="Agreements" className="card-header" />
                        <CardContent>
                          <Typography variant="body1">Placeholder text</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} lg={10}>
                      <Card>
                        <CardContent>
                          {props.userProfile.AD_Username === editorUsername ? (
                            <Grid container direction="row" justify="flex-end">
                              <Grid item xs={6} sm={8}>
                                <Typography variant="body1">Placeholder Text</Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Button
                                  variant="contained"
                                  onClick={handleSubmitButtonClick}
                                  color="primary"
                                  disabled={!applicationCardsOpen}
                                >
                                  Submit Application
                                </Button>
                              </Grid>
                              <AlertDialogBox
                                open={submitDialogOpen}
                                onClose={handleCloseDialog}
                                severity={'warning'}
                                title={'Submit apartment application?'}
                                text={submitAlertText}
                                cancelButtonClicked={handleCloseOkay}
                                cancelButtonName={'Cancel'}
                                confirmButtonClicked={handleSubmitAppAccepted}
                                confirmButtonName={'Accept'}
                              />
                            </Grid>
                          ) : (
                            <Grid container direction="row" justify="flex-end">
                              <Grid item xs={6} sm={8}>
                                <Typography variant="body1">
                                  Placeholder Text for when the user is NOT the primary applicant
                                </Typography>
                              </Grid>
                              <Grid item xs={6} sm={4}>
                                <Button variant="contained" color="primary" disabled>
                                  Submit Application
                                </Button>
                              </Grid>
                            </Grid>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Collapse>
              </Grid>
            </Grid>
            <SimpleSnackbar
              text={snackbarText}
              severity={snackbarSeverity}
              open={snackbarOpen}
              onClose={handleCloseSnackbar}
            />
          </div>
        )}
      </div>
    );
  }
};

export default StudentApplication;
