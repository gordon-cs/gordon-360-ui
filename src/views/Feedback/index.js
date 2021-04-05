import React, { Component } from 'react';
import { ReactComponent as NoConnectionImage } from '../../NoConnection.svg';
import './feedback.css';
import { Button, Grid, Card, CardContent } from '@material-ui/core';

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: 'online',
    };
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

    // Creates the Feedback page depending on the status of the network found in local storage
    let Feedback;
    if (networkStatus === 'online') {
      Feedback = (
        <div class="form">
          <iframe
            title="Feedback Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSfB7MtIGiMbVcSOAbl38KWqKYU9NIEE-Sbi66rbpNPAmGBoqA/viewform?embedded=true"
            width="100%"
            height="100%"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading...
          </iframe>
        </div>
      );
    } else {
      Feedback = (
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
                  <NoConnectionImage />
                </Grid>
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Submitting feedback has been deactivated due to loss of network.</h4>
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

    return Feedback;
  }
}
