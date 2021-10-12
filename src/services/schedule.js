/**
 * Schedule
 *
 * @module schedule
 */

import moment from 'moment';
import http from './http';

/**
 * @global
 * @typedef Schedule
 * @property {string} CRS_CDE The Course Code
 * @property {string} CRS_TITLE The Course title
 * @property {string} BLDG_CDE The building code
 * @property {string} ROOM_CDE The room code
 * @property {string} MONDAY_CDE The Monday code
 * @property {string} TUESDAY_CDE The Tuesday code
 * @property {string} WEDNESDAY_CDE The wednesday code
 * @property {string} THURSDAY_CDE The Thursday code
 * @property {string} FRIDAY_CDE The Friday code
 * @property {TimeSpan} BEGIN_TIME The beginning of the event
 * @property {TimeSpan} END_TIME The end of the event
 */

/**
 * Get course schedule for the current user
 *
 * @returns {Promise.<Schedule[]>} returns all the course schedules
 */
const getScheduleMyProf = async () => {
  let schedule;
  schedule = await http.get('schedule');
  return schedule;
};

/**
 * Check if the current user user can see student schedules
 *
 * @returns {bool} true if user can see student schedule, else false
 */
const getCanReadStudentSchedules = () => {
  return http.get(`schedule/canreadstudent/`);
};

/**
 * Get course schedule for a given user
 *
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<Schedule[]>} returns all the course schedules
 */
const getSchedule = async (username) => {
  let schedule;
  schedule = await http.get(`schedule/${username}/`);

  return schedule;
};

/**
 * Find out which day of the week the course is assigned
 *
 * @param {Promise.<Schedule>} course an individual course
 * @returns {number[]} returns array of day in the format of ResourceID
 */
function checkDayofWeek(course) {
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

/**
 * Format the given schedule and make event array
 *
 * @param {Promise.<Schedule[]>} schedule all course schedules
 * @returns {Promise.Object[]} returns array of events
 */
async function makeScheduleCourses(schedule) {
  let course = await schedule.then((courseSchedule) => {
    return courseSchedule;
  });
  let today = moment();
  let eventArray = [];
  let eventId = 0;
  for (let i = 0; i < course.length; i++) {
    course[i].CRS_CDE = course[i].CRS_CDE.trim();
    course[i].CRS_TITLE = course[i].CRS_TITLE.trim();
    let beginTime = moment(course[i].BEGIN_TIME, 'HH:mm:ss');
    beginTime.set('y', today.year());
    beginTime.set('M', today.month());
    beginTime.set('d', today.day());
    let endTime = moment(course[i].END_TIME, 'HH:mm:ss');
    endTime.set('y', today.year());
    endTime.set('M', today.month());
    endTime.set('d', today.day());
    let dayArray = checkDayofWeek(course[i]);
    let courseTitle = course[i].CRS_CDE + ' in ' + course[i].BLDG_CDE + ' ' + course[i].ROOM_CDE;
    for (let j = 0; j < dayArray.length; j++) {
      const courseEvent = {
        id: eventId,
        title: courseTitle,
        start: beginTime.toDate(),
        end: endTime.toDate(),
        resourceId: dayArray[j],
      };
      eventArray.push(courseEvent);
      eventId++;
    }
    eventId++;
  }
  return eventArray;
}

const scheduleService = {
  getSchedule,
  getScheduleMyProf,
  makeScheduleCourses,
  getCanReadStudentSchedules,
};

export default scheduleService;
