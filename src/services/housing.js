/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';
import './user'; // Needed for typedef of StudentProfileInfo

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * For some reason this feature works in all the other files, but not in src/services/housing.js
 * // @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef ApartmentApplicant Applicant info used by the student application page
 * @property {StudentProfileInfo} Profile The StudentProfileInfo object representing this applicant
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or 'None'
 */

/**
 * @global
 * @typedef FullApplicantInfo Applicant info used by the staff menu
 * @property {String} Username The username of this applicant
 * @property {Number} Age The age of the student (in years) (only visible to housing admin)
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or 'None'
 * @property {String} Probation Indicates whether the student has a disiplinary probation (visble only to housing admin)
 * @property {Number} Points The number of application points for this student (only visible to housing admin)
 */

/**
 * Note: Properties 'HallRank' and 'HallName' must be capitalized to match the backend
 * @global
 * @typedef ApartmentChoice
 * @property {Number} HallRank The rank assigned to this hall by the user
 * @property {String} HallName The name of the apartment hall
 */

/**
 * @global
 * @typedef ApplicationDetails
 * @property {Number} AprtAppID Application ID number of this application
 * @property {*} DateSubmitted The date the application was submitted, or null if not yet submitted
 * @property {*} DateModified The date the application was last modified
 * @property {String} EditorUsername Username of the application editor
 * @property {String} Gender Gender
 * @property {FullApplicantInfo[]} Applicants Array of student usernames
 * @property {ApartmentChoice[]} ApartmentChoices Array of ApartmentChoice objects
 * @property {Number} TotalPoints The total application points associated with this application
 * @property {Number} AvgPoints The average application points per applicant
 */

/**
 * Check if the current user is authorized to view the housing staff page for applications
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingStaff = async () => {
  return true; //! DEBUG
  // try {
  //   return await http.get(`housing/admin`);
  // } catch {
  //   return false;
  // }
};

/**
 * Check if a given student is on an existing application
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const getApplicationID = async (username) => {
  let applicationID;
  if (username) {
    applicationID = await http.get(`housing/apartment/${username}/`);
  } else {
    applicationID = await http.get('housing/apartment');
  }
  return applicationID;
};

/**
 * Save the current state of the application to the database
 * @param {Number} applicationID the application ID number if it is known, else it is -1
 * @param {String} editorUsername the student username of the person filling out the application
 * @param {ApartmentApplicant[]} applicants Array of ApartmentApplicant objects
 * @param {ApartmentChoice[]} preferredHalls Array of ApartmentChoice objects
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (
  applicationID,
  editorUsername,
  applicants,
  preferredHalls,
) => {
  let applicationDetails = {
    AprtAppID: applicationID,
    Username: editorUsername,
    Applicants: applicants.map((applicant) => applicant.Profile.AD_Username),
    // Applicants: applicants.map((applicant) => { Username: applicant.Profile.AD_Username, OffCampusProgram: applicant.OffCampusProgram }); // This is the correct code for when the backend has been updated expect the off-campus program info
    ApartmentChoices: preferredHalls,
  };
  return await http.post(`housing/apartment/save/`, applicationDetails);
};

/**
 * Update the application editor of the application to the database
 * @param {Number} applicationID the application ID number
 * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApplicationEditor = async (applicationID, newEditorUsername) => {
  let newEditorDetails = {
    AprtAppID: applicationID,
    Username: newEditorUsername,
  };
  return await http.post(`housing/apartment/change-editor/`, newEditorDetails);
};

/**
 * Get active apartment application for given application ID number
 * @param {String} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  return await http.get(`housing/apartment/load/${applicationID}/`);
};

/**
 * Get active apartment applications for the current semester
 * @return {Promise.<ApplicationDetails>[]} Application details
 */
const getAllApartmentApplications = async () => {
  let dummyApplicationDetails = {
    AprtAppID: 42,
    DateSubmitted: '2030-03-14',
    DateModified: '2030-03-14',
    EditorUsername: 'Bobby.Tables',
    Gender: 'M',
    Applicants: [
      {
        Username: 'Bobby.Tables',
        Age: 21,
        OffCampusProgram: 'Computer Science',
        Probation: 'no',
        Points: 7,
      },
      { Username: 'Frederick.Fox', Age: 20, OffCampusProgram: '', Probation: 'yes', Points: 5 },
      {
        Username: 'Tommy.Turtle',
        Age: 22,
        OffCampusProgram: 'Education',
        Probation: 'no',
        Points: 6,
      },
    ],
    ApartmentChoices: [
      { HallRank: 1, HallName: 'Gantley' },
      { HallRank: 2, HallName: 'Tavilla' },
    ],
  }; //! DEBUG: This exists purely for testing the features without the backend. The commented-out line below is the actual code to use once the endpoint has been created in the backend
  let applicationDetailsArray = [dummyApplicationDetails];
  // let applicationDetailsArray = await http.get(`housing/apartment/load/`);

  // Calculate the total and average points for each application
  applicationDetailsArray.forEach((applicationDetails) => {
    let totalPoints = 0;
    applicationDetails.Applicants.forEach((applicant) => {
      totalPoints += applicant.Points;
    });
    let avgPoints = totalPoints / applicationDetails.Applicants.length;
    applicationDetails.TotalPoints = totalPoints;
    applicationDetails.AvgPoints = avgPoints;
  });

  return applicationDetailsArray;
};

export default {
  checkHousingStaff,
  getApplicationID,
  saveApartmentApplication,
  changeApplicationEditor,
  getApartmentApplication,
  getAllApartmentApplications,
};
