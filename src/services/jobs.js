/**
 *
 * @module jobs
 */

import http from './http';

/**
 * Get active jobs for current user
 * @param {String} details The user's details
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = details => {
  return http.post(`jobs/getJobs`, details);
};

/**
 * Get saved shifts for current user
 * @return {Promise.<String>} User's active jobs
 */
const getSavedShiftsForUser = () => {
  return http.get(`jobs/getSavedShifts/`);
};

/**
 * Get active jobs for current user
 * @param {Number} eml we don't know what this means yet
 * @param {DateTime} shiftStart The start time of the shift
 * @param {DateTime} shiftEnd The end time of the shift
 * @param {Number} hoursWorked The number of hours worked
 * @param {String} shiftNotes Shift notes
 * @return {Promise.<String>} User's active jobs
 */
const saveShiftForUser = async (
  eml,
  shiftStart,
  shiftEnd,
  hoursWorked,
  shiftNotes,
) => {
  let shiftDetails = {
    EML: eml,
    SHIFT_START_DATETIME: shiftStart,
    SHIFT_END_DATETIME: shiftEnd,
    HOURS_WORKED: hoursWorked,
    SHIFT_NOTES: shiftNotes,
  };
  return await http.post(`jobs/saveShift/`, shiftDetails);
};

const editShift = async (rowID, newShiftStart, newShiftEnd, newHoursWorked) => {
  let newShiftDetails = {
    ID_NUM: null,
    EML: null,
    SHIFT_START_DATETIME: newShiftStart,
    SHIFT_END_DATETIME: newShiftEnd,
    HOURS_WORKED: newHoursWorked,
    SHIFT_NOTES: null,
    LAST_CHANGED_BY: null,
  }
};

const deleteShiftForUser = async (rowID) => {
  return await http.del(`jobs/deleteShift/${rowID}`);
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
  getActiveJobsForUser,
  getSavedShiftsForUser,
  saveShiftForUser,
  deleteShiftForUser,
  getSupervisorNameForJob,
  submitShiftsForUser,
};
