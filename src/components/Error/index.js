import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './error.css';

export default class GordonError extends Component {
  render() {
    const subject = 'Gordon 360 Error';
    return (
      <Grid
        className="gordon-error"
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={11} md={7} lg={5}>
          <Typography color="primary" type="display2">Something went wrong.</Typography>
          <Typography type="headline" gutterBottom>
            Please email the below error to
            <a href={`mailto:cts@gordon.edu?subject=${subject}`}> cts@gordon.edu</a>.
          </Typography>
          <br />
          <Typography color="error" type="title">
            { this.props.error.error.toString() }
          </Typography>
          <pre>
            <Typography color="error" type="subheading">
              { this.props.error.errorInfo.componentStack }
            </Typography>
          </pre>
        </Grid>
      </Grid>
    );
  }
}

GordonError.propTypes = {
  error: PropTypes.shape({
    error: PropTypes.error,
    errorInfo: PropTypes.shape({
      componentStack: PropTypes.string,
    }),
  }).isRequired,
};
