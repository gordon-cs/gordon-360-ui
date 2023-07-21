import { Grid, Typography } from '@mui/material';
import styles from './Error.module.css';

const GordonError = ({ error }) => {
  return (
    <Grid className={styles.gordon_error} container justifyContent="center" alignItems="center">
      <Grid item xs={11} md={7} lg={5}>
        <Typography className={styles.title} variant="h3">
          Something went wrong.
        </Typography>
        <Typography className={styles.request} variant="h5" gutterBottom>
          Please email the below error to
          <a href="mailto:cts@gordon.edu?subject=Gordon 360 Error" className={styles.email}> cts@gordon.edu</a>.
        </Typography>
        <br />
        <Typography className={styles.content} variant="h6">
          {error.toString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default GordonError;
