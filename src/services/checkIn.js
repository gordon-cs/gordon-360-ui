/**
 * AcademicCheckIn Check API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module AcademicCheckIn
 */

 import http from './http';
 import user from './user';

 /**
  * Enum of the AcademicCheckIn Status
  * @readonly
  * @enum {string}
  */
 export const Status = {
   /** On campus and confirmed checkIn */
   ONCAMPUS: 'ONCAMPUS',
   /** Not yet arrived on campus for semester */
   NOTONCAMPUS: 'NOTONCAMPUS',
 };


 /**
  * @global
  * @typedef academicCheckInStatus
  * @property {Status} Status The user's status
  * @property {Date} Created when the status was created
  * @property {boolean} IsValid whether the status has expired
  *
  */

 /**
  * @global
  * @typedef academicCheckInQuestion
  * @property {string} academicCheckInQuestion the text content of the question
  * @property {string} yesPrompt the text disclaimer for a positive answer
  * @property {string} noPrompt the text disclaimer for a negative answer
  *
  */

 /** Returns current status of student
  *
  * @returns {Promise<AcademicCheckInStatus>} Response
  */
 const getStatus = () => {
   return http.get('academicCheckIn');
 };

 /** Adds answer to the checkIn question to the back end
 *
 * @param {Status} status status to be recorded
 * @return {Promise<AcademicCheckInStatus>} The status that was posted, if successful
 */
const postAnswer = (status) => {
    try {
      return http.post('academicCheckIn', status);
    } catch (error) {
      return console.log(error);
    }
  };

/** Returns questions to be displayed in the UI
 *
 * @returns {Promise<AcademicCheckInQuestion>} list of questions from backend
 */
 const getQuestion = async () => {
    const question = await http.get('checkIn/question');
    return formatQuestion(question);
  };

/** Formats the checkIn question and answer prompts for display
 *
 * @param {Object} question The question stored in database
 * @param {string} question.question The text of the question
 * @param {string} question.yesPrompt The text disclaimer for a positive answer
 * @param {string} question.noPrompt The text disclaimer for a negative answer
 * @returns {Promise<AcademicCheckInQuestion>} The checkIn question parsed into an object for display
 *
 */
const formatQuestion = async (question) => {
    const { FirstName, LastName } = await user.getProfileInfo();
    /* eslint-disable no-template-curly-in-string */
    question.question = question.question
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);

    let [yesPrompt, link] = question.yesPrompt.split('https://');

    question.yesPrompt = yesPrompt
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);
    question.link = 'https://' + link;

    question.noPrompt = question.noPrompt
    .replace('${user.FirstName}', `${FirstName}`)
    .replace('${user.LastName}', `${LastName}`);
    /* eslint-enable no-template-curly-in-string */

    return question;
};

const checkInService = {
    getStatus,
    getQuestion,
    postAnswer,
  };

  export default checkInService;
