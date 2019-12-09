/**
 * Student News
 *
 * @module news
 */

import http from './http';

const getStudentNews = async () => {
  return await http.get(`student-news`);
};

export default {
  getStudentNews,
};
