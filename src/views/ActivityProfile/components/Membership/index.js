import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import activity from '../../../../services/activity';
import '../../activity-profile.css';
import GordonLoader from '../../../../components/Loader';
import MemberList from './components/MemberList';
import membership from '../../../../services/membership';
import IconButton from '@material-ui/core/IconButton';
import RequestDetail from './components/RequestDetail';
import CloseIcon from '@material-ui/icons/Close';
import user from '../../../../services/user';
import { gordonColors } from '../../../../theme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
//import RequestsReceived from '../../../Home/components/Requests/components/RequestsReceived';
import AddPersonIcon from '@material-ui/icons/PersonAdd';

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
      membership: [],
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
    this.isMobileView = false;
    this.breakpointWidth = 810;
  }

  async componentWillMount() {
    this.getMembership();
    this.loadMembers();
  }

  //Has to rerender on screen resize in order for table to switch to the mobile view
  resize = () => {
    if (this.breakpointPassed()) {
      this.isMobileView = !this.isMobileView;
      this.forceUpdate();
    }
  };

  //checks if the screen has been resized past the mobile breakpoint
  //allows for forceUpdate to only be called when necessary, improving resizing performance
  breakpointPassed() {
    if (this.isMobileView && window.innerWidth > this.breakpointWidth) return true;
    if (!this.isMobileView && window.innerWidth < this.breakpointWidth) return true;
    else return false;
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
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
    await activity.closeActivity(this.props.activityCode, this.state.sessionInfo.SessionCode);
    this.refresh();
  }

  // Called when Reopen Activity button clicked
  async onReopenActivity() {
    await activity.reopenActivity(this.props.activityCode, this.state.sessionInfo.SessionCode);
    this.refresh();
  }

  async getMembership() {
    let memberships = await user.getCurrentMemberships(this.state.id);
    let membership;
    for (let i = 0; i < memberships.length; i += 1) {
      if (memberships[i].ActivityCode === this.props.activityCode) {
        membership = memberships[i];
      }
    }
    this.setState({ membership });
    return membership;
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ isSnackBarOpen: false });
  };

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
    this.setState({ isSnackBarOpen: true });
    //Used to call this.refresh() here, but it caused requests not to go through
  }

  // Called when Subscribe button clicked
  async onSubscribe() {
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Subscriber',
      GRP_ADMIN: false,
    };
    await membership.addMembership(data);
    this.refresh();
  }

  // Called when Unsubscribe button clicked
  async onUnsubscribe() {
    let participationDescription = this.state.participationDetail[2];
    await membership.remove(participationDescription);
    this.setState({ participationDetail: [false, false, null] });
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
    let membership = this.state.membership;
    let content;
    let requestList;
    let confirmRoster;
    let ferpaAsterisks;
    let adminView;
    const { members } = this.props;
    members.sort((a, b) => this.compareFunction(a, b));
    let subscribeButton;
    let isActivityClosed;
    let header;
    const headerStyle = {
      backgroundColor: gordonColors.primary.blue,
      color: '#FFF',
      padding: '10px',
    };
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
          header = (
            <div style={headerStyle}>
              <Grid container direction="row" spacing={16}>
                <Grid item xs={3}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    NAME
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    PARTICIPATION
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    TITLE/COMMENT
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    ADMIN
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
          if (this.state.requests.length === 0) {
            requestList = <Typography>There are no pending requests</Typography>;
          } else {
            requestList = <RequestDetail involvement={membership} />;
          }
          if (this.state.participationDetail[1] === 'Advisor') {
            if (this.state.status === 'OPEN') {
              confirmRoster = (
                <Button variant="contained" color="primary" onClick={this.onConfirmRoster} raised>
                  Confirm final roster
                </Button>
              );
            } else {
              confirmRoster = (
                <Button variant="contained" color="primary" onClick={this.onReopenActivity} raised>
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
              <Grid item xs={12}>
                <Card>
                  <div style={headerStyle}>
                    <Typography variant="body2" style={headerStyle}>
                      MEMBERSHIP REQUESTS
                    </Typography>
                  </div>
                </Card>
              </Grid>
              <Card>
                <CardContent>
                  <Grid container spacing={16} direction="column">
                    <Dialog open={this.state.openAddMember} keepMounted align="center">
                      <DialogTitle>Add person to {this.state.activityDescription}</DialogTitle>
                      <DialogContent>
                        <Grid container align="center" padding={6} spacing={16}>
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
                                  <MenuItem value="LEAD">Leader</MenuItem>
                                  <MenuItem value="MEMBR">Member</MenuItem>
                                  <MenuItem value="GUEST">Subscriber</MenuItem>
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
                          <Grid item xs={12} sm={6} style={formControl} justifyContent="right">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.onAddMember}
                              raised
                            >
                              Add member
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6} style={formControl}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.onClose}
                              raised
                            >
                              CANCEL
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>

                    <Grid item xs={6} sm={4} md={4} lg={4}>
                      <Button
                        color="primary"
                        disabled={isActivityClosed}
                        onClick={this.openAddMemberDialog}
                        raised
                      >
                        <AddPersonIcon />
                        Add member
                      </Button>
                    </Grid>
                    {requestList}
                    <Grid item>{confirmRoster}</Grid>
                  </Grid>
                </CardContent>
              </Card>
              {ferpaAsterisks}
            </section>
          );
        } else {
          header = (
            <div style={headerStyle}>
              <Grid container direction="row" spacing={16}>
                <Grid item xs={6}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    NAME
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    PARTICIPATION
                  </Typography>
                </Grid>
              </Grid>
            </div>
          );
        }
        if (window.innerWidth < this.breakpointWidth) {
          header = (
            <div style={headerStyle}>
              <Grid>
                <Typography variant="body2" className="header" style={headerStyle}>
                  MEMBERS
                </Typography>
              </Grid>
            </div>
          );
        }
        content = (
          <section>
            {adminView}
            <Card>
              {header}
              {members.map(groupMember => (
                <MemberList
                  member={groupMember}
                  admin={this.state.isAdmin}
                  groupAdmin={groupMember.GroupAdmin}
                  key={groupMember.MembershipID}
                />
              ))}
            </Card>
          </section>
        );
      } else {
        // User is not in the activity or is a guest
        if (this.state.participationDetail[1] === 'Guest') {
          // User is a guest
          subscribeButton = (
            <Button variant="contained" color="primary" onClick={this.onUnsubscribe} raised>
              Unsubscribe
            </Button>
          );
        } else {
          // User is not in the activity
          subscribeButton = (
            <Button
              variant="contained"
              color="primary"
              disabled={isActivityClosed}
              onClick={this.onSubscribe}
            >
              Subscribe
            </Button>
          );
        }
        content = (
          <CardActions>
            {subscribeButton}
            <Button
              variant="contained"
              color="primary"
              disabled={isActivityClosed}
              onClick={this.openJoinDialog}
            >
              Join
            </Button>
            <Dialog open={this.state.openJoin} keepMounted align="center">
              <DialogContent>
                <Grid container align="center" padding={6} spacing={16}>
                  <Grid item xs={12} padding={6}>
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
                          <MenuItem value="LEAD">Leader</MenuItem>
                          <MenuItem value="MEMBR">Member</MenuItem>
                          {/* <MenuItem value="GUEST">Subscriber</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item align="center">
                      <TextField
                        label="Title/Comment: (Optional)"
                        fullWidth
                        onChange={this.handleText('titleComment')}
                        style={formControl}
                      />
                    </Grid>

                    <DialogActions>
                      <Button
                        onClick={this.onClose}
                        variant="contained"
                        style={formControl}
                        color="primary"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        style={formControl}
                        onClick={this.onRequest}
                      >
                        Submit
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </CardActions>
        );
      }
    }
    return (
      <section>
        {content}

        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.isSnackBarOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                <CheckCircleIcon
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '1rem',
                  }}
                />
                Success!
              </span>
            }
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </section>
    );
  }
}
