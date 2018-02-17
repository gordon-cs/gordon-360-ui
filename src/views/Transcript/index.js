import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Activities from './Components/ActivityList';
import GordonLoader from './../../components/Loader';
import './transcript.css';

export default class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  render(props) {
    let activityList;
    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(activity => (
        <Activities Activity={activity} key={activity.MembershipID} />
      ));
    }

    const styles = theme => ({
      root: {
        flexGrow: 1,
        padding: 30,
      },
      card: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    });

    return (
      <div>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card classname={styles.root}>
              <Button variant="raised" color="primary" fullWidth="true">
                Download Transcript
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card classnames={styles.card}> Experience Transcript</Card>
          </Grid>
          <Grid item xs={12}>
            <Card classnames={styles.card}>Spring 17-18 Academic Year</Card>
          </Grid>
          <Grid item xs={12}>
            <Card classnames={styles.card}>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Activity" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Sample Club" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Sample Club 2" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Sample Club 3" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={4}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Membership Type" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Member" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Leader" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Member" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={4}>
                  <List>
                    Activity List:
                    {activityList}
                  </List>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
