/**
 * User
 *
 * @module user
 */
import http from './http';
import session from './session';
import storage from './storage';

/**
 * @global
 * @typedef CLWCredits
 * @property {Number} current user's current cl&w credits
 * @property {Number} required user's required cl&w credits
 */

/**
 * @global
 * @typedef AttendedEvent
 * @property {Object} CHDate Start time of the event
 * @property {String} CHTermCD Term code of the event
 * @property {Object} CHTime Time your ID was scanned
 * @property {Number} Category_ID catagory of the event
 * @property {String} Description Given discription of the event
 * @property {String} Event_Name The generic name of the event
 * @property {String} Event_Title Specific title of the event
 * @property {String} Event_Type_Name Term code of the event
 * @property {Array} Occurrences An array with the locations, start, and end times of future events
 * @property {String} Organization Organization hosting the event
 * @property {Number} Required Required chapel for the student
*/

/**
 * Get events attended by the user
 * @param {String} username username of the user
 * @param {String} termCode code for the semester
 * @return {Promise.<AttendedEvent[]>} An object of all CL&W events attended by the user
 */
const getAttendedEvents = (username, termCode) =>
  http.get(`events/chapel/${username}/${termCode}`);

/**
 * return the number of cl&w credits aquired, and number of credits required.
 * @return {Promise.<CLWCredits>} An Object of their current and requiered number of CL&W events,
 */
const getChapelCredits = async () => {
  const { username } = storage.get('credentials');
  const termCode = session.getTermCode();
  const attendedEvents = await getAttendedEvents(username, termCode);

  // Get required number of CL&W credits for the student, defaulting to zero
  let required = 0;
  if (attendedEvents.length > 0) {
    ([{ Required: required }] = attendedEvents);
  }

  return {
    current: attendedEvents.length,
    required,
  };
};

export default {
  getAttendedEvents,
  getChapelCredits,
};
