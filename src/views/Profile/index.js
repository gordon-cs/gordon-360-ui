import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import user from './../../services/user';
import Majors from './../../components/MajorList';
import Minors from './../../components/MinorList';
import Activities from './../../components/ActivityList';
import GordonLoader from './../../components/Loader';
import { socialMediaInfo } from '../../socialMedia';

//Public profile view
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      button: String,
      image: null,
      preview: null,
      loading: true,
      profile: {},
      activities: [],
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
  async loadProfile(searchedUser) {
    this.setState({ loading: true });
    this.setState({ username: searchedUser.match.params.username });
    try {
      const profile = await user.getProfileInfo(searchedUser.match.params.username);

      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(searchedUser.match.params.username),
      ]);
      const activities = await user.getPublicMemberships(searchedUser.match.params.username);
      const image = preferredImage || defaultImage;
      this.setState({ image, loading: false, activities });
    } catch (error) {
      this.setState({ error });
      console.log('error');
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

  render() {
    const style = {
      width: '100%',
    };
    let activityList;
    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(activity => (
        <Activities Activity={activity} key={activity.MembershipID} />
      ));
    }

    let address;
    if (
      this.state.profile.Country === 'United States Of America' ||
      this.state.profile.Country === ''
    ) {
      address = `${this.state.profile.HomeCity} ${this.state.profile.HomeState}`;
    } else {
      address = `${this.state.profile.Country}`;
    }
    let personalInfo;
    let office;
    let phone;
    let OfficePhone;
    let OfficHours;
    let minors;
    if (this.state.profile.PersonType === 'stu') {
      if (this.state.profile.Minors.length !== 0) {
        minors = <Minors minors={this.state.profile.Minors} />;
      }
      personalInfo = (
        <List>
          <Majors majors={this.state.profile.Majors} />
          {minors}
          <ListItem>
            <Typography>Class: {this.state.profile.Class}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Cell Phone: {this.state.profile.MobilePhone}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Email: {this.state.profile.Email}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>On/Off Campus: {this.state.profile.OnOffCampus}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Home: {address}</Typography>
          </ListItem>
          <Divider />
        </List>
      );
    } else {
      if (this.state.profile.HomePhone !== '') {
        phone = (
          <div>
            <ListItem>
              <Typography>Phone: {this.state.profile.HomePhone}</Typography>
            </ListItem>
            <Divider />
          </div>
        );
      }
      if (this.state.profile.OnCampusPhone !== '') {
        OfficePhone = (
          <div>
            <ListItem>
              <Typography>Office Phone: {this.state.profile.OnCampusPhone}</Typography>
            </ListItem>
            <Divider />
          </div>
        );
      }
      if (this.state.profile.office_hours !== '') {
        OfficHours = (
          <div>
            <ListItem>
              <Typography>Office Hours: {this.state.profile.office_hours}</Typography>
            </ListItem>
            <Divider />
          </div>
        );
      }
      office = (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardHeader title="Office Information" />
              <List>
                <ListItem>
                  <Typography>
                    Room: {this.state.profile.BuildingDescription},{' '}
                    {this.state.profile.OnCampusRoom}
                  </Typography>
                </ListItem>
                <Divider />
                {OfficePhone}
                {OfficHours}
              </List>
            </CardContent>
          </Card>
        </Grid>
      );
      personalInfo = (
        <List>
          <ListItem>
            <Typography>Department: {this.state.profile.OnCampusDepartment}</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Email: {this.state.profile.Email}</Typography>
          </ListItem>
          <Divider />
          {phone}
          <ListItem>
            <Typography>Home: {address}</Typography>
          </ListItem>
          <Divider />
        </List>
      );
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
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Grid container justify="center">
                      <Grid item xs={6} sm={6} md={6} lg={8}>
                        <CardHeader
                          title={this.state.profile.fullName}
                          subheader={'(' + this.state.profile.NickName + ')'}
                        />
                        <Grid container justify="center">
                          {facebookButton}
                          {twitterButton}
                          {linkedInButton}
                          {instagramButton}
                        </Grid>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={4}>
                        <img
                          src={`data:image/jpg;base64,${this.state.image}`}
                          alt=""
                          style={style}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <CardHeader title="Personal Information" />
                    {personalInfo}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Grid container>
              {office}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <CardHeader title="Activities" />
                    <List>{activityList}</List>
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
