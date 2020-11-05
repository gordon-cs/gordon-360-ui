//Main apartment application page
import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from '@material-ui/core/';
import { Alert, AlertTitle } from '@material-ui/lab';
import GordonLoader from '../../../../components/Loader';
import SimpleSnackbar from '../../../../components/Snackbar';
import ApplicantList from '../../../../components/ApartmentApplicantList';
import user from '../../../../services/user';
import housing from '../../../../services/housing';
import '../../apartmentApp.css';
const MAX_NUM_APPLICANTS = 8;
// const MIN_NUM_APPLICANTS = 2;

export default class StudentApplication extends Component {
  constructor(props) {
    super(props);
    this.peopleSearch = React.createRef();
    this.state = {
      isStu: true,
      loading: true,
      saving: false,
      network: 'online',
      submitDialogOpen: false, // Use this for saving app (later feature)
      editDialogOpen: false,
      userProfile: {},
      applicants: [],
    };
    this.editDialogText = '';
    this.snackbarText = '';
    this.snackbarSeverity = '';
    this.saveButtonAlertTimeout = null;
  }

  componentDidMount() {
    this.loadProfile();
    this.loadHousingInfo();
    // this.checkForSavedApplication();
  }

  /**
   * Loads the user's profile info only once (at start)
   */
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ userProfile: profile });
      this.setState({ isStu: String(profile.PersonType).includes('stu') });
      if (this.state.isStu) {
        let applicants = this.state.applicants;
        applicants.push(profile);
        this.setState({ applicants });
      }
      this.setState({ loading: false });
    } catch (error) {
      // Do Nothing
    }
    // DEBUG
    this.handleSearchSubmit('Gahngnin.Kim');
    this.handleSearchSubmit('Christian.Kunis');
    this.handleSearchSubmit('Nick.Noormand');
    this.handleSearchSubmit('Joshua.Rogers');
  }

  /**
   * Loads the user's saved apartment application, if one exists
   */
  async loadHousingInfo() {
    this.setState({ loading: true });
    try {
      /**
       * TODO: Once saving application has been implemented in the backend,
       * TODO: this will be replaced with a call to the load the application info.
       * TODO: The getHousingInfo was made obsolete after the Hello World
       */
      let housingInfo = await housing.getHousingInfo();
      let onOffCampus = String(housingInfo[0].OnOffCampus);
      let onCampusRoom = String(housingInfo[0].OnCampusRoom);
      this.setState({ onOffCampus, onCampusRoom, loading: false });
    } catch (error) {
      // Do Nothing
    }
  }

  /**
   * Callback for apartment people search submission
   * @param {String} searchSelection Username for student
   */
  handleSearchSubmit = searchSelection => {
    this.setState({ updating: true });
    if (searchSelection) {
      // The method is separated from callback because user API service must be handled inside an async method
      this.addApplicant(searchSelection);
    }
    this.setState({ updating: false });
  };

  /**
   * Add an applicant to the list, identified by username
   * @param {String} username Username for student
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
        this.setState({ snackbarOpen: true });
      } else if (!String(applicantProfile.PersonType).includes('stu')) {
        // Display an error if the selected user is not a student
        this.snackbarText =
          'Could not add ' + String(applicantProfile.fullName) + ' because they are not a student.';
        this.snackbarSeverity = 'warning';
        this.setState({ snackbarOpen: true });
      } else if (applicants.some(applicant => applicant.AD_Username === username)) {
        // Display an error if the selected user is already in the list
        this.snackbarText = String(applicantProfile.fullName) + ' is already in the list.';
        this.snackbarSeverity = 'info';
        this.setState({ snackbarOpen: true });
      } else {
        // Add the profile object to the list of applicants
        applicants.push(applicantProfile);
        this.setState({ applicants });
        if (this.state.applicants.some(applicant => applicant.AD_Username === username)) {
          this.snackbarText =
            String(applicantProfile.fullName) + ' was successfully added to the list.';
          this.snackbarSeverity = 'success';
          this.setState({ snackbarOpen: true });
        }
      }
    } catch (error) {
      this.snackbarText = 'Something went wrong while trying to add this person. Please try again.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true });
    }
  }

  /**
   * Callback for changing the primary applicant
   * @param {String} profile The StudentProfileInfo object for the person who is to be made the primary applicant
   */
  handleChangePrimary = profile => {
    this.setState({ updating: true });
    if (profile) {
      if (this.state.applicants.includes(profile)) {
        this.setState({ newPrimaryApplicant: profile, editDialogOpen: true });
      }
    }
  };

  handleChangePrimaryAccepted = () => {
    if (this.state.newPrimaryApplicant) {
      try {
        this.saveApplication(this.state.newPrimaryApplicant.ID, this.state.applicants);
      } catch (error) {
        this.snackbarText = 'This feature is not yet implemented.';
        // this.snackbarText = 'Something went wrong while trying to save the new primary applicant.';
        this.snackbarSeverity = 'error';
        this.setState({ snackbarOpen: true, saving: 'failed' });
      }
      this.handleCloseOkay();
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {String} profileToRemove Username for student
   */
  handleRemove = profileToRemove => {
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
   * Callback for apartment application save button
   */
  handleSaveButtonClick = () => {
    let debugMessage = 'DEBUG: Save button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    // The method is separated from callback because the housing API service must be handled inside an async method
    this.saveApplication(this.state.userProfile.AD_Username, this.state.applicants);
  };

  /**
   * Save the current state of the application to the database
   * @param {String} primaryUsername the student username of the person filling out the application
   * @param {StudentProfileInfo} applicants Array of StudentProfileInfo objects
   */
  async saveApplication(primaryUsername, applicants) {
    this.setState({ saving: true });
    this.saveButtonAlertTimeout = null;
    let result = null;
    try {
      result = await housing.saveApartmentApplication(primaryUsername, applicants);
    } catch {
      result = false;
    }
    if (result) {
      this.setState({ saving: 'success' });
    } else {
      this.snackbarText = 'Something went wrong while trying to save the application.';
      this.snackbarSeverity = 'error';
      this.setState({ snackbarOpen: true, saving: 'failed' });
    }
    if (this.saveButtonAlertTimeout === null) {
      // Shows the success icon for 2 seconds and then returns back to normal button
      this.saveButtonAlertTimeout = setTimeout(() => {
        this.saveButtonAlertTimeout = null;
        this.setState({ saving: false });
      }, 6000);
    }
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  handleCloseDialog = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.handleCloseOkay();
  };

  handleCloseOkay = () => {
    this.setState({ submitDialogOpen: false, editDialogOpen: false });
  };

  render() {
    if (this.props.Authentication) {
      /**
       * Used to re-render the page when the network connection changes.
       * this.state.network is compared to the message received to prevent
       * multiple re-renders that creates extreme performance lost.
       * The origin of the message is checked to prevent cross-site scripting attacks
       */
      window.addEventListener('message', event => {
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

      /**
       * Gets status of current network connection for online/offline rendering
       * Defaults to online in case of PWA not being possible
       */
      const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

      if (networkStatus === 'online' && this.state.isStu && this.props.Authentication) {
        return (
          <div>
            {this.state.loading ? (
              <GordonLoader />
            ) : (
              <div className="apartment-application">
                <Grid container direction="row-reverse" justify="center" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card>
                      <CardHeader
                        title="Apartment Application Instructions"
                        className="card-header"
                      />
                      <CardContent>
                        <Typography variant="body1">Placeholder Text</Typography>
                        <Typography variant="body1">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis
                          tenetur unde suscipit, quam beatae rerum inventore consectetur, neque
                          doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                          quasi quidem quibusdam.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                    <Grid item>
                      <ApplicantList
                        maxNumApplicants={MAX_NUM_APPLICANTS}
                        applicants={this.state.applicants}
                        userProfile={this.state.userProfile}
                        saving={this.state.saving}
                        onSearchSubmit={this.handleSearchSubmit}
                        onChangePrimary={this.handleChangePrimary}
                        onApplicantRemove={this.handleRemove}
                        onSaveButtonClick={this.handleSaveButtonClick}
                        Authentication={this.props.Authentication}
                      />
                      <Dialog
                        open={this.state.editDialogOpen}
                        onClose={this.handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                      >
                        <DialogTitle id="alert-dialog-title">
                          <Alert variant="filled" severity="warning">
                            <AlertTitle>
                              <strong>Change primary applicant?</strong>
                            </AlertTitle>
                          </Alert>
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            If you change the primary applicant, you will no longer be able to edit
                            this application yourself.
                            <br />
                            Are you sure you want to change the primary applicant?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            variant="contained"
                            onClick={this.handleCloseOkay}
                            color="primary"
                            autofocus
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={this.handleChangePrimaryAccepted}
                            color="primary"
                          >
                            Accept
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <SimpleSnackbar
                        text={this.snackbarText}
                        severity={this.snackbarSeverity}
                        open={this.state.snackbarOpen}
                        onClose={this.handleCloseSnackbar}
                      />
                    </Grid>
                    <Grid item>
                      <Card>
                        <CardHeader title="Preferred Halls" className="card-header" />
                        <CardContent>
                          <Typography variant="body1">Placeholder text</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Card>
                        <CardContent>
                          <Typography variant="h5">Hello World:</Typography>

                          <h3>{'You name: ' + this.state.userProfile.fullName}</h3>
                          <h3>{'On/Off Campus: ' + this.state.onOffCampus}</h3>
                          <h3>{'Your room number: ' + this.state.onCampusRoom}</h3>
                          <br />
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
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
