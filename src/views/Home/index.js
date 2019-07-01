import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import { isAuthenticated, signOut } from '../../services/auth';
import { AuthError } from '../../services/error';
import user from '../../services/user';
import Login from '../Login';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.onLogIn = this.onLogIn.bind(this);

    this.state = { personType: null, content: null };
  }

  componentWillMount() {
    let content;

    if (!isAuthenticated() || this.state.error instanceof AuthError) {
      signOut();
      content = <Login onLogIn={this.onLogIn} />;
      //console.log('app.js: isAuthenticated() returned false or authentication error');
      //console.log('app.js: isAutheticated() =', isAuthenticated());
      //console.log(
      //'app.js: this.state.error instanceof AuthError =',
      //this.state.error instanceof AuthError,
      //);
    } /*else if (this.state.error) {
      content = <GordonError error={this.state.error} errorInfo={this.state.errorInfo} />;
      //console.log('app.js: this.state.error was true');
    }*/ else {
      this.getPersonType();

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
    }

    this.setState({ content });
  }

  async getPersonType() {
    const profile = await user.getProfileInfo();
    const personType = String(profile.PersonType);
    this.setState({ personType });
  }

  onLogIn() {
    this.props.onLogIn();
  }

  render() {
    const content = this.state.content;

    return <div>{content}</div>;
  }
}
