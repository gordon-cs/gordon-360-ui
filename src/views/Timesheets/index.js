import React, { useEffect, useState } from 'react';
import 'date-fns';
import { Grid, Card, CardContent } from '@material-ui/core/';
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
  useEffect(() => {
    jobs.getActiveJobsForUser('50193229').then(result => {
      setUserJobs(result);
    });
  }, []);

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState(new Date());
  const clockIcon = <ScheduleIcon />;

  const handleDateChange1 = date => {
    setSelectedDate(date);
  };

  const handleDateChange2 = date => {
    setSelectedDate2(date);
  };

  const jobsMenuItems = userJobs.map(job => (
    <option value={job.EML_DESCRIPTION} key={job.ID}>
      {job.EML_DESCRIPTION}
    </option>
  ));
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
            <select>{jobsMenuItems}</select>
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
                  ampm={false}
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
            </Grid>
          </CardContent>
        </Card>
      </MuiPickersUtilsProvider>
    </>
  );
}
