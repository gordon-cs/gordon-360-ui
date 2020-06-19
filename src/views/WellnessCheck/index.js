import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import user from '../../services/user';
import Login from '../Login';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Approved from './components/Approved/Approved';
import Denied from './components/Denied/Denied';
import wellness from '../../services/wellness';
import GordonLoader from '../../components/Loader';
import '../../app.css';
import { gordonColors } from './../../theme';

export default class WellnessCheck extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);

    this.state = {
      personType: null,
      network: 'online',
      currentStatus: true,
      currentUser: null,
      image: null,
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      await this.getUserData();
      await this.getStatus();
    } catch (error) {
      // Do nothing
    }
    user.getImage().then(data => {
      this.setState({ image: data, loading: false });
    });
    await this.getStatus();
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

  async getStatus() {
    const answer = await wellness.getStatus();
    const SYMPTOMS = true;
    const NO_SYMPTOMS = false;

    if(answer.length > 0){
        if (answer[0].userAnswer === true) {
          this.setState({ currentStatus: SYMPTOMS });
        }
        if (answer[0].userAnswer === false) {
          this.setState({ currentStatus: NO_SYMPTOMS });
        }
    } else{
       this.setState({ currentStatus: NO_SYMPTOMS });
    }
  }

  /*
   * Fetches the user's data
   *
   * @return {JSON} The JSON data of the current user
   */
  async getUserData() {
    // Gets the token from local storage to prove authentication for fetch
    let token = JSON.parse(localStorage.getItem('token'));

    // Creates the header for the request to get the user's info
    let headers = new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return await fetch(
      new Request('https://360api.gordon.edu/api/profiles', { method: 'GET', headers }),
    )
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ currentUser: data });
      })
      .catch(error => {
        console.log(error.message);
      });
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

  callBack = (data, data2) => {
    this.setState({ answered: data });
    this.setState({ currentStatus: data2 });
  };

  setUserImage() {
    if (this.state.image && this.state.image.pref && this.state.currentUser) {
      return (
        <img
          className="rounded-corners"
          src={`data:image/jpg;base64,${this.state.image.pref}`}
          alt={`${this.state.currentUser.FirstName} ${this.state.currentUser.LastName}`}
          style={{ 'max-height': '200px', 'min-width': '160px' }}
        />
      );
    } else if (this.state.image && this.state.image.def && this.state.currentUser) {
      return (
        <img
          className="rounded-corners"
          src={`data:image/jpg;base64,${this.state.image.def}`}
          alt={`${this.state.currentUser.FirstName} ${this.state.currentUser.LastName}`}
          style={{ 'max-height': '200px', 'min-width': '160px' }}
        />
      );
    }
  }

  render() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    // Styles the header
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
      fontSize: 20,
    };

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
    if (this.state.loading) {
      content = <GordonLoader />;
    } else {
      /* Renders the wellness check question instead of the home page if the question
       *  has not been answered yet
       */

      if (this.props.Authentication) {
        let status;

        if (this.state.currentStatus === false ) {
          status = <Approved />;
        } else {
          status = <Denied />;
        }

        content = (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} md={8}>
              <Card className="card">
                <CardContent>
                  <CardHeader
                    title={`${this.state.currentUser ? this.state.currentUser.FirstName : ''} ${
                      this.state.currentUser ? this.state.currentUser.LastName : ''
                    }`}
                  />
                  <Card> {this.setUserImage()}</Card>
                  {status}
                </CardContent>
                <div style={headerStyle}>Questions? Health Center: (978) 867-4300 </div>
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
    }
    return content;
  }
}
