import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './error.css';

export default class GordonError extends Component {
  render() {
    const subject = 'Gordon 360 Error';
    return (
      <Grid className="gordon-error" container justify="center" alignItems="center">
        <Grid item xs={11} md={7} lg={5}>
          <Typography color="primary" variant="display2">
            Something went wrong.
          </Typography>
          <Typography variant="headline" gutterBottom>
            Please email the below error to
            <a href={`mailto:cts@gordon.edu?subject=${subject}`}> cts@gordon.edu</a>.
          </Typography>
          <br />
          <Typography color="error" variant="title">
            {this.props.error.toString()}
          </Typography>
          <pre>
            <Typography color="error" variant="subheading">
              {this.props.errorInfo.componentStack}
            </Typography>
          </pre>
        </Grid>
      </Grid>
    );
  }
}

GordonError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string.isRequired,
  }).isRequired,
};
