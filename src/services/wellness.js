/**
 * Wellness Check API call functions
 * establishes the functions necessary to make calls to the back end.
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
 * @return {Promise<any>} Response
 */
const getStatus = async () => {
  return await http.get(`wellness`);
};

/**
 * returns questions to be displayed in the UI
 * @return {Promise<any>} list of questions from backend
 */
const getQuestion = async () => {
  return await http.get(`wellness/question`);
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
  getStatus, getQuestion, postAnswer
};
