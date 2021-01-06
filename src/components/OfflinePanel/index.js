import React from 'react';
import { Button, Card, CardContent, Grid } from '@material-ui/core';

const OfflinePanel = ({ componentName }) => {
  return (
    <Grid container justify="center" spacing={2}>
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
            <h4>{componentName} is unavailable offline.</h4>
            <br />
            <br />
            <Button
              color="primary"
              backgroundColor="white"
              variant="outlined"
              onClick={() => (window.location.pathname = '')}
            >
              Back To Home
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OfflinePanel;
