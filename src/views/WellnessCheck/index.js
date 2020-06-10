import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import user from '../../services/user';
import Login from '../Login';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Approved from './components/Approved/Approved';
import Denied from './components/Denied/Denied';

import '../../app.css';

import '../../app.css';

export default class WellnessCheck extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = { personType: null,
       network: 'online',
       answered: false,
       currentStatus:"I am symptomatic",
     };

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

  callBack = (data,data2)=>{
    this.setState({answered: data});
    this.setState({currentStatus: data2});
  }

  render() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */

    console.log(this.state.currentStatus);

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

    let content;

    /* Renders the wellness check question instead of the home page if the question
     *  has not been answered yet
     */
      if (this.props.Authentication) {

        let status;

        if(this.state.currentStatus === "I am not symptomatic"){
            status = (<Approved/>);
        }

        else{
            status = (<Denied/>);
        }

        content = (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={10}>
                <Card className="card">
                    <CardContent>
                        <CardHeader title="Current Status" />
                         {status}
                    </CardContent>
                </Card>
            </Grid>
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
