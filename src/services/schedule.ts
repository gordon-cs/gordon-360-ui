import http from './http';
import { parse } from 'date-fns';

export interface CourseEvent {
  title: string;
  start: Date;
  end: Date;
  /**
   * used by `react-big-calendar` to determine which resource (e.g. `Monday`) this event should display for
   */
  resourceId: CourseDayID[];
  /**
   * used by `react-big-calendar` to determine whether this event lasts all day
   */
  allDay?: boolean;

  CourseName: string;
  CourseCode: string;
  Location?: string;
  MeetingDays: CourseDayID[];
  BeginDate: Date;
  EndDate: Date;
  isSubtermCourse: boolean;
}

export type Term = {
  YearCode: string;
  TermCode: string;
  SubtermCode: string;
  Description: string;
  /** A date of the format yyyy-MM-dd, stringified */
  Start: string;
  /** A date of the format yyyy-MM-dd, stringified */
  End: string;
};

export const getTermId = (term: Term): string => term.YearCode + term.TermCode + term.SubtermCode;

export type Course = {
  Code: string;
  YearCode: string;
  TermCode: string;
  SubtermCode: string;
  Title: string;
  Role: string;
  Location?: string;
  MeetingDays: CourseDayID[];
  /** A time of the format HH:mm:ss, stringified */
  BeginTime?: string;
  /** A time of the format HH:mm:ss, stringified */
  EndTime?: string;
  /** A date of the format yyyy-MM-dd, stringified */
  BeginDate?: string;
  /** A date of the format yyyy-MM-dd, stringified */
  EndDate?: string;
};

export type ScheduleResource = {
  id: CourseDayID;
  title: string;
};

export const scheduleResources = [
  { id: 'M', title: 'Monday' },
  { id: 'T', title: 'Tuesday' },
  { id: 'W', title: 'Wednesday' },
  { id: 'R', title: 'Thursday' },
  { id: 'F', title: 'Friday' },
  { id: 'S', title: 'Saturday' },
  { id: 'U', title: 'Sunday' },
] as const;
type CourseDayID = (typeof scheduleResources)[number]['id'];

const getCourses = (
  username: string,
  yearCode: string,
  termCode: string,
  subtermCode: string,
): Promise<CourseEvent[]> => {
  const params = http.toQueryString({ yearCode, termCode, subtermCode });
  return http.get<Course[]>(`schedule/${username}/courses${params}`).then(formatCoursesFromDb);
};

const getTerms = (username: string): Promise<Term[]> =>
  http.get<Term[]>(`Schedule/${username}/terms`);

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

function formatCoursesFromDb(courses: Course[]): CourseEvent[] {
  const today = new Date();
  // Don't show async courses as meeting on saturday
  // Because saturday is only included in the schedule if a non-async course meetst that day
  const asyncMeetingDays = scheduleResources.slice(0, -1).map((r) => r.id);

  return courses.map((course) => {
    const BeginDate = parse(course.BeginDate ?? '', 'yyyy-MM-dd', 0);
    const EndDate = parse(course.EndDate ?? '', 'yyyy-MM-dd', 0);

    // Add location info to event's title so it shows in calendar
    let eventTitle = course.Code;
    if (course.Location?.includes('ASY')) {
      eventTitle += ' | Async';
    } else if (course.Location) {
      eventTitle += `\n${course.Location}`;
    }
    const sharedDetails = {
      CourseName: course.Title,
      CourseCode: course.Code,
      title: eventTitle,
      isSubtermCourse: Boolean(course.SubtermCode),
      BeginDate,
      EndDate,
    };

    if (course.Location?.endsWith(' ASY')) {
      return {
        ...sharedDetails,
        resourceId: asyncMeetingDays,
        start: today,
        end: today,
        BeginDate,
        EndDate,
        MeetingDays: asyncMeetingDays,
        allDay: true,
      };
    } else {
      const beginning = parse(course.BeginTime ?? '', 'HH:mm:ss', today);
      const end = parse(course.EndTime ?? '', 'HH:mm:ss', today);

      return {
        ...sharedDetails,
        resourceId: course.MeetingDays,
        start: beginning,
        end: end,
        BeginDate,
        EndDate,
        MeetingDays: course.MeetingDays,
        Location: course.Location,
      };
    }
  });
}

const scheduleService = {
  getCourses,
  getTerms,
  getCanReadStudentSchedules,
};

export default scheduleService;
