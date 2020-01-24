import React, { useEffect, useState } from 'react';
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
  Divider,
  TextField,
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import jobs from '../../services/jobs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SavedShiftsList from './components/SavedShiftsList';
import user from './../../services/user';
import './timesheets.css';
import GordonLoader from '../../components/Loader';

export default function Timesheets() {
  const [userJobs, setUserJobs] = useState([]);
  const [selectedDate1, setSelectedDate1] = React.useState(null);
  const [selectedDate2, setSelectedDate2] = React.useState(null);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [shiftTooLong, setShiftTooLong] = React.useState(false);
  const [timeOutIsBeforeTimeIn, setTimeOutIsBeforeTimeIn] = React.useState(false);
  const [timeWorked, setTimeWorked] = React.useState('');
  const [hoursWorkedInDecimal, setHoursWorkedInDecimal] = React.useState(0.0);
  const [userId, setUserId] = React.useState('');
  const [userShiftNotes, setUserShiftNotes] = React.useState('');

  const handleTimeOutIsBeforeTimeIn = (timeIn, timeOut) => {
    if (timeIn !== null && timeOut !== null) {
      let timeDiff = timeOut.getTime() - timeIn.getTime();
      let calculatedTimeDiff = timeDiff / 1000 / 60 / 60;
      setHoursWorkedInDecimal(calculatedTimeDiff);
      let hoursWorked = Math.floor(calculatedTimeDiff);
      let minutesWorked = Math.round((calculatedTimeDiff - hoursWorked) * 60);

      if (minutesWorked >= 60) {
        hoursWorked++;
        minutesWorked = 0;
      }

      if (timeDiff < 0) {
        setTimeOutIsBeforeTimeIn(true);
      } else {
        setTimeOutIsBeforeTimeIn(false);
        setTimeWorked(hoursWorked + ':' + minutesWorked);
      }
      if (calculatedTimeDiff > 20) {
        setShiftTooLong(true);
      } else {
        setShiftTooLong(false);
      }
    }
  };

  useEffect(() => {
    try {
      user.getProfileInfo().then(result => {
        let profile = result;
        // getActiveJobsForUser(profile.ID);
        setUserId(profile.ID);
      });
    } catch (error) {
      //
    }
  }, []);

  const clockIcon = <ScheduleIcon />;

  const getActiveJobsForUser = () => {
    let details = {
      shift_start_datetime: selectedDate1.toLocaleString(),
      shift_end_datetime: selectedDate2.toLocaleString(),
      id_num: userId,
    };
    console.log('fetching jobs', details);
    jobs.getActiveJobsForUser(details).then(result => {
      console.log('jobs:', result);
      setUserJobs(result);
    });
  };

  const getSavedShiftsForUser = userID => {
    return jobs.getSavedShiftsForUser(userID);
  };

  let savedShiftsListComponent =
    userId !== '' ? (
      <SavedShiftsList getShifts={getSavedShiftsForUser} userID={userId} />
    ) : (
      <>
        <Divider
          style={{
            backgroundColor: '#adadad',
            marginLeft: '18px',
            marginRight: '18px',
          }}
        />
        <CardContent>
          <GordonLoader />
        </CardContent>
      </>
    );
  const handleDateChange1 = date => {
    handleTimeOutIsBeforeTimeIn(date, selectedDate2);
    setSelectedDate1(date);
    handleTimeEntered(date, selectedDate2);
  };

  const handleDateChange2 = date => {
    handleTimeOutIsBeforeTimeIn(selectedDate1, date);
    setSelectedDate2(date);
    handleTimeEntered(selectedDate1, date);
  };

  const handleSaveButtonClick = () => {
    let timeIn = selectedDate1.toLocaleString();
    let timeOut = selectedDate2.toLocaleString();

    saveShift(
      userId,
      selectedJob.EMLID,
      timeIn,
      timeOut,
      hoursWorkedInDecimal,
      userShiftNotes,
      userId,
    );
    window.location.reload();
  };

  const saveShift = async (
    studentID,
    eml,
    shiftStart,
    shiftEnd,
    hoursWorked,
    shiftNotes,
    lastChangedBy,
  ) => {
    await jobs.submitShiftForUser(
      studentID,
      eml,
      shiftStart,
      shiftEnd,
      hoursWorked,
      shiftNotes,
      lastChangedBy,
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

  const disableDisallowedDays = date => {
    let dayIn = selectedDate1.getDate();
    let shouldDisableDate = !(date.getDate() === dayIn || date.getDate() === dayIn + 1);
    return shouldDisableDate;
  };

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
  if (timeOutIsBeforeTimeIn) {
    errorText = (
      <Typography variant="overline" color="error">
        A shift cannot end before it starts.
      </Typography>
    );
  } else if (shiftTooLong) {
    errorText = (
      <Typography variant="overline" color="error">
        A shift cannot be longer than 20 hours.
      </Typography>
    );
  } else {
    errorText = <></>;
  }

  const handleTimeEntered = (timeIn, timeOut) => {
    if (selectedDate1 !== null && selectedDate2 !== null && userId !== null) {
      getActiveJobsForUser();
    }
  };

  const handleShiftNotesChanged = event => {
    setUserShiftNotes(event.target.value);
  };

  return (
    <>
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
                <KeyboardDatePicker
                  autoOk
                  variant="inline"
                  margin="normal"
                  id="date-picker-in-dialog"
                  label="Date In"
                  format="MM/dd/yyyy"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KeyboardTimePicker
                  variant="dialog"
                  margin="normal"
                  id="time-picker-in"
                  label="Time In"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={clockIcon}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KeyboardDatePicker
                  autoOk
                  variant="dialog"
                  shouldDisableDate={disableDisallowedDays}
                  margin="normal"
                  id="date-picker-out-dialog"
                  label="Date Out"
                  format="MM/dd/yyyy"
                  value={selectedDate2}
                  onChange={handleDateChange2}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <KeyboardTimePicker
                  variant="dialog"
                  margin="normal"
                  id="time-picker-out"
                  label="Time Out"
                  value={selectedDate2}
                  onChange={handleDateChange2}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={clockIcon}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography>Hours worked: {timeWorked}</Typography>
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
                {jobDropdown}
              </Grid>
              <Grid
                items
                xs={12}
                style={{
                  marginTop: '8px',
                  marginBottom: '10px',
                }}
              >
                <Grid container justify="center">
                  <Grid item xs={12}>
                    {errorText}
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      disabled={
                        timeOutIsBeforeTimeIn ||
                        shiftTooLong ||
                        selectedDate1 === null ||
                        selectedDate2 === null ||
                        selectedJob === null
                      }
                      variant="contained"
                      color="primary"
                      onClick={handleSaveButtonClick}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          {savedShiftsListComponent}
        </Card>
      </MuiPickersUtilsProvider>
    </>
  );
}
