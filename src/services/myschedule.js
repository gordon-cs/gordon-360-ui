/**
 * MySchedule
 *
 * @module myschedule
 */

import moment from 'moment';
import http from './http';

/**
 * @global
 * @typedef MySchedule
 * @property {number} EVENT_ID
 * @property {String} LOCATION
 * @property {String} DESCRIPTION
 * @property {String} MON_CDE
 * @property {String} TUE_CDE
 * @property {String} WED_CDE
 * @property {String} THU_CDE
 * @property {String} FRI_CDE
 * @property {String} SAT_CDE
 * @property {String} SUN_CDE
 * @property {boolean} IS_ALLDAY
 * @property {TimeSpan} BEGIN_TIME
 * @property {TimeSpan} END_TIME
 */

/**
 * Get custom schedule for profile
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<MySchedule[]>} returns all the custom schedules
 */

const getMySchedule = async (username) => {
  let schedule;
  if (username) {
    schedule = await http.get(`myschedule/${username}/`);
  } else {
    schedule = await http.get('myschedule');
  }
  return schedule;
};

/**
 * Get specific schedule for profile by event id
 * @param {String} eventId Event ID of myschedule
 * @return {Promise.<MySchedule>} returns the custom schedules
 */

const getMyScheduleEventId = async (eventId) => {
  let schedule = await http.get(`myschedule/event/${eventId}/`);
  return schedule;
};

/**
 * Find out which day of the week the event is assigned
 * @param {Promise.<MySchedule>} event an individual course
 * @return {number[]} returns array of day in the format of ResourceID
 */

function checkDayofWeek(event) {
  let dayArray = [];

  if (event.SUN_CDE === 'N') {
    dayArray.push(1);
  }
  if (event.MON_CDE === 'M') {
    dayArray.push(2);
  }
  if (event.TUE_CDE === 'T') {
    dayArray.push(3);
  }
  if (event.WED_CDE === 'W') {
    dayArray.push(4);
  }
  if (event.THU_CDE === 'R') {
    dayArray.push(5);
  }
  if (event.FRI_CDE === 'F') {
    dayArray.push(6);
  }
  if (event.SAT_CDE === 'S') {
    dayArray.push(7);
  }

  return dayArray;
}

/**
 * Format the given schedule and make event array
 * @param {Promise.<MySchedule[]>} myschedule all custom schedules
 * @return {Promise.Object[]} returns array of events
 */

async function makeMySchedule(myschedule) {
  let events = await myschedule.then((mySchedule) => {
    return mySchedule;
  });
  let today = moment();
  let eventArray = [];
  for (let i = 0; i < events.length; i++) {
    let beginTime = moment(events[i].BEGIN_TIME, 'HH:mm:ss');
    beginTime.set('y', today.year());
    beginTime.set('M', today.month());
    beginTime.set('d', today.day());
    let endTime = moment(events[i].END_TIME, 'HH:mm:ss');
    endTime.set('y', today.year());
    endTime.set('M', today.month());
    endTime.set('d', today.day());
    let dayArray = checkDayofWeek(events[i]);
    let eventTitle = events[i].DESCRIPTION + ' in ' + events[i].LOCATION;
    for (let j = 0; j < dayArray.length; j++) {
      const customEvent = {
        id: parseInt(events[i].EVENT_ID, 10),
        title: eventTitle,
        start: beginTime.toDate(),
        end: endTime.toDate(),
        resourceId: dayArray[j],
        allDay: events[i].IS_ALLDAY,
      };
      eventArray.push(customEvent);
    }
  }
  return eventArray;
}

/**
 * Add mySchedule of the profile
 * @param {Object} mySchedule of the local user
 * @return {Promise<any>} Response body
 */

const addMySchedule = async (mySchedule) => {
  return http.post(`myschedule/`, mySchedule);
};

/**
 * Update mySchedule of the profile
 * @param {Object} mySchedule of the local user
 * @return {Promise<any>} Response body
 */

const updateMySchedule = async (mySchedule) => {
  return http.put(`myschedule/`, mySchedule);
};

/**
 * Delete mySchedule of the profile
 * @param {String} eventID of the selected event
 * @return {Promise<any>} Response body
 */

const deleteMySchedule = (eventID) => {
  return http.del(`myschedule/${eventID}`);
};

const myScheduleService = {
  getMyScheduleEventId,
  getMySchedule,
  makeMySchedule,
  addMySchedule,
  updateMySchedule,
  deleteMySchedule,
};

export default myScheduleService;
