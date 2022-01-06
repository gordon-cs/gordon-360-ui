/**
 * Wellness Check API call functions
 * establishes the functions necessary to make calls to the back end.
 *
 * @module wellness
 */

import http from './http';
import user from './user';

/**
 * Enum of the Wellness Status Colors
 *
 * @readonly
 * @enum {string}
 */
export const StatusColors = {
  /** Healthy, no known symptoms or exposure */
  GREEN: 'GREEN',
  /** Self-reported symptoms */
  YELLOW: 'YELLOW',
  /** Confirmed symtpoms or exposure */
  RED: 'RED',
};

/**
 * @typedef {('GREEN'|'YELLOW'|'RED')} StatusColor
 */

/**
 * @global
 * @typedef WellnessStatus
 * @property {StatusColor} Status The user's status
 * @property {Date} Created when the status was created
 * @property {boolean} IsValid whether the status has expired
 * @property {string} [StatusDescription] A custom description of the user's status
 */

/**
 * @global
 * @typedef WellnessQuestion
 * @property {string} wellnessQuestion the text content of the question
 * @property {Array<string>} symptoms the list of symptoms
 * @property {string} yesPrompt the text disclaimer for a positive answer
 * @property {string} noPrompt the text disclaimer for a negative answer
 * @property {string} link the text of the link to HR's flowchart
 */

/**
 * returns current status of student
 *
 * @returns {Promise<WellnessStatus>} Response
 */
const getStatus = () => {
  return http.get('wellness');
};

/**
 * add answer to the wellness question to the back end
 *
 * @param {StatusColor} status status to be recorded
 * @returns {Promise<WellnessStatus>} The status that was posted, if successful
 */
const postAnswer = (status) => {
  try {
    return http.post('wellness', status);
  } catch (error) {
    return console.log(error);
  }
};

/**
 * returns questions to be displayed in the UI
 *
 * @returns {Promise<WellnessQuestion>} list of questions from backend
 */
const getQuestion = async () => {
  const question = await http.get('wellness/question');
  return formatQuestion(question);
};

/**
 * Formats the wellness question and answer prompts for display
 *
 * @param {Object} question The question stored in database
 * @param {string} question.question The text of the question
 * @param {string} question.yesPrompt The text disclaimer for a symptoms-positive answer
 * @param {string} question.noPrompt The text disclaimer for a symptoms-negative answer
 * @returns {Promise<WellnessQuestion>} The wellness question parsed into an object for display
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

  question.symptoms = [
    'Fever or chills',
    'Cough',
    'Shortness of breath or difficulty breathing',
    'Fatigue',
    'Muscle or body aches',
    'Headache',
    'New loss of taste or smell',
    'Sore throat',
    'Congestion or runny nose',
    'Nausea or vomiting',
    'Diarrhea',
  ];

  return question;
};

const wellnessService = {
  getStatus,
  getQuestion,
  postAnswer,
};

export default wellnessService;
