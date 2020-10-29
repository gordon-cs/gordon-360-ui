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
 * Get active jobs for current user
 * @param {Number} primaryID Whether user can use staff timesheets
 * @param {StudentProfileInfo} applicants Array of StudentProfileInfo objects
 * @return {Promise.<String>} User's active jobs
 */
const saveApartmentApplication = async (primaryID, applicants) => {
  let applicationDetails = {
    PRIMARY_ID: primaryID,
    APPLICANT_ARRAY: applicants,
  };
  return await http.post(`jobs/saveShift/`, applicationDetails);
};

export default {
  getHousingInfo,
  saveApartmentApplication,
};
