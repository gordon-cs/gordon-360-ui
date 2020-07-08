import wellness from '../../../../services/wellness.js';
import user from '../../../../services/user';

let currentUser, qOne;

/*
 * Fetches the user's data
 */
async function getUserData() {
  currentUser = await user.getProfileInfo().catch(error => {
    console.log(error.message);
  });
}

export async function getQuestions() {
  await getUserData();
  let backendQuestions = await wellness.getQuestion();

  let phoneNumber = `(${currentUser.MobilePhone.substring(
    0,
    3,
  )}) ${currentUser.MobilePhone.substring(3, 6)}-${currentUser.MobilePhone.substring(6)}`;

  //comment below disables the eslint warning so we can execute dynamic string parsing without warnings

  /* eslint-disable no-template-curly-in-string */
  let wellnessQuestion = backendQuestions[0].question.replace(
    '${user.FirstName}',
    `${currentUser.FirstName}`,
  );
  wellnessQuestion = wellnessQuestion.replace('${user.LastName}', `${currentUser.LastName}`);
  wellnessQuestion = wellnessQuestion.replace('${phoneNumber}', `${phoneNumber}`);

  let yesPrompt = backendQuestions[0].yesPrompt.replace(
    '${user.FirstName}',
    `${currentUser.FirstName}`,
  );
  yesPrompt = yesPrompt.replace('${user.LastName}', `${currentUser.LastName}`);
  yesPrompt = yesPrompt.replace('${phoneNumber}', `${phoneNumber}`);

  let noPrompt = backendQuestions[0].noPrompt.replace(
    '${user.FirstName}',
    `${currentUser.FirstName}`,
  );
  noPrompt = noPrompt.replace('${user.LastName}', `${currentUser.LastName}`);
  noPrompt = noPrompt.replace('${phoneNumber}', `${phoneNumber}`);
  /* eslint-enable no-template-curly-in-string */

  qOne = {
    question: wellnessQuestion,
    symptoms: [
      'Temperature higher than 100.4',
      'New loss of taste or smell',
      'Sore throat',
      'Muscle pain',
      'Cough',
      'Shortness of breath or difficulty breathing',
      'Fever',
      'Chills',
    ],
    no: {
      question: noPrompt,
    },
    yes: {
      question: [yesPrompt],
    },
    //phone: currentUser.MobilePhone,
    //email: currentUser.Email,
  };

  let questions = {
    qOne,
  };

  return questions;
}
