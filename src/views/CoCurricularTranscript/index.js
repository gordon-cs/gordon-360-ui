import { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';
import GordonUnauthorized from 'components/GordonUnauthorized';
import Activity from './Components/CoCurricularTranscriptActivity';
import Experience from './Components/CoCurricularTranscriptExperience';
import user from 'services/user';
import GordonLoader from 'components/Loader';
import styles from './CoCurricularTranscript.module.css';
import GuestWelcome from 'views/Home/components/GuestWelcome';
import { truncate } from 'lodash';
import { CallMade } from '@material-ui/icons';

//This component creates the overall interface for the CoCurricularTranscript (card, heading,
//download button), and contains a InvolvementsList object for displaying the content

const Transcript = ({ authentication, onLogIn }) => {
  const [categorizedMemberships, setCategorizedMemberships] = useState();
  const [loading, setLoading] = useState();
  const [profile, setProfile] = useState();
  const [otherInvolvements, setOtherInvolvements] = useState();
  const [honorsLeadership, setHonorsLeadership] = useState();
  const [serviceLearning, setServiceLearning] = useState();
  const [experiences, setExperiences] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);
  const [error, setError] = useState();

  // useEffect(() => {
  //   if (authentication) {
  //     loadProfile();
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // },[authentication]);

  useEffect(() => {
    if (authentication) {
      setLoading(true);

      const loadProfile = async () => {
        let prof = await user.getProfileInfo();
        setProfile(prof);
        return prof;
      };
      let prof = loadProfile();
      setIsAuthenticated(true);
      const loadCategorizedMemberships = async (prof) => {
        const memberships = await user.getTranscriptMembershipsInfo(prof.ID);
        let cm = filterMemberships(memberships);
        cm.experience.employments = await user.getEmploymentInfo();
        setCategorizedMemberships(cm);
        return cm;
      };

      const loadOtherMemberships = async (cm) => {
        setOtherInvolvements(false);
        if (!(cm.activities.length === 0)) {
          setOtherInvolvements(true);
        }

        setHonorsLeadership(false);
        if (!(cm.honors.length === 0)) {
          setHonorsLeadership(true);
        }

        setServiceLearning(false);
        if (!(cm.service.length === 0)) {
          setServiceLearning(true);
        }

        setExperiences(false);
        if (!(cm.experience.experiences.length === 0 && cm.experience.employments.length === 0)) {
          setExperiences(true);
        }
      };

      if (prof) {
        let cm = loadCategorizedMemberships(prof);
        loadOtherMemberships(cm);
      }
      setLoading(false);
    } else {
      setIsAuthenticated(false);
    }
  }, [authentication]);

  const loadPage = async () => {
    setLoading(true);
    try {
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  if (authentication) {
    loadPage();
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleDownload = () => {
    window.print();
  };

  // Sorts a list of activity components in order of most recent end date to least recent end date.
  // Param: activities - an array of Activity components with props Activity and Sessions
  // Returns: the same array, sorted in order of most recent (newest) to least recent
  const sortNewestFirst = (activities) => {
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
  const groupActivityByCode = (activities) => {
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

    let sorted = sortNewestFirst(condensedActs);

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
  const filterMemberships = (memberships) => {
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
  const getGradCohort = () => {
    let gradDate = profile.GradDate;
    if (gradDate === undefined || gradDate === '') {
      return null;
    } else {
      return 'Class of ' + gradDate.split(' ')[3];
    }
  };

  // Formats an array of major objects into a string for display on the transcript
  // Params: majors - An array of major objects
  // Returns: A string of all the current user's majors.
  const getMajors = (majors) => {
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
  const getMinors = (minors) => {
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

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    return <GuestWelcome onLogIn={onLogIn} />;
  } else if (authentication) {
    let activityList;
    if (!categorizedMemberships.activities) {
      activityList = <GordonLoader />;
    } else {
      activityList = groupActivityByCode(categorizedMemberships.activities);
    }

    let honorsList;
    if (!categorizedMemberships.honors) {
      honorsList = <GordonLoader />;
    } else {
      honorsList = groupActivityByCode(categorizedMemberships.honors);
    }

    let serviceList;
    if (!categorizedMemberships.service) {
      serviceList = <GordonLoader />;
    } else {
      serviceList = groupActivityByCode(categorizedMemberships.service);
    }

    let experienceList;
    if (!categorizedMemberships.experience) {
      experienceList = <GordonLoader />;
    } else {
      experienceList = groupActivityByCode(categorizedMemberships.experience.experiences);
      experienceList = experienceList.concat(
        categorizedMemberships.experience.employments
          .map((employment) => <Experience Experience={employment} />)
          .reverse(),
      );
    }

    const buttonColors = {
      /* not in style sheet so that gordonColors is accessible */
      background: gordonColors.primary.cyan,
      color: 'white',
    };

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
                onClick={handleDownload}
                style={buttonColors}
                variant="contained"
              >
                Print Experience Transcript
              </Button>
            </div>
            <div>Gordon College Experience Transcript</div>
            <div className={styles.subtitle}>
              {' '}
              <b>{profile.fullName}</b>{' '}
            </div>
            <div className={styles.subtitle}>{getGradCohort()}</div>
            <div className={styles.subtitle}>{getMajors(profile.Majors)}</div>
            <div className={styles.subtitle}>{getMinors(profile.Minors)}</div>
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
  } else {
    return <GordonUnauthorized feature={'your experience transcript'} />;
  }
};

export default Transcript;
