import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default class ProfileNotFound extends Component {
  render() {
    return (
      <Grid item>
        <br />
        <br />
        <Typography variant="display1" align="center">
          No profile exists for this user
        </Typography>
      </Grid>
    );
  }
}
