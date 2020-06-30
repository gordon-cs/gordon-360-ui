import wellness from '../../../../services/wellness.js';
let user, qOne;

/*
 * Fetches the user's data
 *
 * @return {JSON} The JSON data of the current user
 */
async function getUserData() {
  // Gets the token from local storage to prove authentication for fetch
  let token = JSON.parse(localStorage.getItem('token'));

  // Creates the header for the request to get the user's info
  let headers = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  return await fetch(
    new Request('https://360api.gordon.edu/api/profiles', { method: 'GET', headers }),
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      user = data;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function getQuestions() {
  
  await getUserData();
  let backendQuestions = await wellness.getQuestion();
  
  let phoneNumber;
  
  if(user.MobilePhone === undefined){
     phoneNumber = "your phone number";
  } else{
    phoneNumber = `(${user.MobilePhone.substring(0, 3)}) ${user.MobilePhone.substring(
        3,
        6,
       )}-${user.MobilePhone.substring(6)}`;
  }
  

  /* eslint-disable no-template-curly-in-string */
  let wellnessQuestion = backendQuestions[0].question.replace("${user.FirstName}", `${user.FirstName}`);
  wellnessQuestion = wellnessQuestion.replace("${user.LastName}", `${user.LastName}`);
  wellnessQuestion = wellnessQuestion.replace("${phoneNumber}", `${phoneNumber}`);

  let yesPrompt = backendQuestions[0].yesPrompt.replace("${user.FirstName}", `${user.FirstName}`);
  yesPrompt = yesPrompt.replace("${user.LastName}", `${user.LastName}`);
  yesPrompt = yesPrompt.replace("${phoneNumber}", `${phoneNumber}`);

  let noPrompt = backendQuestions[0].noPrompt.replace("${user.FirstName}", `${user.FirstName}`);
  noPrompt = noPrompt.replace("${user.LastName}", `${user.LastName}`);
  noPrompt = noPrompt.replace("${phoneNumber}", `${phoneNumber}`);
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
