import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { gordonColors } from '../../../../../../theme';
import membership from '../../../../../../services/membership';

export default class RequestReceived extends Component {
  constructor(props) {
    super(props);

    this.onApprove = this.onApprove.bind(this);
    this.onDeny = this.onDeny.bind(this);

    this.state = {
      requests: [],
    };
  }

  componentWillMount() {
    this.loadRequests();
  }

  async loadRequests() {
    let requests;
    let involvement = this.props.involvement;
    requests = await membership.getRequests(involvement.ActivityCode, involvement.SessionCode);
    this.setState({ requests });
  }

  // Approves request
  // Changes state of requests instead of refreshing
  async onApprove(request, id) {
    let requests = this.state.requests;
    let index = requests.indexOf(request);
    requests.splice(index, 1);
    this.setState({ requests });

    await membership.approveRequest(id);
  }

  // Denies request
  // Changes state of requests instead of refreshing
  async onDeny(request, id) {
    let requests = this.state.requests;
    let index = requests.indexOf(request);
    requests.splice(index, 1);
    this.setState({ requests });

    await membership.denyRequest(id);
  }

  render() {
    let requests = this.state.requests;
    const redButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };

    //Requests and buttons
    let content;
    if (requests.length === 0) {
      content = <Typography>No requests to show</Typography>;
    } else {
      content = requests
        .slice(0)
        .reverse()
        .map(request => (
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Grid container direction="row">
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container direction="row">
                      <Grid item xs={10}>
                        <br />
                        <Typography>
                          {request.FirstName} {request.LastName}
                          <span className="weak"> {membership.getDiffDays(request.DateSent)}</span>
                        </Typography>
                      </Grid>
                      <Grid item xs={2} sm={2}>
                        <Typography>{request.ParticipationDescription} </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Grid container direction="row">
                      <Grid item xs={6}>
                        <Typography>{request.CommentText}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} align="right">
                        <Grid container direction="row" spacing={8} justify="flex-end">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => this.onApprove(request, request.RequestID)}
                              size="small"
                            >
                              Approve
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              style={redButton}
                              onClick={() => this.onDeny(request, request.RequestID)}
                              size="small"
                            >
                              Deny
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        ));
    }
    return <Grid>{content}</Grid>;
  }
}
