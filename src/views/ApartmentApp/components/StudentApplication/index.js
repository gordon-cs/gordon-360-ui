//Main apartment application page
import React, { Component } from 'react';
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
import user from '../../../../services/user';
import housing from '../../../../services/housing';
import '../../apartmentApp.css';
const MAX_NUM_APPLICANTS = 8;

/**
 * @typedef { import('../../../../services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @typedef { import('../../../../services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders a card displaying the apartment application instructions
 */
const renderInstructionsCard = () => {
  // TODO: Refer to 'formatQuestion' in 'src/services/wellness.js' for ideas about how to implement the instructions
  return (
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
};

export default class StudentApplication extends Component {
  constructor(props) {
    super(props);
    this.peopleSearch = React.createRef();
    this.state = {
      loading: true,
      saving: false,
      network: 'online',
      applicationCardsOpen: false,
      submitDialogOpen: false, // Use this for submitting app (later feature)
      editDialogOpen: false,
      applicationID: -1, // Default value of -1 indicate to backend that the application ID number is not yet known
      editorUsername: null, // The username of the application editor
      applicants: [],
      preferredHalls: [{ HallName: '', HallRank: 1 }], // Properties 'HallName' and 'HallRank' must be capitalized to match the backend
    };
    // Off-campus program info is stored as a Map, where the Key is a student's username and the corresponding Value is the department of that student's off-campus program
    this.offCampusProgramInfo = new Map();
    this.state.applicants.forEach((profile) =>
      this.offCampusProgramInfo.set(profile.AD_Username, ''),
    );
    this.editDialogText = '';
    this.snackbarText = '';
    this.snackbarSeverity = '';
    this.saveButtonAlertTimeout = null;
  }

  componentDidMount() {
    this.loadSavedApplication();
  }

  /**
   * Loads the user's saved apartment application, if one exists
   */
  async loadSavedApplication() {
    this.setState({ loading: true });
    // Check if the current user is on an application. Returns the application ID number if found
    let applicationID = await housing.getApplicationID();
    if (applicationID !== null && applicationID !== -1) {
      this.setState({ applicationID });
      let applicationDetails = housing.getApartmentApplication(applicationID);
      if (applicationDetails) {
        if (applicationDetails.Username) {
          this.setState({ editorUsername: applicationDetails.Username });
        }
        if (applicationDetails.Applicants) {
          this.setState({ applicants: applicationDetails.Applicants });
        }
      }
    } else {
      this.setState({ applicationID: -1 });
      if (!this.state.editorUsername) {
        this.setState({ editorUsername: this.props.userProfile.AD_Username });
      }
      let applicants = this.state.applicants;
      applicants.push(this.props.userProfile);
      this.setState({ applicants });
    }
    this.setState({ loading: false });
  }

  handleShowApplication = () => {
    this.setState({ applicationCardsOpen: true });
  };

  handleSubmitApplication = () => {
    // TODO: This callback should make sure all the fields contain valid entries before allowing the application to be submitted.
    try {
      //! Placeholder
      this.snackbarText = 'This feature is not yet implemented.';
      this.snackbarSeverity = 'info';
    } catch {
      this.snackbarText = 'Something went wrong while trying to submit the application.';
      this.snackbarSeverity = 'error';
    }
    this.setState({ snackbarOpen: true, applicationCardsOpen: false });
  };

  /**
   * Callback for apartment people search submission
   * @param {String} searchSelection Username for student
   */
  handleSearchSubmit = (searchSelection) => {
    this.setState({ updating: true });
    if (searchSelection) {
      // The method is separated from callback because user API service must be handled inside an async method
      this.addApplicant(searchSelection);
    }
    this.setState({ updating: false });
  };

  /**
   * Add an applicant to the list, identified by username
   * @param {String} username Username for the new applicant
   */
  async addApplicant(username) {
    let applicants = this.state.applicants; // make a separate copy of the array
    try {
      // Get the profile of the selected user
      let applicantProfile = await user.getProfileInfo(username);
      if (applicants.length >= MAX_NUM_APPLICANTS) {
        // Display an error if the user try to add an applicant when the list is full
        this.snackbarText = 'You cannot add more than ' + MAX_NUM_APPLICANTS + ' applicants';
        this.snackbarSeverity = 'warning';
      } else if (!String(applicantProfile.PersonType).includes('stu')) {
        // Display an error if the selected user is not a student
        this.snackbarText =
          'Could not add ' + String(applicantProfile.fullName) + ' because they are not a student.';
        this.snackbarSeverity = 'warning';
      } else if (applicants.some((applicant) => applicant.AD_Username === username)) {
        // Display an error if the selected user is already in the list
        this.snackbarText = String(applicantProfile.fullName) + ' is already in the list.';
        this.snackbarSeverity = 'info';
      } else {
        // Check if the student is on an existing application
        let applicationID = await housing.getApplicationID(username);
        if (applicationID !== null && applicationID !== -1) {
          // Display an error if the selected user is already on an existing application (in the database)
          this.snackbarText =
            String(applicantProfile.fullName) + ' is already on an existing application.';
          this.snackbarSeverity = 'error';
        } else {
          // Add the profile object to the list of applicants
          applicants.push(applicantProfile);
          this.setState({ applicants });
          if (this.state.applicants.some((applicant) => applicant.AD_Username === username)) {
            this.snackbarText =
              String(applicantProfile.fullName) + ' was successfully added to the list.';
            this.snackbarSeverity = 'success';
          }
        }
      }
    } catch (error) {
      this.snackbarText = 'Something went wrong while trying to add this person. Please try again.';
      this.snackbarSeverity = 'error';
    }
    this.setState({ snackbarOpen: true });
  }

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  handleChangeEditor = (profile) => {
    this.setState({ updating: true });
    if (profile) {
      if (this.state.applicants.includes(profile)) {
        this.setState({ newApplicationEditor: profile, editDialogOpen: true });
      }
    }
  };

  /**
   * Callback for applying the new application editor
   */
  handleChangeEditorAccepted = () => {
    if (this.state.newApplicationEditor && this.state.newApplicationEditor.AD_Username) {
      // The method is separated from callback because the housing API service must be handled inside an async method
      this.changeApplicationEditor(
        this.state.applicationID,
        this.state.newApplicationEditor.AD_Username,
      );
      this.handleCloseOkay();
    } else {
      this.snackbarText = 'Something went wrong while trying to save the new application editor.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true, saving: 'failed' });
    }
  };

  /**
   * Update the application editor of the application to the database
   * @param {Number} applicationID the application ID number
   * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
   */
  async changeApplicationEditor(applicationID, newEditorUsername) {
    this.setState({ saving: true });
    this.saveButtonAlertTimeout = null;
    let result = null;
    try {
      result = await housing.changeApartmentAppEditor(applicationID, newEditorUsername);
    } catch {
      result = false;
    }
    if (result) {
      console.log(result); //! DEBUG
      this.setState({
        editorUsername: this.state.newApplicationEditor.AD_Username,
        saving: 'success',
      });
    } else {
      this.snackbarText = 'Something went wrong while trying to save the new application editor.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true, saving: 'failed' });
    }
    if (this.saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      this.saveButtonAlertTimeout = setTimeout(() => {
        this.saveButtonAlertTimeout = null;
        this.setState({ saving: false });
      }, 6000);
    }
  }

  /**
   * Callback for applicant list remove button
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  handleApplicantRemove = (profileToRemove) => {
    this.setState({ updating: true });
    if (profileToRemove) {
      let applicants = this.state.applicants; // make a separate copy of the array
      let index = applicants.indexOf(profileToRemove);
      if (index !== -1) {
        applicants.splice(index, 1);
        this.setState({ applicants });
      }
    }
    this.setState({ updating: false });
  };

  /**
   * Callback for changes to hall list item name and/or rank
   * @param {String} hallSelectionValue The name of the hall that was selected
   * @param {String|Number} hallRankValue The rank value that the user assigned to this hall
   * @param {Number} index The index of the hall in the list
   */
  handleHallInputChange = (hallSelectionValue, hallRankValue, index) => {
    console.log('Called "handleHallInputChange" in StudentApplication component'); //! DEBUG
    console.log('HallName: ' + hallSelectionValue); //! DEBUG
    console.log('HallRank: ' + hallRankValue); //! DEBUG
    console.log('index: ' + index); //! DEBUG
    this.setState({ updating: true });
    if (index !== null && index >= 0) {
      console.log('Attempting to update preferred halls'); //! DEBUG

      let preferredHalls = this.state.preferredHalls; // make a separate copy of the array

      // Get the custom hallInfo object at the given index
      let newHallInfo = preferredHalls[index];

      // Error checking on the hallSelectionValue before modifying the newHallInfo object
      if (
        hallSelectionValue !== null &&
        hallSelectionValue !== this.state.preferredHalls[index].HallName &&
        this.state.preferredHalls.some((hallInfo) => hallInfo.HallName === hallSelectionValue)
      ) {
        // Display an error if the selected hall is already in the list
        this.snackbarText = String(hallSelectionValue) + ' is already in the list.';
        this.snackbarSeverity = 'info';
        this.setState({ snackbarOpen: true });
      } else if (hallSelectionValue !== null) {
        // Create a new custom hallInfo object
        newHallInfo.HallName = hallSelectionValue;
      }

      // Error checking on the hallRankValue before modifying the newHallInfo object
      if (hallRankValue !== null) {
        newHallInfo.HallRank = Number(hallRankValue);
      } else {
        // Display an error if the selected rank value is less or equal to zero
        this.snackbarText =
          'The "Rank" value expected a positive number, but you entered "' +
          String(hallRankValue) +
          '"';
        this.snackbarSeverity = 'error';
        this.setState({ snackbarOpen: true });
      }

      preferredHalls[index] = newHallInfo; // replace the element at index with the new hall info object
      // preferredHalls.splice(index, 1, newHallInfo);

      // Sort the list of halls by the rank numbers
      preferredHalls.sort(function(a, b) {
        return a.HallRank - b.HallRank;
      });

      console.log('Printing current list of preferred halls'); //! DEBUG
      preferredHalls.forEach((hall) => console.log(hall)); //! DEBUG

      this.setState({ preferredHalls });
    } else {
      this.snackbarText = 'Something went wrong while trying to add this hall. Please try again.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true });
    }
    this.setState({ updating: false });
  };

  /**
   * Callback for hall list remove button
   * @param {Number} index The index of the hall to be removed from the list of perferred halls
   */
  handleHallRemove = (index) => {
    console.log('Called "handleHallRemove" in StudentApplication component'); //! DEBUG
    this.setState({ updating: true });
    console.log('index: ' + index); //! DEBUG
    if (index !== null && index !== -1) {
      let preferredHalls = this.state.preferredHalls; // make a separate copy of the array
      if (preferredHalls.length > 1) {
        // Remove the selected hall if the list has more than one element
        preferredHalls.splice(index, 1);
        // If any rank value is greater than the new maximum, then set it to that new max rank
        let maxRank = preferredHalls.length;
        preferredHalls.forEach((hallInfo, index) => {
          if (hallInfo.HallRank > maxRank) {
            preferredHalls[index].HallRank = maxRank;
          }
        });
      } else {
        // Reset the first and only element to "empty" if there is 1 or 0 elements in the list
        let newHallInfo = { HallName: '', HallRank: 1 };
        preferredHalls[0] = newHallInfo;
      }
      console.log('Printing current list of preferred halls'); //! DEBUG
      preferredHalls.forEach((hall) => console.log(hall)); //! DEBUG
      this.setState({ preferredHalls });
    }
    this.setState({ updating: false });
  };

  /**
   * Callback for hall list add button
   */
  handleHallAdd = () => {
    console.log('Called "handleHallAdd" in StudentApplication component'); //1 DEBUG
    this.setState({ updating: true });
    let preferredHalls = this.state.preferredHalls; // make a separate copy of the array
    let newHallRank = preferredHalls.length + 1;
    preferredHalls.push({ HallName: '', HallRank: newHallRank });
    console.log('Printing current list of preferred halls'); //! DEBUG
    preferredHalls.forEach((hall) => console.log(hall)); //! DEBUG
    this.setState({ preferredHalls, updating: false });
  };

  /**
   * Callback for apartment application save button
   */
  handleSaveButtonClick = () => {
    let debugMessage = 'DEBUG: Save button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    // Filter out any hall entries that do not have a name selected
    const preferredHalls = this.state.preferredHalls.filter((hallInfo) => hallInfo.HallName !== '');
    // The method is separated from callback because the housing API service must be handled inside an async method
    this.saveApplication(
      this.state.applicationID,
      this.state.editorUsername,
      this.state.applicants,
      preferredHalls,
    );
  };

  /**
   * Save the current state of the application to the database
   * @param {Number} applicationID the application ID number if it is known, else it is -1
   * @param {String} editorUsername the student username of the person filling out the application
   * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
   * @param {ApartmentChoice[]} preferredHalls Array of ApartmentChoice objects
   */
  async saveApplication(applicationID, editorUsername, applicants, preferredHalls) {
    this.setState({ saving: true });
    this.saveButtonAlertTimeout = null;
    let result = null;
    try {
      result = await housing.saveApartmentApplication(
        applicationID,
        editorUsername,
        applicants,
        preferredHalls,
      );
    } catch {
      result = false;
    }
    if (result !== null) {
      console.log(result); //! DEBUG
      this.setState({ applicationID: result, saving: 'success' });
    } else {
      this.snackbarText = 'Something went wrong while trying to save the application.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true, saving: 'failed' });
    }
    if (this.saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      this.saveButtonAlertTimeout = setTimeout(() => {
        this.saveButtonAlertTimeout = null;
        this.setState({ saving: false });
      }, 6000);
    }
  }

  /**
   * Callback for closing the snackbar
   */
  handleCloseSnackbar = (event, reason) => {
    // Prevent the snackbar from closing if the user clicks outside the snackbar
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  /**
   * Callback for closing the alert dialog box
   */
  handleCloseDialog = (event, reason) => {
    // Prevent the dialog box from closing if the user clicks outside the dialog box
    if (reason === 'clickaway') {
      return;
    }
    this.handleCloseOkay();
  };

  /**
   * Callback for the alert dialog box "Okay" button
   */
  handleCloseOkay = () => {
    this.setState({ submitDialogOpen: false, editDialogOpen: false });
  };

  render() {
    if (this.props.authentication) {
      /**
       * Used to re-render the page when the network connection changes.
       * this.state.network is compared to the message received to prevent
       * multiple re-renders that creates extreme performance lost.
       * The origin of the message is checked to prevent cross-site scripting attacks
       */
      window.addEventListener('message', (event) => {
        if (
          event.data === 'online' &&
          this.state.network === 'offline' &&
          event.origin === window.location.origin
        ) {
          this.setState({ network: 'online' });
        } else if (
          event.data === 'offline' &&
          this.state.network === 'online' &&
          event.origin === window.location.origin
        ) {
          this.setState({ network: 'offline' });
        }
      });

      const primaryApplicantAlertText = (
        <span>
          If you change the application editor, you will no longer be able to edit this application
          yourself.
          <br />
          Are you sure you want to change the application editor?
        </span>
      );

      /**
       * Gets status of current network connection for online/offline rendering
       * Defaults to online in case of PWA not being possible
       */
      const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

      if (networkStatus === 'online' && this.props.authentication) {
        return (
          <div>
            {this.state.loading ? (
              <GordonLoader />
            ) : (
              <div className="apartment-application">
                <Grid container justify="center" spacing={2}>
                  <Grid item xs={12} lg={10}>
                    <Card>
                      <CardContent>
                        <Grid container direction="row" justify="flex-end">
                          <Grid item xs={6} sm={8}>
                            {this.state.applicationID === -1 ? (
                              <Typography variant="body1">
                                Placeholder Text
                                <br />
                                No existing applications found
                              </Typography>
                            ) : this.props.userProfile.AD_Username === this.state.editorUsername ? (
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
                            {this.state.applicationID === -1 ? (
                              <Button
                                variant="contained"
                                onClick={this.handleShowApplication}
                                color="primary"
                                disabled={this.state.applicationCardsOpen}
                              >
                                Create a new application
                              </Button>
                            ) : this.props.userProfile.AD_Username === this.state.editorUsername ? (
                              <Button
                                variant="contained"
                                onClick={this.handleShowApplication}
                                color="primary"
                                disabled={this.state.applicationCardsOpen}
                              >
                                Edit your application
                              </Button>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={this.handleShowApplication}
                                color="primary"
                                disabled={this.state.applicationCardsOpen}
                              >
                                View your application
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    {/* <Collapse in={!this.state.applicationCardsOpen} timeout="auto" unmountOnExit>
                      {renderInstructionsCard()}
                    </Collapse> */}
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Collapse in={!this.state.applicationCardsOpen} timeout="auto" unmountOnExit>
                      {renderInstructionsCard()}
                    </Collapse>
                  </Grid>
                  <Grid item>
                    <Collapse in={this.state.applicationCardsOpen} timeout="auto" unmountOnExit>
                      <Grid container direction="row-reverse" justify="center" spacing={2}>
                        <Grid item xs={12} md={4}>
                          {renderInstructionsCard()}
                        </Grid>
                        <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                          <Grid item>
                            {this.props.userProfile.AD_Username === this.state.editorUsername ? (
                              <ApplicantList
                                maxNumApplicants={MAX_NUM_APPLICANTS}
                                userProfile={this.props.userProfile}
                                editorUsername={this.state.editorUsername}
                                applicants={this.state.applicants}
                                saving={this.state.saving}
                                onSearchSubmit={this.handleSearchSubmit}
                                onChangeEditor={this.handleChangeEditor}
                                onApplicantRemove={this.handleApplicantRemove}
                                onSaveButtonClick={this.handleSaveButtonClick}
                                authentication={this.props.authentication}
                              />
                            ) : (
                              <ApplicantList
                                disabled
                                maxNumApplicants={MAX_NUM_APPLICANTS}
                                userProfile={this.props.userProfile}
                                editorUsername={this.state.editorUsername}
                                applicants={this.state.applicants}
                                saving={this.state.saving}
                                authentication={this.props.authentication}
                              />
                            )}
                            <AlertDialogBox
                              open={this.state.editDialogOpen}
                              onClose={this.handleCloseDialog}
                              severity={'warning'}
                              title={'Change application editor?'}
                              text={primaryApplicantAlertText}
                              cancelButtonClicked={this.handleCloseOkay}
                              cancelButtonName={'Cancel'}
                              confirmButtonClicked={this.handleChangeEditorAccepted}
                              confirmButtonName={'Accept'}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container direction="row" justify="center" spacing={2}>
                        <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                          <Grid item>
                            {this.props.userProfile.AD_Username === this.state.editorUsername ? (
                              <HallSelection
                                editorUsername={this.state.editorUsername}
                                preferredHalls={this.state.preferredHalls}
                                saving={this.state.saving}
                                onHallInputChange={this.handleHallInputChange}
                                onHallRemove={this.handleHallRemove}
                                onHallAdd={this.handleHallAdd}
                                onSaveButtonClick={this.handleSaveButtonClick}
                                authentication={this.props.authentication}
                              />
                            ) : (
                              <HallSelection
                                disabled
                                editorUsername={this.state.editorUsername}
                                preferredHalls={this.state.preferredHalls}
                                saving={this.state.saving}
                                authentication={this.props.authentication}
                              />
                            )}
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
                          <Collapse
                            in={this.props.userProfile.AD_Username === this.state.primaryUsername}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Card>
                              <CardHeader title="Agreements" className="card-header" />
                              <CardContent>
                                <Typography variant="body1">Placeholder text</Typography>
                              </CardContent>
                            </Card>
                          </Collapse>
                        </Grid>
                        <Grid item xs={12} lg={10}>
                          <Card>
                            <CardContent>
                              {this.props.userProfile.AD_Username === this.state.editorUsername ? (
                                <Grid container direction="row" justify="flex-end">
                                  <Grid item xs={6} sm={8}>
                                    <Typography variant="body1">Placeholder Text</Typography>
                                  </Grid>
                                  <Grid item xs={6} sm={4}>
                                    <Button
                                      variant="contained"
                                      onClick={this.handleSubmitApplication}
                                      color="primary"
                                      disabled={!this.state.applicationCardsOpen}
                                    >
                                      Submit Application
                                    </Button>
                                  </Grid>
                                </Grid>
                              ) : (
                                <Grid container direction="row" justify="flex-end">
                                  <Grid item xs={6} sm={8}>
                                    <Typography variant="body1">
                                      Placeholder Text for when the user is NOT the primary
                                      applicant
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
                  text={this.snackbarText}
                  severity={this.snackbarSeverity}
                  open={this.state.snackbarOpen}
                  onClose={this.handleCloseSnackbar}
                />
              </div>
            )}
          </div>
        );
      }
    } else {
      // The user is not logged in
      return (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to use the Apartment Applications page.</h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  }
}
