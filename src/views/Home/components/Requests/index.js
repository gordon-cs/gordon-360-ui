import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

//import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import RequestsReceived from './components/RequestsReceived';
import RequestSent from './components/RequestSent';
import { CardHeader, CardContent } from '@material-ui/core';

export default class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestsSent: [],
      requestsReceived: [],
      involvementsLeading: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.loadRequests();
  }

  async loadRequests() {
    this.setState({ loading: true });
    let requestsReceived;
    let requestsSent;
    let involvementsLeading;
    const id = user.getLocalInfo().id;
    involvementsLeading = await user.getLeaderPositions(user.getLocalInfo().id);
    const { SessionCode: sessionCode } = await session.getCurrent();
    if (involvementsLeading.length === 0) {
      requestsReceived = 0; //If not a leader, don't bother checking for requests received
    } else {
      requestsReceived = await user.getReceivedMembershipRequests(id, sessionCode);
    }
    requestsSent = await user.getSentMembershipRequests(id, sessionCode);

    this.setState({ requestsSent, requestsReceived, involvementsLeading });
  }

  render() {
    let receivedPanel;
    let received;

    received = this.state.involvementsLeading.map(involvement => (
      <Grid item>
        <ExpansionPanel defaultExpanded>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">{involvement.ActivityDescription}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RequestsReceived involvement={involvement} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    ));

    //If not a leader, don't render RequestsReceived component
    if (this.state.involvementsLeading.length === 0) {
      receivedPanel = '';
    } else {
      receivedPanel = (
        <Grid item>
          <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="title">Requests Received</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container direction="column">
                {received}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      );
    }

    let sent;
    if (this.state.requestsSent.length === 0) {
      sent = <Typography>No Requests to Show</Typography>;
    } else {
      sent = this.state.requestsSent.map(request => (
        <RequestSent member={request} key={request.RequestID} />
      ));
    }
    return (
      <Card>
        <CardHeader title="Membership Requests" />
        <CardContent>
          <Grid container direction="column" spacing={8}>
            {receivedPanel}
            <Grid item xs={12} sm={12}>
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="title">Requests Sent</Typography>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12} sm={12}>
                    {sent}
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
