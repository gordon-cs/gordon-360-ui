/**
 *
 * @module jobs
 */

import http from './http';

/**
 * Get Whether or not the user can use staff timesheets
 * @return {Promise.<Number>} User's employee ID
 */
const getStaffPageForUser = async () => {
  return await http.get(`jobs/canUsePage`);
};

/**
 * Get active jobs for current user
 * @param {String} details The user's details
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = details => {
  if (getStaffPageForUser?.length) {
    return http.get(`jobs/getJobsStaff`, details); // Is a HttpPost, but says get?
  }
  return http.get(`jobs/getJobs`, details);
};

/**
 * Get saved shifts for current user
 * @return {Promise.<String>} User's active jobs
 */
const getSavedShiftsForUser = () => {
  if (getStaffPageForUser?.length) {
    return []; //http.get(`jobs/getSavedShiftsStaff/`); This endpoint needs to return [] not null
  }
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
  if (getStaffPageForUser?.length) {
    return await http.post(`jobs/saveShiftStaff/`, shiftDetails);
  }
  return await http.post(`jobs/saveShift/`, shiftDetails);
};

const editShift = async (rowID, newShiftStart, newShiftEnd, newHoursWorked) => {
  let newShiftDetails = {
    ID: rowID,
    EML: null,
    SHIFT_START_DATETIME: newShiftStart.toLocaleString(),
    SHIFT_END_DATETIME: newShiftEnd.toLocaleString(),
    HOURS_WORKED: newHoursWorked,
    SHIFT_NOTES: null,
    LAST_CHANGED_BY: null,
  }
  if (getStaffPageForUser?.length) {
    return await http.put(`jobs/editShiftStaff/`, newShiftDetails)
  }
  return await http.put(`jobs/editShift/`, newShiftDetails);
};

const deleteShiftForUser = async rowID => {
  if (getStaffPageForUser?.length) {
    return await http.del(`jobs/deleteShiftStaff/${rowID}`);
  }
  return await http.del(`jobs/deleteShift/${rowID}`);
};

const getSupervisorNameForJob = supervisorID => {
  if (getStaffPageForUser?.length) {
    return http.get(`jobs/supervisorNameStaff/${supervisorID}`);
  }
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
  if (getStaffPageForUser?.length) {
    return http.post(`jobs/submitShiftsStaff`, shifts);
  }
  return http.post(`jobs/submitShifts`, shifts);
};

const clockIn = data => {
  if (getStaffPageForUser?.length) {
    return http.post(`jobs/clockInStaff`, data);
  }
  return http.post(`jobs/clockIn`, data);
};

const clockOut = () => {
  if (getStaffPageForUser) {
    return http.get(`jobs/clockOutStaff`);
  }
  return http.get(`jobs/clockOut`);
};

const deleteClockIn = async () => {
  if (getStaffPageForUser) {
    return await http.put(`jobs/deleteClockInStaff`);
  }
  return http.put(`jobs/deleteClockIn`);
};

export default {
  getStaffPageForUser,
  getActiveJobsForUser,
  getSavedShiftsForUser,
  saveShiftForUser,
  editShift,
  deleteShiftForUser,
  getSupervisorNameForJob,
  submitShiftsForUser,
  clockIn,
  clockOut,
  deleteClockIn
};
