import { Typography, Grid } from '@mui/material';
import styles from './ProfileNotFound.module.css';

const ProfileNotFound = () => (
  <Grid item>
    <br />
    <br />
    <Typography variant="h4" align="center" className={styles.profileNotFound_title}>
      No profile exists for this user
    </Typography>
  </Grid>
);

export default ProfileNotFound;
