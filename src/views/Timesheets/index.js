import React, { useEffect, useState } from 'react';
import 'date-fns';
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Button,
  Typography,
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import jobs from '../../services/jobs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import user from './../../services/user';
import './timesheets.css';

export default function Timesheets() {
  const [userJobs, setUserJobs] = useState([]);
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const [selectedJob, setSelectedJob] = React.useState({});
  const [timeOutIsBeforeTimeIn, setTimeOutIsBeforeTimeIn] = React.useState(false);
  const [timeWorked, setTimeWorked] = React.useState('');
  const [hoursWorkedInDecimal, setHoursWorkedInDecimal] = React.useState(0.0);
  const [userId, setUserId] = React.useState('');

  const handleTimeOutIsBeforeTimeIn = (timeIn, timeOut) => {
    let timeDiff = timeOut.getTime() - timeIn.getTime();
    let calculatedTimeDiff = timeDiff / 1000 / 60 / 60;
    setHoursWorkedInDecimal(calculatedTimeDiff);
    let hoursWorked = Math.floor(calculatedTimeDiff);
    let minutesWorked = Math.round((calculatedTimeDiff - hoursWorked) * 60);

    console.log('Caclulated Time difference:', timeDiff);
    console.log('Hours worked:', hoursWorked);
    console.log('Minutes worked:', minutesWorked);
    if (timeDiff < 0) {
      setTimeOutIsBeforeTimeIn(true);
      console.log('Time difference:', timeWorked);
    } else {
      setTimeOutIsBeforeTimeIn(false);
      setTimeWorked(hoursWorked + ':' + minutesWorked);
      console.log('Time difference:', timeWorked);
    }
  };

  useEffect(() => {
    try {
      user.getProfileInfo().then(result => {
        let profile = result;
        getActiveJobsForUser(profile.ID);
        setUserId(profile.ID);
      });
    } catch (error) {
      //
    }
  }, []);

  const clockIcon = <ScheduleIcon />;

  const getActiveJobsForUser = userID => {
    jobs.getActiveJobsForUser(userID).then(result => {
      setUserJobs(result);
    });
  };

  const handleDateChange1 = date => {
    handleTimeOutIsBeforeTimeIn(date, selectedDate2);
    setSelectedDate1(date);
    setSelectedDate2(date);
  };

  const handleDateChange2 = date => {
    handleTimeOutIsBeforeTimeIn(selectedDate1, date);
    setSelectedDate2(date);
  };

  const handleSaveButtonClick = () => {
    saveShift(
      userId,
      '93222',
      selectedDate1.toDateString(),
      selectedDate2.toDateString(),
      hoursWorkedInDecimal,
      'Test shift',
      'nathaniel.rudenberg',
    );
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

  const jobsMenuItems = userJobs.map(job => (
    <MenuItem value={job.EML_DESCRIPTION} key={job.EML}>
      {job.EML_DESCRIPTION}
    </MenuItem>
  ));

  const disableDisallowedDays = date => {
    let dayIn = selectedDate1.getDate();
    let shouldDisableDate = !(date.getDate() === dayIn || date.getDate() === dayIn + 1);
    return shouldDisableDate;
  };

  const jobDropdown = (
    <FormControl
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

  const errorText = timeOutIsBeforeTimeIn ? (
    <Typography variant="overline" color="error">
      A shift cannot end before it starts.
    </Typography>
  ) : (
    <></>
  );

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
            <Grid
              container
              spacing={2}
              justify="space-around"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={12} sm={6} md={3}>
                <KeyboardDatePicker
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
                  hintText="Weekends disabled"
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
                {jobDropdown}
              </Grid>
              <Grid items xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    {errorText}
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary" onClick={handleSaveButtonClick}>
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="primary">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </>
  );
}
