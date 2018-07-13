import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

export default class RequestSent extends Component {
  render() {
    return (
      <Grid container direction="column" spacing={16}>
        <Grid item>
          <Grid container direction="row">
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
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    );
  }
}
