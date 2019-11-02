import React, { Component } from 'react';
import 'date-fns';
import { Grid, Card, CardContent, CardActions } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

export default function Timesheets() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-01-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card>
        <CardContent
          style={{
            marginLeft: 8,
            marginTop: 8,
          }}
        >
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} md={3}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker-in"
                label="Time In"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker-out"
                label="Time Out"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MuiPickersUtilsProvider>
  );
}
