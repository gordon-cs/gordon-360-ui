import React, { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';

export default class ShiftItem extends Component {
  render() {
    const shift = this.props.value;
    const {
      EML_DESCRIPTION,
      SHIFT_START_DATETIME,
      SHIFT_END_DATETIME,
      HOURLY_RATE,
      HOURS_WORKED,
      STATUS,
    } = shift;

    return (
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography>
            {EML_DESCRIPTION +
              ' ' +
              SHIFT_START_DATETIME +
              ' ' +
              SHIFT_END_DATETIME +
              ' ' +
              HOURLY_RATE +
              ' ' +
              HOURS_WORKED +
              ' ' +
              STATUS +
              ' '}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
