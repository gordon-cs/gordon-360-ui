import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <Link to={`/attended`}>
            <CLWCreditsDaysLeft />
          </Link>
        </Grid>
      </Grid>
    );
  }
}
