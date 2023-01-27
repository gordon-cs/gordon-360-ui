import { parse } from 'date-fns';
import Activity from 'views/CoCurricularTranscript/Components/CoCurricularTranscriptActivity';
import { MembershipView } from './membership';

type HonorsType = 'LEA' | 'SCH' | 'SGV';
type ServiceType = 'SLP' | 'MIN';
type ExperienceType = 'RES';

/**
 * Filters general memberships from the 360 Database into one of four categories
 *        1. Honors, Leadership, and Research
 *        2. Experience
 *        3. Service and Service Learning
 *        4. Activities (the catch-all)
 * Memberships ars sorted based on their Activity Code, although this is not a perfect indicator
 * of which category a membership should belong to.
 *
 * @param memberships An array of membership objects retrieved from the database.
 * @returns An array of four arrays-one per category-into which the  memberships have been filtered
 */
const filterMemberships = (memberships: MembershipView[]) => {
  const filtered = {
    honors: [] as MembershipView[],
    experience: {
      experiences: [] as MembershipView[],
      employments: [] as MembershipView[],
    },
    service: [] as MembershipView[],
    activities: [] as MembershipView[],
  };

  const honorsTypes = ['LEA', 'SCH', 'SGV'];
  const serviceTypes = ['SLP', 'MIN'];
  const experienceTypes = ['RES'];

  /**
  * TODO: Categorizing is broken because `MembershipView` does not include ActivityType
  memberships.forEach((membership) => {
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
  });
  */

  filtered.activities = memberships;

  return filtered;
};

/**
   *For each activity in an array of activities, this finds all other activities of the same Code
  * and keeps an array of all the sessions during which the student was involved in this activity.
  * One Activity component is created with that ActivityDescription and the array of sessions.
  * Once all Activity components have been made, they are sorted from most to least recent.

  * @param activities - a list of activity objects ("Memberships" as defined in gordon-360-api)
  * @returns array of Activity components with props Activity and Sessions.
  * TODO: Move this data transformation into the API
  */
const groupActivityByCode = (activities: MembershipView[]) => {
  let condensedActs = [];

  // sort activities by ActivityCode
  while (activities.length > 0) {
    let curAct = activities.shift() as MembershipView;
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
    condensedActs.push({
      key: curAct.ActivityCode,
      Activity: curAct,
      Sessions: sessionsOrdered,
      LeaderSessions: leaderSessionsOrdered,
    });
  }

  condensedActs.sort(function (a, b) {
    let lastSessA = a.Sessions[a.Sessions.length - 1];
    let lastSessB = b.Sessions[b.Sessions.length - 1];
    return Number(lastSessB) - Number(lastSessA);
  });

  return condensedActs;
};

const getGradCohort = (gradDate: string) =>
  parse(gradDate, 'MMM dd yyyy hh:mmaa', new Date()).getFullYear();

const transcriptService = {
  filterMemberships,
  groupActivityByCode,
  getGradCohort,
};

export default transcriptService;
