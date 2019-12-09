/**
 * Student News
 *
 * @module news
 */

import http from './http';

/**
 * @global
 * @typedef StudentNews
 * @property {String} im subject
 * @property {String} cc submittedBy
 * @property {String} ls description
 * @property {Date} lw dateSubmitted
 */

/**
 * Get student news
 * @return {JSON}
 */
const getStudentNews = async () => {
  return await http.get(`student-news`);
};

/**
 * Submits a student news
 * @return {Promis<any>} Response body
 */
const submitStudentNews = async (data) => {
  let headerOptions = { key: 'this is a post' };
  return await http.post(`student-news`, data, headerOptions);
};

export default {
  getStudentNews,
  submitStudentNews,
};
