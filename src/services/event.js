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
 * @return {Promise.<Event[]>}
 */
const getAllEvents = () => http.get('events/25Live/All');

export default {
  getAllEvents,
};
