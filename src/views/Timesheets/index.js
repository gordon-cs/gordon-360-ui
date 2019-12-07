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
} from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import jobs from '../../services/jobs';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './timesheets.css';

export default function Timesheets() {
  const [userJobs, setUserJobs] = useState([]);
  const [selectedDate1, setSelectedDate1] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const [selectedJob, setSelectedJob] = React.useState('');
  // const [day2PushedForward, setDay2CPushedForward] = React.useState(false);

  // const handleHourDifference = (timeIn, timeOut) => {
  //   let timeDiff = timeOut.getTime() - timeIn.getTime();
  //   if(timeDiff < 0){
  //     selectedDate2.setTime(selectedDate2.getTime() + 86400000);
  //     console.log("Day In = " + selectedDate.getDay());
  //     console.log("Day Out = " + selectedDate2.getDay());
  //     console.log("overnightHourDiff = " + (selectedDate2.getTime() - selectedDate.getTime()) / 1000 / 60 / 60 )
  //   } else {
  //     console.log("It's a regular hour difference my dude", (selectedDate2.getTime() - selectedDate.getTime()) / 1000 / 60 / 60);
  //   }
  // }

  useEffect(() => {
    jobs.getActiveJobsForUser('50193229').then(result => {
      setUserJobs(result);
    });
  }, []);

  const clockIcon = <ScheduleIcon />;

  const handleDateChange1 = date => {
    // let timeDiff = selectedDate2.getTime() - selectedDate.getTime();
    // handleHourDifference(date, selectedDate2);
    setSelectedDate1(date);
    setSelectedDate2(date);
  };

  const handleDateChange2 = date => {
    // let timeDiff = selectedDate2.getTime() - selectedDate.getTime();
    // handleHourDifference(selectedDate, date);
    setSelectedDate2(date);
  };

  const jobsMenuItems = userJobs.map(job => (
    <MenuItem value={job.EML_DESCRIPTION} key={job.ID}>
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
                {jobDropdown}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </>
  );
}
