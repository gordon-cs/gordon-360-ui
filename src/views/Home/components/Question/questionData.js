let user, qOne, qTwo, qThree, qTwoNo, qTwoYes;

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

	return await fetch(new Request("https://360api.gordon.edu/api/profiles", { method: 'GET', headers })).then(result => {
		return result.json();
	}).then(data => {
		user = data;
	}).catch(error => {
		console.log(error.message);
	});
}


export async function getQuestions() {
	await getUserData();

}


// Question 1
qOne = {
	question: "What is the best way to reach you? (if you have another preference please contact CTS)",
	phone: user.MobilePhone,
	email: user.Email
}

// Question 2
qTwo = {
	question: "Are you currently sick or have symptoms that could be related to COVID-19 such as:",
	symptoms: ["Temperature higher than 100.4", "New loss of taste or smell", "Sore throat", "Muscle pain", "Cough", "Shortness of breath or difficulty breathing", "Fever", "Chills"],
	no: qTwoNo,
	yes: qTwoYes
}

qTwoNo = {
  question: ["Please type your initials below to certify the answers to the above questions are correct.", "Based on your responses, you are cleared to come to Gordon College today.", "Please ensure you fill out this form every day"]
}

qTwoYes = {
	question: 'Since you have some sick symptoms, please notify your professor and discuss working from home or taking a sick day today.  You should not come to Gordon if you are sick.  In addition, please visit the CDC webpage and use the "Self-Checker" to check your symptoms https://www.cdc.gov/coronavirus/2019-ncov/symptoms-testing/symptoms.html. Confirm below:',
	optionOne: 'I used the CDC "Self Checker" and have contacted my supervisor',
	optionTwo: 'The "Self Checker" website was not working, but I have notified my supervisor'
}
