import http from './http';
import { parse } from 'date-fns';
import { Session } from './session';

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
  BEGIN_TIME: string;
  /** A timespan of the format HH:mm:ss, stringified */
  END_TIME: string;
  Role: string;
};

type DbSchedule = {
  SessionBeginDate: string;
  SessionCode: string;
  SessionDescription: string;
  SessionEndDate: string;
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

type Schedule = {
  session: Session;
  courses: CourseEvent[];
};

type CourseEvent = {
  /**
   * used by `react-big-calendar` to determine which resource (e.g. `Monday`) this event should display for
   */
  resourceId: CourseDayID;
  name: string;
  title: string;
  location: string;
  start: Date;
  end: Date;
  meetingDays: CourseDayID[];
};

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

const getAllSessionSchedules = async (username: string): Promise<Schedule[]> => {
  const dbSchedules = await http.get<DbSchedule[]>(`schedule/${username}/allcourses`);

  return dbSchedules.map(({ AllCourses, ...session }) => ({
    session,
    courses: formatCoursesFromDb(AllCourses),
  }));
};

function formatCoursesFromDb(courses: DbCourse[]): CourseEvent[] {
  const today = new Date();
  // Don't show async courses as meeting on saturday
  // Because saturday is only included in the schedule if a non-async course meetst that day
  const asyncMeetingDays = courseDayIds.slice(0, -1);

  return courses.flatMap((course) => {
    const sharedDetails = {
      name: course.CRS_TITLE.trim(),
      title: course.CRS_CDE.trim(),
      location: course.BLDG_CDE + ' ' + course.ROOM_CDE,
    };

    const meetingDays = getMeetingDays(course);

    if (course.ROOM_CDE === 'ASY') {
      return asyncMeetingDays.map((day) => ({
        ...sharedDetails,
        resourceId: day,
        start: today,
        end: today,
        meetingDays: asyncMeetingDays,
        allDay: true,
      }));
    } else {
      const beginning = parse(course.BEGIN_TIME, 'HH:mm:ss', today);
      const end = parse(course.END_TIME, 'HH:mm:ss', today);

      return meetingDays.map((day) => ({
        ...sharedDetails,
        resourceId: day,
        start: beginning,
        end: end,
        meetingDays: meetingDays,
      }));
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

const scheduleService = {
  getCanReadStudentSchedules,
  getAllSessionSchedules,
};

export default scheduleService;
