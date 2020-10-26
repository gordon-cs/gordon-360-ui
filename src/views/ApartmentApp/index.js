//Main apartment application page
import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardContent, Button, TextField } from '@material-ui/core/';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
// import { gordonColors } from '../../theme';
import GordonLoader from '../../components/Loader';
import ApartmentPeopleSearch from '../../components/ApartmentApp/ApartmentPeopleSearch';
import ApplicantListFields from '../../components/ApartmentApp/ApplicantList';
import user from '../../services/user';
import housing from '../../services/housing';
import './apartmentApp.css';

export default class ApartApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStu: Boolean,
      isFac: Boolean,
      isAlu: Boolean,
      loading: true,
      network: 'online',
      profile: {},
      applicantList: [],
      numberOfApplicants: 0,
      searchResult: '',
      // TODO - For end-to-end Hello World debug. Remove the next 2 lines before merge
      onCampusRoom: null,
      onOffCampus: null,
    };
  }

  onSearchSubmit = (searchSelection) => {
    this.setState({ searchResult: searchSelection });

    console.log('Received username: ' + searchSelection);
    console.log(this.state.searchResult);

    if (this.state.searchResult === null) {
      alert('An error occur with the search bar');
    } else {
      let applicantList = this.state.applicantList;
      applicantList.push(this.state.searchResult);
      this.setState({ applicantList });
      let numberOfApplicants = this.state.numberOfApplicants + 1;
      this.setState({ numberOfApplicants });
    }
  };

  /**
   * Loads the user's profile info only once (at start)
   */
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ profile });
      this.checkPersonType(profile);
      if (this.state.isStu) {
        let applicantList = this.state.applicantList;
        applicantList.push(String(profile.AD_Username));
        this.setState({ applicantList });
        let numberOfApplicants = this.state.numberOfApplicants + 1;
        this.setState({ numberOfApplicants });
      }
      this.setState({ loading: false });
    } catch (error) {
      // Do Nothing
    }
    for (let applicant of this.state.applicantList) {
      console.log(applicant);
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
      let housingInfo = await housing.getHousingInfo();
      let onOffCampus = String(housingInfo[0].OnOffCampus);
      this.setState({ onOffCampus });
      let onCampusRoom = String(housingInfo[0].OnCampusRoom);
      this.setState({ onCampusRoom });
      this.setState({ loading: false });
    } catch (error) {
      // Do Nothing
    }
  }

  componentWillMount() {
    this.loadProfile();
    this.loadHousingInfo();
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
          <div className="apartment-application">
            {this.state.loading && <GordonLoader />}
            {!this.state.loading && (
              <div className="apartment-application-card">
                <Card>
                  <CardContent
                    style={{
                      margin: 'auto',
                      textAlign: 'center',
                    }}
                  >
                    <h1>Hello World</h1>
                    <br />
                    <h3>{'You name: ' + this.state.profile.fullName}</h3>
                    <br />
                    <h3>{'On/Off Campus: ' + this.state.onOffCampus}</h3>
                    <br />
                    <h3>{'Your room number: ' + this.state.onCampusRoom}</h3>
                    <br />
                    <span className="apartment-people-search">
                      <TextField
                        value={this.state.profile.fullName}
                        label="Primary Applicant (Your Name)"
                        variant="outlined"
                        className={'text-field'}
                        InputProps={{
                          classes: {
                            root: 'people-search-root',
                            input: 'people-search-input',
                          },
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </span>
                    <br />
                    <br />
                    <ApplicantListFields applicantList={this.state.applicantList} />
                    <br />
                    <br />
                    <ApartmentPeopleSearch
                      onSearchSelect={this.onSearchSubmit}
                      Authentication={this.props.Authentication}
                    />
                  </CardContent>
                </Card>
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
