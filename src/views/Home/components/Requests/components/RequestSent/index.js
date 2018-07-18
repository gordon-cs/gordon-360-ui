import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { gordonColors } from '../../../../../../theme';
import membership from '../../../../../../services/membership';

export default class RequestSent extends Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    let requestID = this.props.member.RequestID;
    membership.cancelRequest(requestID);
    this.props.onCancel(this.props.member); // Updates state of parent component to cause rerender
  }

  render() {
    const button = {
      color: gordonColors.secondary.red,
    };

    let cancel;
    if (this.props.member.RequestApproved === 'Pending') {
      cancel = (
        <Button variant="outlined" size="small" style={button} onClick={this.handleCancel}>
          Cancel
        </Button>
      );
    } else {
      cancel = (
        <Button size="small" onClick={this.handleCancel}>
          {<ClearIcon />}
        </Button>
      );
    }

    return (
      <Grid container direction="column" spacing={16}>
        <br />
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs={6} sm={4} md={6} lg={4}>
              <Typography>
                <strong> {this.props.member.ActivityDescription} </strong>
              </Typography>
              <Typography>
                <span className="weak">{membership.getDiffDays(this.props.member.DateSent)}</span>
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} md={6} lg={4} align="center">
              <Typography>{this.props.member.ParticipationDescription}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} md={12} lg={4}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={6} align="center">
                  <Typography>{this.props.member.RequestApproved} </Typography>
                </Grid>
                <Grid item xs={6} align="center">
                  {cancel}
                </Grid>
              </Grid>
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
