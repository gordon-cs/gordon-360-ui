import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import user from './../../services/user';
import { gordonColors } from '../../theme';
import Activities from './Components/ActivityList';
import GordonLoader from './../../components/Loader';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = {
      unsername: String,
      button: String,
      image: null,
      loading: true,
      profile: {},
      activities: [],
    };
  }
  handleExpandClick() {
    this.changePrivacy();
    user.toggleMobilePhonePrivacy();
  }

  changePrivacy() {
    if (this.state.button === 'Make Public') {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
  }

  componentWillMount() {
    const { username } = this.props.match.params.username;
    this.loadProfile();
  }
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);
      const activities = await user.getMemberships(profile.ID);
      const image = preferredImage || defaultImage;
      this.setState({ image, loading: false, activities });
    } catch (error) {
      this.setState({ error });
    }
    if (this.state.profile.IsMobilePhonePrivate === 0) {
      this.setState({ button: 'Make Private' });
    } else {
      this.setState({ button: 'Make Public' });
    }
  }
  render() {
    console.log(this.state.profile);

    const style = {
      width: '100%',
    };
    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    let activityList;
    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(activity => (
        <Activities Activity={activity} key={activity.MembershipID} />
      ));
    }

    let content = (
      <Grid container>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <Card>
            <CardContent>
              <Grid container justify="center">
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <CardHeader
                    title={this.state.profile.fullName}
                    subheader={this.state.profile.Class}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <img src={`data:image/jpg;base64,${this.state.image}`} alt="" style={style} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <Card>
            <CardContent>
              <CardHeader title="Home Address" />
              <List>
                <Divider />
                <ListItem>
                  <Typography>Street Number: {this.state.profile.HomeStreet2}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography>
                    Home Town: {this.state.profile.HomeCity}, {this.state.profile.HomeState}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card>
            <CardContent>
              <CardHeader title="Personal Information" />
              <List>
                <ListItem>
                  <Typography>Major: {this.state.profile.Major1Description}</Typography>
                </ListItem>
                <Divider />
                <ListItem>
                  <Grid item xs={6} sm={7} md={8} lg={10}>
                    <Typography>Cell Phone: {this.state.profile.MobilePhone}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={5} md={4} lg={1}>
                    <Button onClick={this.handleExpandClick} raised style={button}>
                      {this.state.button}
                    </Button>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem>
                  <Typography>Student ID: {this.state.profile.ID}</Typography>
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
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={6} lg={6}>
          <Card>
            <CardContent>
              <CardHeader title="Activities" />
              <List>{activityList}</List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );

    return <div>{content}</div>;
  }
}
