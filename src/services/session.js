/**
 * Session
 *
 * @module session
 */

import http from './http';

/**
 * @global
 * @typedef Session
 * @property {String} SessionBeginDate
 * @property {String} SessionCode
 * @property {String} SessionDescription
 * @property {String} SessionEndDate
 */

/**
 * @global
 * @typedef {Number[]} DaysLeft Contains days left and days completed
 * @example
 * [
 *   17,  // 17 days remaining
 *   113  // 113 days completed
 * ]
 */

/**
 * Get sessions
 * @return {Promise.<Session[]>} List of sessions
 */
const getAll = () => http.get('sessions').then(sessions => sessions.reverse());

/**
 * Get current session
 * @return {Promise.<Session>} Current session
 */
const getCurrent = () => http.get('sessions/current');

/**
 * Get days left in the session
 * @return {Promise.<DaysLeft>} Days left in session
 */
const getDaysLeft = () => http.get('sessions/daysLeft');

/**
 * Get current term code
 * @return {String} Term code, ex: '17SP'
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

export default {
  getAll,
  getCurrent,
  getDaysLeft,
  getTermCode,
};
