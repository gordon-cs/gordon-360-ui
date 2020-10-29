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
 * @property {String} CRS_CDE
 * @property {String} CRS_TITLE
 * @property {String} BLDG_CDE
 * @property {String} ROOM_CDE
 * @property {String} MONDAY_CDE
 * @property {String} TUESDAY_CDE
 * @property {String} WEDNESDAY_CDE
 * @property {String} THURSDAY_CDE
 * @property {String} FRIDAY_CDE
 * @property {TimeSpan} BEGIN_TIME
 * @property {TimeSpan} END_TIME
 */

/**
 * Get course schedule for the current user
 * @return {Promise.<Schedule[]>} returns all the course schedules
 */

const getScheduleMyProf = async () => {
  let schedule;
  schedule = await http.get('schedule');
  return schedule;
};

/**
 * Get course schedule for a given user
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Schedule[]>} returns all the course schedules
 */

const getSchedule = async username => {
  let schedule;
  schedule = await http.get(`schedule/${username}/`);

  return schedule;
};

/**
 * Find out which day of the week the course is assigned
 * @param {Promise.<Schedule>} course an individual course
 * @return {number[]} returns array of day in the format of ResourceID
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
 * @param {Promise.<Schedule[]>} schedule all course schedules
 * @return {Promise.Object[]} returns array of events
 */

async function makeScheduleCourses(schedule) {
  let course = await schedule.then(courseSchedule => {
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

export default {
  getSchedule,
  getScheduleMyProf,
  makeScheduleCourses,
};
