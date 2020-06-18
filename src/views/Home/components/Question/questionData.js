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

  // Question 1
  let phoneNumber = `(${user.MobilePhone.substring(0, 3)}) ${user.MobilePhone.substring(
    3,
    6,
  )}-${user.MobilePhone.substring(6)}`;
  qOne = {
    question: 'Are you currently sick or have symptoms that could be related to COVID-19 such as:',
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
      question: `By submitting I, ${user.FirstName} ${user.LastName}, hereby certify that the above response is true and correct to the best of my knowledge.`,
    },
    yes: {
      question: [
        `By submitting I, ${user.FirstName} ${user.LastName}, understand that I should not leave my residence until I am contacted by the Health Center at ${phoneNumber}, and that I will use the`,
        ` CDC Self-Checker.`,
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
