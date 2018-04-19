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
import user from '../../../../services/user';

export default class Membership extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onRequest = this.onRequest.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);

    this.state = {
      activityMembers: [],
      open: false,
      mode: '',
      sessionInfo: null,
      activityCode: '',
      activityDescription: '',
      participationLevel: '',
      titleComment: '',
      isAdmin: false,
      isMember: false,
      id: '',
    };
  }

  async componentWillMount() {
    this.loadMembers();
  }

  handleChange = event => {
    this.setState({ participationLevel: event.target.value });
  };

  handleClick() {
    this.setState({ open: true });
  }

  handleText = event => {
    this.setState({ titleComment: event.target.value });
  };

  onClose() {
    this.setState({ open: false, participationLevel: '', titleComment: '' });
  }

  onRequest() {
    let date = new Date();
    let data = {
      ACT_CDE: this.props.activityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: this.state.participationLevel,
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
      // "BEGIN_DTE": this.state.sessionInfo.SessionBeginDate,
      COMMENT_TXT: 'Basic Follower',
      GRP_ADMIN: false,
    };

    console.log('Subscription sent');
    membership.addMembership(data);
  }

  async loadMembers() {
    this.setState({ loading: true });
    try {
      const id = await user.getLocalInfo().id;
      this.setState({ id });
      const isMember = await membership.search(
        this.state.id,
        this.props.sessionInfo.SessionCode,
        this.props.activityCode,
      );
      this.setState({ isMember });
      const isAdmin = await membership.checkAdmin(
        this.state.id,
        this.props.sessionInfo.SessionCode,
        this.props.activityCode,
      );
      this.setState({ isAdmin });
      this.setState({
        activityDescription: this.props.activityDescription,
        participationLevel: '',
        sessionInfo: this.props.sessionInfo,
        titleComment: '',
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
    const formControl = {
      padding: 10,
    };
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (this.state.isMember) {
        content = (
          <section>
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
        content = (
          <CardActions>
            <Button color="primary" onClick={this.onSubscribe} raised>
              Subscribe
            </Button>
            <Button color="primary" onClick={this.handleClick} raised>
              Join
            </Button>
            <Dialog open={this.state.open} keepMounted align="center">
              <DialogContent>
                <Grid container align="center" padding={6}>
                  <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                    <DialogTitle>Join {this.state.activityDescription}</DialogTitle>
                    <Typography>Participation (Required)</Typography>
                    <Grid item padding={6} align="center">
                      <FormControl fullWidth style={formControl}>
                        <Select
                          value={this.state.participationLevel}
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
