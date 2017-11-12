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
 * Get sessions
 * @return {Promise.<Session[]>}
 */
const getAll = () => http.get('sessions').then(sessions => sessions.reverse());

/**
 * Get current session
 * @return {Promise.<Session>}
 */
const getCurrent = () => http.get('sessions/current');

export default {
  getAll,
  getCurrent,
};
