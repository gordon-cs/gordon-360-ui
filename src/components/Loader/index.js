import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';

import './loader.css';

export default class GordonLoader extends Component {
  render() {
    return (
      <Grid className="gordon-loader" container justify="center" alignItems="center">
        <Grid item>
          <CircularProgress size={100} />
        </Grid>
      </Grid>
    );
  }
}
