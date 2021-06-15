import React from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import './index.css';

const ConfirmCheckIn = () => {
  return (
    <Grid container alignItems="center" justify="center">
      <Grid item xs={5}>
        <Typography variant="h5" gutterbottom>
          Check-In Complete
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1" gutterbottom>
          Congratulations! You have completed the Academic Check-In Process. You are now officially
          considered an active student for this term.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Click the button below to be redirected to the 360 homepage.
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Button></Button>
      </Grid>
    </Grid>
  );
};

export default ConfirmCheckIn;
