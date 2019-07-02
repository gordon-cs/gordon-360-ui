import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import { isAuthenticated, signOut } from '../../services/auth';
import user from '../../services/user';
import Login from '../Login';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = { personType: null };
  }

  componentWillMount() {
    if (isAuthenticated()) {
      console.log('isAuthenticated returned true, getting PersonType');
      this.getPersonType();
    }
  }

  async getPersonType() {
    console.log('Called getPersonType');
    const profile = await user.getProfileInfo();
    const personType = String(profile.PersonType);
    console.log('Setting state of personType');
    this.setState({ personType });
  }

  logIn() {
    console.log('Home LogIn was called.');
    try {
      this.props.onLogIn();
      console.log('Home onLogIn succeeded.');
    } catch (error) {
      console.log('Home onLogIn failed with error: ' + error);
    }
  }

  render() {
    let content;
    console.log('Rendering Home. About to check isAuthenticated');
    if (isAuthenticated()) {
      console.log('isAuthenticated returned true, checking state of PersonType');
      const personType = this.state.personType;
      let doughnut;

      console.log('Making doughnut');
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

      content = (
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
            <Requests />
          </Grid>
        </Grid>
      );
    } else {
      console.log('isAuthenticated failed at Home, switching to Login');
      signOut();
      content = <Login onLogIn={this.logIn} />;
    }

    return <div>{content}</div>;
  }
}
