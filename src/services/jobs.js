/**
 *
 * @module jobs
 */

import http from './http';

const dateFormat = new Intl.DateTimeFormat('en', {
  timeStyle: 'medium',
  dateStyle: 'short',
});

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
 * @param {Date} shiftStart The start of the shift to get jobs for
 * @param {Date} shiftEnd The end of the shift to get jobs for
 * @return {Promise.<String>} User's active jobs
 */
const getJobs = (canUseStaff, shiftStart, shiftEnd) => {
  const urlParams = `?shiftStart=${dateFormat.format(shiftStart)}&shiftEnd=${dateFormat.format(
    shiftEnd,
  )}`;

  if (canUseStaff) {
    return http.get('jobs/staff' + urlParams);
  } else {
    return http.get('jobs' + urlParams);
  }
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
  const shiftDetails = {
    EML: eml,
    SHIFT_START_DATETIME: dateFormat.format(shiftStart),
    SHIFT_END_DATETIME: dateFormat.format(shiftEnd),
    HOURS_WORKED: hoursWorked,
    HOURS_TYPE: canUseStaff ? hoursType : null,
    SHIFT_NOTES: shiftNotes,
  };
  if (canUseStaff) {
    return await http.post(`jobs/saveShiftStaff/`, shiftDetails);
  } else {
    return await http.post(`jobs/saveShift/`, shiftDetails);
  }
};

const editShift = async (canUseStaff, rowID, newShiftStart, newShiftEnd, newHoursWorked) => {
  let newShiftDetails = {
    ID: rowID,
    EML: null,
    SHIFT_START_DATETIME: dateFormat.format(newShiftStart),
    SHIFT_END_DATETIME: dateFormat.format(newShiftEnd),
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

const submitShiftsForUser = (canUseStaff, shifts, submittedTo) => {
  const shiftDetails = (shift) => ({
    ID_NUM: shift.ID_NUM,
    EML: shift.EML,
    SHIFT_END_DATETIME: dateFormat.format(new Date(shift.SHIFT_END_DATETIME)),
    SUBMITTED_TO: submittedTo,
    HOURS_TYPE: canUseStaff ? shift.HOURS_TYPE : null,
    LAST_CHANGED_BY: shift.LAST_CHANGED_BY,
  });

  if (canUseStaff) {
    return http.post(`jobs/submitShiftsStaff`, shifts.map(shiftDetails));
  } else {
    return http.post(`jobs/submitShifts`, shifts.map(shiftDetails));
  }
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
  getJobs,
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
