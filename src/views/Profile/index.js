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
  async checkPersonType(param) {
    try {
      const profile = await user.getProfileInfo();
      let type = profile.PersonType;
      this.setState({ loading: true });
      return type.includes(param);
    } catch (error) {
      console.log(error);
    }
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
    let Department;
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
            <Grid container justify="center">
              <Grid item xs={3} sm={6} md={3} lg={6}>
                <Typography>Phone:</Typography>
              </Grid>
              <Grid item xs={9} sm={5} md={9} lg={6} justify="right">
                <Typography>{this.state.profile.MobilePhone}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={2} sm={6} md={3} lg={6}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={10} sm={5} md={9} lg={6} justify="right">
                <Typography>{this.state.profile.Email}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={6} sm={6} md={3} lg={6}>
                <Typography>On/Off Campus:</Typography>
              </Grid>
              <Grid item xs={6} sm={5} md={9} lg={6} justify="right">
                <Typography>{this.state.profile.OnOffCampus}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={3} sm={6} md={3} lg={6}>
                <Typography>Home:</Typography>
              </Grid>
              <Grid item xs={9} sm={5} md={9} lg={6} justify="right">
                <Typography>{address}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </List>
      );
    } else {
      if (this.state.profile.HomePhone !== '') {
        phone = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Phone:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <Typography>{this.state.profile.HomePhone}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
      if (this.state.profile.OnCampusPhone !== '') {
        OfficePhone = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Office Phone:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <Typography> {this.state.profile.OnCampusPhone}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider />
          </div>
        );
      }
      if (this.state.profile.office_hours !== '') {
        OfficHours = (
          <div>
            <ListItem>
              <Grid container justify="center">
                <Grid item xs={3} sm={6} md={3} lg={6}>
                  <Typography>Office Hours:</Typography>
                </Grid>
                <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                  <Typography> {this.state.profile.office_hours}</Typography>
                </Grid>
              </Grid>
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
                  <Grid container justify="center">
                    <Grid item xs={3} sm={6} md={3} lg={6}>
                      <Typography>Room:</Typography>
                    </Grid>
                    <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                      <Typography>
                        {' '}
                        {this.state.profile.BuildingDescription}, {this.state.profile.OnCampusRoom}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                {OfficePhone}
                {OfficHours}
              </List>
            </CardContent>
          </Card>
        </Grid>
      );

      Department = (
        <div>
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={5} sm={6} md={3} lg={6}>
                <Typography>Department:</Typography>
              </Grid>
              <Grid item xs={7} sm={6} md={9} lg={6} justify="right">
                <Typography>{this.state.profile.OnCampusDepartment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
        </div>
      );

      personalInfo = (
        <List>
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={2} sm={6} md={3} lg={6}>
                <Typography>Email:</Typography>
              </Grid>
              <Grid item xs={10} sm={6} md={9} lg={6} justify="right">
                <Typography>{this.state.profile.Email}</Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider />
          {phone}
          <ListItem>
            <Grid container justify="center">
              <Grid item xs={3} sm={6} md={3} lg={6}>
                <Typography>Home:</Typography>
              </Grid>
              <Grid item xs={9} sm={6} md={9} lg={6} justify="right">
                <Typography>{address}</Typography>
              </Grid>
            </Grid>
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
                          subheader={
                            '(' +
                              this.state.profile.NickName +
                              ') ' +
                              (this.state.profile.PersonType === 'stu') && this.state.profile.Class
                          }
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
                    {Department}
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
