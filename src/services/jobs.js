/**
 *
 * @module jobs
 */

import http from './http';

const dateFormatter = Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

/**
 * Get Whether or not the user can use staff timesheets
 *
 * @returns {Promise.<number>} User's employee ID
 */
const getStaffPageForUser = async () => {
  return await http.get(`jobs/canUsePage`);
};

/**
 * Get active jobs for current user
 *
 * @param {boolean} canUseStaff Whether user can use staff timesheets
 * @param {Date} shiftStart The start of the shift to get jobs for
 * @param {Date} shiftEnd The end of the shift to get jobs for
 * @returns {Promise.<string>} User's active jobs
 */
const getJobs = (canUseStaff, shiftStart, shiftEnd) => {
  const urlParams = `?shiftStart=${dateFormatter.format(
    shiftStart,
  )}&shiftEnd=${dateFormatter.format(shiftEnd)}`;

  if (canUseStaff) {
    return http.get('jobs/staff' + urlParams);
  } else {
    return http.get('jobs' + urlParams);
  }
};

/**
 * Get saved shifts for current user
 *
 * @param {boolean} canUseStaff Whether user can use staff timesheets
 * @returns {Promise.<string>} User's active jobs
 */
const getSavedShiftsForUser = (canUseStaff) => {
  if (canUseStaff) {
    return http.get(`jobs/savedShiftsForStaff/`);
  }
  return http.get(`jobs/getSavedShifts/`);
};

/**
 * Get active jobs for current user
 *
 * @param {boolean} canUseStaff Whether user can use staff timesheets
 * @param {number} eml we don't know what this means yet
 * @param {DateTime} shiftStart The start time of the shift
 * @param {DateTime} shiftEnd The end time of the shift
 * @param {number} hoursWorked The number of hours
 * @param {char} hoursType Type of hour for staff
 * @param {string} shiftNotes Shift notes
 * @returns {Promise.<string>} User's active jobs
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
    SHIFT_START_DATETIME: dateFormatter.format(shiftStart),
    SHIFT_END_DATETIME: dateFormatter.format(shiftEnd),
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
    SHIFT_START_DATETIME: dateFormatter.format(newShiftStart),
    SHIFT_END_DATETIME: dateFormatter.format(newShiftEnd),
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
    SHIFT_END_DATETIME: dateFormatter.format(new Date(shift.SHIFT_END_DATETIME)),
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

const jobsService = {
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

export default jobsService;
