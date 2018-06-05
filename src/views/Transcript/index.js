import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider/Divider';
import Typography from 'material-ui/Typography';

import { gordonColors } from '../../theme';
import session from '../../services/session';
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
      currentSession: {},
      allSession: [],
      profile: {},
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
      const allSession = await session.getAll();
      console.log('all sessions: ' + allSession);

      const currentSession = await session.getCurrent();

      const profile = await user.getProfileInfo();
      const activities = await user.getTranscriptInfo(profile.ID);
      this.setState({ loading: false, activities, currentSession, profile });
      console.log('loadTranscript: ' + activities);
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  render() {
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
      <Grid container className="transcript" alignItems="center" justify="center">
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Card elevation="10">
            <CardContent>
              <Grid item xs={12} class="print-only">
                <img src={require('./logo.png')} />
              </Grid>
              <Grid item xs={12}>
                <Button raised style={button} justify="center" onClick={this.handleDownload}>
                  Download Transcript
                </Button>
              </Grid>
              <Grid item xs={12} margin="normal">
                <div style={divStyle}>
                  <Typography type="headline">
                    <b> Experience Transcript - {this.state.profile.fullName} </b>
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} class="print">
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    {activityList}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
