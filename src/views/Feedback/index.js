import React from 'react';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import './feedback.css';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

const Feedback = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return (
      <div className="feedback-form">
        <iframe
          title="Feedback Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfB7MtIGiMbVcSOAbl38KWqKYU9NIEE-Sbi66rbpNPAmGBoqA/viewform?embedded=true"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
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
};

export default Feedback;
