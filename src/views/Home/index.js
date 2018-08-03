import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={5}>
          <Link to={`/attended`}>
            <CLWCreditsDaysLeft />
          </Link>
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <Requests />
        </Grid>
      </Grid>
    );
  }
}
