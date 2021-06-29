import PropTypes from 'prop-types';

import './error.css';

import { Grid, Typography } from '@material-ui/core';

const GordonError = ({ error, errorInfo }) => {
  return (
    <Grid className="gordon-error" container justify="center" alignItems="center">
      <Grid item xs={11} md={7} lg={5}>
        <Typography color="primary" variant="h3">
          Something went wrong.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Please email the below error to
          <a href={"mailto:cts@gordon.edu?subject=Gordon 360 Error"}> cts@gordon.edu</a>.
        </Typography>
        <br />
        <Typography color="error" variant="h6">
          {error.toString()}
        </Typography>
        <pre>
          <Typography color="error" variant="subtitle1">
            {errorInfo.componentStack}
          </Typography>
        </pre>
      </Grid>
    </Grid>
  );
};


GordonError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string.isRequired,
  }).isRequired,
};


export default GordonError;
