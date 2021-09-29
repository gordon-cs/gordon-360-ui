import { Component } from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';
import user from 'services/user';
import GordonLoader from 'components/Loader';
import styles from './CoCurricularTranscript.module.css';
import GordonLimitedAvailability from 'components/GordonLimitedAvailability';

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

  componentDidMount() {
    if (this.props.authentication) {
      this.loadTranscript();
    }
  }

  async loadTranscript() {
    this.setState({ loading: true });
    try {
      /* Retrieve data from server */
      const profile = await user.getProfileInfo();

      this.state.profile = profile;

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
    }
  }

  // Sorts a list of activity components in order of most recent end date to least recent end date.
  // Param: activities - an array of Activity components with props Activity and Sessions
  // Returns: the same array, sorted in order of most recent (newest) to least recent
  sortNewestFirst = (activities) => {
    let sorted = activities.sort(function (a, b) {
      let lastSessA = a.props.Sessions[a.props.Sessions.length - 1];
      let lastSessB = b.props.Sessions[b.props.Sessions.length - 1];
      return lastSessB - lastSessA;
    });
    return sorted;
  };

  // For each activity in an array of activities, this finds all other activities of the same Code
  // and keeps an array of all the sessions during which the student was involved in this activity.
  // One Activity component is created with that ActivityDescription and the array of sessions.
  // Once all Activity components have been made, they are sorted from most to least recent.

  // Param: activities - a list of activity objects ("Memberships" as defined in gordon-360-api)
  // Returns: array of Activity components with props Activity and Sessions.
  groupActivityByCode = (activities) => {
    let condensedActs = [];

    // sort activities by ActivityCode
    while (activities.length > 0) {
      let curAct = activities.shift();
      let sessions = [];
      let leaderSessions = [];

      // keep track of the activity code which will be used to identify all activities of the same
      // code so they can be grouped into one activity component
      let curActCode = curAct.ActivityCode;

      // For each other activity matching curActCode, if it is consecutive to the current end date,
      // save its end date as the new end date, otherwise, add the current start and end dates to
      // the string 'duration' (because the streak is broken) and prepare to start a new streak.
      // Loop assumes activities will be sorted by session and Activity Code.
      sessions.push(curAct.SessionCode);
      if (curAct.Participation === 'LEAD') {
        leaderSessions.push(curAct.SessionCode);
      }
      while (activities.length > 0 && activities[0].ActivityCode === curActCode) {
        sessions.push(activities[0].SessionCode);
        if (activities[0].Participation === 'LEAD') {
          leaderSessions.push(activities[0].SessionCode);
        }
        activities.shift();
      }

      let sessionsOrdered = sessions.sort();

      let leaderSessionsOrdered = leaderSessions.sort();

      // add the new TranscriptItem component to the array
      condensedActs.push(
        <Activity
          key={curAct.ActivityCode}
          Activity={curAct}
          Sessions={sessionsOrdered}
          LeaderSessions={leaderSessionsOrdered}
        />,
      );
    }

    let sorted = this.sortNewestFirst(condensedActs);

    return sorted;
  };

  // Filters general memberships from the 360 Database into one of four categories
  //        1. Honors, Leadership, and Research
  //        2. Experience
  //        3. Service and Service Learning
  //        4. Activities (the catch-all)
  // Memberships ars sorted based on their Activity Code, although this is not a perfect indicator
  // of which category a membership should belong to.
  // Params: memberships - An array of membership objects retrieved from the database.
  // Returns: An array of four arrays-one per category-into which the  memberships have been filtered
  filterMemberships = (memberships) => {
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

      // Filter memberships into either Honors, Experience, Service, or Activities
      if (honorsTypes.includes(membership.ActivityType)) {
        filtered.honors.push(membership);
      } else if (experienceTypes.includes(membership.ActivityType)) {
        filtered.experience.experiences.push(membership);
      } else if (serviceTypes.includes(membership.ActivityType)) {
        filtered.service.push(membership);
      } else {
        filtered.activities.push(membership);
      }
    }

    return filtered;
  };

  // Returns: the graduation date of the current user, or nothing if they have no declared grad date
  getGradCohort() {
    let gradDate = this.state.profile.GradDate;
    if (gradDate === undefined || gradDate === '') {
      return null;
    } else {
      return 'Class of ' + gradDate.split(' ')[3];
    }
  }

  // Formats an array of major objects into a string for display on the transcript
  // Params: majors - An array of major objects
  // Returns: A string of all the current user's majors.
  getMajors = (majors) => {
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

  // Formats an array of minor objects into a string for display on the transcript
  // Params: minors - An array of minor objects
  // Returns: A string of all the current user's minors.
  getMinors = (minors) => {
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
    console.log(this.state.profile.PersonType);
    if (this.props.authentication && !this.state.profile.PersonType?.includes('fac')) {
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
          this.state.categorizedMemberships.experience.employments
            .map((employment) => <Experience Experience={employment} />)
            .reverse(),
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
        <div className={styles.co_curricular_transcript}>
          <Card className={styles.card} elevation={10}>
            <CardContent className={styles.card_content}>
              <div className={styles.print_only}>
                {/* <img src={require('./logo.png')} alt="" /> */}
              </div>
              <div>
                <Button
                  className={styles.button}
                  onClick={this.handleDownload}
                  style={buttonColors}
                  variant="contained"
                >
                  Print Experience Transcript
                </Button>
              </div>
              <div>Gordon College Experience Transcript</div>
              <div className={styles.subtitle}>
                {' '}
                <b>{this.state.profile.fullName}</b>{' '}
              </div>
              <div className={styles.subtitle}>{this.getGradCohort()}</div>
              <div className={styles.subtitle}>{this.getMajors(this.state.profile.Majors)}</div>
              <div className={styles.subtitle}>{this.getMinors(this.state.profile.Minors)}</div>
              {honorsLeadership && (
                <div className={styles.subtitle}>
                  <Typography variant="h5">
                    <b>Honors, Leadership, and Research</b>
                  </Typography>
                </div>
              )}
              <div className={styles.activity_list}>{honorsList}</div>
              {experiences && (
                <div className={styles.subtitle}>
                  <Typography variant="h5">
                    <b>Experience</b>
                  </Typography>
                </div>
              )}
              <div className={styles.activity_list}>{experienceList}</div>
              {serviceLearning && (
                <div className={styles.subtitle}>
                  <Typography variant="h5">
                    <b>Service Learning</b>
                  </Typography>
                </div>
              )}
              <div className={styles.activity_list}>{serviceList}</div>
              {otherInvolvements && (
                <div className={styles.subtitle}>
                  <Typography variant="h5">
                    <b>Activities</b>
                  </Typography>
                </div>
              )}
              <div className={styles.activity_list}>{activityList}</div>
            </CardContent>
          </Card>
        </div>
      );
    } else if (this.state.profile.PersonType?.includes('fac')) {
      return (
        <GordonLimitedAvailability
          pageName="Experience Transcript"
          backToLocation="My Profile"
          backToLink="/myprofile"
          availableTo="students and alumni"
        />
      );
    } else {
      return <GordonUnauthorized feature={'your experience transcript'} />;
    }
  }
}
