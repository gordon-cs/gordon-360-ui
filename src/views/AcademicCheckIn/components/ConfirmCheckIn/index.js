import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { gordonColors } from 'theme';

const ConfirmCheckIn = ({ values }) => {
  const cyan = gordonColors.primary.cyan;
  const raceValues = [
    values.nativeAmerican,
    values.asian,
    values.black,
    values.hawaiian,
    values.white,
    values.none,
  ];
  const raceNames = ['Native American', 'Asian', 'Black', 'Hawaiian', 'White', '🧙‍♂️'];

  const displayRace = () => {
    var i;
    var names = '';
    for (i = 0; i < raceValues.length; i++) {
      raceValues[i] === true ? (names += raceNames[i] + ' ') : (names += '');
    }
    return names;
  };

  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <Typography variant="h5" gutterbottom align="center" style={{ color: cyan }}>
          Check-In Confirmation
        </Typography>
        <br />
        <Typography variant="body1" align="center" gutterbottom>
          Please examine the below data to confirm it is correct, then click Submit.
        </Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="right" direction="row" spacing={2}>
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
      </Grid>
      <Grid item>
        <Grid container alignItem="left" direction="column">
          <Grid item>
            <Typography variant="body1" gutterbottom>
              <b>Personal Cell-Phone Number:</b>{' '}
              {values.noPhone === true ? 'None' : values.personalPhone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterbottom>
              <b>Ethnicity:</b>{' '}
              {values.ethnicity === 'H_L'
                ? 'Hispanic/Latino'
                : values.ethnicity === 'notH_L'
                ? 'Not Hispanic/Latino'
                : 'Prefer not to say'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterbottom>
              <b>Race:</b> {displayRace()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfirmCheckIn;
