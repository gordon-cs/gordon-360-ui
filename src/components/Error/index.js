import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './Error.module.css';

const GordonError = ({ error }) => {
  return (
    <Grid className={styles.gordon_error} container justifyContent="center" alignItems="center">
      <Grid item xs={11} md={7} lg={5}>
        <Typography color="primary" variant="h3">
          Something went wrong.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Please email the below error to
          <a href="mailto:cts@gordon.edu?subject=Gordon 360 Error"> cts@gordon.edu</a>.
        </Typography>
        <br />
        <Typography color="error" variant="h6">
          {error.toString()}
        </Typography>
      </Grid>
    </Grid>
  );
};

GordonError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default GordonError;
