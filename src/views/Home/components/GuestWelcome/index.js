import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './guest-welcome.css';
import gordonLogo from './gordon-logo-vertical-white.svg';

const GuestWelcome = () => {
  return (
    <Card>
      <CardContent className='guest-welcome-card'>
        <CardMedia className='guest-welcome-logo'
          component='img'
          alt='GordonLogo'
          image={gordonLogo}
        />
        <Typography className='guest-welcome-message'>
          Welcome to the Guest view of Gordon360. Gordon login required for full access.
        </Typography>
      </CardContent>
    </Card>
  )
}
export default GuestWelcome;
