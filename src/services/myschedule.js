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
 * @property {number} EVENT_ID The event ID
 * @property {string} LOCATION The event location
 * @property {string} DESCRIPTION The event description
 * @property {string} MON_CDE The Monday Code
 * @property {string} TUE_CDE The Tuesday Code
 * @property {string} WED_CDE The Wednesday Code
 * @property {string} THU_CDE The Thursday Code
 * @property {string} FRI_CDE The Friday Code
 * @property {string} SAT_CDE The Saturday Code
 * @property {string} SUN_CDE The Sunday Code
 * @property {boolean} IS_ALLDAY Whether the Event is all day
 * @property {TimeSpan} BEGIN_TIME The beginning of the event
 * @property {TimeSpan} END_TIME The end of the event
 */

/**
 * Get custom schedule for profile
 *
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<MySchedule[]>} returns all the custom schedules
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
 *
 * @param {string} eventId Event ID of myschedule
 * @returns {Promise.<MySchedule>} returns the custom schedules
 */

const getMyScheduleEventId = async (eventId) => {
  let schedule = await http.get(`myschedule/event/${eventId}/`);
  return schedule;
};

/**
 * Find out which day of the week the event is assigned
 *
 * @param {Promise.<MySchedule>} event an individual course
 * @returns {number[]} returns array of day in the format of ResourceID
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
 *
 * @param {Promise.<MySchedule[]>} myschedule all custom schedules
 * @returns {Promise.Object[]} returns array of events
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
 *
 * @param {Object} mySchedule of the local user
 * @returns {Promise<any>} Response body
 */

const addMySchedule = async (mySchedule) => {
  return http.post(`myschedule/`, mySchedule);
};

/**
 * Update mySchedule of the profile
 *
 * @param {Object} mySchedule of the local user
 * @returns {Promise<any>} Response body
 */

const updateMySchedule = async (mySchedule) => {
  return http.put(`myschedule/`, mySchedule);
};

/**
 * Delete mySchedule of the profile
 *
 * @param {string} eventID of the selected event
 * @returns {Promise<any>} Response body
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
