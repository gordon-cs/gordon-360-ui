import React, { Component } from 'react';
import {
  Grid,
  Card,
  // CardHeader,
  CardContent,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogContentText,
  // DialogTitle,
  Button,
  // Typography,
} from '@material-ui/core/';
import GordonLoader from '../../components/Loader';
import StudentApplication from './components/StudentApplication';
import StaffMenu from './components/StaffMenu';
import user from '../../services/user';
// import housing from '../../services/housing';
import './apartmentApp.scss';

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
      userProfile: {},
    };
    this.snackbarText = '';
    this.snackbarSeverity = '';
    this.saveButtonAlertTimeout = null;
  }

  componentDidMount() {
    this.loadProfile();
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
      this.setState({ isFac: String(profile.PersonType).includes('fac') });
      this.setState({ isAlu: String(profile.PersonType).includes('alu') });
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

  render() {
    if (this.props.Authentication) {
      /* Used to re-render the page when the network connection changes.
       *  this.state.network is compared to the message received to prevent
       *  multiple re-renders that creates extreme performance lost.
       *  The origin of the message is checked to prevent cross-site scripting attacks
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

      /* Gets status of current network connection for online/offline rendering
       *  Defaults to online in case of PWA not being possible
       */
      const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

      if (networkStatus === 'online' && this.state.isStu && this.props.Authentication) {
        return (
          <div>
            {this.state.loading ? (
              <GordonLoader />
            ) : (
              <div className="student-apartment-application">
                <StudentApplication Authentication={this.props.Authentication} />
              </div>
            )}
          </div>
        );
      } else if (networkStatus === 'online' && !this.state.isStu && this.props.Authentication) {
        return (
          <div>
            {this.state.loading ? (
              <GordonLoader />
            ) : (
              <div className="staff-apartment-application">
                <StaffMenu Authentication={this.props.Authentication} />
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
