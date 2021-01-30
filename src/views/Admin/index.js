import Grid from '@material-ui/core/Grid';
import React, { Component } from 'react';
import InvolvementsStatus from './components/InvolvementsStatus';
import SuperAdmin from './components/SuperAdmins';
import user from '../../services/user';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSuperAdmin: false,
      currentSession: '',
      network: 'online',
    };
  }

  async componentDidMount() {
    if (this.props.authentication) {
      const college_role = await user.getLocalInfo().college_role;
      this.setState({ isSuperAdmin: college_role === 'god' ? true : false });
    }
  }

  render() {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
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

    // Creates the My Profile button link depending on the status of the network found in local storage
    let Admin;

    if (this.props.authentication) {
      if (networkStatus === 'online') {
        if (this.state.isSuperAdmin) {
          Admin = (
            <Grid container justify="center" spacing={2}>
              <Grid item xs={12} lg={8}>
                <InvolvementsStatus status={'Open'} />
              </Grid>

              <Grid item xs={12} lg={8}>
                <InvolvementsStatus status={'Closed'} />
              </Grid>

              <Grid item xs={12} lg={8}>
                <SuperAdmin />
              </Grid>
            </Grid>
          );
        } else {
          Admin = <div />;
        }
      } else {
        Admin = (
          <Grid container justify="center" spacing="16">
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    alignItems="center"
                    style={{
                      display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <img
                      src={require(`${'../../NoConnection.svg'}`)}
                      alt="Internet Connection Lost"
                    />
                  </Grid>
                  <br />
                  <h1>Please Re-establish Connection</h1>
                  <h4>Revision of administrators has been deactivated due to loss of network.</h4>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    backgroundColor="white"
                    variant="outlined"
                    onClick={() => {
                      window.location.pathname = '';
                    }}
                  >
                    Back To Home
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );
      }
    } else {
      Admin = (
        <Grid container justify="center">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <h1>You are not logged in.</h1>
                <br />
                <h4>You must be logged in to view this page.</h4>
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Login
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }

    return Admin;
  }
}
