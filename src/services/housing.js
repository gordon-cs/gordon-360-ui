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
 * @property {String} Username  Username of the primary applicant
 * @property {String[]} Applicants  Array of student usernames
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
 * Check if the current user is authorized to view the housing staff page for applications
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingStaff = async () => {
  try {
    return await http.get(`housing/staff`);
  } catch {
    return false;
  }
};

/**
 * Check if a given student is on an existing application
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const getApplicationID = async username => {
  return await http.get(`housing/apartment/${username}/`);
};

/**
 * Save active apartment applications for current user
 * @param {String} primaryUsername the student username of the person responsible for filling out or editing the application (in firstname.lastname format)
 * @param {String[]} applicants Array of student usernames
 * @return {Promise.<Number>} Application's ID number
 */
const saveApartmentApplication = async (primaryUsername, applicants) => {
  let applicationDetails = {
    Username: primaryUsername,
    Applicants: applicants.map(profile => profile.AD_Username),
  };
  return await http.post(`housing/apartment/save/`, applicationDetails);
};

/**
 * Get active apartment application for given application ID number
 * @param {String} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async applicationID => {
  return await http.get(`housing/apartment/${applicationID}/`);
};

export default {
  getHousingInfo,
  checkHousingStaff,
  getApplicationID,
  saveApartmentApplication,
  getApartmentApplication,
};
