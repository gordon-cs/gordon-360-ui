import http from './http';
import { parse } from 'date-fns';
import { Session } from './session';

interface DbScheduleCourse {
  Code: string;
  Title: string;
  Role: 'Student' | 'Instructor';
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
  YearTermCode: string;
}

export interface CourseEvent {
  name: string;
  title: string;
  start: Date;
  end: Date;
  Location?: string;
  MeetingDays: CourseDayID[];
  BeginDate: Date;
  EndDate: Date;
  /**
   * used by `react-big-calendar` to determine which resource (e.g. `Monday`) this event should display for
   */
  resourceId: CourseDayID;
  /**
   * used by `react-big-calendar` to determine whether this event lasts all day
   */
  allDay?: boolean;
}

type DbSchedule = {
  Session: Session;
  Courses: DbScheduleCourse[];
};

export type Schedule = {
  Session: Session;
  Courses: CourseEvent[];
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

const getSchedules = async (username: string | undefined): Promise<Schedule[]> => {
  const params = username ? http.toQueryString({ username }) : '';
  const schedules = await http.get<DbSchedule[]>(`schedule${params}`);
  return schedules.map(({ Session, Courses }) => ({
    Session,
    Courses: formatCoursesFromDb(Courses),
  }));
};

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

function formatCoursesFromDb(courses: DbScheduleCourse[]): CourseEvent[] {
  const today = new Date();
  // Don't show async courses as meeting on saturday
  // Because saturday is only included in the schedule if a non-async course meetst that day
  const asyncMeetingDays = scheduleResources.slice(0, -1).map((r) => r.id);

  return courses.flatMap((course) => {
    const BeginDate = parse(course.BeginDate ?? '', 'yyyy-MM-dd', 0);
    const EndDate = parse(course.EndDate ?? '', 'yyyy-MM-dd', 0);

    const sharedDetails = {
      name: course.Title,
      title: course.Code,
      BeginDate,
      EndDate,
    };

    if (course.Location?.endsWith(' ASY')) {
      return asyncMeetingDays.map((day) => ({
        ...sharedDetails,
        resourceId: day,
        start: today,
        end: today,
        BeginDate,
        EndDate,
        MeetingDays: asyncMeetingDays,
        allDay: true,
      }));
    } else {
      const beginning = parse(course.BeginTime ?? '', 'HH:mm:ss', today);
      const end = parse(course.EndTime ?? '', 'HH:mm:ss', today);

      return course.MeetingDays.map((day) => ({
        ...sharedDetails,
        resourceId: day,
        start: beginning,
        end: end,
        BeginDate,
        EndDate,
        MeetingDays: course.MeetingDays,
      }));
    }
  });
}

const scheduleService = {
  getSchedules,
  getCanReadStudentSchedules,
};

export default scheduleService;
