import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import user from '../../services/user';
import Login from '../Login';
import './home.css';

import '../../app.css';

import '../../app.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = { personType: null, network: 'online' };
  }

  componentWillMount() {
    if (this.props.Authentication) {
      this.getPersonType();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.Authentication !== newProps.Authentication) {
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
      console.log('Login failed with error: ' + error);
    }
  }

  render() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', event => {
      if (
        event.data === 'online' &&
        this.state.network === 'offline' &&
        event.origin === window.location.origin
      ) {
        // We set the state twice due to a bug where react won't re-render on time
        this.setState({ network: 'online' });
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        this.state.network === 'online' &&
        event.origin === window.location.origin
      ) {
        this.setState({ network: 'offline' });
      }
    });

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    let content;
    if (this.props.Authentication) {
      const personType = this.state.personType;

      let requests;
      if (networkStatus === 'online') {
        requests = (
          <Grid item xs={12} md={5}>
            <Requests />
          </Grid>
        );
      }

      //Only show CL&W credits if user is a student
      let doughnut;
      if (String(personType).includes('stu')) {
        doughnut = <CLWCreditsDaysLeft />;
      } else {
        doughnut = <DaysLeft />;
      }

      content = (
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Carousel />
          </Grid>
          <Grid item xs={12} md={5}>
            {doughnut}
          </Grid>
          <Grid item xs={12} md={5}>
            <DiningBalance />
          </Grid>
          {requests}
        </Grid>
      );
    } else {
      content = (
        <div className="gordon-login">
          <Login onLogIn={this.logIn} />
        </div>
      );
    }

    return content;
  }
}
