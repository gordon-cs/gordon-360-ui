import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
    window.print();
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
      let curAct = activities.shift();

      // keep track of the activity code which will be used to identify all activities of the same
      // code so they can be grouped into one activity component
      let curActCode = curAct.ActivityCode;

      // Pop first session code from array and split into months and years, which are saved as
      // the initial start and end dates
      let sess = curAct.SessionCode;
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
    let serviceTypes = ['SLP', 'MIN'];
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
            <div className="activity-list">{honorsList}</div>
            {experiences && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Experience</b>
                </Typography>
              </div>
            )}
            <div className="activity-list">{experienceList}</div>
            {serviceLearning && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Service Learning</b>
                </Typography>
              </div>
            )}
            <div className="activity-list">{serviceList}</div>
            {otherInvolvements && (
              <div className="subtitle">
                <Typography variant="headline">
                  <b>Activities</b>
                </Typography>
              </div>
            )}
            <div className="activity-list">{activityList}</div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
