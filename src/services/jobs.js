/**
 *
 * @module jobs
 */

import http from './http';

/**
 * Activate our hello world test
 * @return {Promise.<String>} E2e test result
 */
const getE2eTestResult = () => {
  return http.get(`jobs/hello-world`);
};

/**
 * Get active jobs for current user
 * @param {String} userID The Gordon id of the user whose jobs to fetch
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = userID => {
  return http.get(`jobs/getJobs/${userID}`);
};

/**
 * Get active jobs for current user
 * @param {String} userID The Gordon id of the user whose jobs to fetch
 * @return {Promise.<String>} User's active jobs
 */
const submitShiftForUser = async (
  studentID,
  eml,
  shiftStart,
  shiftEnd,
  hoursWorked,
  shiftNotes,
  lastChangedBy,
) => {
  let shiftDetails = {
    ID_NUM: studentID,
    EML: eml,
    SHIFT_START_DATETIME: shiftStart,
    SHIFT_END_DATETIME: shiftEnd,
    HOURS_WORKED: hoursWorked,
    SHIFT_NOTES: shiftNotes,
    LAST_CHANGED_BY: lastChangedBy,
  };
  return await http.post(`jobs/submitShift/`, shiftDetails);
};

export default { getE2eTestResult, getActiveJobsForUser, submitShiftForUser };
