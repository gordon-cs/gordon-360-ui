/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * Save the current state of the application to the database
 * @param {Number} applicationID the application ID number if it is known, else it is -1
 * @param {String} primaryUsername the student username of the person filling out the application
 * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (applicationID, primaryUsername, applicants) => {
  let applicationDetails = {
    AprtAppID: applicationID,
    Username: primaryUsername,
    Applicants: applicants.map((profile) => profile.AD_Username),
  };
  return await http.post(`housing/save/`, applicationDetails);
};

/**
 * Update the primary applicant of the application to the database
 * @param {Number} applicationID the application ID number
 * @param {String} newPrimaryUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApplicationModifier = async (applicationID, newPrimaryUsername) => {
  let newModifierDetails = {
    AprtAppID: applicationID,
    Username: newPrimaryUsername,
  };
  return await http.post(`housing/change-editor/`, newModifierDetails);
};

export default {
  saveApartmentApplication,
  changeApplicationModifier,
};
