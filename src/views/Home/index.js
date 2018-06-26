import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={5}>
          <CLWCreditsDaysLeft />
        </Grid>
      </Grid>
    );
  }
}
