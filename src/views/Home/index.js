import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import DaysLeft from './components/DaysLeft';
import ChapelProgress from './components/ChapelProgress';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <DaysLeft />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChapelProgress />
        </Grid>
      </Grid>
    );
  }
}
