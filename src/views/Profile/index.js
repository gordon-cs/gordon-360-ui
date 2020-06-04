import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import user from './../../services/user';
import ProfileList from './../../components/ProfileList';
import Office from './../../components/OfficeList';
import ProfileActivityList from './../../components/ProfileActivityList';
import EmailIcon from '@material-ui/icons/Email';
import Button from '@material-ui/core/Button';
import GordonLoader from './../../components/Loader';
import { socialMediaInfo } from '../../socialMedia';
import GordonSchedulePanel from '../../components/SchedulePanel';

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
      memberships: [],
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

  componentWillMount() {
    if (this.props.Authentication) {
      this.loadProfile(this.props);
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.Authentication &&
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
      const memberships = await user.getPublicMemberships(searchedUser.match.params.username);
      const prefImage = preferredImage;
      const defImage = defaultImage;
      this.hasNickName(profile);
      this.setSubheader(profile);
      this.setState({ prefImage, defImage, loading: false, memberships });
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
    // The list of memberships that will be displayed on the page
    let displayedMembershipList;

    // The list of memberships that the user has made public
    let publicMemberships = [];

    if (!this.state.memberships) {
      displayedMembershipList = <GordonLoader />;
    } else {
      // Populate publicMemberships with the user's public Involvements
      for (let i = 0; i < this.state.memberships.length; i++) {
        if (!this.state.memberships[i].Privacy) {
          publicMemberships.push(this.state.memberships[i]);
        }
      }

      // If the user has no public Involvements, say so on the page
      if (publicMemberships.length === 0) {
        displayedMembershipList = (
          <Typography variant="body2" align="center">
            No Involvements to display
          </Typography>
        );
      } else {
        displayedMembershipList = publicMemberships.map(activity => (
          <ProfileActivityList Activity={activity} key={activity.MembershipID} />
        ));
      }
    }

    let facebookButton;
    let twitterButton;
    let linkedInButton;
    let instagramButton;
    let handshakeButton;
    if (this.state.facebookLink !== '') {
      facebookButton = (
        <Grid item>
          <a
            href={this.state.facebookLink}
            className="gc360-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.facebook.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.twitterLink !== '') {
      twitterButton = (
        <Grid item>
          <a
            href={this.state.twitterLink}
            className="gc360-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.twitter.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.linkedInLink !== '') {
      linkedInButton = (
        <Grid item>
          <a
            href={this.state.linkedInLink}
            className="gc360-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.linkedIn.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.instagramLink !== '') {
      instagramButton = (
        <Grid item>
          <a
            href={this.state.instagramLink}
            className="gc360-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.instagram.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.handshakeLink !== '') {
      handshakeButton = (
        <Grid item>
          <a
            href={this.state.handshakeLink}
            className="gc360-profile_icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            {socialMediaInfo.handshake.icon}
          </a>
        </Grid>
      );
    }

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

    if (this.props.Authentication) {
      // Creates the Public Profile page depending on the status of the network found in local storage
      // If the searched profile is the current user's profile, the page will remain avaiable offline
      let PublicProfile;
      if (
        networkStatus === 'online' ||
        (networkStatus === 'offline' &&
          this.state.profile.AD_Username === this.state.currentUser.AD_Username)
      ) {
        PublicProfile = (
          <div>
            {this.state.loading && <GordonLoader />}
            {!this.state.loading && (
              <Grid container justify="center" spacing={2}>
                <Grid item xs={12} lg={10}>
                  <Card>
                    <CardContent>
                      <Grid
                        container
                        alignItems="center"
                        align="center"
                        justify="center"
                        spacing={2}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={12} md={12} lg={12}>
                            {this.state.prefImage && (
                              <img
                                className="rounded-corners"
                                src={`data:image/jpg;base64,${this.state.prefImage}`}
                                alt=""
                                style={{ 'max-height': '200px', 'min-width': '160px' }}
                              />
                            )}
                            {this.state.prefImage && this.state.defImage && ' '}
                            {this.state.defImage && (
                              <img
                                className="rounded-corners"
                                src={`data:image/jpg;base64,${this.state.defImage}`}
                                alt=""
                                style={{ 'max-height': '200px', 'min-width': '160px' }}
                              />
                            )}
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                          <Grid container align="center" alignItems="center" spacing={2}>
                            <Grid item xs={12}>
                              <CardHeader
                                title={
                                  this.state.hasNickName
                                    ? this.state.profile.fullName +
                                      ' (' +
                                      this.state.profile.NickName +
                                      ')'
                                    : this.state.profile.fullName
                                }
                                subheader={this.state.subheaderInfo}
                              />

                              <Grid container spacing={2} align="center" justify="center">
                                {facebookButton}
                                {twitterButton}
                                {linkedInButton}
                                {instagramButton}
                                {handshakeButton}
                              </Grid>
                              {this.state.profile.Email !== '' && (
                                <a
                                  href={`mailto:${this.state.profile.Email}`}
                                  className="gc360-text-link gc360-profile_email"
                                >
                                  <EmailIcon className="gc360-profile_email_icon" />
                                  <Typography className="gc360-profile_email_text">
                                    {this.state.profile.Email}
                                  </Typography>
                                </a>
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} lg={10} align="center">
                  <Grid container xs={12} lg={12} justify="center">
                    <Grid item xs={12} lg={12}>
                      <GordonSchedulePanel profile={this.state.profile} myProf={false} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                    <Grid container spacing={2}>
                      {this.state.profileinfo}
                      {this.state.officeinfo}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} lg={5}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Card>
                          <CardContent>
                            <Grid container direction="row" alignItems="center">
                              <Grid item xs={7}>
                                <CardHeader title="Involvements" />
                              </Grid>
                              <Grid item xs={5} align="right">
                                
                              </Grid>
                            </Grid>
                            <List>{displayedMembershipList}</List>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
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
                  <h4>People Search has been deactivated due to loss of network.</h4>
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
