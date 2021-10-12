/**
 * Session
 *
 * @module session
 */

import http from './http';

/**
 * @global
 * @typedef Session
 * @property {string} SessionBeginDate The beginning of the session
 * @property {string} SessionCode The session code
 * @property {string} SessionDescription The session description
 * @property {string} SessionEndDate The end of the session
 */

/**
 * @global
 * @typedef {number[]} DaysLeft contains remaining and completed days in current session
 * @example
 * [
 *   17,  // 17 days remaining
 *   113  // 113 days completed
 * ]
 */

/**
 * Get a session
 *
 * @param {string} sessionCode Identifier for a session
 * @returns {Promise.<Session>} Session
 */
const get = (sessionCode) => http.get(`sessions/${sessionCode}`);

/**
 * Get sessions
 *
 * @returns {Promise.<Session[]>} List of sessions
 */
const getAll = () => http.get('sessions').then((sessions) => sessions.reverse());

/**
 * Convert a session code to a readable session
 * e.g. '202109' -> '2021fall'
 *
 * @param {string} sessionCode the session code
 * @returns {Promise.<Session[]>} List of sessions
 */
const decodeSessionCode = (sessionCode) => {
  let sessionCodeYear = sessionCode.substr(0, 4);
  let sessionCodeSeason = sessionCode.substr(4);
  switch (sessionCodeSeason) {
    case '01':
      return sessionCodeYear + 'winter';
    case '05':
      return sessionCodeYear + 'summer';
    case '09':
      return sessionCodeYear + 'fall';
    default:
      break;
  }
  return sessionCode;
};

/**
 * Convert a readable session code to a session code
 * e.g. '2021fall' -> '202109'
 *
 * @param {string} readableSessionCode the readable session code
 * @returns {Promise.<Session[]>} List of sessions
 */
const encodeSessionCode = (readableSessionCode) => {
  let sessionCodeYear = readableSessionCode.substr(0, 4);
  let sessionCodeSeason = readableSessionCode.substr(4);
  switch (sessionCodeSeason) {
    case 'winter':
      return sessionCodeYear + '01';
    case 'summer':
      return sessionCodeYear + '05';
    case 'fall':
      return sessionCodeYear + '09';
    default:
      break;
  }
  return readableSessionCode;
};

/**
 * Get current session
 *
 * @returns {Promise.<Session>} Current session
 */
const getCurrent = () => http.get('sessions/current');

/**
 * Get first day in the session
 *
 * @returns {Promise.<firstDay>} First day in session
 */
const getFirstDay = () => http.get('sessions/firstDay');

/**
 * Get last day in the session
 *
 * @returns {Promise.<lastDay>} Last day in session
 */
const getLastDay = () => http.get('sessions/lastDay');

/**
 * Get days left in the session
 *
 * @returns {Promise.<DaysLeft>} Days left in session
 */
const getDaysLeft = () => http.get('sessions/daysLeft');

/**
 * Get current term code
 *
 * @returns {string} Term code, ex: '17SP'
 */
const getTermCode = () => {
  const now = new Date();
  const terms = {
    spring: 'SP',
    fall: 'FA',
  };

  // Decide what term it is, defaulting to fall
  let term = terms.fall;
  let year = now.getFullYear();
  if (now.getMonth() <= 6) {
    term = terms.spring;
    // If spring term, decrement current year to get current academic year
    year -= 1;
  }

  return `${year.toString().substr(-2)}${term}`;
};

const sessionService = {
  get,
  getAll,
  decodeSessionCode,
  encodeSessionCode,
  getCurrent,
  getFirstDay,
  getLastDay,
  getDaysLeft,
  getTermCode,
};

export default sessionService;
