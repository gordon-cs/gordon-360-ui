import Button from 'material-ui/Button';
import { CardActions } from 'material-ui/Card';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

import GordonLoader from '../../../../components/Loader';
import '../../activity-profile.css';
import MemberDetail from './components/MemberDetail';
import membership from '../../../../services/membership';
import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddMemberClick = this.handleAddMemberClick.bind(this);
    this.onAddMember = this.onAddMember.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);
    this.onUnsubscribe = this.onUnsubscribe.bind(this);

    this.state = {
      activityMembers: [],
      openAddMember: false,
      openJoin: false,
      mode: '',
      sessionInfo: null,
      activityCode: '',
      activityDescription: '',
      participationCode: '',
      titleComment: '',
      isAdmin: false,
      participationDetail: [],
      id: '',
      email: '',
    };
  }

  async componentWillMount() {
    this.loadMembers();
  }

  handleChange = event => {
    this.setState({ participationCode: event.target.value });
  };

  handleAddMemberClick() {
    this.setState({ openAddMember: true });
  }

  handleClick() {
    this.setState({ openJoin: true });
  }

  handleSelect = name => event => {
    this.setState({ participationCode: event.target.value });
  };

  handleText = name => event => {
    this.setState({ [name]: event.target.value });
  };

  onClose() {
    this.setState({
      openAddMember: false,
      openJoin: false,
      participationCode: '',
      titleComment: '',
    });
  }

  onAddMember() {
    // let addMemberGordonID;
    // try {
    //   addMemberGordonID = membership.getEmailAccount(this.state.email).GordonID;
    // }
    // catch (error) {
    //   this.setState({ error });
    // };
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: '50117703',
      PART_CDE: this.state.participationCode,
      COMMENT_TXT: this.state.titleComment,
      GRP_ADMIN: false,
    };
    console.log('Member added');
    console.log(data);
    membership.addMembership(data);
    this.onClose();
  }

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
    console.log('Request sent');
    membership.requestMembership(data);
    this.onClose();
  }

  onSubscribe() {
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: 'GUEST',
      COMMENT_TXT: 'Basic Follower',
      GRP_ADMIN: false,
    };
    console.log(data);
    console.log('Subscription sent');
    membership.addMembership(data);
  }

  onUnsubscribe() {
    let membershipID = this.state.participationDetail[2];
    membership.remove(membershipID);
    this.setState({ participationDetail: [false, false, null] });
  }

  async loadMembers() {
    this.setState({ loading: true });
    try {
      const id = await user.getLocalInfo().id;
      this.setState({ id });
      const participationDetail = await membership.search(
        this.state.id,
        this.props.sessionInfo.SessionCode,
        this.props.activityCode,
      );
      this.setState({ participationDetail });
      const isAdmin = await membership.checkAdmin(
        this.state.id,
        this.props.sessionInfo.SessionCode,
        this.props.activityCode,
      );
      this.setState({ isAdmin });
      this.setState({
        activityDescription: this.props.activityDescription,
        participationCode: '',
        sessionInfo: this.props.sessionInfo,
        titleComment: '', //TODO Membership Description
      });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { members } = this.props;
    if (this.state.error) {
      throw this.state.error;
    }
    let content;
    let subscribeButton;
    let adminButtons;
    const removeButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    const formControl = {
      padding: 10,
    };
    if (this.state.isAdmin) {
      adminButtons = (
        <section>
          <Grid container>
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <Button color="primary" onClick={this.handleAddMemberClick} raised>
                Add member
              </Button>
            </Grid>
            <Dialog open={this.state.openAddMember} keepMounted align="center">
              <DialogTitle>Add person to {this.state.activityDescription}</DialogTitle>
              <DialogContent>
                <Grid container align="center" padding={6}>
                  <Grid item xs={12} padding={6} align="center">
                    <Typography>Student Email</Typography>
                    <TextField fullWidth style={formControl} onChange={this.handleText('email')} />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                    <Typography>Participation (Required)</Typography>
                    <Grid item padding={6} align="center">
                      <FormControl fullWidth style={formControl}>
                        <Select
                          value={this.state.participationCode}
                          onChange={this.handleSelect('participationCode')}
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
            <Grid item xs={6} sm={4} md={4} lg={4}>
              <Button color="primary" disabled raised>
                Edit activity
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <Button raised disabled style={removeButton}>
                Remove image
              </Button>
            </Grid>
          </Grid>
        </section>
      );
    }
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (this.state.participationDetail[0] && !this.state.participationDetail[1]) {
        // User is a member and not a guest
        content = (
          <section>
            {adminButtons}
            {members.map(groupMember => (
              <MemberDetail
                member={groupMember}
                admin={this.state.isAdmin}
                groupAdmin={groupMember.GroupAdmin}
                key={groupMember.MembershipID}
              />
            ))}
            <Typography>* FERPA protected student</Typography>
          </section>
        );
      } else {
        if (this.state.participationDetail[0] && this.state.participationDetail[1]) {
          // User is a member and a guest
          subscribeButton = (
            <Button color="primary" onClick={this.onUnsubscribe} raised>
              Unsubscribe
            </Button>
          );
        } else {
          // User is not a member
          subscribeButton = (
            <Button color="primary" onClick={this.onSubscribe} raised>
              Subscribe
            </Button>
          );
        }
        content = (
          <CardActions>
            {subscribeButton}
            <Button color="primary" onClick={this.handleClick} raised>
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
                          onChange={this.handleChange}
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
                      <TextField fullWidth onChange={this.handleText} style={formControl} />
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
        );
      }
    }
    return <section>{content}</section>;
  }
}
