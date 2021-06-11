import React, { useState, useEffect } from 'react';
// import { Status } from checkInService;
import { Button, Card, CardContent, CardHeader, Grid, Typograph } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';
import checkInService, { Status } from 'services/checkIn';

//const MainPage = ({ currentStatus, setCurrentStatus, username }) =>{
const MainPage = () => {
  let content;
  let curStatus = checkInService.getStatus();
  useEffect(() => {
    //curStatus ;
    switch (curStatus) {
      case Status.CHECKEDIN:
        content = (
          <Button variant="contained" to="/home">
            Click here to go home
          </Button>
        );
        break;

      case Status.NOTCHECKEDIN:
        content = <p>Not Checked in</p>;
        break;
    }
  });

  const style = {
    button: {
      background: gordonColors.primary.cyan,
      color: 'white',
    },
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={12} md={8}>
        <Card className="academicCheckInHomepage">
          <CardHeader title="Enrollment Check In" />
          <Grid justify="center">content</Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MainPage;
