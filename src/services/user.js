/**
 * User
 *
 * @module User
 */
import http from './http';
import session from './session';
import storage from './storage';

/**
 * Get events attended by the user
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<attendedEvents[]>}
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
