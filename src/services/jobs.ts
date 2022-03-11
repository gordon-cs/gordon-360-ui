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
 * @returns Whether the user can use staff timesheets
 */
const getStaffPageForUser = async (): Promise<boolean> => {
  // const id: number | null = await http.get(`jobs/canUsePage`);
  // return id === null;
  return false;
};

/**
 * Get active jobs for current user
 *
 * @param canUseStaff Whether user can use staff timesheets
 * @param shiftStart The start of the shift to get jobs for
 * @param shiftEnd The end of the shift to get jobs for
 * @returns {Promise.<string>} User's active jobs
 */
const getJobs = (canUseStaff: boolean, shiftStart: Date, shiftEnd: Date): Promise<string> => {
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
 * @param canUseStaff Whether user can use staff timesheets
 * @returns User's active jobs
 */
const getSavedShiftsForUser = (canUseStaff: boolean): Promise<string> => {
  if (canUseStaff) {
    return http.get(`jobs/savedShiftsForStaff/`);
  }
  return http.get(`jobs/getSavedShifts/`);
};

/**
 * Get active jobs for current user
 *
 * @param canUseStaff Whether user can use staff timesheets
 * @param eml we don't know what this means yet
 * @param shiftStart The start time of the shift
 * @param shiftEnd The end time of the shift
 * @param hoursWorked The number of hours
 * @param hoursType Type of hour for staff
 * @param shiftNotes Shift notes
 * @returns {Promise.<string>} User's active jobs
 */
const saveShiftForUser = async (
  canUseStaff: boolean,
  eml: number,
  shiftStart: Date,
  shiftEnd: Date,
  hoursWorked: number,
  hoursType: string,
  shiftNotes: string,
): Promise<string> => {
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

const editShift = async (
  canUseStaff: boolean,
  rowID: number,
  newShiftStart: Date,
  newShiftEnd: Date,
  newHoursWorked: number,
) => {
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
    await http.put(`jobs/editShiftStaff/`, newShiftDetails);
  }
  await http.put(`jobs/editShift/`, newShiftDetails);
};

const deleteShiftForUser = async (canUseStaff: boolean, rowID: number) => {
  if (canUseStaff) {
    await http.del(`jobs/deleteShiftStaff/${rowID}`);
  }
  await http.del(`jobs/deleteShift/${rowID}`);
};

const getSupervisorNameForJob = (canUseStaff: boolean, supervisorID: number) => {
  if (canUseStaff) {
    return http.get(`jobs/supervisorNameStaff/${supervisorID}`);
  }
  return http.get(`jobs/supervisorName/${supervisorID}`);
};

const submitShiftsForUser = async (canUseStaff: boolean, shifts: Object[], submittedTo: number) => {
  const shiftDetails = (shift: any) => ({
    ID_NUM: shift.ID_NUM,
    EML: shift.EML,
    SHIFT_END_DATETIME: dateFormatter.format(new Date(shift.SHIFT_END_DATETIME)),
    SUBMITTED_TO: submittedTo,
    HOURS_TYPE: canUseStaff ? shift.HOURS_TYPE : null,
    LAST_CHANGED_BY: shift.LAST_CHANGED_BY,
  });

  if (canUseStaff) {
    await http.post(`jobs/submitShiftsStaff`, shifts.map(shiftDetails));
  } else {
    await http.post(`jobs/submitShifts`, shifts.map(shiftDetails));
  }
};

const clockIn = (data: any) => http.post(`jobs/clockIn`, data);

const clockOut = () => http.get(`jobs/clockOut`);

const deleteClockIn = async () => http.put(`jobs/deleteClockIn`);

const getHourTypes = () => http.get(`jobs/hourTypes`);

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
