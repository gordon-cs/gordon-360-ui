import { Card, CardContent, Typography } from '@material-ui/core';
import React  from 'react';
import './guest-welcome.css';


const GuestWelcome = () => {
  return (
    <Card>
      <CardContent className='guest-welcome-card'>
        <Typography className='guest-welcome-message'>
          Welcome to the Guest view of Gordon360. Gordon login required for full access.
        </Typography>
      </CardContent>
    </Card>
  )
}
export default GuestWelcome;
