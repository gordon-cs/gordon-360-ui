import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

//import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import RequestsReceived from './components/RequestsReceived';
import RequestsSent from './components/RequestsSent';
import { CardHeader, CardContent } from '@material-ui/core';

export default class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestsSent: [],
      requestsReceived: [],
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
    const id = user.getLocalInfo().id;
    const { SessionCode: sessionCode } = await session.getCurrent();
    requestsReceived = await user.getReceivedMembershipRequests(id, sessionCode);
    requestsSent = await user.getSentMembershipRequests(id, sessionCode);

    this.setState({ requestsSent, requestsReceived });
  }

  render() {
    const received = this.state.requestsReceived.map(request => (
      <RequestsReceived member={request} key={request.RequestID} />
    ));
    const sent = this.state.requestsSent.map(request => (
      <RequestsSent member={request} key={request.RequestID} />
    ));
    return (
      <Card>
        <CardHeader title="Membership Requests" />
        <CardContent>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <Typography variant="subheading">Requests Received</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              {received}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subheading">Requests Sent</Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              {sent}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
