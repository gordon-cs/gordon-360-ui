import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { gordonColors } from '../../theme';
import session from '../../services/session';
import Activity from './Components/TranscriptActivity';
import user from './../../services/user';
import GordonLoader from './../../components/Loader';
import './transcript.css';

//This component creates the overall interface for the transcript (card, heading, download button),
//and contains a ActivityList object for displaying the content

export default class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      loading: true,
      profile: {},
    };
    //Variable used by groupActivityBySession to determine when activies in the list are part of a new session
    //Necessary in order to remember session info about previous item in list while looping though
    this.prevSessionVal = '';
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
      const currentSession = await session.getCurrent();

      const profile = await user.getProfileInfo();
      const activities = await user.getTranscriptInfo(profile.ID);
      this.setState({ loading: false, activities, currentSession, profile });
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  //Compares activity from activityList to previous activity' session to to determine how to group.
  //isUnique value is passed as a prop, along with Activity object, to TranscriptActivity Component
  //Returns TranscriptActivity component which should be passed into activityList
  groupActivityBySession = activity => {
    //bool to keep track of when an zctivity is part of a new session, passed to TranscriptActivity
    let isUniqueSession = true;

    if (activity.SessionDescription === this.prevSessionVal) {
      isUniqueSession = false;
    } else {
      isUniqueSession = true;
    }
    this.prevSessionVal = activity.SessionDescription;
    return <Activity isUnique={isUniqueSession} Activity={activity} />;
  };

  render() {
    let activityList;

    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(this.groupActivityBySession);
    }

    const button = {
      background: gordonColors.primary.cyan,
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fullWidth: true,
    };

    return (
      <Grid container className="transcript" alignItems="center" justify="center">
        <Grid xs={12} sm={12} md={8} lg={6}>
          <Card elevation="10">
            <CardContent>
              <Grid item xs={12} className="print-only">
                <img src={require('./logo.png')} alt="" />
              </Grid>
              <Grid item xs={12}>
                <Button raised style={button} justify="center" onClick={this.handleDownload}>
                  Download Transcript
                </Button>
              </Grid>
              <Grid item xs={12} margin="normal" className="heading">
                <div>
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
