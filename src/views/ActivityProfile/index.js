import Button from 'material-ui/Button';
import Card, { CardContent } from 'material-ui/Card';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

import activity from '../../services/activity';
import './activity-profile.css';
import Advisors from './components/Advisors';
import { gordonColors } from '../../theme';
import GroupContacts from './components/GroupContacts';
import GordonLoader from '../../components/Loader';
import Membership from './components/Membership';
import membership from '../../services/membership';
import session from '../../services/session';
import user from '../../services/user';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleEditActivity = this.handleEditActivity.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditActivity = this.onEditActivity.bind(this);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembersNum: 0,
      activityMembers: [],
      activityStatus: null,
      sessionInfo: null,
      id: '',
      activityBlurb: '',
      activityJoinInfo: '',
      activityURL: '',
      isAdmin: false,
      openEditActivity: false,
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
      id,
      isAdmin,
    ] = await Promise.all([
      activity.get(activityCode),
      activity.getAdvisors(activityCode, sessionCode),
      membership.getFollowersNum(activityCode, sessionCode),
      activity.getGroupAdmins(activityCode, sessionCode),
      membership.getMembersNum(activityCode, sessionCode),
      membership.get(activityCode, sessionCode),
      activity.getStatus(activityCode, sessionCode),
      session.get(sessionCode),
      user.getLocalInfo().id,
      membership.checkAdmin(user.getLocalInfo().id, sessionCode, activityCode),
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
      id,
      isAdmin,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleEditActivity() {
    this.setState({ openEditActivity: true });
  }

  // Called when user submits changes to activity
  onEditActivity() {
    let data = {
      ACT_CDE: this.state.activityInfo.ActivityCode,
      ACT_URL: this.state.activityURL,
      ACT_BLURB: this.state.activityBlurb,
      ACT_JOIN_INFO: this.state.activityJoinInfo,
    };
    console.log(data);
    // activity.editActivity(this.state.activityInfo.activityCode, data);
  }

  onClose() {
    this.setState({ openEditActivity: false });
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    let editActivity;
    const removeButton = {
      background: gordonColors.secondary.red,
      color: 'white',
    };
    if (this.state.isAdmin) {
      const {
        ActivityDescription: activityDescription,
        ActivityBlurb: activityBlurb,
        ActivityJoinInfo: activityJoinInfo,
        ActivityURL: activityURL,
      } = this.state.activityInfo;
      editActivity = (
        <section align="center" padding={6}>
          <CardContent>
            <Button color="primary" onClick={this.handleEditActivity} raised>
              Edit Activity
            </Button>
          </CardContent>
          <Dialog open={this.state.openEditActivity}>
            <DialogTitle> Edit {activityDescription}</DialogTitle>
            <DialogContent>
              <Grid container align="center">
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <Button raised disabled style={removeButton}>
                    Remove image
                  </Button>
                </Grid>
                <Grid item xs={12} align="center" padding={6}>
                  <Typography>Description</Typography>
                  <Input
                    fullWidth
                    multiline
                    rows={4}
                    name="Description"
                    value={activityBlurb}
                    onChange={this.handleChange('activityBlurb')}
                  />
                </Grid>
                <Grid item xs={12} align="center" padding={6}>
                  <Typography>Special Information for Joining</Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="JoinInfo"
                    value={activityJoinInfo}
                    renderValue={value => `${value}`}
                    onChange={this.handleChange('activityJoinInfo')}
                  />
                </Grid>
                <Grid item xs={12} align="center" padding={6}>
                  <Typography>Website</Typography>
                  <TextField
                    fullWidth
                    name="Website"
                    value={activityURL}
                    onChange={this.handleChange('activityURL')}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} padding={6}>
                  <Button color="primary" onClick={this.onEditActivity} raised>
                    Submit changes
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} padding={6}>
                  <Button color="primary" onClick={this.onClose} raised>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </section>
      );
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
          sessionInfo={this.state.sessionInfo}
          activityCode={this.state.activityInfo.ActivityCode}
          activityDescription={this.state.activityInfo.ActivityDescription}
          participationDetail={this.state.participationDetail}
          id={this.state.id}
          isAdmin={this.state.isAdmin}
        />
      );
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
              <Grid item>{editActivity}</Grid>
              <Typography type="body1">
                <strong>Session: </strong>
                {sessionDescription}
              </Typography>
              {description}
              {website}
              {groupContacts}
              {advisors}
              <Typography>
                <strong>Special Information for Joining: </strong>
                {this.state.activityInfo.ActivityJoinInfo}
              </Typography>
              <Typography type="body1">
                <strong>Current Activity Roster: </strong>
                {membersNum} Member(s) and {followers} follower(s)
              </Typography>
            </CardContent>
          </Card>
          {membership}
        </section>
      );
    }

    return <section>{content}</section>;
  }
}

ActivityProfile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default withRouter(ActivityProfile);
