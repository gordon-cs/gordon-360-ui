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

// "/events/chapel/" + id_name + "/" + termCode
const getAttendedEvents = (username, termCode, sessionCode) =>
  http.get(`events/chapel/${username}/${termCode}/${sessionCode}`);

const getChapelCredits = async () => {
  const { SessionCode: sessionCode } = await session.getCurrent();
  const { username } = storage.get('credentials');
  const termCode = '17FA';
  const attendedEvents = await getAttendedEvents(username, termCode, sessionCode);
  return {
    current: attendedEvents.length,
    required: attendedEvents[0].required,
  };
};

export default {
  getAttendedEvents,
  getChapelCredits,
};
