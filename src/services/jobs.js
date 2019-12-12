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
 * @param {Number} studentID The student's id under which to submit the shift
 * @param {Number} eml we don't know what this means yet
 * @param {DateTime} shiftStart The start time of the shift
 * @param {DateTime} shiftEnd The end time of the shift
 * @param {Number} hoursWorked The number of hours worked
 * @param {String} shiftNotes Shift notes
 * @param {String} lastChangedBy The person who last updated the shift
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
