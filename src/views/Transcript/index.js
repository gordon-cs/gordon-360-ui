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
import user from './../../services/user';
import GordonLoader from './../../components/Loader';
import './transcript.css';

export default class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loading: true,
    };
  }

  handleDownload() {
    window.print();
  }

  componentWillMount() {
    this.loadTranscript();
  }
  async loadTranscript() {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      const activities = await user.getMemberships(profile.ID);
      this.setState({ loading: false, activities });
      console.log('loadTranscript: ' + activities);
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  render(props) {
    let activityList;
    console.log('Transcript: ' + this.state.activities);
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
                <Button raised style={button} justify="center" onClick={this.handleDownload}>
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
                    <div style={divStyle}> Activity </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={divStyle}> Participation </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div style={divStyle}> Total Semesters </div>
                  </Grid>
                  <Grid item xs={12}>
                    {activityList}
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
