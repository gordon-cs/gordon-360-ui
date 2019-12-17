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
 * @return {Promis<any>} Response body
 */
const submitStudentNews = async (data) => {
  let headerOptions = { key: 'this is a post' };
  return await http.post(`student-news`, data, headerOptions);
};

export default {
  get,
  getStudentNews,
  submitStudentNews,
};
