import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//import Typography from '@material-ui/core/Typography';
//import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider'; might need if we choose to have column headers

import { gordonColors } from '../../theme';
import session from '../../services/session';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';
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
      employments: [],
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
      const employments = await user.getEmploymentInfo();
      const activities = await user.getActivitiesInfo(profile.ID);
      this.setState({ loading: false, activities, employments, currentSession, profile });
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  /* Helper functions for parsing and translating sessionCode which is of the format "YYYYSE"
     where SE is 09 for fall, 01 for spring, 05 for summer

  /* Returns year part of session code (first 4 characters) */
  sliceYear = sesCode => {
    return sesCode.toString().slice(0, 4);
  };

  /* Returns semester part of session code (last 2 characters) */
  sliceSem = sesCode => {
    switch (sesCode.toString().slice(4, 6)) {
      case '09':
        return 'FA';
      case '01':
        return 'SP';
      case '05':
        return 'SU';
      default:
        console.log('An unrecognized semester code was provided');
        return 'XX';
    }
  };

  /* Returns: date string of format "SE YYYY" where SE is FA, SP, or SU */
  convertToDate = sesCode => {
    return this.sliceSem(sesCode) + ' ' + this.sliceYear(sesCode);
  };

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

     Param: activities - a list of activity objects ("Memberships" as defined in gordon-360-api)
     Returns: array of Activity components with props Activity and Duration.
  */
  groupActivityByCode = activities => {
    let condensedActs = [];

    // sort activities by ActivityCode
    while (activities.length > 0) {
      // shift removes and returns the first item in the array
      let curAct = activities.shift();
      let sessions = [curAct.SessionCode];

      // Get the session codes for all activities matching the current activity's code,
      // knowing activities will be sorted by session and Activity Code.
      // Continue looking at activities while the activity at array front has the
      // same activityCode as the current activity
      while (activities.length > 0 && activities[0].ActivityCode === curAct.ActivityCode) {
        sessions.push(activities.shift().SessionCode);
      }

      // Translate the sessions array into a duration:

      // Pop first session code from list and add it to a new list; new list will hold only the
      // session codes needed to express the full length of involvement as a range with gaps
      // let neededCodes = [sessions.shift];

      // start duration out as the first session in date form- without a space before it
      let duration = this.convertToDate(sessions.shift());
      // Convert rest of session codes to date format and add (each with a space) to duration string
      // **Compare consecutive session codes to see if there are gaps and
      // add end-of-gap codes to neededCodes **code commented out
      for (let code of sessions) {
        /*let nextCode = sessions.shift;
        let lastCode = neededCodes.slice(-1);

        let nextSem = this.sliceSem(nextCode);
        let nextYear = this.sliceYear(nextCode);
        let lastSem = this.sliceSem(lastCode);
        let lastYear = this.sliceYear(lastCode);
        if ( !(lastSem === 'FA' &&
               lastSem !== nextSem &&
               parseInt(nextYear - parseInt(lastYear) == 1) &&
             !(lastSem === 'SP' &&
               lastSem !== nextSem &&
               lastYear === nextYear)
            ) {}*/

        duration += ' ' + this.convertToDate(code);
      }

      // add a new TranscriptItem component to the array
      condensedActs.push(<Activity Activity={curAct} Duration={duration} />);
    }
    return condensedActs;
  };

  filterActivitiesforLeadership = activities => {
    let leadActivities = [];
    while (activities.length > 0) {
      let curAct = activities.shift();
      if (curAct.ParticipationDescription === 'Leader') {
        leadActivities.push(curAct);
      }
    }
    return leadActivities;
  };

  getGradCohort() {
    let gradDate = this.state.profile.GradDate;
    if (gradDate === undefined || gradDate === '') {
      return null;
    } else {
      return ', Class of ' + gradDate.split(' ')[3];
    }
  }

  getMajors = majors => {
    let majorsString = 'Majors: ';

    //If majors is empty or not loaded, return null majors without iterating to avoid crashing
    if (majors === undefined || majors.length === 0) {
      return null;
    } else {
      for (let major of majors) {
        majorsString += major + ', ';
      }
    }

    return majorsString.substr(0, majorsString.length - 2);
  };

  getMinors = minors => {
    let minorsString = 'Minors: ';

    //If minors is empty or not loaded, return null minors without iterating to avoid crashing
    if (minors === undefined || minors.length === 0) {
      return null;
    } else {
      for (let minor of minors) {
        minorsString += minor + ', ';
      }
    }

    return minorsString.substr(0, minorsString.length - 2);
  };

  render() {
    // this.state.activities contains three of the four categories of activites that the transcript
    // will display. The following lines filter this.state.activities into the different categories.

    let activityList;

    if (!this.state.activities) {
      activityList = <GordonLoader />;
    } else {
      // Deep copy activities array so that it doesn't get overwritten
      var displayedActivities = JSON.parse(JSON.stringify(this.state.activities));
      // Call groupActivityByCode() on activities
      activityList = this.groupActivityByCode(displayedActivities);
    }

    let leadershipList;

    // Deep copy activities array so that it doesn't get overwritten
    let leadActivities = JSON.parse(JSON.stringify(this.state.activities));
    // Filter Activities to only those where user is leader
    leadActivities = this.filterActivitiesforLeadership(leadActivities);

    if (!leadActivities) {
      leadershipList = <GordonLoader />;
    } else {
      // Call groupActivityByCode() on leadActivities
      leadershipList = this.groupActivityByCode(leadActivities);
    }

    /*let serviceList;

    // Deep copy activities array so that it doesn't get overwritten
    let serviceActivities = JSON.parse(JSON.stringify(this.state.activities));
    // Filter Activities to only those where user is leader
    serviceActivities = this.filterActivitiesforService(serviceActivities);

    if (!serviceActivities) {
      leadershipList = <GordonLoader />;
    } else {
      // Call groupActivityByCode() on serviceActivities
      serviceList = this.groupActivityByCode(serviceActivities);
    }*/

    // employments come fom a different place in the database and thus were stored separartely in
    // this.state.employments

    let employmentsList;

    if (!this.state.employments) {
      employmentsList = <GordonLoader />;
    } else {
      employmentsList = this.state.employments.map(employment => (
        <Experience className="text" Experience={employment} /> // may not need className="text"
      ));
    }

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
            <div className="intro">Experience Transcript for:</div>
            <div className="name">
              <b>{this.state.profile.fullName}</b>
            </div>
            <div>{this.getGradCohort()}</div>
            <div className="majors-minors">{this.getMajors(this.state.profile.Majors)}</div>
            <div className="majors-minors">{this.getMinors(this.state.profile.Minors)}</div>
            <div className="subtitle">
              <b>Honors, Leadership, and Research</b>
            </div>
            <div class="print" className="activity-list">
              {leadershipList}
            </div>
            <div className="subtitle">
              <b>Experience</b>
            </div>
            {/*Column Headers, if needed: <div className="column-headers">
              <div className="organization-role">Organization, Role</div>
              <div className="date">Date</div>
            </div>
            <Divider light={true} />*/}
            <div class="print" className="activity-list">
              {employmentsList}
            </div>
            <div className="subtitle">
              <b>Service Learning</b>
            </div>
            {/*<div class="print" className="activity-list">
              {serviceList}
            </div>*/}
            <div className="subtitle">
              <b>Activities</b>
            </div>
            <div class="print" className="activity-list">
              {activityList}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
