import moment from 'moment';
import http from './http';

type CourseSchedule = {
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
};

type SessionCourses = {
  SessionBeginDate: string;
  SessionCode: string;
  SessionDescription: string;
  SessionEndDate: string;
  AllCourses: CourseSchedule;
};

type ScheduleEvent = {
  id: number;
  name: string;
  title: string;
  location: string;
  start: Date;
  end: Date;
  resourceId: string;
  meetingDays: string[];
};

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

const getSchedule = (username: string = '', sessionID: string = ''): Promise<CourseSchedule[]> => {
  if (sessionID === '') {
    return http.get(`schedule/${username}`);
  }
  return http.get(`schedule/${username}?sessionID=${sessionID}`);
};

const getAllCourses = (username: string): Promise<SessionCourses> =>
  http.get(`schedule/${username}/courses`);

function getMeetingDays(course: CourseSchedule): string[] {
  let dayArray = [];

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

function makeScheduleCourses(schedule: CourseSchedule[]): ScheduleEvent[] {
  const today = moment();
  let eventId = 0;
  let asyncMeetingDays = ['MO', 'TU', 'WE', 'TH', 'FR'];

  const eventArray = schedule.flatMap((course) => {
    course.CRS_CDE = course.CRS_CDE.trim();
    course.CRS_TITLE = course.CRS_TITLE.trim();

    const beginTime = moment(course.BEGIN_TIME, 'HH:mm:ss')
      .set('y', today.year())
      .set('M', today.month())
      .set('d', today.day());
    const endTime = moment(course.END_TIME, 'HH:mm:ss')
      .set('y', today.year())
      .set('M', today.month())
      .set('d', today.day());

    const meetingDays = getMeetingDays(course);

    if (course.ROOM_CDE === 'ASY') {
      return asyncMeetingDays.map((day) => ({
        id: eventId++,
        name: course.CRS_TITLE,
        title: course.CRS_CDE,
        // you might confused about name and title reference, but it is for displaying course code in the panel and course name in the dialog
        location: course.BLDG_CDE + ' ' + course.ROOM_CDE,
        start: today.toDate(),
        end: today.toDate(),
        resourceId: day,
        allDay: true,
        meetingDays: ['MO', 'TU', 'WE', 'TH', 'FR'],
      }));
    } else {
      return meetingDays.map((day) => ({
        id: eventId++,
        name: course.CRS_TITLE,
        title: course.CRS_CDE,
        location: course.BLDG_CDE + ' ' + course.ROOM_CDE,
        start: beginTime.toDate(),
        end: endTime.toDate(),
        resourceId: day,
        meetingDays: meetingDays,
      }));
    }
  });

  return eventArray;
}

const scheduleService = {
  getSchedule,
  makeScheduleCourses,
  getCanReadStudentSchedules,
  getAllCourses,
};

export default scheduleService;
