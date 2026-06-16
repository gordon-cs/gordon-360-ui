import http from './http';
import { parse } from 'date-fns';
import { AcademicTerm } from './academicTerm';

type DbCourse = {
  Username: string;
  SessionCode: string;
  CRS_CDE: string;
  CRS_TITLE: string;
  BLDG_CDE: string;
  ROOM_CDE: string;
  MONDAY_CDE: string;
  TUESDAY_CDE: string;
  WEDNESDAY_CDE: string;
  THURSDAY_CDE: string;
  FRIDAY_CDE: string;
  SATURDAY_CDE: string;
  /** A timespan of the format HH:mm:ss, stringified */
  BEGIN_TIME?: string;
  /** A timespan of the format HH:mm:ss, stringified */
  END_TIME?: string;
  BEGIN_DATE: string;
  END_DATE: string;
  SUB_TERM_CDE?: string;
  Role: string;
};

type DbSchedule = {
  YearCode: string;
  TermCode: string;
  TermDescription: string;
  TermBeginDate: string;
  TermEndDate: string;
  AllCourses: DbCourse[];
};

export const scheduleCalendarResources = [
  { id: 'MO', title: 'Monday' },
  { id: 'TU', title: 'Tuesday' },
  { id: 'WE', title: 'Wednesday' },
  { id: 'TH', title: 'Thursday' },
  { id: 'FR', title: 'Friday' },
  { id: 'SA', title: 'Saturday' },
] as const;

type CourseDayID = (typeof scheduleCalendarResources)[number]['id'];
export const courseDayIds = [
  'MO',
  'TU',
  'WE',
  'TH',
  'FR',
  'SA',
] as const satisfies readonly CourseDayID[];

export type Schedule = {
  term: AcademicTerm;
  courses: CourseEvent[];
};

export type CourseEvent = {
  /**
   * used by `react-big-calendar` to determine which resource (e.g. `Monday`) this event should display for
   */
  resourceId: CourseDayID[];
  name: string;
  title: string;
  location: string;
  subtermCode?: string;
  start: Date; // used for time
  end: Date; // used for time
  startDate?: Date; // used for the date of the first class
  endDate?: Date; // used for the date of the last class
  allDay?: boolean;
};

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

const getAllTermSchedules = async (username: string): Promise<Schedule[]> => {
  const dbSchedules = await http.get<DbSchedule[]>(`schedule/${username}/allcourses-by-term`);

  const schedules = dbSchedules.map(
    ({ YearCode, TermCode, TermDescription, TermBeginDate, TermEndDate, AllCourses }) => ({
      term: {
        YearCode,
        TermCode,
        Description: TermDescription,
        BeginDate: TermBeginDate,
        EndDate: TermEndDate,
      },
      courses: formatCoursesFromDb(AllCourses),
    }),
  );

  return schedules.sort(
    (a, b) => new Date(b.term.BeginDate).getTime() - new Date(a.term.BeginDate).getTime(),
  );
};

function formatCoursesFromDb(courses: DbCourse[]): CourseEvent[] {
  const today = new Date();
  // Don't show async courses as meeting on saturday
  // Because saturday is only included in the schedule if a non-async course meetst that day
  const asyncMeetingDays = courseDayIds.slice(0, -1);

  return courses.map((course) => {
    const sharedDetails = {
      name: course.CRS_TITLE.trim(),
      title: course.CRS_CDE.trim(),
      location: course.BLDG_CDE + '\u00A0' + course.ROOM_CDE,
      subtermCode: course.SUB_TERM_CDE,
      startDate: course.BEGIN_DATE ? new Date(course.BEGIN_DATE) : undefined,
      endDate: course.END_DATE ? new Date(course.END_DATE) : undefined,
    };
    if (course.ROOM_CDE === 'ASY') {
      return {
        ...sharedDetails,
        resourceId: asyncMeetingDays,
        start: today,
        end: today,
        allDay: true,
      };
    } else {
      const meetingDays = getMeetingDays(course);
      const beginning = parse(course.BEGIN_TIME ?? '', 'HH:mm:ss', today);
      const end = parse(course.END_TIME ?? '', 'HH:mm:ss', today);

      return {
        ...sharedDetails,
        resourceId: meetingDays,
        start: beginning,
        end: end,
      };
    }
  });
}

function getMeetingDays(course: DbCourse): CourseDayID[] {
  let dayArray: CourseDayID[] = [];

  if (course.MONDAY_CDE === 'M') {
    dayArray.push('MO');
  }
  if (course.TUESDAY_CDE === 'T') {
    dayArray.push('TU');
  }
  if (course.WEDNESDAY_CDE === 'W') {
    dayArray.push('WE');
  }
  if (course.THURSDAY_CDE === 'R') {
    dayArray.push('TH');
  }
  if (course.FRIDAY_CDE === 'F') {
    dayArray.push('FR');
  }
  if (course.SATURDAY_CDE === 'S') {
    dayArray.push('SA');
  }

  return dayArray;
}

export function formatTermDescription(term: { YearCode: string; TermCode: string }): string {
  const year1 = term.YearCode;
  const year2 = String(Number(term.YearCode) + 1);

  const termName =
    term.TermCode === 'FA'
      ? 'Fall'
      : term.TermCode === 'SP'
        ? 'Spring'
        : term.TermCode === 'SU'
          ? 'Summer'
          : term.TermCode === 'JN'
            ? 'January'
            : term.TermCode === 'WS'
              ? 'Winter-Spring'
              : term.TermCode === 'SF'
                ? 'Summer-Fall'
                : term.TermCode;

  return `${termName} ${year1.slice(0)}-${year2.slice(2)} Academic Year`;
}

const scheduleService = {
  getCanReadStudentSchedules,
  getAllTermSchedules,
};

export default scheduleService;
