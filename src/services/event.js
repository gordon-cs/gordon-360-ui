/**
 * Event
 *
 * @module event
 */

import http from './http';

/**
 * The first element is the start time of the event, the second element is the end time of the
 * event, and the third element is the location of the event.
 * @global
 * @typedef {Array} EventOccurrence
 * @example
 * [
 *   "2017-11-18T19:00:00-05:00",
 *   "2017-11-18T22:00:00-05:00",
 *   "Tavilla Hall 126 - Conference Room"
 * ]
 */

/**
 * @global
 * @typedef Event
 * @property {String} Event_ID
 * @property {String} Event_Name
 * @property {String} Event_Title
 * @property {String} Event_Type_Name
 * @property {Number} Category_Id
 * @property {String} Description
 * @property {EventOccurrence[]} Occurrences
 */

/**
 * Get all events
 * @return {Promise.<Event[]>} returns all the events
 */

const getAllEvents = () => http.get('events/25Live/All');

const getAllCLAWEvents = () => http.get('/events/25Live/CLAW');

function sortByTime(a, b) {
  if (a.Occurrences[0][0] < b.Occurrences[0][0]) {
    return -1;
  }
  if (a.Occurrences[0][0] > b.Occurrences[0][0]) {
    return 1;
  }
  return 0;
}

const getCLWEvents = async () => {
  const allEvents = await getAllCLAWEvents();
  const chapelEvents = [];
  const date = new Date().getTime();
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    const startDate = new Date(allEvents[i].Occurrences[0][0]).getTime();

    if (startDate > date) {
      chapelEvents.push(allEvents[i]);
    }
  }
  return chapelEvents.sort(sortByTime);
};

const getFutureEvents = async () => {
  const allEvents = await getAllEvents();
  const futureEvents = [];
  const date = new Date().getTime();
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    const startDate = new Date(allEvents[i].Occurrences[0][0]).getTime();

    if (startDate > date) {
      futureEvents.push(allEvents[i]);
    }
  }
  return futureEvents.sort(sortByTime);
};

export default {
  getAllEvents,
  getFutureEvents,
  getCLWEvents,
};
