import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

import activity from '../../../../services/activity';
import '../../activity-profile.css';
import GordonLoader from '../../../../components/Loader';
import MemberDetail from './components/MemberDetail';
import membership from '../../../../services/membership';
import RequestDetail from './components/RequestDetail';
import user from '../../../../services/user';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.handleSelectParticipationLevel = this.handleSelectParticipationLevel.bind(this);
    this.openJoinDialog = this.openJoinDialog.bind(this);
    this.openAddMemberDialog = this.openAddMemberDialog.bind(this);
    this.onAddMember = this.onAddMember.bind(this);
    this.onConfirmRoster = this.onConfirmRoster.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onReopenActivity = this.onReopenActivity.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);

    this.state = {
      openAddMember: false,
      openJoin: false,
      status: this.props.status,
      sessionInfo: null,
      activityCode: '',
      activityDescription: '',
      participationCode: '',
      titleComment: '',
      isAdmin: this.props.isAdmin,
      participationDetail: [],
      id: this.props.id,
      addEmail: '',
      addGordonID: '',
      requests: [],
    };
  }

  async componentWillMount() {
    this.loadMembers();
  }

  handleSelectParticipationLevel = event => {
    this.setState({ participationCode: event.target.value });
  };

  openAddMemberDialog() {
    this.setState({ openAddMember: true });
  }

  openJoinDialog() {
    this.setState({ openJoin: true });
  }

  handleText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  // Called when Confirm Roster button clicked
  async onConfirmRoster() {
    console.log(this.props.activityCode);
    await activity.closeActivity(this.props.activityCode, this.state.sessionInfo.SessionCode);
    this.refresh();
  }

  // Called when Reopen Activity button clicked
  async onReopenActivity() {
    console.log(this.props.activityCode);
    await activity.reopenActivity(this.props.activityCode, this.state.sessionInfo.SessionCode);
    this.refresh();
  }

  onClose() {
    this.setState({
      openAddMember: false,
      openJoin: false,
      participationCode: '',
      titleComment: '',
    });
  }

  // Called when submitting new member details from Add Member dialog box
  async onAddMember() {
    let addID = await membership.getEmailAccount(this.state.addEmail).then(function(result) {
      return result.GordonID;
    });
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: addID,
      PART_CDE: this.state.participationCode,
      COMMENT_TXT: this.state.titleComment,
      GRP_ADMIN: false,
    };
    await membership.addMembership(data);
    this.onClose();
    this.refresh();
  }

  // Called when submitting request details from Join dialog box
  onRequest() {
    let date = new Date();
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: this.state.participationCode,
      DATE_SENT: date.toLocaleString(),
      COMMENT_TXT: this.state.titleComment,
      APPROVED: 'Pending',
    };
    membership.requestMembership(data);
    this.onClose();
    this.refresh();
  }

  // Called when Subscribe button clicked
  async onSubscribe() {
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Basic Follower',
      GRP_ADMIN: false,
    };
    await membership.addMembership(data);
    this.refresh();
  }

  // Called when Unsubscribe button clicked
  async onUnsubscribe() {
    let membershipID = this.state.participationDetail[2];
    await membership.remove(membershipID);
    this.setState({ participationDetail: [false, false, null] });
    this.refresh();
  }

  async loadMembers() {
    this.setState({ loading: true });
    try {
      const [id, participationDetail] = await Promise.all([
        user.getLocalInfo().id,
        membership.search(
          this.state.id,
          this.props.sessionInfo.SessionCode,
          this.props.activityCode,
        ),
      ]);
      this.setState({
        id,
        participationDetail,
        activityDescription: this.props.activityDescription,
        participationCode: '',
        sessionInfo: this.props.sessionInfo,
        titleComment: '',
      });
      if (this.state.isAdmin) {
        // Not necessary, but good security to have
        const requests = await membership.getRequests(
          this.props.activityCode,
          this.props.sessionInfo.SessionCode,
        );
        this.setState({
          requests,
          loading: false,
        });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  refresh() {
    window.location.reload();
  }

  // Compare members initially by last name, then by first name, A-Z
  compareFunction(a, b) {
    if (a.LastName.toUpperCase() < b.LastName.toUpperCase()) {
      return -1;
    }
    if (a.LastName.toUpperCase() > b.LastName.toUpperCase()) {
      return 1;
    }
    if (a.FirstName.toUpperCase() < b.FirstName.toUpperCase()) {
      return -1;
    }
    if (a.FirstName.toUpperCase() > b.FirstName.toUpperCase()) {
      return 1;
    }
    return 0;
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    const formControl = {
      padding: 10,
    };
    let content;
    let requestList;
    let confirmRoster;
    let ferpaAsterisks;
    let adminView;
    const { members } = this.props;
    members.sort((a, b) => this.compareFunction(a, b));
    let subscribeButton;
    let isActivityClosed;
    if (this.state.status === 'CLOSED') {
      isActivityClosed = true;
    } else {
      isActivityClosed = false;
    }
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (this.state.participationDetail[0] && this.state.participationDetail[1] !== 'Guest') {
        // User is in activity and not a guest

        if (this.state.isAdmin) {
          if (this.state.requests.length === 0) {
            requestList = <Typography>There are no pending requests</Typography>;
          } else {
            requestList = this.state.requests.map(request => (
              <RequestDetail member={request} key={request.RequestID} />
            ));
          }
          if (this.state.participationDetail[1] === 'Advisor') {
            if (this.state.status === 'OPEN') {
              confirmRoster = (
                <Button color="primary" onClick={this.onConfirmRoster} raised>
                  Confirm final roster
                </Button>
              );
            } else {
              confirmRoster = (
                <Button color="primary" onClick={this.onReopenActivity} raised>
                  Reopen roster
                </Button>
              );
            }
            ferpaAsterisks = (
              <Card>
                <CardContent>
                  <Typography>* FERPA protected student</Typography>
                </CardContent>
              </Card>
            );
          }
          adminView = (
            <section>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6} sm={4} md={4} lg={4}>
                      <Button
                        color="primary"
                        disabled={isActivityClosed}
                        onClick={this.openAddMemberDialog}
                        raised
                      >
                        Add member
                      </Button>
                    </Grid>
                    <Dialog open={this.state.openAddMember} keepMounted align="center">
                      <DialogTitle>Add person to {this.state.activityDescription}</DialogTitle>
                      <DialogContent>
                        <Grid container align="center" padding={6}>
                          <Grid item xs={12} padding={6} align="center">
                            <Typography>Student Email</Typography>
                            <TextField
                              autoFocus
                              fullWidth
                              style={formControl}
                              onChange={this.handleText('addEmail')}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                            <Typography>Participation (Required)</Typography>
                            <Grid item padding={6} align="center">
                              <FormControl fullWidth style={formControl}>
                                <Select
                                  value={this.state.participationCode}
                                  onChange={this.handleSelectParticipationLevel}
                                  displayEmpty
                                >
                                  <MenuItem value="ADV">Advisor</MenuItem>
                                  <MenuItem value="GUEST">Guest</MenuItem>
                                  <MenuItem value="LEAD">Leader</MenuItem>
                                  <MenuItem value="MEMBR">Member</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item align="center">
                              <Typography>Title/Comment: (Optional)</Typography>
                              <TextField
                                fullWidth
                                onChange={this.handleText('titleComment')}
                                style={formControl}
                                value={this.state.titleComment}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} style={formControl}>
                            <Button color="primary" onClick={this.onAddMember} raised>
                              Add member
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6} style={formControl}>
                            <Button color="primary" onClick={this.onClose} raised>
                              CANCEL
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
                    <Grid item xs={12}>
                      <Typography variant="headline">Membership Requests</Typography>
                      {requestList}
                    </Grid>
                    <Grid item>{confirmRoster}</Grid>
                  </Grid>
                </CardContent>
              </Card>
              {ferpaAsterisks}
            </section>
          );
        }
        content = (
          <section>
            {adminView}
            {members.map(groupMember => (
              <MemberDetail
                member={groupMember}
                admin={this.state.isAdmin}
                groupAdmin={groupMember.GroupAdmin}
                key={groupMember.MembershipID}
              />
            ))}
          </section>
        );
      } else {
        // User is not in the activity or is a guest
        if (this.state.participationDetail[1] === 'Guest') {
          // User is a guest
          subscribeButton = (
            <Button color="primary" onClick={this.onUnsubscribe} raised>
              Unsubscribe
            </Button>
          );
        } else {
          // User is not in the activity
          subscribeButton = (
            <Button color="primary" disabled={isActivityClosed} onClick={this.onSubscribe} raised>
              Subscribe
            </Button>
          );
        }
        content = (
          <Card>
            <CardActions>
              {subscribeButton}
              <Button
                color="primary"
                disabled={isActivityClosed}
                onClick={this.openJoinDialog}
                raised
              >
                Join
              </Button>
              <Dialog open={this.state.openJoin} keepMounted align="center">
                <DialogContent>
                  <Grid container align="center" padding={6}>
                    <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                      <DialogTitle>Join {this.state.activityDescription}</DialogTitle>
                      <Typography>Participation (Required)</Typography>
                      <Grid item padding={6} align="center">
                        <FormControl fullWidth style={formControl}>
                          <Select
                            value={this.state.participationCode}
                            onChange={this.handleSelectParticipationLevel}
                            displayEmpty
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="ADV">Advisor</MenuItem>
                            <MenuItem value="GUEST">Guest</MenuItem>
                            <MenuItem value="LEAD">Leader</MenuItem>
                            <MenuItem value="MEMBR">Member</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item align="center">
                        <Typography>Title/Comment: (Optional)</Typography>
                        <TextField
                          fullWidth
                          defaultValue=""
                          onChange={this.handleText('titleComment')}
                          style={formControl}
                        />
                      </Grid>
                      <Grid item style={formControl}>
                        <Button color="primary" onClick={this.onRequest} raised>
                          REQUEST MEMBERSHIP
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={12} style={formControl}>
                        <Button color="primary" onClick={this.onClose} raised>
                          CANCEL
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogContent>
              </Dialog>
            </CardActions>
          </Card>
        );
      }
    }
    return <section>{content}</section>;
  }
}
