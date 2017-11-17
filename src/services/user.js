/**
 * User
 *
 * @module User
 */
import http from './http';
import session from './session';
import storage from './storage';

/**
 * Get all activities for a session, sorted alphabetically by description
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<User[]>}
 */
const getAttendedEvents = (username, termCode) =>
  http.get(`events/chapel/${username}/${termCode}`);

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
