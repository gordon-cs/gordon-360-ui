import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
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
      profile: {},
    };
    this.tempSessionVal = '';
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

  //Compares each activity from TranscriptInfo to determine how to group by session
  sessionComparitor = activity => {
    let isUniqueSession = true;

    if (activity.SessionDescription === this.tempSessionVal) {
      isUniqueSession = false;
    } else isUniqueSession = true;
    this.tempSessionVal = activity.SessionDescription;
    return <Activities isUnique={isUniqueSession} Activity={activity} />;
  };

  render() {
    let activityList;

    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.state.activities.map(this.sessionComparitor);
    }

    const button = {
      background: gordonColors.primary.cyan, //'#014983',
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
