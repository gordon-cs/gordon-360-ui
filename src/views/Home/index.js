import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Carousel from './components/Carousel';
import CLWCreditsDaysLeft from './components/CLWCreditsDaysLeft';
import DaysLeft from './components/DaysLeft';
import Requests from './components/Requests';
import DiningBalance from './components/DiningBalance';
import user from '../../services/user';
import wellness from '../../services/wellness';
import Login from '../Login';
import './home.css';
import Question from './components/Question';

import '../../app.css';

import '../../app.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = { personType: null, network: 'online', answered: false, currentStatus: '' };
  }

   componentWillMount() {
    if (this.props.Authentication) {
      this.getPersonType();
      this.getStatus();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.Authentication !== newProps.Authentication) {
      this.getPersonType();
    }
  }

  async getStatus() {
    const answer = await wellness.getStatus();
    console.log("this is what i get back: " + answer[0].timestamp)

    if(answer.length > 0){
        if (answer[0].answerValid === true) {
          this.setState({ answered: true });
          
          if(answer[0].userAnswer === true){
            this.setState({ currentStatus: 'I am symptomatic' });
          }
          else{
            this.setState({ currentStatus: 'I am not symptomatic' });
          }
        }
        if (answer[0].answerValid === false) {
          this.setState({ answered: false });
          this.setState({ currentStatus: 'I am symptomatic' });
        }
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

  setAnswered = (data, data2) => {
    this.setState({ answered: data });
    this.setState({ currentStatus: data2 });
  };

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

    /* Renders the wellness check question instead of the home page if the question
     *  has not been answered yet
     */
    // Authenticated
    if (this.props.Authentication) {
      // Authenticated - Questions Answered
      if (this.state.answered) {
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
