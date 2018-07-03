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
import GordonLoader from './../../components/Loader';
import { socialMediaInfo } from '../../socialMedia';
import './index.css';

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
      image: null,
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
    };
  }

  componentWillMount() {
    this.loadProfile(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.username !== newProps.match.params.username) {
      this.loadProfile(newProps);
    }
  }

  async loadProfile(searchedUser) {
    this.setState({ loading: true });
    this.setState({ username: searchedUser.match.params.username });
    try {
      const profile = await user.getProfileInfo(searchedUser.match.params.username);
      let profileinfo = (
        <ProfileList profile={profile} myProf={false}>
          {' '}
        </ProfileList>
      );
      let officeinfo = <Office profile={profile} />;
      this.setState({ profileinfo: profileinfo });
      this.setState({ officeinfo: officeinfo });
      this.checkPersonType(profile);
      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(searchedUser.match.params.username),
      ]);
      const memberships = await user.getPublicMemberships(searchedUser.match.params.username);
      const image = preferredImage || defaultImage;
      this.hasNickName(profile);
      this.setSubheader(profile);
      this.setState({ image, loading: false, memberships });
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
    this.setState({ hasNickName: FirstName !== profile.NickName });
  }

  setSubheader(profile) {
    let subheaderText = '';
    if (this.state.isFac && profile.JobTitle !== undefined) {
      subheaderText += profile.JobTitle;
    }
    if (this.state.isStu) {
      subheaderText += profile.Class;
    }
    if (this.state.isAlu) {
      subheaderText += 'Class of ' + profile.ClassYear;
    }
    this.setState({ subheaderInfo: subheaderText });
  }

  render() {
    const style = {
      maxWidth: '100%',
    };
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
          <Typography align="center" variant="body2">
            No Involvements to display.
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
    if (this.state.facebookLink !== '') {
      facebookButton = (
        <Grid item>
          <a href={this.state.facebookLink} className="icon" target="_blank">
            {socialMediaInfo.facebook.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.twitterLink !== '') {
      twitterButton = (
        <Grid item>
          <a href={this.state.twitterLink} className="icon" target="_blank">
            {socialMediaInfo.twitter.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.linkedInLink !== '') {
      linkedInButton = (
        <Grid item>
          <a href={this.state.linkedInLink} className="icon" target="_blank">
            {socialMediaInfo.linkedIn.icon}
          </a>
        </Grid>
      );
    }
    if (this.state.instagramLink !== '') {
      instagramButton = (
        <Grid item>
          <a href={this.state.instagramLink} className="icon" target="_blank">
            {socialMediaInfo.instagram.icon}
          </a>
        </Grid>
      );
    }

    return (
      <div>
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} lg={10}>
            <Card>
              <CardContent>
                <Grid container alignItems="center" align="center" justify="center" spacing="16">
                  {/* <Grid item xs={12} sm={6} md={6} lg={4}> */}
                  <Grid item xs={6} sm={6} md={6} lg={4}>
                    <img src={`data:image/jpg;base64,${this.state.image}`} alt="" style={style} />
                  </Grid>
                  <CardHeader
                    title={
                      this.state.hasNickName
                        ? this.state.profile.fullName + ' (' + this.state.profile.NickName + ')'
                        : this.state.profile.fullName
                    }
                    subheader={this.state.subheaderInfo}
                  />
                  <Grid container spacing="16" align="center" justify="center">
                    {facebookButton}
                    {twitterButton}
                    {linkedInButton}
                    {instagramButton}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={10}>
            <Grid container spacing="16">
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card>
                  <CardContent>
                    <CardHeader title="Personal Information" />
                    <List>{this.state.profileinfo}</List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                {this.state.officeinfo}

                <Card>
                  <CardContent>
                    <CardHeader title="Involvements" />
                    <List>{displayedMembershipList}</List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
