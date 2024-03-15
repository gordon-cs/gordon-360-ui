import { differenceInCalendarMonths, format, parse, setMonth } from 'date-fns';
import http from './http';
import userService, { MembershipHistory } from './user';

export type StudentEmployment = {
  Job_Title: string;
  Job_Department: string;
  Job_Department_Name: string;
  Job_Start_Date?: string;
  Job_End_Date?: string;
  Job_Expected_End_Date?: string;
};

export type TranscriptItems = {
  honors: MembershipHistory[];
  experiences: (MembershipHistory | StudentEmployment)[];
  service: MembershipHistory[];
  activities: MembershipHistory[];
};

const getItems = (username: string) =>
  Promise.all([
    userService.getMembershipHistory(username),
    http.get<StudentEmployment[]>('studentemployment/'),
  ]).then(([memberships, jobs]) => categorizeItems(memberships, jobs));

// const MembershipTypeMap = {
//   LEA: 'honors',
//   SCH: 'honors',
//   SGV: 'honors',
//   SLP: 'service',
//   MIN: 'service',
//   RES: 'experiences',
// } as const;

/**
 * Sorts transcript items into one of these categories:
 *  1. Honors, Leadership, and Research
 *  2. Experience
 *  3. Service and Service Learning
 *  4. Activities (the catch-all)
 *
 * Memberships ars sorted based on their Activity Code, although this is not a perfect indicator
 * of which category a membership should belong to.
 *
 * @param memberships An array of membership objects retrieved from the database.
 * @param jobs Student jobs
 * @returns Transcript items categorized into the above categories
 */
const categorizeItems = async (memberships: MembershipHistory[], jobs: StudentEmployment[]) => {
  const groupedMembershipHistory: TranscriptItems = {
    honors: [] as MembershipHistory[],
    experiences: jobs as (MembershipHistory | StudentEmployment)[],
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

  groupedMembershipHistory.experiences.sort(
    (a, b) => getExperienceEndDate(b) - getExperienceEndDate(a),
  );

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

const getExperienceEndDate = (experience: MembershipHistory | StudentEmployment) => {
  const date =
    'Sessions' in experience
      ? experience.LatestDate
      : experience.Job_End_Date ?? experience.Job_Expected_End_Date ?? experience.Job_Start_Date;

  if (date) {
    return Date.parse(date);
  }

  return 0;
};

const transcriptService = {
  getItems,
  getGradCohort,
};

export default transcriptService;
