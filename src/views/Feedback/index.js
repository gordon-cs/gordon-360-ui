import React from 'react';

import './feedback.css';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { useNetworkIsOnline } from '../../context/NetworkContext';

const Feedback = () => {
  const isOnline = useNetworkIsOnline();

  if (isOnline) {
    return (
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
    return (
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
                <img src={require(`${'../../NoConnection.svg'}`)} alt="Internet Connection Lost" />
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
};

export default Feedback;
