import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Login from '../../../Login';
import './guest-welcome.css';

const GuestWelcome = ({ onLogIn }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="guest-landing-page"
      spacing={2}
    >
      <Grid item md={5}>
        <Card raised>
          <CardContent className="guest-welcome-card">
            <Typography className="guest-welcome-message">
              Welcome to the Guest view of Gordon360. As a guest, you have access to a limited view
              of the site. Login is required for full access.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={8}>
        <Login onLogIn={onLogIn} />
      </Grid>
    </Grid>
  );
};
export default GuestWelcome;
