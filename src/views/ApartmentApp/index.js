//Main apartment application page
import React, { Component } from 'react';
import 'date-fns';
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
  Slide,
  Button,
  Typography,
} from '@material-ui/core/';
import GordonLoader from '../../components/Loader';
import ApplicantList from '../../components/ApartmentApplicantList';
import user from '../../services/user';
import housing from '../../services/housing';
import './apartmentApp.css';

export default class ApartApp extends Component {
  constructor(props) {
    super(props);
    this.peopleSearch = React.createRef();
    this.state = {
      isStu: Boolean,
      isFac: Boolean,
      isAlu: Boolean,
      loading: true,
      network: 'online',
      submitDialogOpen: false, // Use this for saving app (later feature)
      errorDialogOpen: false,
      errorDialogText: null,
      userProfile: {},
      applicants: [],
      // TODO - For end-to-end Hello World debug. Remove the next 2 lines before merge
      onCampusRoom: null,
      onOffCampus: null,
    };
  }

  /**
   * Callback for apartment people search submission
   * @param {String} searchSelection Username for student
   */
  onSearchSubmit = searchSelection => {
    if (searchSelection && searchSelection !== null) {
      // Method separated from callback because profile must be handled inside an async method
      this.addApplicant(searchSelection);
    }
  };

  async addApplicant(username) {
    let applicants = this.state.applicants; // make a separate copy of the array
    // Get the profile of the selected user
    let applicantProfile = await user.getProfileInfo(username);
    // Check if the selected user is a student
    if (!String(applicantProfile.PersonType).includes('stu')) {
      // Display an error if the selected user is not a student
      let newErrorText = applicantProfile.fullName + ' is not a student';
      this.setState({ errorDialogOpen: true, errorDialogText: newErrorText });
      console.log('Error: ' + newErrorText);
    } else if (applicants.some(applicant => applicant.AD_Username === username)) {
      // Display an error if the selected user is already in the list
      let newErrorText = applicantProfile.fullName + ' is already in the list';
      this.setState({ errorDialogOpen: true, errorDialogText: newErrorText });
      console.log('Error: ' + newErrorText);
    } else {
      // Add the profile object to the list of applicants
      applicants.push(applicantProfile);
      this.setState({ applicants });
    }
  }

  /**
   * Callback for applicant list remove button
   * @param {String} profileToRemove Username for student
   */
  onApplicantRemove = profileToRemove => {
    if (profileToRemove) {
      let applicants = this.state.applicants; // make a separate copy of the array
      let index = applicants.indexOf(profileToRemove);
      if (index !== -1) {
        applicants.splice(index, 1);
        this.setState({ applicants });
      }
    }
  };

  /**
   * Loads the user's profile info only once (at start)
   */
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ userProfile: profile });
      this.checkPersonType(profile);
      if (this.state.isStu) {
        let applicants = this.state.applicants;
        applicants.push(profile);
        this.setState({ applicants });
      }
      this.setState({ loading: false });
    } catch (error) {
      // Do Nothing
    }
  }

  checkPersonType(profile) {
    let personType = String(profile.PersonType);
    this.setState({ isStu: personType.includes('stu') });
    this.setState({ isFac: personType.includes('fac') });
    this.setState({ isAlu: personType.includes('alu') });
  }

  /**
   * Loads the user's saved apartment application, if one exists
   */
  async loadHousingInfo() {
    this.setState({ loading: true });
    try {
      // TODO - Once saving application has been implemented in the backend, this will be replaced with a call to the load the application info. The getHousingInfo was made obsolete after the Hello World
      let housingInfo = await housing.getHousingInfo();
      let onOffCampus = String(housingInfo[0].OnOffCampus);
      let onCampusRoom = String(housingInfo[0].OnCampusRoom);
      this.setState({ onOffCampus, onCampusRoom, loading: false });
    } catch (error) {
      // Do Nothing
    }
  }

  handleCloseOkay = () => {
    this.setState({ submitDialogOpen: false, errorDialogOpen: false, errorDialogText: null });
  };

  componentDidMount() {
    this.loadProfile();
    this.loadHousingInfo();
    // this.checkForSavedApplication();
  }

  render() {
    if (this.props.Authentication) {
      /* Used to re-render the page when the network connection changes.
       *  this.state.network is compared to the message received to prevent
       *  multiple re-renders that creates extreme performance lost.
       *  The origin of the message is checked to prevent cross-site scripting attacks
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

      /* Gets status of current network connection for online/offline rendering
       *  Defaults to online in case of PWA not being possible
       */
      const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

      const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="down" ref={ref} {...props} />;
      });

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
                  <Grid item xs={12} md={8} lg={6}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <Card>
                          <ApplicantList
                            onApplicantRemove={this.onApplicantRemove}
                            applicants={this.state.applicants}
                            userProfile={this.state.userProfile}
                            onSearchSubmit={this.onSearchSubmit}
                            Authentication={this.props.Authentication}
                          />
                          <Dialog
                            open={this.state.errorDialogOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            maxWidth="false"
                          >
                            <DialogTitle id="alert-dialog-title">Add Applicant</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                {this.state.errorDialogText}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={this.handleCloseOkay} color="primary" autoFocus>
                                Okay
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Card>
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
                </Grid>
              </div>
            )}
          </div>
        );
      } else {
        // If the network is offline or the user type is non-student
        if (networkStatus === 'offline' || !this.state.isStu) {
          return (
            <Grid container justify="center" spacing="16">
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    {networkStatus === 'offline' && (
                      <Grid
                        item
                        xs={2}
                        alignItems="center"
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      >
                        <img
                          src={require(`${'../../NoConnection.svg'}`)}
                          alt="Internet Connection Lost"
                        />
                      </Grid>
                    )}
                    <br />
                    <h1>
                      {networkStatus === 'offline'
                        ? 'Please re-establish connection'
                        : 'Apartment application Unavailable'}
                    </h1>
                    <h4>
                      {networkStatus === 'offline'
                        ? 'Apartment application entry has been disabled due to loss of network.'
                        : 'Apartment application is currently available for students only. Support for staff will come soon!'}
                    </h4>
                    <br />
                    <br />
                    <Button
                      color="primary"
                      backgroundColor="white"
                      variant="outlined"
                      onClick={() => {
                        window.location.pathname = '';
                      }}
                    >
                      Back To Home
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        }
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
