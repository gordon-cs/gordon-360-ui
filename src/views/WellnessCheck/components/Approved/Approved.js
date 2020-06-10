import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import './Approved.css'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        network: 'online',
        time: new Date().toLocaleString([], {hour: '2-digit', minute: '2-digit'})
     };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillMount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({time: new Date().toLocaleString([], {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})});
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

        content = (
                 <Grid spacing={2}>
                    <Card className="card">
                         <CardHeader className="Approved"/>
                         <CardContent className = "approved-box">
                             <div className = "approved-x">
                              {this.state.time}
                             </div>
                             <div className= "check-mark">
                              &#10003;
                             </div>
                         </CardContent>
                    </Card>
                </Grid>

        );

    return content;
  }
}
