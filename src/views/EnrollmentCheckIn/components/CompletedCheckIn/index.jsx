import { Button, Grid, Typography } from '@mui/material';
import { useUser } from 'hooks';
import { Link } from 'react-router-dom';
import styles from './CompletedCheckIn.module.css';

const CompletedCheckIn = () => {
  const { profile } = useUser();
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      className={styles.button_container}
    >
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom align="center" className={styles.congrats_note}>
          Congratulations {profile.FirstName} on completing Enrollment Checkin!
        </Typography>
        <br />
        <Typography variant="body1" align="center" gutterBottom>
          We are excited to welcome you to your new semester at Gordon College! Please click the
          button below to return to the homepage.
        </Typography>
        <br />
        <Grid item align="center">
          <Button variant="contained" component={Link} to="/">
            Home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CompletedCheckIn;
