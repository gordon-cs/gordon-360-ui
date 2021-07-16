/**
 * AcademicCheckIn Check API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module AcademicCheckIn
 */

import http from './http';

/**
 * @global
 * @typedef MajorHolds these holds prevent a student from checking in
 * @property {boolean} registrationHold if a student has an registration hold on their account
 * @property {boolean} transcriptHold if a student has a highschool transcript hold on their account
 * @property {boolean} financialHold if a student has a financial hold on their account
 * @property {boolean} medicalHold if a student has a medical hold on their account
 */

/**
 * @global
 * @typedef MinorHolds these holds do not prevent a student from checking in, but they prompt a warning
 * @property {boolean} laVidaHold if a student has an laVida hold on their account
 * @property {boolean} declareMajorHold if a student has a declaration of major hold on their account
 */

/**
 * @global
 * @typedef EmergencyContactData all the other data to be filled out by the student
 * @property {String} firstName1 first name of emergency contact 1
 * @property {String} lastName1 last name of EC 1
 * @property {String} relationship1 the relationship between the student and EC 1
 * @property {Number} homePhone1 the home phone number of EC 1
 * @property {Number} mobilePhone1 the mobile phone number of EC 1
 * @property {String} firstName2 first name of emergency contact 2
 * @property {String} lastName2 last name of EC 2
 * @property {String} relationship2 the relationship between the student and EC 2
 * @property {Number} homePhone2 the home phone number of EC 2
 * @property {Number} mobilePhone2 the mobile phone number of EC 2
 * @property {String} firstName3 first name of emergency contact 3
 * @property {String} lastName3 last name of EC 3
 * @property {String} relationship3 the relationship between the student and EC 3
 * @property {Number} homePhone3 the home phone number of EC 3
 * @property {Number} mobilePhone3 the mobile phone number of EC 3
 *
 *
 * TODO: UPDATE THIS CUZ ITS NOT CONSISTENT
 */

/**
 * @global
 * @typedef CheckInData
 * @property {Number} personalPhone the phone number of the student
 * @property {String} ethnicity whether or not a student is Hispanic/Latino or prefers not to say
 * @property {boolean} nativeAmerican whether or not a student is of Native American descent
 * @property {boolean} asian whether or not a student is of Asian descent
 * @property {boolean} black whether or not a student is of African-American/African descent
 * @property {boolean} hawaiian whether or not a student is of Hawaiian descent
 * @property {boolean} white whether or not a student is of Caucasian descent
 * @property {boolean} none whether or not a student declined to submit a race
 */

const getStatus = (id) => http.get(`checkIn/status`);

const markCompleted = (id) => http.put(`checkIn/status`);

const getHolds = (id) => http.get(`checkIn/holds`);

const getPersonalPhone = (id) => http.get(`checkIn/phone`);

const getDemographic = (id) => http.get(`checkIn/demographic`);

const getEmergencyContacts = async (username) => {
  return await http.get(`profiles/emergency-contact/${username}/`);
}

async function submitPhone(data) {
  try {
    return await http.put(`checkIn/cellphone`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
}

async function submitContact(data) {
  try {
    return await http.post(`checkIn/emergencycontact`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
}

async function submitDemographic(data) {
  try {
    return await http.put(`checkIn/demographic`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
}

const checkInService = {
  getHolds,
  getPersonalPhone,
  getDemographic,
  getEmergencyContacts,
  submitPhone,
  submitContact,
  submitDemographic,
};

export default checkInService;
