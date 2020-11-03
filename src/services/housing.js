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
 * returns current status of student housing
 * @return {Promise.<StudentHousingInfo>} Response
 */
const getHousingInfo = async () => {
  const housingInfo = await http.get(`housing/apartmentInfo`);
  return housingInfo;
};

/**
 * Get active apartment applications for current user
 * @param {Number} primaryID the student ID number of the person filling out the application
 * @param {StudentProfileInfo} applicants Array of StudentProfileInfo objects
 * @return {Promise.<String>} User's active jobs
 */
const saveApartmentApplication = async (primaryID, applicants) => {
  let applicationDetails = {
    PRIMARY_ID: primaryID,
    APPLICANT_ARRAY: applicants,
  };
  return await http.post(`housing/submit/`, applicationDetails);
};

export default {
  getHousingInfo,
  saveApartmentApplication,
};
