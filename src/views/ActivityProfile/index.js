import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
// import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'material-ui/Select';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import activity from '../../services/activity';
import membership from '../../services/membership';
import './activity-profile.css';
import Advisors from './components/Advisors';
import GordonLoader from '../../components/Loader';
import GroupContacts from './components/GroupContacts';
import Membership from './components/Membership';
import session from '../../services/session';
import user from '../../services/user';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubscribe = this.onSubscribe.bind(this);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembersNum: 0,
      activityMembers: [],
      activityStatus: null,
      sessionInfo: null,
      participationLevel: null,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { sessionCode, activityCode } = this.props.match.params;
    const [
      activityInfo,
      activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembersNum,
      activityMembers,
      activityStatus,
      sessionInfo,
    ] = await Promise.all([
      activity.get(activityCode),
      activity.getAdvisors(activityCode, sessionCode),
      membership.getFollowersNum(activityCode, sessionCode),
      activity.getGroupAdmins(activityCode, sessionCode),
      membership.getMembersNum(activityCode, sessionCode),
      membership.get(activityCode, sessionCode),
      activity.getStatus(activityCode, sessionCode),
      session.get(sessionCode),
    ]);

    this.setState({
      activityInfo,
      activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembersNum,
      activityMembers,
      activityStatus,
      sessionInfo,
      loading: false,
      open: false,
      participationLevel: '',
      titleComment: '',
    });
  }

  handleClick() {
    this.setState({ open: true });
  }

  onClose() {
    this.setState({ open: false, participationLevel: '', titleComment: '' });
  }

  handleChange = event => {
    this.setState({ participationLevel: event.target.value });
    // console.log("event ")
    // console.log(event.target.value)
    // console.log(this.state.participationLevel) // Returns nothing
    // console.log("Call handleChange()");
  };

  handleText = event => {
    this.setState({ titleComment: event.target.value });
  };

  onRequest() {
    let data = {
      SESS_CDE: this.props.sessionCode,
      ACT_CDE: this.props.activityCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: this.state.participationLevel,
      DATE_SENT: new Date().toLocalString(),
      COMMENT_TXT: this.state.titleComment,
      STATUS: 'Pending',
    };
    membership.requestMembership(data);
    console.log('Request sent');
  }

  onSubscribe() {
    let data = {
      ACT_CDE: this.state.activityInfo.ActivityCode,
      SESS_CDE: this.state.sessionInfo.SessionCode,
      ID_NUM: user.getLocalInfo().id,
      PART_CDE: 'GUEST',
      BEGIN_DTE: this.state.sessionInfo.BEGIN_DTE,
      COMMENT_TXT: 'Basic Follower',
      GRP_ADMIN: false,
    };
    membership.addMembership(data);
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const {
        ActivityDescription: activityDescription,
        ActivityImagePath: activityImagePath,
      } = this.state.activityInfo;
      const followers = this.state.activityFollowers;
      const membersNum = this.state.activityMembersNum;
      const { SessionDescription: sessionDescription } = this.state.sessionInfo;
      let groupContacts = <GroupContacts groupAdmin={this.state.activityGroupAdmins} />;
      let advisors = <Advisors advisors={this.state.activityAdvisors} />;
      const { ActivityBlurb: activityBlurb } = this.state.activityInfo;
      let description;
      if (activityBlurb.length !== 0) {
        description = (
          <Typography type="body1">
            <strong>Description: </strong>
            {activityBlurb}
          </Typography>
        );
      }
      const { ActivityURL: activityURL } = this.state.activityInfo;
      let website;
      if (activityURL.length !== 0) {
        website = (
          <Typography type="body1">
            <strong>Website: </strong>
            <a href={activityURL}> {activityURL}</a>
          </Typography>
        );
      }
      let membership = (
        <Membership
          members={this.state.activityMembers}
          sessionCode={this.state.sessionInfo.SessionCode}
          activityCode={this.state.activityInfo.ActivityCode}
        />
      );
      let disableButtons;
      if (this.state.activityStatus === 'CLOSED') {
        disableButtons = true;
      }
      const formControl = {
        padding: 10,
      };
      content = (
        <section className="gordon-activity-profile">
          <Card>
            <CardContent>
              <Typography align="center" type="display1">
                {activityDescription}
              </Typography>
              <Grid align="center" className="activity-image" item>
                <img alt={activity.activityDescription} src={activityImagePath} className="img" />
              </Grid>
              <Typography type="body1">
                <strong>Session: </strong>
                {sessionDescription}
              </Typography>
              {description}
              {website}
              {groupContacts}
              {advisors}
              <Typography type="body1">
                <strong>Current Activity Roster: </strong>
                {membersNum} Members and {followers} followers
              </Typography>
              {membership}
              <div>
                <CardActions>
                  <Button color="primary" disabled={disableButtons} raised>
                    Subscribe
                  </Button>
                  <Button
                    color="primary"
                    disabled={disableButtons}
                    onClick={this.handleClick}
                    raised
                  >
                    Join
                  </Button>
                  <Dialog open={this.state.open} keepMounted align="center">
                    <DialogContent>
                      <Grid container align="center" padding={6}>
                        <Grid item xs={12} sm={12} md={12} lg={12} padding={6}>
                          <DialogTitle>Join {activityDescription}</DialogTitle>
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
              </div>
              {/* {join} */}
            </CardContent>
          </Card>
        </section>
      );
    }

    return (
      <section>
        {content}
        {/* <Card>
          <CardContent>{content}</CardContent>
        </Card> */}
      </section>
    );
  }
}

ActivityProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(ActivityProfile);
