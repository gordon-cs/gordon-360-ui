import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//import membership from '../../../../../../services/membership';

export default class RequestsSent extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={4} sm={4} md={4}>
          <Typography>{this.props.member.ActivityDescription}</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} align="center">
          <Typography>{this.props.member.ParticipationDescription}</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} align="center">
          <Typography>{this.props.member.RequestApproved} </Typography>
        </Grid>
      </Grid>
    );
  }
}
