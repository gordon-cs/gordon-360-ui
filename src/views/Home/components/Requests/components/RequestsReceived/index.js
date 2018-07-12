import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { gordonColors } from '../../../../../../theme';
import membership from '../../../../../../services/membership';
//import ReceivedRequest from './components/ReceivedRequest';

export default class RequestDetail extends Component {
  constructor(props) {
    super(props);

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
    console.log('INVOLVEMENT PROP');
    console.log(involvement);
    requests = await membership.getRequests(involvement.ActivityCode, involvement.SessionCode);
    console.log(requests);
    this.setState({ requests });
  }

  render() {
    let requests = this.state.requests;
    const redButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };

    let content;
    content = requests.map(request => (
      <Grid item xs={12} sm={12}>
        <Grid container>
          <Grid item xs={8} sm={9} md={10}>
            <Typography>
              {request.FirstName} {request.LastName}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2}>
            <Typography>{request.ParticipationDescription} </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={12}>
                <Typography>Title/Comment: {request.CommentText}</Typography>
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
          </Grid>
        </Grid>
      </Grid>
    ));

    return <Grid container>{content}</Grid>;
  }
}
