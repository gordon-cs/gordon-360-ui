import { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';

export default class ProfileNotFound extends Component {
  render() {
    return (
      <Grid item>
        <br />
        <br />
        <Typography variant="h4" align="center">
          No profile exists for this user
        </Typography>
      </Grid>
    );
  }
}
