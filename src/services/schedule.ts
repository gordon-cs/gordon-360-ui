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
  /** A timespan of the format HH:mm:ss, stringified */
  BEGIN_TIME: string;
  /** A timespan of the format HH:mm:ss, stringified */
  END_TIME: string;
};

type ScheduleEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resourceId: number;
};

const getCanReadStudentSchedules = (): Promise<boolean> => http.get(`schedule/canreadstudent/`);

const getSchedule = (username: string = '', sessionID: string = ''): Promise<CourseSchedule[]> =>
  http.get(`schedule/${username}?sessionID=${sessionID}`);

function getMeetingDays(course: CourseSchedule): number[] {
  let dayArray = [];

  if (course.MONDAY_CDE === 'M') {
    dayArray.push(2);
  }
  if (course.TUESDAY_CDE === 'T') {
    dayArray.push(3);
  }
  if (course.WEDNESDAY_CDE === 'W') {
    dayArray.push(4);
  }
  if (course.THURSDAY_CDE === 'R') {
    dayArray.push(5);
  }
  if (course.FRIDAY_CDE === 'F') {
    dayArray.push(6);
  }

  return dayArray;
}

function makeScheduleCourses(schedule: CourseSchedule[]): ScheduleEvent[] {
  const today = moment();
  const eventArray = [];
  let eventId = 0;
  let summerMeetingDays = [1, 2, 3, 4, 5];
  for (let course of schedule) {
    course.CRS_CDE = course.CRS_CDE.trim();
    course.CRS_TITLE = course.CRS_TITLE.trim();
    // Added a if statement for classes that do not have a start and end time
    if (course.ROOM_CDE === 'ASY') {
      for (const day of summerMeetingDays) {
        const summerEvent = {
          id: eventId,
          title: course.CRS_CDE + ': ' + course.BLDG_CDE + ' ' + course.ROOM_CDE,
          start: today.toDate(),
          end: today.toDate(),
          resourceId: day,
          allDay: true,
        };
        eventArray.push(summerEvent);
        eventId++;
      }
      eventId++;
    } else {
      const beginTime = moment(course.BEGIN_TIME, 'HH:mm:ss')
        .set('y', today.year())
        .set('M', today.month())
        .set('d', today.day());
      const endTime = moment(course.END_TIME, 'HH:mm:ss')
        .set('y', today.year())
        .set('M', today.month())
        .set('d', today.day());
      for (const day of getMeetingDays(course)) {
        const courseEvent = {
          id: eventId,
          title: course.CRS_CDE + ' in ' + course.BLDG_CDE + ' ' + course.ROOM_CDE,
          start: beginTime.toDate(),
          end: endTime.toDate(),
          resourceId: day,
        };
        eventArray.push(courseEvent);
        eventId++;
      }
      eventId++;
    }
  }
  return eventArray;
}

const scheduleService = {
  getSchedule,
  makeScheduleCourses,
  getCanReadStudentSchedules,
};

export default scheduleService;
