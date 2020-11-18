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
 * @global
 * @typedef ApplicationDetails
 * @property {String} username  Username of the primary applicant
 * @property {String[]} applicants  Array of student usernames
 */

/**
 * returns current status of student housing
 * @return {Promise.<StudentHousingInfo>} Response
 */
const getHousingInfo = async () => {
  const housingInfo = await http.get(`housing/apartmentInfo`);
  return housingInfo;
};

/**
 * Check if a given student is on an existing application
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const checkApartmentApplication = async username => {
  // TODO: The name of this API endpoint has not yet been decided
  //! This endpoint is not yet implemented in the backend
  return await http.get('housing/finduser/', username);
};

/**
 * Save active apartment applications for current user
 * @param {String} primaryUsername the student username of the person responsible for filling out or editing the application (in firstname.lastname format)
 * @param {String[]} applicants Array of student usernames
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (primaryUsername, applicants) => {
  let applicationDetails = {
    username: primaryUsername,
    applicants: applicants.map(profile => profile.AD_Username),
  };
  return await http.post(`housing/save/`, applicationDetails);
};

/**
 * Get active apartment application for given application ID number
 * @param {Number} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async applicationID => {
  //! This endpoint is not yet implemented in the backend
  return await http.get(`housing/load/`, applicationID);
};

export default {
  getHousingInfo,
  checkApartmentApplication,
  saveApartmentApplication,
  getApartmentApplication,
};
