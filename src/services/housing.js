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
 * @param {String} primaryUsername the student username of the person filling out the application
 * @param {StudentProfileInfo} applicants Array of StudentProfileInfo objects
 * @return {Promise.<String>} User's active jobs
 */
const saveApartmentApplication = async (primaryUsername, applicants) => {
  let applicationDetails = {
    PRIMARY_USERNAME: primaryUsername,
    APPLICANT_ARRAY: applicants.map(profile => profile.AD_Username),
  };
  return await http.post(`housing/save/`, applicationDetails);
};

export default {
  getHousingInfo,
  saveApartmentApplication,
};
