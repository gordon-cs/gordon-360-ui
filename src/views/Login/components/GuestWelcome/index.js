import { Grid, Typography, Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import './guestWelcome.css';

const GuestWelcome = () => {
  return (
    <Grid container style={{ textAlign: 'center' }}>
      <Card raised className="guest-welcome-card">
        <CardHeader title="Welcome to Gordon360!" />
        <CardContent>
          <Typography>
            As a guest, you have access to a limited view of the site. Login for full access.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default GuestWelcome;
