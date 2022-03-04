import { Grid, Typography } from '@material-ui/core';
import { gordonColors } from 'theme';

const ConfirmCheckIn = ({
  emergencyContact1,
  emergencyContact2,
  emergencyContact3,
  phoneInfo,
  demographic,
}) => {
  const cyan = gordonColors.primary.cyan;

  const { ethnicity, ...raceValues } = demographic;

  const races = {
    NativeAmerican: 'Native American or Alaskan Native',
    Asian: 'Asian',
    Black: 'Black or African American',
    Hawaiian: 'Native Hawaiian or Other Pacific Islander',
    White: 'White',
  };

  const displayRace = Object.keys(races)
    .filter((race) => raceValues[race])
    .map((race) => races[race])
    .join(', ');

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
                Name: {emergencyContact1.FirstName} {emergencyContact1.LastName}
              </li>
              <li>Relationship: {emergencyContact1.Relationship}</li>
              <li>Home #: {emergencyContact1.HomePhone}</li>
              <li>Mobile #: {emergencyContact1.MobilePhone}</li>
            </ul>
            <br />
          </Grid>
          {emergencyContact2.FirstName !== '' ? (
            <Grid item>
              <Typography variant="body1">
                <b>Emergency Contact 2:</b>
              </Typography>
              <ul>
                <li>
                  Name: {emergencyContact2.FirstName} {emergencyContact2.LastName}
                </li>
                <li>Relationship: {emergencyContact2.Relationship}</li>
                <li>Home #: {emergencyContact2.HomePhone}</li>
                <li>Mobile #: {emergencyContact2.MobilePhone}</li>
              </ul>
              <br />
            </Grid>
          ) : (
            ''
          )}
          {emergencyContact3.FirstName !== '' ? (
            <Grid item>
              <Typography variant="body1" gutterBottom>
                <b>Emergency Contact 3:</b>
              </Typography>
              <ul>
                <li>
                  Name: {emergencyContact3.FirstName} {emergencyContact3.LastName}
                </li>
                <li>Relationship: {emergencyContact3.Relationship}</li>
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
              {phoneInfo.NoPhone ? 'None' : phoneInfo.PersonalPhone}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Ethnicity:</b>{' '}
              {demographic.Ethnicity === '-1'
                ? 'Hispanic/Latino'
                : demographic.Ethnicity === '-2'
                ? 'Not Hispanic/Latino'
                : 'Prefer not to say'}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              <b>Race:</b> {raceValues.None ? 'Prefer not to say' : displayRace}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfirmCheckIn;
