import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import DiningBalance from './components/DiningBalance';
import NewsCard from './components/NewsCard';
import user from '../../services/user';
import wellness from '../../services/wellness';
import Login from '../Login';
import './home.css';
import Question from './components/Question';
import storage from '../../services/storage';

import '../../app.css';

import '../../app.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = {
      personType: null,
      network: 'online',
      answered: false,
      currentStatus: null,
    };
  }

  async componentDidMount() {
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

    let network;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      network = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      network = 'online';
    }
    // Saves the network's status to this component's state
    this.setState({ network });

    if (this.props.Authentication && network === 'online') {
      await this.getPersonType();
      await this.getStatus();
    } else {
      await this.getPersonType();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', () => {});
  }

  componentWillReceiveProps(newProps) {
    if (this.props.Authentication !== newProps.Authentication) {
      this.getPersonType();
    }
  }

  async getStatus() {
    const answer = await wellness.getStatus();

    if (answer.length > 0) {
      this.setState({ answered: answer[0].answerValid });
    } else {
      this.setState({ answered: false });
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

  setAnswered = data => {
    this.setState({ answered: data });
  };

  render() {
    let content;

    /* Renders the wellness check question instead of the home page if the question
     *  has not been answered yet
     */
    // Authenticated
    if (this.props.Authentication) {
      // Authenticated - Questions Answered
      if (this.state.answered || this.state.network === 'offline') {
        const personType = this.state.personType;

        //get student news
        let news;
        news = (
          <Grid item xs={12} md={5}>
            <NewsCard />
          </Grid>
        );

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
            {news}
          </Grid>
        );
      }
      // Authenticated - Questions Not Answered
      else {
        content = (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={10} md={4}>
              <Question setAnswered={this.setAnswered} />
            </Grid>
          </Grid>
        );
      }
    }
    // Not Authenticated
    else {
      content = (
        <div className="gordon-login">
          <Login onLogIn={this.logIn} />
        </div>
      );
    }

    return content;
  }
}
