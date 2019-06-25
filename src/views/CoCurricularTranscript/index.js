import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider'; might need if we choose to have column headers

import { gordonColors } from '../../theme';
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
      categorizedMemberships: {},
      loading: true,
      profile: {},
      otherInvolvements: false,
      honorsLeadership: false,
      serviceLearning: false,
      experiences: false,
    };
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
      const profile = await user.getProfileInfo();

      const memberships = await user.getTranscriptMembershipsInfo(profile.ID);
      let categorizedMemberships = this.filterMemberships(memberships);

      let otherInvolvements = false;
      if (!(categorizedMemberships.activities.length === 0)) {
        otherInvolvements = true;
      }

      let honorsLeadership = false;
      if (!(categorizedMemberships.honors.length === 0)) {
        honorsLeadership = true;
      }

      let serviceLearning = false;
      if (!(categorizedMemberships.service.length === 0)) {
        serviceLearning = true;
      }

      categorizedMemberships.experience.employments = await user.getEmploymentInfo();

      let experiences = false;
      if (
        !(
          categorizedMemberships.experience.experiences.length === 0 &&
          categorizedMemberships.experience.employments.length === 0
        )
      ) {
        experiences = true;
      }

      this.setState({
        loading: false,
        categorizedMemberships,
        profile,
        otherInvolvements,
        honorsLeadership,
        serviceLearning,
        experiences,
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
        return 'Aug';
      default:
        console.log('An unrecognized semester code was provided');
        return '';
    }
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

      // Pop first session code from array and split into months and years
      let sess = sessions.shift();
      let startMon = this.sliceStart(sess);
      let endMon = this.sliceEnd(sess);
      let startYear = this.sliceYear(sess),
        endYear = startYear;

      // look through the rest of the array, keeping only the start of the earliest session
      // and the end of the latest session for streaks of consecutive sessions
      let duration = '';
      let prevSess = sess;
      while (sessions > 0) {
        sess = sessions.shift();
        if (false && prevSess) {
          // a streak of consecutive involvement continues
          //change 'false' to definition of consecutive
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
        prevSess = sess;
      }
      // Flush the remaining start and end info to duration.
      // Again, don't show the year twice if the months are of the same year
      if (startYear === endYear) {
        duration += startMon;
      } else {
        duration += startMon + ' ' + startYear;
      }
      duration += '-' + endMon + ' ' + endYear;

      // **Compare consecutive session codes to see if there are gaps and
      // add end-of-gap codes to neededCodes **code commented out, might need some of it
      /*
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
            ) {}
      */

      // add a new TranscriptItem component to the array
      condensedActs.push(<Activity Activity={curAct} Duration={duration} />);
    }
    return condensedActs;
  };

  filterMemberships = memberships => {
    let filtered = {
      honors: [],
      experience: {
        experiences: [],
        employments: [],
      },
      service: [],
      activities: [],
    };

    let honorsTypes = ['LEA', 'SCH', 'SGV'];
    let serviceTypes = ['SLP', 'MIN', 'STU'];
    let experienceTypes = ['RES'];

    while (memberships.length > 0) {
      let membership = memberships.shift();

      // Add Honors and Leadership to the honors list
      if (membership.Participation === 'LEAD' || honorsTypes.includes(membership.ActivityType)) {
        filtered.honors.push(membership);
      }

      // Filter memberships into either Experience, Service, or Activities
      if (experienceTypes.includes(membership.ActivityType)) {
        filtered.experience.experiences.push(membership);
      } else if (serviceTypes.includes(membership.ActivityType)) {
        filtered.service.push(membership);
      } else {
        filtered.activities.push(membership);
      }
    }

    return filtered;
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
    if (!this.state.categorizedMemberships.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = this.groupActivityByCode(this.state.categorizedMemberships.activities);
    }

    let honorsList;
    if (!this.state.categorizedMemberships.honors) {
      honorsList = <GordonLoader />;
    } else {
      honorsList = this.groupActivityByCode(this.state.categorizedMemberships.honors);
    }

    let serviceList;
    if (!this.state.categorizedMemberships.service) {
      serviceList = <GordonLoader />;
    } else {
      serviceList = this.groupActivityByCode(this.state.categorizedMemberships.service);
    }

    let experienceList;
    if (!this.state.categorizedMemberships.experience) {
      experienceList = <GordonLoader />;
    } else {
      experienceList = this.groupActivityByCode(
        this.state.categorizedMemberships.experience.experiences,
      );
      experienceList = experienceList.concat(
        this.state.categorizedMemberships.experience.employments.map(employment => (
          <Experience Experience={employment} />
        )),
      );
    }

    const buttonColors = {
      /* not in style sheet so that gordonColors is accessible */
      background: gordonColors.primary.cyan,
      color: 'white',
    };

    const honorsLeadership = this.state.honorsLeadership;
    const experiences = this.state.experiences;
    const serviceLearning = this.state.serviceLearning;
    const otherInvolvements = this.state.otherInvolvements;

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
              {honorsList}
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
              {experienceList}
            </div>
            {serviceLearning && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Service Learning</b>
                </Typography>
              </div>
            )}
            <div class="print" className="activity-list">
              {serviceList}
            </div>
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
