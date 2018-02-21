import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { gordonColors } from '../../theme';
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

    const button = {
      background: gordonColors.primary.cyan, //'#014983',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fullWidth: true,
    };

    const divStyle = {
      padding: '20px',
    };

    return (
      <div>
        <Grid
          className="transcript"
          alignItems="center"
          justify="center"
          xs={12}
          sm={12}
          md={8}
          lg={8}
        >
          <Paper elevation="10">
            <CardContent>
              <Grid item xs={12}>
                <Button raised style={button} justify="center">
                  Download Transcript
                </Button>
              </Grid>
              <Grid item xs={12} margin="normal">
                <div style={divStyle}> Experience Transcript </div>
              </Grid>
              <Grid item xs={12}>
                <div> Spring 17-18 Academic Year </div>
              </Grid>
              <Grid item xs={12}>
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
                    <List>Activities: {activityList}</List>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
        </Grid>
      </div>
    );
  }
}
