import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Badge from '@material-ui/core/Badge';

import { gordonColors } from '../../../../../../theme';
import membership from '../../../../../../services/membership';
import './requests.css';

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

    const badge = {
      margin: 2,
      padding: '2px',
    };

    //Involvement title with number of requests(if any)
    let title;
    if (requests.length > 0) {
      title = (
        <Badge color="error" badgeContent={requests.length} style={badge} className="badge">
          <Typography variant="title">{this.props.involvement.ActivityDescription}</Typography>
        </Badge>
      );
    } else {
      title = <Typography variant="title">{this.props.involvement.ActivityDescription}</Typography>;
    }

    //Requests and buttons
    let displayedRequests;
    if (requests.length === 0) {
      displayedRequests = <Typography>No requests to show</Typography>;
    } else {
      displayedRequests = requests
        .slice(0)
        .reverse()
        .map(request => (
          <Grid item xs={12}>
            <Grid container spacing={8}>
              <Grid item xs={12}>
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
              <Grid item xs={12} sm={12}>
                <Divider />
              </Grid>
            </Grid>
          </Grid>
        ));
    }

    //Everything put together inside expansion panel
    let content;
    content = (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>{title}</ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container spacing={8}>
            {displayedRequests}
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );

    return <Grid>{content}</Grid>;
  }
}
