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
 * @param {Boolean} canUseStaff Whether user can use staff timesheets
 * @param {String} details The user's details
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = (canUseStaff, details) => {
  if (canUseStaff) {
    return http.post(`jobs/JobsStaff`, details); // Is a HttpPost, but says get?
  }
  return http.post(`jobs/getJobs`, details);
};

/**
 * Get saved shifts for current user
 * @param {Boolean} canUseStaff Whether user can use staff timesheets
 * @return {Promise.<String>} User's active jobs
 */
const getSavedShiftsForUser = (canUseStaff) => {
  if (canUseStaff) {
    return http.get(`jobs/savedShiftsForStaff/`);
  }
  return http.get(`jobs/getSavedShifts/`);
};

/**
 * Get active jobs for current user
 * @param {Boolean} canUseStaff Whether user can use staff timesheets
 * @param {Number} eml we don't know what this means yet
 * @param {DateTime} shiftStart The start time of the shift
 * @param {DateTime} shiftEnd The end time of the shift
 * @param {Number} hoursWorked The number of hours
 * @param {char} hoursType Type of hour for staff
 * @param {String} shiftNotes Shift notes
 * @return {Promise.<String>} User's active jobs
 */
const saveShiftForUser = async (
  canUseStaff,
  eml,
  shiftStart,
  shiftEnd,
  hoursWorked,
  hoursType,
  shiftNotes,
) => {
  if (canUseStaff) {
    let shiftDetails = {
      EML: eml,
      SHIFT_START_DATETIME: shiftStart,
      SHIFT_END_DATETIME: shiftEnd,
      HOURS_WORKED: hoursWorked,
      HOURS_TYPE: hoursType,
      SHIFT_NOTES: shiftNotes,
    };
    return await http.post(`jobs/saveShiftStaff/`, shiftDetails);
  }
  let shiftDetails = {
    EML: eml,
    SHIFT_START_DATETIME: shiftStart,
    SHIFT_END_DATETIME: shiftEnd,
    HOURS_WORKED: hoursWorked,
    SHIFT_NOTES: shiftNotes,
  };
  return await http.post(`jobs/saveShift/`, shiftDetails);
};

const editShift = async (canUseStaff, rowID, newShiftStart, newShiftEnd, newHoursWorked) => {
  let newShiftDetails = {
    ID: rowID,
    EML: null,
    SHIFT_START_DATETIME: newShiftStart.toLocaleString(),
    SHIFT_END_DATETIME: newShiftEnd.toLocaleString(),
    HOURS_WORKED: newHoursWorked,
    SHIFT_NOTES: null,
    LAST_CHANGED_BY: null,
  };
  if (canUseStaff) {
    return await http.put(`jobs/editShiftStaff/`, newShiftDetails);
  }
  return await http.put(`jobs/editShift/`, newShiftDetails);
};

const deleteShiftForUser = async (canUseStaff, rowID) => {
  if (canUseStaff) {
    return await http.del(`jobs/deleteShiftStaff/${rowID}`);
  }
  return await http.del(`jobs/deleteShift/${rowID}`);
};

const getSupervisorNameForJob = (canUseStaff, supervisorID) => {
  if (canUseStaff) {
    return http.get(`jobs/supervisorNameStaff/${supervisorID}`);
  }
  return http.get(`jobs/supervisorName/${supervisorID}`);
};

const submitShiftsForUser = (canUseStaff, shiftsToSubmit, submittedTo) => {
  let shifts = [];
  if (canUseStaff) {
    for (let i = 0; i < shiftsToSubmit.length; i++) {
      shifts.push({
        ID_NUM: shiftsToSubmit[i].ID_NUM,
        EML: shiftsToSubmit[i].EML,
        SHIFT_END_DATETIME: shiftsToSubmit[i].SHIFT_END_DATETIME,
        SUBMITTED_TO: submittedTo,
        HOURS_TYPE: shiftsToSubmit[i].HOURS_TYPE,
        LAST_CHANGED_BY: shiftsToSubmit[i].LAST_CHANGED_BY,
      });
      return http.post(`jobs/submitShiftsStaff`, shifts);
    }
  }
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

const clockIn = (data) => {
  return http.post(`jobs/clockIn`, data);
};

const clockOut = () => {
  return http.get(`jobs/clockOut`);
};

const deleteClockIn = async () => {
  return http.put(`jobs/deleteClockIn`);
};

const getHourTypes = () => {
  return http.get(`jobs/hourTypes`);
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
  deleteClockIn,
  getHourTypes,
};
