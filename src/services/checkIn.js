/**
 * EnrollmentCheckIn Check API call functions
 * establishes the functions necessary to make calls to the back end.
 *
 * @module EnrollmentCheckIn
 */

import http from './http';

/**
 * @global
 * @typedef MajorHolds these holds prevent a student from checking in
 * @property {boolean} RegistrarHold if a student has a Registrar hold on their account
 * @property {boolean} HighSchoolTranscriptHold if a student has a highschool transcript hold on their account
 * @property {boolean} FinancialHold if a student has a financial hold on their account
 * @property {boolean} MedicalHold if a student has a medical hold on their account
 * @property {boolean} MustRegisterForClasses if a student needs to register for classes
 */

/**
 * @global
 * @typedef MinorHolds these holds do not prevent a student from checking in, but they prompt a warning
 * @property {boolean} LaVidaHold if a student has an LaVida hold on their account
 * @property {boolean} MajorHold if a student has a declaration of major hold on their account
 */

/**
 * @global
 * @typedef EmergencyContact all the data for a student's emergency contact
 * @property {number} SEQ_NUM the sequence number of the contact, (1, 2, or 3)
 * @property {string} firstName first name of emergency contact
 * @property {string} lastName last name of EC
 * @property {string} relationship the relationship between the student and EC
 * @property {number} HomePhone the home phone number of EC
 * @property {boolean} HomePhoneIN whether the home phone number is international
 * @property {number} MobilePhone the mobile phone number of EC
 * @property {boolean} MobilePhoneIN whether the mobile phone number is international
 */

/**
 * @global
 * @typedef PersonalPhone all the data for a student's personal phone number
 * @property {number} personalPhone the phone number of the student
 * @property {boolean} makePrivate whether a student wants their phone private on their profile
 * @property {boolean} noPhone whether a student does not have a personal phone
 */

/**
 * @global
 * @typedef Demographic all the data about a student's demographic
 * @property {int} ethnicity whether or not a student is Hispanic/Latino or prefers not to say
 * @property {boolean} nativeAmerican whether or not a student is of Native American descent
 * @property {boolean} asian whether or not a student is of Asian descent
 * @property {boolean} black whether or not a student is of African-American/African descent
 * @property {boolean} hawaiian whether or not a student is of Hawaiian descent
 * @property {boolean} white whether or not a student is of Caucasian descent
 * @property {boolean} none whether or not a student declined to submit a race
 */

const getStatus = async () => http.get(`checkIn/status`);

const markCompleted = async () => {
  try {
    return await http.put(`checkIn/status`);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const getHolds = async () => {
  try {
    return await http.get(`checkIn/holds`);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const getEmergencyContacts = async (username) => {
  try {
    return await http.get(`profiles/emergency-contact/${username}/`);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const submitPhone = async (data) => {
  try {
    return await http.put(`checkIn/cellphone`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const submitContact = async (data) => {
  try {
    return await http.post(`checkIn/emergencycontact`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const submitDemographic = async (data) => {
  try {
    return await http.put(`checkIn/demographic`, data);
  } catch (reason) {
    console.log('Caught checkIn submission error: ' + reason);
  }
};

const checkInService = {
  getStatus,
  markCompleted,
  getHolds,
  getEmergencyContacts,
  submitPhone,
  submitContact,
  submitDemographic,
};

export default checkInService;
