import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import { gordonColors } from '../../theme';
import session from '../../services/session';
import Activity from './Components/CoCurricularTranscriptActivity';
import user from './../../services/user';
import GordonLoader from './../../components/Loader';
import './coCurricularTranscript.css';

//This component creates the overall interface for the CoCurricularTranscript (card, heading,
//download button), and contains a InvolvementsList object for displaying the content

export default class Transcript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      //employments: [],
      //service: [],
      loading: true,
      profile: {},
    };
    //Variable used by groupActivityBySession to determine when activies in the list are part of a
    //new session necessary in order to remember session info about previous item in list while
    //looping though
    this.prevSessionVal = '';
  }

  handleDownload() {
    window.print(); //look for somethig that sends straight to download
  }

  componentWillMount() {
    this.loadTranscript();
  }

  async loadTranscript() {
    this.setState({ loading: true });
    try {
      /* Retrieve data from server */
      const currentSession = await session.getCurrent();
      const profile = await user.getProfileInfo();
      //const employments = await user.getEmploymentInfo(profile.ID);
      //const service = await user.getServiceInfo(profile.ID);
      const activities = await user.getActivitiesInfo(profile.ID);
      this.setState({ loading: false, activities, /*employments,*/ currentSession, profile });
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  /* Compares activity from activityList to previous activity' session to to determine how to group.
     isUnique value is passed as a prop, along with Activity object, to TranscriptActivity Component
     Returns TranscriptActivity component which should be passed into activityList.
     Call using map function: "this.state.activities.map(this.groupActivityBySession);"
  */
  groupActivityBySession = activity => {
    //bool to keep track of when an activity is part of a new session, passed to TranscriptActivity
    let isUniqueSession = true;

    if (activity.SessionDescription === this.prevSessionVal) {
      isUniqueSession = false;
    } else {
      isUniqueSession = true;
    }
    this.prevSessionVal = activity.SessionDescription;
    return <Activity isUnique={isUniqueSession} Activity={activity} />;
  };

  /* For each activity in an array of activities, this finds all other activities of the same Code
     and keeps an array of all the sessions during which the student was involved in this activity.
     Once all activities of the same activityCode are found, the array of sessions is processed
     and translated into a duration. Then, one Activity component is created with that
     ActivityDescription and the duration.

     Returns: array of Activity components with props Description and Duration.
  */
  groupActivityByCode = activities => {
    let condensedActs = [];

    for (var i = 0; i < activities.length; i++) {
      let sessions = [activities[i].SessionDescription];

      // get the session codes for all activities of the current activity's code
      let j = i;
      while (activities[j + 1].ActivityCode === activities[j].ActivityCode) {
        sessions.push(activities[j + 1].SessionDescription);
        j++;
      }

      // translate the sessions array into a duration
      let duration;

      // add a new Activity component to the array
      condensedActs.push(
        <Activity Description={activities[i].ActivityDescription} Duration={duration} />,
      );
    }
  };

  render() {
    let activityList;

    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      /* Call groupActivityBySession() on activities */
      activityList = this.state.activities.map(this.groupActivityBySession);
      // activityList = groupActivityByCode(this.state.activities);
    }

    /*let employmentsList;

    if (!this.state.employments) {
      employmentsList = <GordonLoader />;
    } else {
      employmentsList = this.state.employments.map(employment => (
        <Grid container>
          <Grid item xs={6}>
            <List>
              <Typography className="text"> {employment} </Typography>
            </List>
          </Grid>
        </Grid>
      ));
    }*/

    const buttonColors = {
      /* not in style sheet so that gordonColors is accessible */
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    return (
      <div className="co-curricular-transcript">
        <Card className="card" elevation="10">
          <CardContent className="card-content">
            <div className="print-only">{/* <img src={require('./logo.png')} alt="" /> */}</div>
            <div>
              <Button
                className="button"
                onClick={this.handleDownload}
                raised
                style={buttonColors}
                variant="contained"
              >
                Print Co-Curricular Transcript
              </Button>
            </div>
            <div>
              <Typography variant="headline">
                <b> Co-Curricular Transcript - </b>
                {this.state.profile.fullName}
              </Typography>
            </div>
            <div className="subtitle">
              <Typography variant="headline">
                <b>Experience</b>
              </Typography>
            </div>
            {/*<div className="involvements" class="print">
              <div className="full-length">{employmentsList}</div>
            </div>*/}
            <div className="subtitle">
              <Typography variant="headline">
                <b>Service Learning</b>
              </Typography>
            </div>
            <div className="subtitle">
              <Typography variant="headline">
                <b>Activities</b>
              </Typography>
            </div>
            <div className="activities">
              <div className="organization-role">A. J. Gordon Scholars Program, Leader</div>
              <div className="date">FA 2015-SP 2017</div>
            </div>
            <div class="print">
              <div className="full-length">{activityList}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
