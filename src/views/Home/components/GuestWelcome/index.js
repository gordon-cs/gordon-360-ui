import { Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
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
        <Card raised className="guest-welcome-card">
          <CardHeader title="Welcome to Gordon360!" />
          <CardContent>
            <Typography>
              As a guest, you have access to a limited view of the site. Login is required for full
              access.
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
