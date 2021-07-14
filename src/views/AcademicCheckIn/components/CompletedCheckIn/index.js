import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';

const CompletedCheckIn = ({}) => {
  const cyan = gordonColors.primary.cyan;
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <Typography variant="h5" gutterbottom align="center" style={{ color: cyan }}>
          Thank you for completing Academic Checkin!
        </Typography>
        <br />
        <Typography variant="body1" gutterBottom>
          We are excited to welcome you to your new semester at Gordon College!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CompletedCheckIn;
