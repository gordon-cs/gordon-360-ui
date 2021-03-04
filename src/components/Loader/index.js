import React, { Component } from 'react';

import './loader.css';

import { Grid, CircularProgress } from '@material-ui/core';

export default class GordonLoader extends Component {
  render() {
    return (
      <Grid className="gordon-loader" container justify="center" alignItems="center">
        <Grid item>
          <CircularProgress size={this.props.size || 100} />
        </Grid>
      </Grid>
    );
  }
}
