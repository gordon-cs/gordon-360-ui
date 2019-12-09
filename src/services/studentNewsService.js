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

export default {
  get,
};
