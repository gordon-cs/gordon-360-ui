import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import user from '../../services/user';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { personType: null, network: 'online' };
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

    // Creates the Home Page depending on the status of the network found in local storage
    let HomePage;
    if (networkStatus === 'online') {
      HomePage = (
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
      HomePage = (
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
        </Grid>
      );
    }
    return HomePage;
  }
}
