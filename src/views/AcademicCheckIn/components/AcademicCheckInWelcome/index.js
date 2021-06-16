import React from 'react';
import { Typography, Grid } from '@material-ui/core';
// import './index.css';

const AcademicCheckInWelcome = (values, handleChange) => {
  return (
    <Grid container justify="center" alignItems="center" direction="column">
      <Typography justify="center" className="checkIn">
        Academic Check In Welcome
      </Typography>
    </Grid>
  );
};

export default AcademicCheckInWelcome;
