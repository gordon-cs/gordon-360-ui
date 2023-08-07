import http from './http';

const dateFormatter = Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

/**
 * Get active jobs for current user
 *
 * @param shiftStart The start of the shift to get jobs for
 * @param shiftEnd The end of the shift to get jobs for
 * @returns {Promise.<string>} User's active jobs
 */
const getJobs = (shiftStart: Date, shiftEnd: Date): Promise<string> => {
  const urlParams = `?shiftStart=${dateFormatter.format(
    shiftStart,
  )}&shiftEnd=${dateFormatter.format(shiftEnd)}`;

  return http.get('jobs' + urlParams);
};

const getSavedShiftsForUser = (): Promise<string> => http.get(`jobs/getSavedShifts/`);

/**
 * Get active jobs for current user
 *
 * @param eml we don't know what this means yet
 * @param shiftStart The start time of the shift
 * @param shiftEnd The end time of the shift
 * @param hoursWorked The number of hours
 * @param shiftNotes Shift notes
 * @param lastChangedBy The AD_Username of the last person to change the shift (in this case, the authenticated user)
 * @returns {Promise.<string>} User's active jobs
 */
const saveShiftForUser = async (
  eml: number,
  shiftStart: Date,
  shiftEnd: Date,
  hoursWorked: number,
  shiftNotes: string,
  lastChangedBy: string,
): Promise<string> => {
  const shiftDetails = {
    EML: eml,
    SHIFT_START_DATETIME: dateFormatter.format(shiftStart),
    SHIFT_END_DATETIME: dateFormatter.format(shiftEnd),
    HOURS_WORKED: hoursWorked,
    SHIFT_NOTES: shiftNotes,
    LAST_CHANGED_BY: lastChangedBy,
  };
  return await http.post(`jobs/saveShift/`, shiftDetails);
};

const editShift = async (
  rowID: number,
  eml: number,
  newShiftStart: Date,
  newShiftEnd: Date,
  newHoursWorked: number,
  newShiftNotes: string, // I am adding this
  lastChangedBy: string,
) => {
  let newShiftDetails = {
    ID: rowID,
    EML: eml,
    SHIFT_START_DATETIME: dateFormatter.format(newShiftStart),
    SHIFT_END_DATETIME: dateFormatter.format(newShiftEnd),
    HOURS_WORKED: newHoursWorked,
    SHIFT_NOTES: newShiftNotes, // I am adding this
    LAST_CHANGED_BY: lastChangedBy,
  };
  await http.put(`jobs/editShift/`, newShiftDetails);
};

const deleteShiftForUser = async (rowID: number) => await http.del(`jobs/deleteShift/${rowID}`);

const getSupervisorNameForJob = (supervisorID: number) =>
  http.get(`jobs/supervisorName/${supervisorID}`);

const submitShiftsForUser = async (shifts: Object[], submittedTo: number) => {
  const shiftDetails = (shift: any) => ({
    ID_NUM: shift.ID_NUM,
    EML: shift.EML,
    SHIFT_END_DATETIME: dateFormatter.format(new Date(shift.SHIFT_END_DATETIME)),
    SUBMITTED_TO: submittedTo,
    LAST_CHANGED_BY: shift.LAST_CHANGED_BY,
  });

  await http.post(`jobs/submitShifts`, shifts.map(shiftDetails));
};

const clockIn = (data: any) => http.post(`jobs/clockIn`, data);

const clockOut = () => http.get(`jobs/clockOut`);

const deleteClockIn = async () => http.put(`jobs/deleteClockIn`);

const getHourTypes = () => http.get(`jobs/hourTypes`);

const jobsService = {
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
