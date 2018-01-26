import Grid from 'material-ui/Grid';
import React, { Component } from 'react';

import Carousel from './components/Carousel';
import DaysLeft from './components/DaysLeft';
import CLWCredits from './components/CLWCredits';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={5}>
          <DaysLeft />
        </Grid>
        <Grid item xs={12} md={5}>
          <CLWCredits />
        </Grid>
      </Grid>
    );
  }
}
