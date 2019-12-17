/**
 * Student News
 *
 * @module studentNews
 */

import http from './http';

/**
 * Get today's student news
 * @return {Promise.<String{}>} Student news
 */

const get = () => {
  return http.get(`student-news`);
};

const getStudentNews = async () => {
  return await http.get(`student-news`);
};

/**
 * Submits a student news
 * @param {any} data The data which makes up the student news item
 * @return {Promise<any>} Response body
 */
const submitStudentNews = async data => {
  return await http.post(`student-news/submit`, data);
};

export default {
  get,
  getStudentNews,
  submitStudentNews,
};
