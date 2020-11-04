/**
 * Wellness Check API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module wellness
 */

import http from './http';
import user from './user';

/**
 * @global
 * @typedef WellnessStatus
 * @property {?boolean} answerValid whether the answer is still valid (new since 5am)
 * @property {?boolean} userAnswer whether the user is symptomatic
 * @property {Date} timestamp when the answer was submitted
 *
 */

/**
 * @global
 * @typedef BackendQuestion
 * @property {string} question the text of the question
 * @property {string} yesPrompt the text disclaimer for a positive answer
 * @property {string} noPrompt the text disclaimer for a negative answer
 *
 */

/**
 * @global
 * @typedef WellnessQuestion
 * @property {string} wellnessQuestion the text content of the question
 * @property {Array<string>} symptoms the list of symptoms
 * @property {string} yes the text disclaimer for a positive answer
 * @property {string} no the text disclaimer for a negative answer
 * @property {string} link the text of the link to HR's flowchart
 *
 */

/**
 * returns current status of student
 * @returns {Promise<Array<WellnessStatus>>} Response
 */
const getStatus = async () => {
  return await http.get(`wellness`);
};

/**
 * add answer to the wellness question to the back end
 * @param {boolean} answer answer to be recorded
 * @return {Promise<WellnessStatus | Error>} Response
 */
function postAnswer(answer) {
  return http.post('wellness', answer).catch((reason) => {
    console.log(reason);
  });
}

/**
 * returns questions to be displayed in the UI
 * @returns {Promise<WellnessQuestion>} list of questions from backend
 */
const getQuestion = async () => {
  const questions = await getBackendQuestions();
  return await formatQuestion(questions);
};

/**
 * Formats the wellness question and answer prompts for display
 * @param {Array<BackendQuestion>} questions Array of questions stored in database
 * @returns {Promise<WellnessQuestion>} The wellness question parsed into an object for display
 *
 */
const formatQuestion = async (questions) => {
  const { FirstName, LastName } = await user.getProfileInfo();

  /* eslint-disable no-template-curly-in-string */
  let wellnessQuestion = questions[0].question.replace('${user.FirstName}', `${FirstName}`);
  wellnessQuestion = wellnessQuestion.replace('${user.LastName}', `${LastName}`);

  let [yesPrompt, link] = questions[0].yesPrompt.split('https://');

  yesPrompt = yesPrompt.replace('${user.FirstName}', `${FirstName}`);
  yesPrompt = yesPrompt.replace('${user.LastName}', `${LastName}`);
  link = 'https://' + link;

  let noPrompt = questions[0].noPrompt.replace('${user.FirstName}', `${FirstName}`);
  noPrompt = noPrompt.replace('${user.LastName}', `${LastName}`);
  /* eslint-enable no-template-curly-in-string */

  return {
    question: wellnessQuestion,
    symptoms: [
      'Temperature higher than 100.4°F',
      'New loss of taste or smell',
      'Sore throat',
      'Muscle pain',
      'Cough',
      'Shortness of breath or difficulty breathing',
      'Fever',
      'Chills',
    ],
    yes: yesPrompt,
    no: noPrompt,
    link: link,
  };
};

/**
 * returns questions fetched from the API
 * @returns {Promise<Array<BackendQuestion>>} list of questions from backend
 */
const getBackendQuestions = async () => {
  return http.get(`wellness/question`);
};

export default {
  getStatus,
  getQuestion,
  postAnswer,
};
