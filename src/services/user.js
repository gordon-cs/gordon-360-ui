/**
 * User
 *
 * @module User
 */
import http from './http';
import session from './session';
import storage from './storage';

/**
 * @global
 * @typedef User
 * @property {int} current user's current cl&w credits
 * @property {int} required user's required cl&w credits
 */

/**
 * Get events attended by the user
 * @param {String} termCode code for the semester
 * @param {String} username username of the user
 * @return {Promise.<attendedEvents>}
 */
const getAttendedEvents = (username, termCode) =>
  http.get(`events/chapel/${username}/${termCode}`);

  /**
 * return the number of cl&w credits aquired, and number of credits required.
 * @return {Promise.<User[]>}
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
