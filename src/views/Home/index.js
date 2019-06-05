import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import user from '../../services/user';
import SemesterEvents from './components/SemesterEvents';
import Menu from './components/Menu';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { personType: null };
  }

  componentWillMount() {
    this.getPersonType();
  }

  async getPersonType() {
    const profile = await user.getProfileInfo();
    const personType = String(profile.PersonType);
    this.setState({ personType });
  }

  render() {
    const personType = this.state.personType;
    let doughnut;

    //Only show CL&W credits if user is a student
    if (String(personType).includes('stu')) {
      doughnut = (
        <Link to={`/attended`}>
          <CLWCreditsDaysLeft />
        </Link>
      );
    } else {
      doughnut = <DaysLeft />;
    }

    return (
      <Grid container justify="center" spacing={16}>
        <Grid item xs={12} md={10}>
          <Carousel />
        </Grid>
        <Grid item xs={12} md={5}>
          {doughnut}
        </Grid>
        <Grid item xs={12} md={5}>
          <DiningBalance />
        </Grid>
        <Grid item xs={12} md={5}>
          <SemesterEvents />
        </Grid>
        <Grid item xs={12} md={5}>
          <Menu />
        </Grid>
        <Grid item xs={12} md={5}>
          <Requests />
        </Grid>
      </Grid>
    );
  }
}
