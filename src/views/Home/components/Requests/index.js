import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Collapse from '@material-ui/core/Collapse';
import { CardContent } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import RequestsReceived from './components/RequestsReceived';
import RequestSent from './components/RequestSent';

export default class Requests extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      requestsSent: [],
      involvementsLeading: [],
      open: false,
    };
  }
  componentWillMount() {
    this.loadRequests();
  }

  async loadRequests() {
    let requestsSent;
    let involvementsLeading;
    const id = user.getLocalInfo().id;
    involvementsLeading = await user.getLeaderPositions(user.getLocalInfo().id);
    requestsSent = await user.getSentMembershipRequests(id);

    this.setState({ requestsSent, involvementsLeading });
  }

  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }

  // Rerenders list of sent requests when a request is cancelled
  // Child component calls this function when cancel is clicked
  onCancel(request) {
    let requestsSent = this.state.requestsSent;
    let index = requestsSent.indexOf(request);
    requestsSent.splice(index, 1);
    this.setState({ requestsSent });
  }

  render() {
    let receivedPanel;
    let received;
    let show;

    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
    const button = {
      color: gordonColors.primary.cyan,
    };

    if (this.state.open === false) {
      show = 'Show';
    } else {
      show = 'Hide';
    }

    // For each involvement leading, render RequestsReceived component
    // which will render the individual requests
    received = this.state.involvementsLeading.map(involvement => (
      <RequestsReceived involvement={involvement} />
    ));

    //If not a leader, don't render any RequestsReceived components
    if (this.state.involvementsLeading.length === 0) {
      receivedPanel = '';
    } else {
      receivedPanel = (
        <Grid item>
          <Grid container spacing={8} direction="column">
            <Grid item>
              <Typography variant="title">Requests Received</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {received}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }

    // For each request sent, render RequestSent component
    let sent;
    if (this.state.requestsSent.length === 0) {
      sent = <Typography>No Requests to Show</Typography>;
    } else {
      sent = this.state.requestsSent
        .slice(0) // Render requests in order of newest to oldest
        .reverse() // newest to oldest
        .map(request => (
          <RequestSent member={request} key={request.RequestID} onCancel={this.onCancel} />
        ));
    }
    return (
      <Card>
        <Grid item>
          <Card>
            <div style={headerStyle}>
              <Typography variant="body2" style={headerStyle}>
                MEMBERSHIP REQUESTS
              </Typography>
            </div>
          </Card>
        </Grid>
        <CardContent>
          <Grid container direction="column" spacing={8}>
            {receivedPanel}
            <Grid item xs={12} sm={12}>
              <Grid container alignItems="baseline" direction="row" spacing={8}>
                <Grid item>
                  <Typography variant="title">Requests Sent </Typography>
                </Grid>
                <Grid item>
                  <Button size="small" style={button} onClick={this.handleExpandClick}>
                    {show}
                  </Button>
                </Grid>
              </Grid>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <Grid item xs={12} sm={12}>
                  {sent}
                </Grid>
              </Collapse>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
