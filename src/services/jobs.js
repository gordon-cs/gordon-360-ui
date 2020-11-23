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

const getActiveJobs = (canUseStaff, shiftStart, shiftEnd) => {
  if (canUseStaff) {
    return http.get(
      `jobs/staff?shiftStart=${dateFormat.format(shiftStart)}&shiftEnd=${dateFormat.format(
        shiftEnd,
      )}`,
    );
  }
  return http.get(
    `jobs?shiftStart=${dateFormat.format(shiftStart)}&shiftEnd=${dateFormat.format(shiftEnd)}`,
  );
};

/**
 * Get saved shifts for current user
 * @param {Boolean} canUseStaff Whether user can use staff timesheets
 * @return {Promise.<String>} User's active jobs
 */
const getShifts = (canUseStaff) => {
  if (canUseStaff) {
    return http.get(`jobs/staff/shifts`);
  }
  return http.get(`jobs/shifts/`);
};

/**
 * Get active jobs for current user
 * @param {Boolean} canUseStaff Whether user can use staff timesheets
 * @param {Number} eml we don't know what this means yet
 * @param {Date} shiftStart The start time of the shift
 * @param {DateLocalizer} shiftEnd The end time of the shift
 * @param {Number} hoursWorked The number of hours
 * @param {char} hoursType Type of hour for staff
 * @param {String} shiftNotes Shift notes
 * @return {Promise.<String>} User's active jobs
 */
const saveShift = async (
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
      SHIFT_START_DATETIME: dateFormat.format(shiftStart),
      SHIFT_END_DATETIME: dateFormat.format(shiftEnd),
      HOURS_WORKED: hoursWorked,
      HOURS_TYPE: hoursType,
      SHIFT_NOTES: shiftNotes,
    };
    return await http.post(`jobs/staff/shifts/`, shiftDetails);
  }
  let shiftDetails = {
    EML: eml,
    SHIFT_START_DATETIME: dateFormat.format(shiftStart),
    SHIFT_END_DATETIME: dateFormat.format(shiftEnd),
    HOURS_WORKED: hoursWorked,
    SHIFT_NOTES: shiftNotes,
  };
  return await http.post(`jobs/shifts/`, shiftDetails);
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
    return await http.put(`jobs/staff/shifts/`, newShiftDetails);
  }
  return await http.put(`jobs/shifts/`, newShiftDetails);
};

const deleteShift = async (canUseStaff, rowID) => {
  if (canUseStaff) {
    return await http.del(`jobs/staff/shifts/${rowID}`);
  }
  return await http.del(`jobs/shifts/${rowID}`);
};

const getSupervisor = (canUseStaff, supervisorID) => {
  if (canUseStaff) {
    return http.get(`jobs/staff/supervisor/${supervisorID}`);
  }
  return http.get(`jobs/supervisor/${supervisorID}`);
};

const submitShifts = (canUseStaff, shiftsToSubmit, submittedTo) => {
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
      return http.post(`jobs/staff/shifts/submit`, shifts);
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
  return http.post(`jobs/shifts/submit`, shifts);
};

const getClockIns = () => {
  return http.get(`jobs/clockins`);
};

const postClockIn = (data) => {
  return http.post(`jobs/clockins`, data);
};

const deleteClockIn = async () => {
  return http.put(`jobs/clockins`);
};

const getHourTypes = () => {
  return http.get(`jobs/hourTypes`);
};

export default {
  getStaffPageForUser,
  getActiveJobs,
  getShifts,
  saveShift,
  editShift,
  deleteShift,
  getSupervisor,
  submitShifts,
  getClockIns,
  postClockIn,
  deleteClockIn,
  getHourTypes,
};
