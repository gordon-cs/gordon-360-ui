import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { gordonColors } from '../../../../../../theme';
import membership from '../../../../../../services/membership';

export default class RequestDetail extends Component {
  constructor(props) {
    super(props);

    this.onApprove = this.onApprove.bind(this);
    this.onDeny = this.onDeny.bind(this);
  }

  // Approves request
  async onApprove() {
    await membership.approveRequest(this.props.member.RequestID);
    this.refresh();
  }

  // Denies request
  async onDeny() {
    await membership.denyRequest(this.props.member.RequestID);
    this.refresh();
  }

  refresh() {
    window.location.reload();
  }

  render() {
    let options;
    const redButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    options = (
      <Grid container>
        <Grid item xs={12}>
          <Typography>Title/Comment: {this.props.member.CommentText}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} padding={6}>
          <Button variant="contained" color="primary" onClick={this.onApprove} raised>
            Approve
          </Button>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} padding={6}>
          <Button variant="contained" style={redButton} onClick={this.onDeny} raised>
            Deny
          </Button>
        </Grid>
      </Grid>
    );
    return (
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item xs={8} sm={9} md={10}>
              <Typography>
                {this.props.member.FirstName} {this.props.member.LastName}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <Typography>{this.props.member.ParticipationDescription} </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{options}</ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
