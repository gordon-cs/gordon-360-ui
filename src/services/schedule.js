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
 * @property {Number} IDNum
 * @property {String} CourseCode
 * @property {String} CourseTitle
 * @property {String} BuildingCode
 * @property {int} RoomCode
 * @property {String} MonCode
 * @property {String} TueCode
 * @property {String} WedCode
 * @property {String} ThuCode
 * @property {String} FriCode
 * @property {DateTime} BeginTime
 * @property {DateTime} EndTime
 */

/**
 * Get course schedule for profile
 * @return {Promise.<Schedule[]>} returns all the course schedules
 */

const getSchedule = username => {
  let schedule;
  if (username) {
    schedule = http.get(`schedule/${username}/`);
  } else {
    schedule = http.get('schedule');
  }
  return schedule;
};

function checkDayofWeek(schedule) {
  let dayArray = [];

  if (schedule.MonCode) {
    dayArray.push(2);
  } else if (schedule.TueCode) {
    dayArray.push(3);
  } else if (schedule.WedCode) {
    dayArray.push(4);
  } else if (schedule.ThuCode) {
    dayArray.push(5);
  } else if (schedule.FriCode) {
    dayArray.push(6);
  }

  return dayArray;
}

function makeScheduleCourses(schedule) {
  let today = moment();
  let eventArray = [];
  let eventId = 0;

  for (let i = 0; i < schedule.length(); i++) {
    let beginTime = moment(schedule[i].BeginTime);
    beginTime.set('y', today.year());
    beginTime.set('m', today.month());
    beginTime.set('d', today.day());

    let endTime = moment(schedule[i].EndTime);
    endTime.set('y', today.year());
    endTime.set('m', today.month());
    endTime.set('d', today.day());

    let dayArray = checkDayofWeek(schedule[i]);

    let courseTitle =
      schedule[i].CourseCode +
      '\n' +
      schedule[i].CourseTitle +
      '\n' +
      schedule[i].BuildingCode +
      ' ' +
      schedule[i].RoomCode;

    for (let j = 0; j < dayArray.length(); j++) {
      const course = {
        id: eventId,
        title: courseTitle,
        start: beginTime.toDate(),
        end: endTime.toDate(),
        resourceId: dayArray[j],
      };
      eventArray.push(course);
      eventId++;
    }
    eventId++;
  }
  return eventArray;
}

const getScheduleCourses = username => {
  return makeScheduleCourses(getSchedule(username));
};

export default {
  getSchedule,
  makeScheduleCourses,
  getScheduleCourses,
};
