import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { gordonColors } from 'theme';

const ConfirmCheckIn = ({
  emergencyContact1,
  emergencyContact2,
  emergencyContact3,
  personalPhone,
  demographic,
}) => {
  const cyan = gordonColors.primary.cyan;

  const raceValues = [
    demographic.nativeAmerican,
    demographic.asian,
    demographic.black,
    demographic.hawaiian,
    demographic.white,
    demographic.none,
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
    <Grid container alignItems="center" justifyContent="center" direction="column">
      <Grid item>
        <Typography variant="h5" gutterBottom align="center" style={{ color: cyan }}>
          Check-In Confirmation
        </Typography>
        <br />
        <Typography variant="body1" align="center" gutterBottom>
          Please examine the below data to confirm it is correct, then click Submit.
        </Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center" direction="row" spacing={2}>
          <Grid item>
            <Typography variant="body1">
              <b>Emergency Contact 1:</b>
            </Typography>
            <ul>
              <li>
                Name: {emergencyContact1.firstname} {emergencyContact1.lastname}
              </li>
              <li>Relationship: {emergencyContact1.relationship}</li>
              <li>Home #: {emergencyContact1.HomePhone}</li>
              <li>Mobile #: {emergencyContact1.MobilePhone}</li>
            </ul>
            <br />
          </Grid>
          {emergencyContact2.firstName2 !== "" ? (
          <Grid item>
            <Typography variant="body1">
              <b>Emergency Contact 2:</b>
            </Typography>
            <ul>
              <li>
                Name: {emergencyContact2.firstname} {emergencyContact2.lastname}
              </li>
              <li>Relationship: {emergencyContact2.relationship}</li>
              <li>Home #: {emergencyContact2.HomePhone}</li>
              <li>Mobile #: {emergencyContact2.MobilePhone}</li>
            </ul>
            <br />
            </Grid>
            ) : ''}
          {emergencyContact3.firstName3 !== "" ? (
            <Grid item>
              <Typography variant="body1" gutterBottom>
                <b>Emergency Contact 3:</b>
              </Typography>
              <ul>
                <li>
                  Name: {emergencyContact3.firstname} {emergencyContact3.lastname}
                </li>
                <li>Relationship: {emergencyContact3.relationship}</li>
                <li>Home #: {emergencyContact3.HomePhone}</li>
                <li>Mobile #: {emergencyContact3.MobilePhone}</li>
              </ul>
              <br />
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="flex-start" direction="column">
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Personal Cell-Phone Number:</b>{' '}
              {personalPhone.noPhone === true ? 'None' : personalPhone.personalPhone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Ethnicity:</b>{' '}
              {demographic.ethnicity === '-1'
                ? 'Hispanic/Latino'
                : demographic.ethnicity === '-2'
                ? 'Not Hispanic/Latino'
                : 'Prefer not to say'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Race:</b> {displayRace()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfirmCheckIn;
