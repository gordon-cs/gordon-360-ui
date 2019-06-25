import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
      memberships: [],
      leadActivities: [],
      employments: [],
      loading: true,
      profile: {},
      otherInvolvements: false,
      honorsLeadership: false,
      serviceLearning: false,
      experiences: false,
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

      const memberships = await user.getTranscriptMembershipsInfo(profile.ID);
      let otherInvolvements = false;
      if (!(memberships.length === 0)) {
        otherInvolvements = true;
      }

      // Deep copy activities array so that it doesn't get overwritten
      let activitiesCopy = JSON.parse(JSON.stringify(memberships));
      // Filter Activities to only those where user is leader
      let leadActivities = this.filterActivitiesforLeadership(activitiesCopy);
      console.log(leadActivities);
      let honorsLeadership = false;
      if (!(leadActivities.length === 0)) {
        honorsLeadership = true;
      }
      console.log(honorsLeadership);

      // Deep copy activities array so that it doesn't get overwritten
      /*let activitiesCopyTwo = JSON.parse(JSON.stringify(memberships));
      // Filter Activities to only those where user is leader
      let serviceActivities = this.filterActivitiesforService(activitiesCopyTwo);
      let serviceLearning = false;
      if (!(serviceActivities.length === 0)) {
        serviceLearning = true;
      }*/

      const employments = await user.getEmploymentInfo();
      let experiences = false;
      if (!(employments.length === 0)) {
        experiences = true;
      }

      this.setState({
        loading: false,
        memberships,
        employments,
        leadActivities,
        currentSession,
        profile,
        otherInvolvements,
        honorsLeadership,
        /*serviceLearning,*/ experiences,
      });
    } catch (error) {
      this.setState({ error });
      console.log('error');
    }
  }

  /* Helper functions for parsing and translating sessionCode which is of the format "YYYYSE"
     where SE is 09 for fall, 01 for spring, 05 for summer

  /* Returns: string of year in format YYYY */
  sliceYear = sesCode => {
    return sesCode.toString().slice(0, 4);
  };
  /* Returns: string of month (Mon), month being the first month of the given semester */
  sliceStart = sesCode => {
    switch (sesCode.toString().slice(4, 6)) {
      case '09':
        return 'Sep';
      case '01':
        return 'Jan';
      case '05':
        return 'May';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
  };

  /* Returns: string of month (Mon), month being last month of the given semester */
  sliceEnd = sesCode => {
    switch (sesCode.toString().slice(4, 6)) {
      case '09':
        return 'Dec';
      case '01':
        return 'May';
      case '05':
        return 'Sep';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
  };

  /* Param: expects an array of [month in which the earlier session ended,
                                 year in which the ealier session ended,
                                 month in which the later session started (format: Mon),
                                 year in which the later session started (YYYY)]
     Returns: true if given month-year pairs are consecutive, false otherwise. Summers are not
            considered a break consecutiveness because there are no summer activities. */
  checkConsecutiveness = dates => {
    console.log(dates);
    return (
      dates[1] === dates[3] ||
      (parseInt(dates[1], 10) + 1 === parseInt(dates[3], 10) &&
        dates[0] === 'Dec' &&
        dates[2] === 'Jan')
    );
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
      let curAct = activities[0];

      // keep track of the activity code which will be used to identify all activities of the same
      // code so they can be grouped into one activity component
      let curActCode = curAct.ActivityCode;

      // Pop first session code from array and split into months and years, which are saved as
      // the initial start and end dates
      // (shift is like pop, removes and returns the first item in the array)
      let sess = activities.shift().SessionCode;
      let startMon = this.sliceStart(sess);
      let endMon = this.sliceEnd(sess);
      let startYear = this.sliceYear(sess),
        endYear = startYear;

      // For each other activity matching curActCode, if it is consecutive to the current end date,
      // save its end date as the new end date, otherwise, add the current start and end dates to
      // the string 'duration' (because the streak is broken) and prepare to start a new streak.
      // Loop assumes activities will be sorted by session and Activity Code.
      let duration = '';
      while (activities.length > 0 && activities[0].ActivityCode === curActCode) {
        sess = activities.shift().SessionCode;
        let curStartMon = this.sliceStart(sess);
        let curYear = this.sliceYear(sess);
        console.log(curAct.ActivityDescription);
        if (this.checkConsecutiveness([endMon, endYear, curStartMon, curYear])) {
          // a streak of consecutive involvement continues
          endMon = this.sliceEnd(sess);
          endYear = this.sliceYear(sess);
        } else {
          // a streak has been broken; add its start and end to the string and start new streak

          // don't show the year twice if the months are of the same year
          if (startYear === endYear) {
            duration += startMon;
          } else {
            duration += startMon + ' ' + startYear;
          }
          duration += '-' + endMon + ' ' + endYear + ', ';

          startMon = this.sliceStart(sess);
          endMon = this.sliceEnd(sess);
          startYear = endYear = this.sliceYear(sess);
        }
      }

      // Flush the remaining start and end info to duration.
      // Again, don't show the year twice if the months are of the same year
      if (startYear === endYear) {
        duration += startMon;
      } else {
        duration += startMon + ' ' + startYear;
      }
      duration += '-' + endMon + ' ' + endYear;

      // add the new TranscriptItem component to the array
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
      return 'Class of ' + gradDate.split(' ')[3];
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

    if (!this.state.memberships) {
      activityList = <GordonLoader />;
    } else {
      // Deep copy activities array so that it doesn't get overwritten
      var displayedActivities = JSON.parse(JSON.stringify(this.state.memberships));
      // Call groupActivityByCode() on activities
      activityList = this.groupActivityByCode(displayedActivities);
    }

    let leadershipList;

    if (!this.state.leadActivities) {
      leadershipList = <GordonLoader />;
    } else {
      // Call groupActivityByCode() on leadActivities
      leadershipList = this.groupActivityByCode(this.state.leadActivities);
    }

    /*let serviceList;

    if (!serviceActivities) {
      leadershipList = <GordonLoader />;
    } else {
      // Call groupActivityByCode() on serviceActivities
      serviceList = this.groupActivityByCode(serviceActivities);
    }*/

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

    const otherInvolvements = this.state.otherInvolvements;
    const honorsLeadership = this.state.honorsLeadership;
    const serviceLearning = this.state.serviceLearning;
    const experiences = this.state.experiences;

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
            <div>Gordon College Experience Transcript</div>
            <div className="subtitle">
              {' '}
              <b>{this.state.profile.fullName}</b>{' '}
            </div>
            <div className="subtitle">{this.getGradCohort()}</div>
            <div className="subtitle">{this.getMajors(this.state.profile.Majors)}</div>
            <div className="subtitle">{this.getMinors(this.state.profile.Minors)}</div>
            {honorsLeadership && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Honors, Leadership, and Research</b>
                </Typography>
              </div>
            )}
            <div class="print" className="activity-list">
              {leadershipList}
            </div>
            {experiences && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Experience</b>
                </Typography>
              </div>
            )}
            {/*Column Headers, if needed: <div className="column-headers">
              <div className="organization-role">Organization, Role</div>
              <div className="date">Date</div>
            </div>
            <Divider light={true} />*/}
            <div class="print" className="activity-list">
              {employmentsList}
            </div>
            {serviceLearning && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Service Learning</b>
                </Typography>
              </div>
            )}
            {/*<div class="print" className="activity-list">
              {serviceList}
            </div>*/}
            {otherInvolvements && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Activities</b>
                </Typography>
              </div>
            )}
            <div class="print" className="activity-list">
              {activityList}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
