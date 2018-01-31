import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider/Divider';
import Card, { CardMedia, CardContent, CardHeader } from 'material-ui/Card';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { gordonColors } from './../../theme';
import activity from '../../services/activity';
import user from './../../services/user';
import GordonLoader from './../../components/Loader';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      loading: true,
      profile: {},
      activities: {},
      memberships: {},
    };
  }
  componentWillMount() {
    this.loadProfile();
  }
  async getActivities(activities) {
    let memberships = [];
    for (let i = 0; i < activities.length; i++) {
      let membership = await activity.getSpecificActivity(activities[i].ActivityCode);
      memberships[i] = membership;
    }
    this.setState({ memberships });
  }
  async loadProfile() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ loading: false, profile });
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(),
      ]);

      const image = preferredImage || defaultImage;
      this.setState({ image });

      const activities = await user.getMemberships(profile.ID);
      this.setState({ activities });

      this.getActivities(this.state.activities);
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    console.log(this.state.memberships);
    console.log(this.state.activities[2]);

    const style = {
      width: '100%',
    };

    // const content = this.state.activities.map(currEvent => (
    //   <EventItem event={currEvent} key={currEvent.Event_ID} />
    // ));

    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={10} md={6} lg={4}>
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
          <Grid item xs={12} sm={4} md={6}>
            <Card>
              <CardContent>
                <CardHeader title="Home Address" />
                <List>
                  <ListItem>
                    <Typography>
                      Home Town: {this.state.profile.HomeCity}, {this.state.profile.HomeState}
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography>Street Number: {this.state.profile.HomeStreet2}</Typography>
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <CardHeader title="Personal Information" />
                <List>
                  <ListItem>
                    <Typography>Major: {this.state.profile.Major1Description}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography>Cell Phone: {this.state.profile.MobilePhone}</Typography>
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
                    <Typography>On/Off Campus: {this.state.profile.Email}</Typography>
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Card>
              <CardContent>
                <CardHeader title="Activities" />
                <List>
                  <ListItem>
                    <Typography>{this.state.memberships.ActivityDescription}</Typography>
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
