import React, { Component } from 'react';
import activity from 'services/activity';
import GordonLoader from 'components/Loader';
import MemberList from './components/MemberList';
import membership from 'services/membership';
import RequestDetail from './components/RequestDetail';
import CloseIcon from '@material-ui/icons/Close';
import user from 'services/user';
import { gordonColors } from 'theme';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Error from '@material-ui/icons/Error';
import AddPersonIcon from '@material-ui/icons/PersonAdd';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Grid,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  IconButton,
  Divider,
} from '@material-ui/core';

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
      addMemberDialogError: '',
      openJoin: false,
      status: this.props.status,
      sessionInfo: null,
      activityCode: '',
      activityDescription: '',
      participationCode: '',
      titleComment: '',
      isAdmin: this.props.isAdmin,
      isSuperAdmin: this.props.isSuperAdmin,
      participationDetail: [],
      addEmail: '',
      addGordonID: '',
      requests: [],
    };
    this.isMobileView = false;
    this.breakpointWidth = 810;
  }

  async componentDidMount() {
    this.getMembership();
    this.loadMembers();

    window.addEventListener('resize', this.resize);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleSelectParticipationLevel = (event) => {
    this.setState({ participationCode: event.target.value });
  };

  openAddMemberDialog() {
    this.setState({ openAddMember: true });
  }

  openJoinDialog() {
    this.setState({ openJoin: true });
  }

  handleText = (name) => (event) => {
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
    let memberships = await user.getCurrentMemberships(this.props.id);
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

    this.setState({
      isSnackBarOpen: false,
      isFailSnackBarOpen: false,
      isUserAlreadyMemberSnackBarOpen: false,
    });
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
    if (this.state.addEmail === '' || this.state.participationCode === '') {
      this.setState({ addMemberDialogError: 'Please resolve the errors below and try again.' });
    } else {
      this.setState({ addMemberDialogError: '' });
      let memberEmail = this.state.addEmail;
      // If only the Exchange username is entered without the email address, add "@gordon.edu" to the
      // username
      if (!memberEmail.toLowerCase().includes('@gordon.edu')) {
        memberEmail = memberEmail + '@gordon.edu';
      }

      // Try to add member
      try {
        let addID = await membership.getEmailAccount(memberEmail).then(function (result) {
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
        // if a user is already a member of an involvement, attempting addMembership(data)
        //  will return 'undefined'. So, if this happens, alert the user
        let alreadyIn = await membership.addMembership(data);
        if (typeof alreadyIn === 'undefined') {
          // User is already a member of this involvement
          this.setState({ isUserAlreadyMemberSnackBarOpen: true });
        } else {
          this.setState({ isSnackBarOpen: true, openAddMember: false });
          this.refresh();
        }
      } catch (error) {
        switch (error.name) {
          case 'NotFoundError':
            this.setState({ isFailSnackBarOpen: true });
            break;

          default:
            console.log('Something went wrong');
            break;
        }
      }
    }
  }

  // Called when submitting request details from Join dialog box
  onRequest() {
    let date = new Date();
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: this.props.id,
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
      ID_NUM: this.props.id,
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
      const participationDetail = await membership.search(
        this.props.id,
        this.props.sessionInfo.SessionCode,
        this.props.activityCode,
      );
      this.setState({
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
      if (
        (this.state.participationDetail[0] && this.state.participationDetail[1] !== 'Guest') ||
        this.state.isSuperAdmin
      ) {
        // User is in activity and not a guest (unless user is superadmin [god mode])
        if (this.state.isAdmin || this.state.isSuperAdmin) {
          header = (
            <div style={headerStyle}>
              <Grid container direction="row">
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
                <Grid item xs={2}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    TITLE/COMMENT
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    MAIL #
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
            requestList = <RequestDetail involvement={this.state.requests[0]} />;
          }
          // Only advisors and superadmins can re-open the roster

          if (this.state.status === 'OPEN') {
            confirmRoster = (
              <Button variant="contained" color="primary" onClick={this.onConfirmRoster}>
                Confirm final roster
              </Button>
            );
          } else if (this.state.participationDetail[1] === 'Advisor' || this.state.isSuperAdmin) {
            confirmRoster = (
              <Button variant="contained" color="primary" onClick={this.onReopenActivity}>
                Reopen roster
              </Button>
            );
          }
          if (this.state.participationDetail[1] === 'Advisor' || this.state.isSuperAdmin) {
            ferpaAsterisks = (
              <Card>
                <CardContent>
                  <Typography>* FERPA protected student</Typography>
                </CardContent>
              </Card>
            );
          }
          adminView = (
            <>
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
                  <Grid container spacing={2} direction="column">
                    <Dialog open={this.state.openAddMember} keepMounted align="center">
                      <DialogTitle>Add person to {this.state.activityDescription}</DialogTitle>
                      <Typography style={{ color: '#ff0000' }}>
                        {this.state.addMemberDialogError}
                      </Typography>
                      <DialogContent>
                        <Grid container align="center">
                          <Grid item xs={12} align="center">
                            <Typography>Username</Typography>
                            <TextField
                              error={this.state.addEmail === '' ? true : false}
                              helperText={this.state.addEmail === '' ? 'Required' : ''}
                              autoFocus
                              fullWidth
                              style={formControl}
                              onChange={this.handleText('addEmail')}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                            <Typography>Participation</Typography>
                            <Grid item padding={6} align="center">
                              <FormControl fullWidth style={formControl}>
                                <Select
                                  error={this.state.participationCode === '' ? true : false}
                                  value={this.state.participationCode}
                                  onChange={this.handleSelectParticipationLevel}
                                  displayEmpty
                                >
                                  <MenuItem value="ADV">Advisor</MenuItem>
                                  <MenuItem value="LEAD">Leader</MenuItem>
                                  <MenuItem value="MEMBR">Member</MenuItem>
                                  <MenuItem value="GUEST">Guest</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item align="center">
                              <Typography>Title/Comment (Optional)</Typography>
                              <TextField
                                fullWidth
                                onChange={this.handleText('titleComment')}
                                style={formControl}
                                value={this.state.titleComment}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={6} style={formControl}>
                            <Button variant="outlined" onClick={this.onClose}>
                              CANCEL
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={6} style={formControl}>
                            <Button variant="contained" color="primary" onClick={this.onAddMember}>
                              Add member
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>

                    <Grid item xs={6} sm={4} md={4} lg={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={isActivityClosed}
                        onClick={this.openAddMemberDialog}
                        style={{ marginBottom: 8 }}
                      >
                        <AddPersonIcon style={{ marginRight: 8 }} />
                        Add member
                      </Button>
                    </Grid>
                    <Divider />
                    <Grid item>{requestList}</Grid>

                    <Grid item>{confirmRoster}</Grid>
                  </Grid>
                </CardContent>
              </Card>
              {ferpaAsterisks}
            </>
          );
        } else {
          header = (
            <div style={headerStyle}>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    NAME
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    PARTICIPATION
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" className="header" style={headerStyle}>
                    MAIL #
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
          <>
            {adminView}
            <Card>
              {header}
              {members.map((groupMember) => (
                <MemberList
                  member={groupMember}
                  admin={this.state.isAdmin}
                  groupAdmin={groupMember.GroupAdmin}
                  key={groupMember.MembershipID}
                />
              ))}
            </Card>
          </>
        );
      } else {
        // User is not in the activity or is a guest
        if (this.state.participationDetail[1] === 'Guest') {
          // User is a guest
          subscribeButton = (
            <Button variant="contained" color="primary" onClick={this.onUnsubscribe}>
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
                <Grid container align="center">
                  <Grid item xs={12}>
                    <DialogTitle>Join {this.state.activityDescription}</DialogTitle>
                    <Typography>Participation (Required)</Typography>
                    <Grid item align="center">
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
      <>
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
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.isFailSnackBarOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                <Error
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '1rem',
                  }}
                />
                Nobody with that username found.
              </span>
            }
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.isUserAlreadyMemberSnackBarOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id="message-id">
                <Error
                  style={{
                    marginBottom: '-4.5pt',
                    marginRight: '1rem',
                  }}
                />
                User already in involvement.
              </span>
            }
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      </>
    );
  }
}
