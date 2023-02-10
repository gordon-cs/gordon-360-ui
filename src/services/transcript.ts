import { differenceInCalendarMonths, format, parse, setMonth } from 'date-fns';
import http from './http';
import userService, { MembershipHistory } from './user';

const getMemberships = (username: string) =>
  userService.getMembershipHistory(username).then(categorizeMemberships);

// TODO: Add type info
const getEmployment = () => http.get('studentemployment/');

// const MembershipTypeMap = {
//   LEA: 'honors',
//   SCH: 'honors',
//   SGV: 'honors',
//   SLP: 'service',
//   MIN: 'service',
//   RES: 'experiences',
// } as const;

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

const getGradCohort = (gradDate: string) =>
  parse(gradDate, 'MMM dd yyyy hh:mmaa', new Date()).getFullYear();

const SessionStartMonthToEndMonthMap = {
  // Fall term ends in December
  8: 11,
  // Spring term ends in May
  0: 4,
  // Summer term ends in August
  4: 7,
} as const;

export class MembershipInterval {
  #start: Date;
  #end: Date;

  constructor(session: Date) {
    this.#start = session;
    this.#end = this.#getEndDate(session);
  }

  #getEndDate(session: Date) {
    // Ignore error check because we expect session.getMonth() to always return 0, 4, or 8
    // @ts-ignore
    const endMonth = SessionStartMonthToEndMonthMap[session.getMonth()];
    return new Date(session.getFullYear(), endMonth);
  }

  toString() {
    const startFormat = this.#start.getFullYear() === this.#end.getFullYear() ? 'MMM' : 'MMM yyyy';
    return `${format(this.#start, startFormat)} - ${format(this.#end, 'MMM yyyy')}`;
  }

  consecutiveWith(session: Date) {
    return (
      this.#end.getFullYear() === session.getFullYear() ||
      differenceInCalendarMonths(session, this.#end) === 1
    );
  }

  extendTo(session: Date) {
    this.#end = this.#getEndDate(session);
  }
}

const transcriptService = {
  getMemberships,
  getEmployment,
  getGradCohort,
};

export default transcriptService;
