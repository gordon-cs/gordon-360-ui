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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const [selectedJob, setSelectedJob] = React.useState('');

  useEffect(() => {
    jobs.getActiveJobsForUser('50193229').then(result => {
      setUserJobs(result);
    });
  }, []);

  const clockIcon = <ScheduleIcon />;

  const handleDateChange1 = date => {
    setSelectedDate(date);
  };

  const handleDateChange2 = date => {
    setSelectedDate2(date);
  };

  const jobsMenuItems = userJobs.map(job => (
    <MenuItem value={job.EML_DESCRIPTION} key={job.ID}>
      {job.EML_DESCRIPTION}
    </MenuItem>
  ));

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
              <Grid item xs={12} sm={3}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker-in"
                  label="Time In"
                  value={selectedDate}
                  onChange={handleDateChange1}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  keyboardIcon={clockIcon}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} lg={3}>
                {jobDropdown}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </>
  );
}
