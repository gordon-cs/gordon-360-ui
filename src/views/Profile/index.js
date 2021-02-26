import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import user from './../../services/user';
import ProfileList from './../../components/ProfileList';
import Office from './../../components/OfficeList';
import MembershipsList from '../../components/MembershipsList';
import Button from '@material-ui/core/Button';
import GordonLoader from './../../components/Loader';
import { socialMediaInfo } from '../../socialMedia';
import GordonSchedulePanel from '../../components/SchedulePanel';
import { Identification } from '../../components/Identification/index';
import storage from '../../services/storage';
import { Redirect } from 'react-router';

import './profile.css';
import '../../app.css';

//Public profile view
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isStu: Boolean,
      isFac: Boolean,
      isAlu: Boolean,
      hasNickName: Boolean,
      nickname: String,
      subheaderInfo: String,
      profileinfo: null,
      officeinfo: null,
      prefImage: null,
      defImage: null,
      preview: null,
      loading: true,
      profile: {},
      files: [],
      photoDialogOpen: false,
      socialLinksDialogOpen: false,
      facebookLink: '',
      linkedInLink: '',
      twitterLink: '',
      instagramLink: '',
      handshakeLink: '',
      network: 'online',
      currentUser: '',
    };
  }

  componentDidMount() {
    if (this.props.authentication) {
      this.loadProfile(this.props);
    }

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

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });
  }

  componentWillUnmount() {}

  componentWillReceiveProps(newProps) {
    if (
      this.props.authentication &&
      this.props.match.params.username !== newProps.match.params.username
    ) {
      this.loadProfile(newProps);
    }
  }

  async loadProfile(searchedUser) {
    this.setState({ loading: true });
    this.setState({ username: searchedUser.match.params.username });
    try {
      const profile = await user.getProfileInfo(searchedUser.match.params.username);
      const curUser = await user.getProfileInfo();
      let profileinfo = (
        <ProfileList profile={profile} myProf={false}>
          {' '}
        </ProfileList>
      );
      let officeinfo = <Office profile={profile} />;
      this.setState({ currentUser: curUser });
      this.setState({ profileinfo: profileinfo });
      this.setState({ officeinfo: officeinfo });
      this.checkPersonType(profile);
      this.setState({ profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(searchedUser.match.params.username),
      ]);
      const prefImage = preferredImage;
      const defImage = defaultImage;
      this.hasNickName(profile);
      this.setSubheader(profile);
      this.setState({ prefImage, defImage, loading: false });
    } catch (error) {
      this.setState({ error });
      console.log(error);
    }
    // Set state of social media links to database values after load.
    // If not empty or null, add domain name back in for buttons.
    this.setState({
      facebookLink:
        this.state.profile.Facebook === null || this.state.profile.Facebook === ''
          ? ''
          : socialMediaInfo.facebook.prefix + this.state.profile.Facebook,
      twitterLink:
        this.state.profile.Twitter === null || this.state.profile.Twitter === ''
          ? ''
          : socialMediaInfo.twitter.prefix + this.state.profile.Twitter,
      linkedInLink:
        this.state.profile.LinkedIn === null || this.state.profile.LinkedIn === ''
          ? ''
          : socialMediaInfo.linkedIn.prefix + this.state.profile.LinkedIn,
      instagramLink:
        this.state.profile.Instagram === null || this.state.profile.Instagram === ''
          ? ''
          : socialMediaInfo.instagram.prefix + this.state.profile.Instagram,
      handshakeLink:
        this.state.profile.Handshake === null || this.state.profile.Handshake === ''
          ? ''
          : socialMediaInfo.handshake.prefix + this.state.profile.Handshake,
    });
  }
  checkPersonType(profile) {
    let personType = String(profile.PersonType);
    this.setState({ isStu: personType.includes('stu') });
    this.setState({ isFac: personType.includes('fac') });
    this.setState({ isAlu: personType.includes('alu') });
  }

  hasNickName(profile) {
    let Name = String(profile.fullName);
    let FirstName = Name.split(' ')[0];
    this.setState({ hasNickName: FirstName !== profile.NickName && profile.NickName !== '' });
  }

  setSubheader(profile) {
    let subheaderText = '';
    let numberOfSubtitles = 0;
    if (this.state.isFac && profile.JobTitle !== undefined) {
      subheaderText += profile.JobTitle;
      numberOfSubtitles++;
    }
    if (this.state.isStu) {
      numberOfSubtitles++;
      if (numberOfSubtitles > 1) {
        subheaderText += ', ';
      }
      subheaderText += profile.Class;
    }
    if (this.state.isAlu) {
      numberOfSubtitles++;
      if (numberOfSubtitles > 1) {
        subheaderText += ', ';
      }
      subheaderText += 'Class of ' + profile.PreferredClassYear;
    }
    this.setState({ subheaderInfo: subheaderText });
  }

  render() {
    if (this.props.authentication) {
      if (this.state.error && this.state.error.name === 'NotFoundError') {
        return <Redirect to="/profilenotfound" />;
      }
      // Creates the Public Profile page depending on the status of the network
      let PublicProfile;
      if (this.state.network === 'online') {
        PublicProfile = (
          <div>
            {this.state.loading && <GordonLoader />}
            {!this.state.loading && (
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} lg={10}>
                  <Identification
                    profile={this.state.profile}
                    network={this.state.network}
                    myProf={false}
                  />
                </Grid>

                <Grid item xs={12} lg={10} align="center">
                  <Grid container xs={12} lg={12} spacing={0} justify="center">
                    <Grid item xs={12} lg={12}>
                      <GordonSchedulePanel
                        profile={this.state.profile}
                        myProf={false}
                        network={this.state.network}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container spacing={2}>
                    {this.state.officeinfo}
                    {this.state.profileinfo}
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <MembershipsList username={this.state.profile.AD_Username} myProf={false} />
                </Grid>
              </Grid>
            )}
          </div>
        );
      } else {
        PublicProfile = (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
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
                  <br />
                  <h1>Please Re-establish Connection</h1>
                  <h4>Viewing a public profile has been deactivated due to loss of network.</h4>
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

      return PublicProfile;
    } else {
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
                <h4>You must be logged in to view this profile.</h4>
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
