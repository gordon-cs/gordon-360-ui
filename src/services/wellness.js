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

/**
 * add answer to the wellness question to the back end
 * @param {Object} data Data passed in
 * @return {Promise<any>} Response
 */
function postAnswer(data) {
  return http.post('wellness', data).catch(reason => {
    console.log(reason);
  });
}

export default {
  getStatus, postAnswer,
};
