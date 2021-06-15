import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const ConfirmCheckIn = ({ values }) => {
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <Typography variant="h5" gutterbottom align="center">
          Check-In Confirmation
        </Typography>
        <br />
        <Typography variant="body1" gutterbottom>
          Please examine the below data to confirm it is correct, then click Submit.
        </Typography>
      </Grid>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <Typography variant="body1" gutterbottom>
            <b>Emergency Contact 1:</b>
            <ul>
              <li>
                Name: {values.firstName1} {values.lastName1}
              </li>
              <li>Relationship: {values.relationship1}</li>
              <li>Home #: {values.homePhone1}</li>
              <li>Mobile #: {values.mobilePhone1}</li>
            </ul>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" gutterbottom>
            <b>Emergency Contact 2:</b>
            <ul>
              <li>
                Name: {values.firstName2} {values.lastName2}
              </li>
              <li>Relationship: {values.relationship2}</li>
              <li>Home #: {values.homePhone2}</li>
              <li>Mobile #: {values.mobilePhone2}</li>
            </ul>
          </Typography>
        </Grid>
        {values.firstName3 !== '' ? (
          <Grid item>
            <Typography variant="body1" gutterbottom>
              <b>Emergency Contact 3:</b>
              <ul>
                <li>
                  Name: {values.firstName3} {values.lastName3}
                </li>
                <li>Relationship: {values.relationship3}</li>
                <li>Home #: {values.homePhone3}</li>
                <li>Mobile #: {values.mobilePhone3}</li>
              </ul>
            </Typography>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <Grid item>
        <Typography variant="body1" gutterbottom>
          <b>Personal Cell-Phone Number:</b>{' '}
          {values.noPhone === true ? 'None' : values.personalPhone}
        </Typography>
        <Typography variant="body1" gutterbottom>
          <b>Ethnicity:</b> {values.ethnicity === 'H_L' ? 'Hispanic/Latino' : 'Not Hispanic/Latino'}
        </Typography>
        <Typography variant="body1" gutterbottom>
          <b>Race:</b>
          {}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ConfirmCheckIn;
