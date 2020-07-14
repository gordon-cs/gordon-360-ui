import wellness from '../../../../services/wellness.js';
import userInfo from '../../../../services/user.js';

let user, qOne;

/*
* Fetches the user's data
*
* @return {JSON} The JSON data of the current user
*/
async function getUserData() {
  user = await userInfo.getProfileInfo();
}

export async function getQuestions() {
  
  await getUserData();
  let backendQuestions = await wellness.getQuestion();
  
  let contactInfo;
  
  if((user.MobilePhone === undefined || user.MobilePhone === "") && user.HomePhone === "" ){
    contactInfo = user.Email;
  } 
  
  else if(user.MobilePhone === undefined){
    contactInfo = user.HomePhone;
  } else {
      contactInfo = `(${user.MobilePhone.substring(0, 3)}) ${user.MobilePhone.substring(
          3,
          6,
        )}-${user.MobilePhone.substring(6)}`;
  }
  

  // comment below disables the eslint warning so we can execute dynamic string parsing without warnings
  /* eslint-disable no-template-curly-in-string */
  let wellnessQuestion = backendQuestions[0].question.replace("${user.FirstName}", `${user.FirstName}`);
  wellnessQuestion = wellnessQuestion.replace("${user.LastName}", `${user.LastName}`);
  wellnessQuestion = wellnessQuestion.replace("${contactInfo}", `${contactInfo}`);

  let yesPrompt = backendQuestions[0].yesPrompt.replace("${user.FirstName}", `${user.FirstName}`);
  yesPrompt = yesPrompt.replace("${user.LastName}", `${user.LastName}`);
  yesPrompt = yesPrompt.replace("${contactInfo}", `${contactInfo}`);

  let noPrompt = backendQuestions[0].noPrompt.replace("${user.FirstName}", `${user.FirstName}`);
  noPrompt = noPrompt.replace("${user.LastName}", `${user.LastName}`);
  noPrompt = noPrompt.replace("${contactInfo}", `${contactInfo}`); 
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
      question: [
        yesPrompt

      ],
    },
    //phone: user.MobilePhone,
    //email: user.Email,
  };

  let questions = {
    qOne,
  };

  return questions;
}
