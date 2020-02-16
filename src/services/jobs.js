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
 * @param {String} details The user's details
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = details => {
  return http.post(`jobs/getJobs`, details);
};

/**
 * 
 * @param {String} details The shift start/end and user id
 * @return {Promise.<String>} The id of the overlapping shift, or null if none 
 */
const checkForOverlappingShift = details => {
  return http.post(`jobs/overlapShiftCheck`, details);
}

/**
 * Get saved shifts for current user
 * @param {String} userID The Gordon id of the user whose jobs to fetch
 * @return {Promise.<String>} User's active jobs
 */
const getSavedShiftsForUser = userID => {
  return http.get(`jobs/getSavedShifts/${userID}`);
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
const saveShiftForUser = async (
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
  return await http.post(`jobs/saveShift/`, shiftDetails);
};

const deleteShiftForUser = async (rowID, studentID) => {
  return await http.del(`jobs/deleteShift/${rowID}/${studentID}`);
};

const getSupervisorNameForJob = supervisorID => {
  return http.get(`jobs/supervisorName/${supervisorID}`);
};

const submitShiftsForUser = (shiftsToSubmit, submittedTo) => {
  let shifts = [];
  for (let i = 0; i < shiftsToSubmit.length; i++) {
    shifts.push({
      ID_NUM: shiftsToSubmit[i].ID_NUM,
      EML: shiftsToSubmit[i].EML,
      SHIFT_END_DATETIME: shiftsToSubmit[i].SHIFT_END_DATETIME,
      SUBMITTED_TO: submittedTo,
      LAST_CHANGED_BY: shiftsToSubmit[i].LAST_CHANGED_BY,
    });
  }
  return http.post(`jobs/submitShifts`, shifts);
};

export default {
  getE2eTestResult,
  getActiveJobsForUser,
  checkForOverlappingShift,
  getSavedShiftsForUser,
  submitShiftForUser: saveShiftForUser,
  deleteShiftForUser,
  getSupervisorNameForJob,
  submitShiftsForUser,
};
