/**
 * wellness check
 *
 * @module wellness
 */

import http from './http';

/**
 * @global
 * @typedef boolean
 * @property {status}//a boolean that tells if a student is symptomatic
 * 
 */

/**
 * returns current status of student
 * @return {Wellness.<status>} scores
 */
const getStatus = async () => {
  return await http.get(`wellness`);
};

export default {
  getStatus,
};
