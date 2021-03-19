//Main timesheets page
import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Link,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button,
  Typography,
  TextField,
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import jobs from '../../services/jobs';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import ShiftDisplay from './components/ShiftDisplay';
import { withStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { gordonColors } from '../../theme';
import './timesheets.css';
import GordonLoader from '../../components/Loader';
import { makeStyles } from '@material-ui/core/styles';
import SimpleSnackbar from '../../components/Snackbar';
import user from '../../services/user';

const useStyles = makeStyles((theme) => ({
  customWidth: {
    maxWidth: 500,
  },
}));

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    color: 'rgba(255, 255, 255, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

const Timesheets = (props) => {
  const [userJobs, setUserJobs] = useState([]);
  const [selectedDateIn, setSelectedDateIn] = useState(null);
  const [selectedDateOut, setSelectedDateOut] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [shiftTooLong, setShiftTooLong] = useState(false);
  const [timeOutIsBeforeTimeIn, setTimeOutIsBeforeTimeIn] = useState(false);
  const [isZeroLengthShift, setIsZeroLengthShift] = useState(false);
  const [enteredFutureTime, setEnteredFutureTime] = useState(false);
  const [hoursWorkedInDecimal, setHoursWorkedInDecimal] = useState(0.0);
  const [userShiftNotes, setUserShiftNotes] = useState('');
  const [isOverlappingShift, setIsOverlappingShift] = useState(false);
  const [shiftDisplayComponent, setShiftDisplayComponent] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [network, setNetwork] = useState('online');
  const [saving, setSaving] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [clockInOut, setClockInOut] = useState('Clock In');
  const [canUseStaff, setCanUseStaff] = useState(null);
  const [isUserStudent, setIsUserStudent] = useState(false);
  const [hourTypes, setHourTypes] = useState(null);
  const [selectedHourType, setSelectedHourType] = useState('R');

  // Sets the person type of the user
  useEffect(() => {
    user.getProfileInfo().then((data) => {
      data.PersonType.includes('stu') ? setIsUserStudent(true) : setIsUserStudent(false);
    });
  });

  // disabled lint in some lines in order to remove warning about race condition that does not apply
  // in our current case.
  useEffect(() => {
    async function getCanUseStaff() {
      try {
        let canUse = await jobs.getStaffPageForUser();
        let hourTypes = await jobs.getHourTypes();

        if (canUse.length === 1) {
          setCanUseStaff(true);
          setHourTypes(hourTypes);
        } else {
          setCanUseStaff(false);
        }
      } catch (error) {
        //do nothing
      }
    }
    // updates ui with the current status of the users clocked in feature
    // either clocked in and ready to clock out or the opposite.
    // status is notted by either true or false. true being clocked in.
    async function getClockInOutStatus() {
      try {
        let status = await jobs.clockOut();

        if (status[0].currentState) {
          setClockInOut('Clock Out');

          handleDateChangeInClock(new Date(status[0].timestamp));
        } else {
          setClockInOut('Clock In');
        }
      } catch (error) {
        //do nothing
      }
    }

    getCanUseStaff();
    getClockInOutStatus();

    // eslint-disable-next-line
  }, []);

  //had to be defined outside of the authentication condition so that the ui could update
  // before cheking to see if user is authenticated.
  const handleDateChangeInClock = (date) => {
    if (date) {
      date.setSeconds(0);
      date.setMilliseconds(0);
      setSelectedDateIn(date);
      setIsOverlappingShift(false);
      handleTimeErrors(date, selectedDateOut);
    }
  };

  const tooltipRef = useRef();
  const classes = useStyles();

  const handleTimeErrors = (timeIn, timeOut) => {
    if (timeIn !== null && timeOut !== null) {
      checkForFutureDate(timeIn, timeOut);
      let timeDiff = timeOut.getTime() - timeIn.getTime();
      let calculatedTimeDiff = timeDiff / 3600000; //3,600,000 milliseconds in an hour.
      let roundedHourDifference = (Math.round(calculatedTimeDiff * 12) / 12).toFixed(2);
      if (roundedHourDifference < 0.08) {
        roundedHourDifference = 0.08; //minimum 1/12th hour (5 minutes) for working a shift.
      }
      setHoursWorkedInDecimal(roundedHourDifference);
      let hoursWorked = Math.floor(calculatedTimeDiff);
      let minutesWorked = Math.round((calculatedTimeDiff - hoursWorked) * 60).toFixed(2);

      if (minutesWorked >= 60) {
        hoursWorked++;
        minutesWorked = 0;
      }

      setTimeOutIsBeforeTimeIn(timeDiff < 0);
      setIsZeroLengthShift(timeDiff === 0);
      setShiftTooLong(calculatedTimeDiff > 20);
    }
  };

  const checkForFutureDate = (dateIn, dateOut) => {
    let now = Date.now();
    setEnteredFutureTime(dateIn.getTime() > now || dateOut.getTime() > now);
  };

  if (props.authentication) {
    const getJobs = (dateIn, dateOut) => {
      jobs.getJobs(canUseStaff, dateIn, dateOut).then((result) => {
        setUserJobs(result);
      });
    };

    const getSavedShiftsForUser = () => {
      return jobs.getSavedShiftsForUser(canUseStaff);
    };

    const handleDateChangeIn = (date) => {
      if (date) {
        date.setSeconds(0);
        date.setMilliseconds(0);
        setSelectedDateIn(date);
        setIsOverlappingShift(false);
        handleTimeErrors(date, selectedDateOut);
        if (selectedDateOut !== null) {
          getJobs(date, selectedDateOut);
        }
      }
    };

    const handleDateChangeOut = (date) => {
      if (date) {
        date.setSeconds(0);
        date.setMilliseconds(0);
        setSelectedDateOut(date);
        setIsOverlappingShift(false);
        handleTimeErrors(selectedDateIn, date);
        if (selectedDateIn !== null) {
          getJobs(selectedDateIn, date);
        }
      }
    };

    const handleSaveButtonClick = () => {
      let timeIn = selectedDateIn;
      let timeOut = selectedDateOut;
      setSaving(true);

      if (selectedDateIn.getDay() === 6 && selectedDateOut.getDay() === 0) {
        let timeOut2 = new Date(timeOut.getTime());
        let timeIn2 = new Date(timeOut.getTime());
        timeIn2.setHours(0);
        timeIn2.setMinutes(0);

        timeOut.setDate(timeIn.getDate());
        timeOut.setHours(23);
        timeOut.setMinutes(59);

        let timeDiff2 = timeOut2.getTime() - timeIn2.getTime();
        let calculatedTimeDiff2 = timeDiff2 / 3600000; //3,600,000 milliseconds in an hour.
        let roundedHourDifference2 = (Math.round(calculatedTimeDiff2 * 12) / 12).toFixed(2);
        if (roundedHourDifference2 < 0.08) {
          roundedHourDifference2 = 0.08; //minimum 1/12th hour (5 minutes) for working a shift.
        }

        // Do not save the shift if it has zero length
        if (calculatedTimeDiff2 > 0) {
          saveShift(
            selectedJob.EMLID,
            timeIn2,
            timeOut2,
            roundedHourDifference2,
            selectedHourType,
            userShiftNotes,
          )
            .then(() => {
              setSnackbarSeverity('info');
              setSnackbarText(
                'Your entered shift spanned two pay weeks, so it was automatically split into two shifts.',
              );
              setSnackbarOpen(true);
            })
            .catch((err) => {
              setSaving(false);
              if (typeof err === 'string' && err.toLowerCase().includes('overlap')) {
                setSnackbarText(
                  'The shift was automatically split because it spanned a pay week, but one of the two derived shifts conflicted with a previously entered one. Please review your saved shifts.',
                );
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
              } else {
                setSnackbarText('There was a problem saving the shift.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
              }
            });
        }
      }

      let timeDiff1 = timeOut.getTime() - timeIn.getTime();
      let calculatedTimeDiff = timeDiff1 / 3600000; //3,600,000 milliseconds in an hour.
      let roundedHourDifference = (Math.round(calculatedTimeDiff * 12) / 12).toFixed(2);
      if (roundedHourDifference < 0.08) {
        roundedHourDifference = 0.08; //minimum 1/12th hour (5 minutes) for working a shift.
      }

      saveShift(
        selectedJob.EMLID,
        timeIn,
        timeOut,
        roundedHourDifference,
        selectedHourType,
        userShiftNotes,
      )
        .then((result) => {
          shiftDisplayComponent.loadShifts();
          setSelectedDateOut(null);
          setSelectedDateIn(null);
          setUserShiftNotes('');
          setUserJobs([]);
          setHoursWorkedInDecimal(0);
          setSaving(false);
        })
        .catch((err) => {
          setSaving(false);
          if (typeof err === 'string' && err.toLowerCase().includes('overlap')) {
            setSnackbarText(
              'You have already entered hours that fall within this time frame. Please review the times you entered above and try again.',
            );
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
          } else {
            setSnackbarText('There was a problem saving the shift.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
          }
        });
    };

    const saveShift = async (eml, shiftStart, shiftEnd, hoursWorked, hoursType, shiftNotes) => {
      await jobs.saveShiftForUser(
        canUseStaff,
        eml,
        shiftStart,
        shiftEnd,
        hoursWorked,
        hoursType,
        shiftNotes,
      );
    };

    const jobsMenuItems = userJobs ? (
      userJobs.map((job) => (
        <MenuItem label={job.POSTITLE} value={job} key={job.EMLID}>
          {job.POSTITLE}
        </MenuItem>
      ))
    ) : (
      <></>
    );
    const hourTypeMenuItems = hourTypes ? (
      hourTypes.map((type) => (
        <MenuItem label={type.type_description} value={type.type_id} key={type.type_id}>
          {type.type_description}
        </MenuItem>
      ))
    ) : (
      <></>
    );

    const isLeapYear = (date) => {
      if (date.getFullYear() % 4 === 0) {
        if (date.getFullYear() % 100 === 0) {
          if (date.getFullYear() % 400 !== 0) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    };

    const getNextDate = (date) => {
      let is30DayMonth =
        date.getMonth() === 3 ||
        date.getMonth() === 5 ||
        date.getMonth() === 8 ||
        date.getMonth() === 10;

      let isFebruary = date.getMonth() === 1;
      let isDecember = date.getMonth() === 11;
      let nextDate;
      let monthToReturn;
      let yearToReturn;

      if (isFebruary) {
        if (isLeapYear(date)) {
          if (date.getDate() === 29) {
            nextDate = 1;
            monthToReturn = 2;
            yearToReturn = date.getFullYear();
          } else {
            nextDate = date.getDate() + 1;
            monthToReturn = date.getMonth();
            yearToReturn = date.getFullYear();
          }
        } else if (date.getDate() === 28) {
          nextDate = 1;
          monthToReturn = 2;
          yearToReturn = date.getFullYear();
        } else {
          nextDate = date.getDate() + 1;
          monthToReturn = date.getMonth();
          yearToReturn = date.getFullYear();
        }
      } else if (isDecember) {
        if (date.getDate() === 31) {
          nextDate = 1;
          monthToReturn = 0;
          yearToReturn = date.getFullYear() + 1;
        } else {
          nextDate = date.getDate() + 1;
          monthToReturn = date.getMonth();
          yearToReturn = date.getFullYear();
        }
      } else if (is30DayMonth) {
        if (date.getDate() === 30) {
          nextDate = 1;
          monthToReturn = date.getMonth() + 1;
          yearToReturn = date.getFullYear();
        } else {
          nextDate = date.getDate() + 1;
          monthToReturn = date.getMonth();
          yearToReturn = date.getFullYear();
        }
      } else {
        if (date.getDate() === 31) {
          nextDate = 1;
          monthToReturn = date.getMonth() + 1;
          yearToReturn = date.getFullYear();
        } else {
          nextDate = date.getDate() + 1;
          monthToReturn = date.getMonth();
          yearToReturn = date.getFullYear();
        }
      }

      return {
        date: nextDate,
        month: monthToReturn,
        year: yearToReturn,
      };
    };

    const disableDisallowedDays = (date) => {
      let dayIn = selectedDateIn;
      let nextDate = getNextDate(dayIn);
      let shouldDisableDate = !(
        (date.getDate() === dayIn.getDate() &&
          date.getMonth() === dayIn.getMonth() &&
          date.getYear() === dayIn.getYear()) ||
        (date.getDate() === nextDate.date &&
          date.getMonth() === nextDate.month &&
          date.getFullYear() === nextDate.year)
      );
      return shouldDisableDate;
    };

    const changeState = async () => {
      if (clockInOut === 'Clock In') {
        setClockInOut('Clock Out');
        await jobs.clockIn(true);
        let clockInDate = new Date();
        handleDateChangeIn(clockInDate);
      }
      if (clockInOut === 'Clock Out') {
        setClockInOut('Reset');
        await jobs.clockIn(false);
        let clockOutDate = new Date();
        handleDateChangeOut(clockOutDate);
        await jobs.deleteClockIn();
      }
      if (clockInOut === 'Reset') {
        setClockInOut('Clock In');
        setSelectedDateIn(null);
        setSelectedDateOut(null);
      }
    };

    const handleCloseSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSnackbarOpen(false);
    };

    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        setNetwork('online');
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    const jobDropdown = (
      <FormControl
        disabled={userJobs === null || userJobs.length === 0}
        style={{
          width: 252,
        }}
      >
        <InputLabel className="disable-select">Jobs</InputLabel>
        <Select
          value={selectedJob}
          onChange={(e) => {
            setSelectedJob(e.target.value);
          }}
          input={<Input id="job" />}
        >
          <MenuItem label="None" value="">
            <em>None</em>
          </MenuItem>
          {jobsMenuItems}
        </Select>
      </FormControl>
    );

    const hourTypeDropdown = (
      <FormControl
        disabled={hourTypes === null || hourTypes.length === 0}
        style={{
          width: 252,
        }}
      >
        <InputLabel className="disable-select">Hour Type</InputLabel>
        <Select
          value={selectedHourType}
          onChange={(e) => {
            setSelectedHourType(e.target.value);
          }}
          input={<Input id="hour type" />}
        >
          {hourTypeMenuItems}
        </Select>
      </FormControl>
    );

    let errorText;
    if (enteredFutureTime) {
      errorText = (
        <Typography variant="overline" color="error">
          A shift cannot begin or end in the future.
        </Typography>
      );
    } else if (timeOutIsBeforeTimeIn) {
      errorText = (
        <Typography variant="overline" color="error">
          A shift cannot end before it starts.
        </Typography>
      );
    } else if (isZeroLengthShift) {
      errorText = (
        <Typography variant="overline" color="error">
          The entered shift has zero length.
        </Typography>
      );
    } else if (shiftTooLong) {
      errorText = (
        <Typography variant="overline" color="error">
          A shift cannot be longer than 20 hours.
        </Typography>
      );
    } else if (isOverlappingShift) {
      errorText = (
        <Typography variant="overline" color="error">
          You have already entered hours that fall within this time frame.
        </Typography>
      );
    } else {
      errorText = <></>;
    }

    const handleShiftNotesChanged = (event) => {
      setUserShiftNotes(event.target.value);
    };

    const saveButton = saving ? (
      <GordonLoader size={32} />
    ) : (
      <Button
        disabled={
          enteredFutureTime ||
          timeOutIsBeforeTimeIn ||
          isOverlappingShift ||
          shiftTooLong ||
          isZeroLengthShift ||
          selectedDateIn === null ||
          selectedDateOut === null ||
          selectedJob === null ||
          selectedJob === '' ||
          selectedHourType === null
        }
        variant="contained"
        color="primary"
        onClick={handleSaveButtonClick}
      >
        Save
      </Button>
    );

    if (networkStatus === 'online' && isUserStudent && props.authentication) {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Card>
                  <CardContent
                    style={{
                      marginLeft: 8,
                      marginTop: 8,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center" alignContent="center">
                      <Grid item md={2}>
                        <Button onClick={changeState}> {clockInOut}</Button>
                      </Grid>
                      <Grid item md={8}>
                        <div className="header-tooltip-container">
                          <CustomTooltip
                            classes={{ tooltip: classes.customWidth }}
                            interactive
                            disableFocusListener
                            disableTouchListener
                            title={
                              canUseStaff
                                ? 'Staff Timesheets Info' // need to update for staff
                                : // eslint-disable-next-line no-multi-str
                                  'Student employees are not permitted to work more than 20 total hours\
                        per work week, or more than 40 hours during winter, spring, and summer breaks.\
                        \
                        To request permission for a special circumstance, please email\
                        student-employment@gordon.edu before exceeding this limit.'
                            }
                            placement="bottom"
                          >
                            <div ref={tooltipRef}>
                              <CardHeader className="disable-select" title="Enter a shift" />
                              <InfoOutlinedIcon
                                className="tooltip-icon"
                                style={{
                                  fontSize: 18,
                                }}
                              />
                            </div>
                          </CustomTooltip>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      justify="space-between"
                      alignItems="center"
                      alignContent="center"
                    >
                      <Grid item xs={12} md={6} lg={3}>
                        <KeyboardDateTimePicker
                          className="disable-select"
                          style={{
                            width: 252,
                          }}
                          variant="inline"
                          disableFuture
                          margin="normal"
                          id="date-picker-in-dialog"
                          label="Start Time"
                          helperText="MM-DD-YY HH-MM AM/PM"
                          format="MM/dd/yy hh:mm a"
                          value={selectedDateIn}
                          onChange={handleDateChangeIn}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        <KeyboardDateTimePicker
                          className="disable-select"
                          style={{
                            width: 252,
                          }}
                          variant="inline"
                          disabled={selectedDateIn === null}
                          initialFocusedDate={selectedDateIn}
                          shouldDisableDate={disableDisallowedDays}
                          disableFuture
                          margin="normal"
                          id="date-picker-out-dialog"
                          label="End Time"
                          helperText="MM-DD-YY HH-MM AM/PM"
                          format="MM/dd/yy hh:mm a"
                          openTo="hours"
                          value={selectedDateOut}
                          onChange={handleDateChangeOut}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        {jobDropdown}
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        {hourTypeDropdown}
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        <TextField
                          className="disable-select"
                          style={{
                            width: 252,
                          }}
                          label="Shift Notes"
                          multiline
                          rowsMax="3"
                          value={userShiftNotes}
                          onChange={handleShiftNotesChanged}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} lg={3}>
                        <Typography className="disable-select">
                          Hours worked: {hoursWorkedInDecimal}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        {errorText}
                      </Grid>
                      <Grid item xs={12}>
                        {saveButton}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>
                          <Link
                            className="disable-select"
                            style={{
                              borderBottom: '1px solid currentColor',
                              textDecoration: 'none',
                              color: gordonColors.primary.blueShades.A700,
                            }}
                            href={
                              canUseStaff
                                ? 'https://reports.gordon.edu/Reports/browse/Staff%20Timesheets'
                                : 'https://reports.gordon.edu/Reports/Pages/Report.aspx?ItemPath=%2fStudent+Timesheets%2fPaid+Hours+By+Pay+Period'
                            }
                            underline="always"
                            target="_blank"
                            rel="noopener"
                          >
                            View historical paid time
                          </Link>
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </MuiPickersUtilsProvider>
            </Grid>
            <ShiftDisplay
              ref={setShiftDisplayComponent}
              getSavedShiftsForUser={getSavedShiftsForUser}
              canUse={canUseStaff}
            />
          </Grid>
          <SimpleSnackbar
            text={snackbarText}
            severity={snackbarSeverity}
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
          />
        </>
      );
    } else {
      // If the network is offline or the user type is non-student
      if (networkStatus === 'offline' || !isUserStudent) {
        return (
          <Grid container justify="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  {networkStatus === 'offline' && (
                    <Grid
                      item
                      xs={2}
                      alignItems="center"
                      style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <img
                        src={require(`${'../../NoConnection.svg'}`)}
                        alt="Internet Connection Lost"
                      />
                    </Grid>
                  )}
                  <br />
                  <h1>
                    {networkStatus === 'offline'
                      ? 'Please re-establish connection'
                      : 'Timesheets Unavailable'}
                  </h1>
                  <h4>
                    {networkStatus === 'offline'
                      ? 'Timesheets entry has been disabled due to loss of network.'
                      : 'Timesheets is currently available for students only. Support for staff will come soon!'}
                  </h4>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    backgroundColor="white"
                    variant="outlined"
                    onClick={() => {
                      window.location.pathname = '';
                    }}
                  >
                    Back To Home
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      }
    }
  } else {
    // The user is not logged in
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent
              style={{
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              <h1>You are not logged in.</h1>
              <br />
              <h4>You must be logged in to use the Timesheets page.</h4>
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  window.location.pathname = '';
                }}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default Timesheets;
