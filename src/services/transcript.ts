import { parse } from 'date-fns';
import http from './http';
import membershipService, {
  MembershipView,
  NonGuestParticipations,
  Participation,
} from './membership';
import { compareByProperty } from './utils';

type MembershipHistory = {
  activityCode: string;
  // TODO: Get ActivityType from DB for categorization
  // activityType: string;
  activityDescription: string;
  activityImagePath: string;
  sessions: string[];
  leaderSessions: string[];
};

// const MembershipTypeMap = {
//   LEA: 'honors',
//   SCH: 'honors',
//   SGV: 'honors',
//   SLP: 'service',
//   MIN: 'service',
//   RES: 'experiences',
// } as const;

const getMemberships = (username: string) =>
  membershipService
    .get({ username, participationTypes: NonGuestParticipations, sessionCode: '*' })
    .then(groupByCode)
    .then(categorizeMemberships);

// TODO: Add type info
const getEmployment = () => http.get('studentemployment/');

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
const categorizeMemberships = async (memberships: MembershipHistory[]) => {
  const groupedMembershipHistory = {
    honors: [] as MembershipHistory[],
    experiences: [] as MembershipHistory[],
    service: [] as MembershipHistory[],
    activities: [] as MembershipHistory[],
  };

  /**
   * TODO: Categorizing is broken because `MembershipView` does not include ActivityType
   * const honorsTypes = ['LEA', 'SCH', 'SGV'];
   * const serviceTypes = ['SLP', 'MIN'];
   * const experienceTypes = ['RES'];
   *
   * // Filter memberships into either Honors, Experience, Service, or Activities
   * memberships.forEach((membership) => {
   *   const membershipType = MembershipTypeMap[membership.activityType] ?? 'activities';
   *   groupedMembershipHistory[membershipType].push(membership);
   * });
   */

  groupedMembershipHistory.activities = memberships;

  return groupedMembershipHistory;
};

/**
 * For each activity in an array of activities, this finds all other activities of the same Code
 * and keeps an array of all the sessions during which the student was involved in this activity.
 * One Activity component is created with that ActivityDescription and the array of sessions.
 * Once all Activity components have been made, they are sorted from most to least recent.
 *
 * @param memberships - a list of activity objects ("Memberships" as defined in gordon-360-api)
 * @returns array of Activity components with props Activity and Sessions.
 * TODO: Move this data transformation into the API
 */
const groupByCode = (memberships: MembershipView[]) => {
  const membershipHistories = [];

  // Sort by ActivityCode so that all memberships of same activity are consecutive
  memberships.sort(compareByProperty('ActivityCode'));

  while (memberships.length > 0) {
    const membership = memberships.shift();
    if (membership === undefined) break;

    const sessions: string[] = [];
    const leaderSessions: string[] = [];

    const appendSessions = (membership: MembershipView) => {
      sessions.push(membership.SessionCode);

      if (membership.Participation === Participation.Leader) {
        leaderSessions.push(membership.SessionCode);
      }
    };

    appendSessions(membership);

    // Record the sessions of each membership for the same activity
    // Since memberships is sorted by `ActivityCode`, all memberships of the same activity are consecutive
    while (memberships[0]?.ActivityCode === membership.ActivityCode) {
      appendSessions(memberships[0]);
      memberships.shift();
    }

    sessions.sort();
    leaderSessions.sort();

    membershipHistories.push({
      activityCode: membership.ActivityCode,
      activityDescription: membership.ActivityDescription,
      activityImagePath: membership.ActivityImagePath,
      sessions,
      leaderSessions,
    });
  }

  membershipHistories.sort((a, b) => Number(b.sessions.at(-1)) - Number(a.sessions.at(-1)));

  return membershipHistories;
};

const getGradCohort = (gradDate: string) =>
  parse(gradDate, 'MMM dd yyyy hh:mmaa', new Date()).getFullYear();

const transcriptService = {
  getMemberships,
  getEmployment,
  getGradCohort,
};

export default transcriptService;
