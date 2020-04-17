import React, { useState } from 'react';
import 'date-fns';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button,
  Typography,
  TextField,
  Snackbar,
} from '@material-ui/core/';
import MuiAlert from '@material-ui/lab/Alert';
import DateFnsUtils from '@date-io/date-fns';
import jobs from '../../services/jobs';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import ShiftDisplay from './components/ShiftDisplay';
import './timesheets.css';

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

  const handleTimeErrors = (timeIn, timeOut) => {
    if (timeIn !== null && timeOut !== null) {
      let timeDiff = timeOut.getTime() - timeIn.getTime();
      let calculatedTimeDiff = timeDiff / 1000 / 60 / 60;
      let roundedHourDifference = 0;
      if (calculatedTimeDiff > 0 && calculatedTimeDiff < 0.25) {
        roundedHourDifference = 0.25;
      } else if (calculatedTimeDiff >= 0.25) {
        roundedHourDifference = (Math.round(calculatedTimeDiff * 4) / 4).toFixed(2);
      }
      setHoursWorkedInDecimal(roundedHourDifference);
      let hoursWorked = Math.floor(calculatedTimeDiff);
      let minutesWorked = Math.round((calculatedTimeDiff - hoursWorked) * 60);

      if (minutesWorked >= 60) {
        hoursWorked++;
        minutesWorked = 0;
      }

      setTimeOutIsBeforeTimeIn(timeDiff < 0);
      setIsZeroLengthShift(timeDiff === 0);
      setShiftTooLong(calculatedTimeDiff > 20);
    }
  };

  const checkForFutureDate = () => {
    let now = Date.now();
    setEnteredFutureTime((selectedDateIn.getTime() > now) || (selectedDateOut.getTime() > now));
  }

  if (props.Authentication) {
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const getActiveJobsForUser = () => {
      let details = {
        shift_start_datetime: selectedDateIn.toLocaleString(),
        shift_end_datetime: selectedDateOut.toLocaleString(),
      };
      jobs.getActiveJobsForUser(details).then(result => {
        setUserJobs(result);
      });
    };

    const getSavedShiftsForUser = () => {
      return jobs.getSavedShiftsForUser();
    };

    const handleDateChangeIn = date => {
      if (date) {
        date.setSeconds(0);
        date.setMilliseconds(0);
        setSelectedDateIn(date);
        setIsOverlappingShift(false);
        handleTimeErrors(date, selectedDateOut);
      }
    };

    const handleDateChangeOut = date => {
      if (date) {
        date.setSeconds(0);
        date.setMilliseconds(0);
        setSelectedDateOut(date);
        setIsOverlappingShift(false);
        handleTimeErrors(selectedDateIn, date);
      }
    };

    const handleSaveButtonClick = () => {
      let timeIn = selectedDateIn;
      let timeOut = selectedDateOut;

      if (selectedDateIn.getDay() === 6 && selectedDateOut.getDay() === 0) {
        let timeOut2 = new Date(timeOut.getTime());
        let timeIn2 = new Date(timeOut.getTime());
        timeIn2.setHours(0);
        timeIn2.setMinutes(0);

        timeOut.setDate(timeIn.getDate());
        timeOut.setHours(23);
        timeOut.setMinutes(59);

        let timeDiff2 = timeOut2.getTime() - timeIn2.getTime();
        let calculatedTimeDiff2 = timeDiff2 / 1000 / 60 / 60;
        let roundedHourDifference2 = 0;
        if (calculatedTimeDiff2 > 0 && calculatedTimeDiff2 < 0.25) {
          roundedHourDifference2 = 0.25;
        } else if (calculatedTimeDiff2 >= 0.25) {
          roundedHourDifference2 = (Math.round(calculatedTimeDiff2 * 4) / 4).toFixed(2);
        }

        // Do not save the shift if it has zero length
        if (calculatedTimeDiff2 > 0) {
          saveShift(
            selectedJob.EMLID,
            timeIn2.toLocaleString(),
            timeOut2.toLocaleString(),
            roundedHourDifference2,
            userShiftNotes,
          ).then(result => {
            setSnackbarOpen(true);
          });
        }
      }

      let timeDiff1 = timeOut.getTime() - timeIn.getTime();
      let calculatedTimeDiff = timeDiff1 / 1000 / 60 / 60;
      let roundedHourDifference;
      if (calculatedTimeDiff > 0 && calculatedTimeDiff < 0.25) {
        roundedHourDifference = 0.25;
      } else {
        roundedHourDifference = (Math.round(calculatedTimeDiff * 4) / 4).toFixed(2);
      }

      saveShift(
        selectedJob.EMLID,
        timeIn.toLocaleString(),
        timeOut.toLocaleString(),
        roundedHourDifference,
        userShiftNotes,
      ).then(result => {
        shiftDisplayComponent.loadShifts()
        setSelectedDateOut(null);
        setSelectedDateIn(null);
        setUserShiftNotes('');
        setUserJobs([]);
        setHoursWorkedInDecimal(0);
      }).catch(err => {
        if (err.toLowerCase().includes('overlap')) {
          setIsOverlappingShift(true);
        }
      });
    };

    const saveShift = async (
      eml,
      shiftStart,
      shiftEnd,
      hoursWorked,
      shiftNotes,
    ) => {
      await jobs.saveShiftForUser(
        eml,
        shiftStart,
        shiftEnd,
        hoursWorked,
        shiftNotes,
      );
    };

    const jobsMenuItems = userJobs ? (
      userJobs.map(job => (
        <MenuItem label={job.POSTITLE} value={job} key={job.EMLID}>
          {job.POSTITLE}
        </MenuItem>
      ))
    ) : (
        <></>
      );

    const isLeapYear = date => {
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

    const getNextDate = date => {
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

    const disableDisallowedDays = date => {
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
    window.addEventListener('message', event => {
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
        <InputLabel>Jobs</InputLabel>
        <Select
          value={selectedJob}
          onChange={e => {
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
    }
    else {
      errorText = <></>;
    }

    const onDatetimeSelectorClose = () => {
      if (selectedDateIn !== null && selectedDateOut !== null) {
        getActiveJobsForUser();
        checkForFutureDate();
      }
    }

    const handleShiftNotesChanged = event => {
      setUserShiftNotes(event.target.value);
    };

    return networkStatus === 'online' ? (
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
                  <CardHeader title="Enter a shift" />
                  <Grid
                    container
                    spacing={2}
                    justify="space-around"
                    alignItems="center"
                    alignContent="center"
                  >
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDateTimePicker
                        style={{
                          width: 252,
                        }}
                        variant="inline"
                        disableFuture
                        margin="normal"
                        id="date-picker-in-dialog"
                        label="Start Time"
                        format="MM/dd/yy hh:mm a"
                        value={selectedDateIn}
                        onChange={handleDateChangeIn}
                        onClose={onDatetimeSelectorClose}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDateTimePicker
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
                        format="MM/dd/yy hh:mm a"
                        value={selectedDateOut}
                        onChange={handleDateChangeOut}
                        onClose={onDatetimeSelectorClose}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      {jobDropdown}
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
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
                    <Grid item xs={12} sm={6} md={3}>
                      <Typography>Hours worked: {hoursWorkedInDecimal}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {errorText}
                    </Grid>
                    <Grid item xs={6}>
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
                          selectedJob === ''
                        }
                        variant="contained"
                        color="primary"
                        onClick={handleSaveButtonClick}
                      >
                        Save
                    </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </MuiPickersUtilsProvider>
          </Grid>
          <ShiftDisplay
            ref={setShiftDisplayComponent}
            getSavedShiftsForUser={getSavedShiftsForUser}
          />
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="info">
            Your entered shift spanned two pay weeks, so it was automatically split into two shifts.
        </Alert>
        </Snackbar>
      </>
    ) : (
      <Grid container justify="center" spacing="16">
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent
            style={{
              margin: 'auto',
              textAlign: 'center',
            }}
          >
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
            <br />
            <h1>Please re-establish connection</h1>
            <h4>Timesheets entry has been disabled due to loss of network.</h4>
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
  } else {
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
              <h4>You must be logged in to use the Student Timesheets page.</h4>
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
}

export default Timesheets;
