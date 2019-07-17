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
import './home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = { personType: null };
  }

  componentWillMount() {
    if (this.props.Authentication) {
      this.getPersonType();
    }
  }

  async getPersonType() {
    const profile = await user.getProfileInfo();
    const personType = String(profile.PersonType);
    this.setState({ personType });
  }

  logIn() {
    try {
      this.props.onLogIn();
    } catch (error) {
      console.log('Home logIn failed with error: ' + error);
    }
  }

  render() {
    let content;
    if (this.props.Authentication) {
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
      signOut();
      content = (
        <div className="gordon-login">
          <Login onLogIn={this.logIn} />
        </div>
      );
    }

    return content;
  }
}
