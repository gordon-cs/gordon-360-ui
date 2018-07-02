import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import activity from '../../services/activity';
import './activity-profile.css';
import Advisors from './components/Advisors';
import GroupContacts from './components/GroupContacts';
import GordonLoader from '../../components/Loader';
import Membership from './components/Membership';
import membership from '../../services/membership';
import session from '../../services/session';
import { gordonColors } from '../../theme';
import user from '../../services/user';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.alertRemoveImage = this.alertRemoveImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openEditActivityDialog = this.openEditActivityDialog.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onEditActivity = this.onEditActivity.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembersNum: 0,
      activityMembers: [],
      activityStatus: '',
      sessionInfo: null,
      id: '', // User's id
      tempActivityBlurb: '', // For editing activity
      tempActivityJoinInfo: '', // For editing activity
      tempActivityURL: '', // For editing activity
      isAdmin: false, // Boolean for current user
      openEditActivity: false,
      openRemoveImage: false,
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
      activityStatus,
      sessionInfo,
      id,
      isAdmin,
    });

    this.setState({
      tempActivityBlurb: activityInfo.ActivityBlurb,
      tempActivityJoinInfo: activityInfo.ActivityJoinInfo,
      tempActivityURL: activityInfo.ActivityURL,
    });

    let participationDetail = await membership.search(
      this.state.id,
      this.state.sessionInfo.SessionCode,
      this.state.activityInfo.ActivityCode,
    );
    if (participationDetail[0] && participationDetail[1] !== 'Guest') {
      // Only if the user is in the activity and not a guest can this get called
      // else Unauthorized error
      const activityMembers = await membership.get(
        this.state.activityInfo.ActivityCode,
        this.state.sessionInfo.SessionCode,
      );
      this.setState({ activityMembers });
    }
    this.setState({ loading: false });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  openEditActivityDialog() {
    this.setState({ openEditActivity: true });
  }

  alertRemoveImage() {
    this.setState({ openRemoveImage: true });
  }

  // Called when user submits changes to activity from edit activity dialog box
  async onEditActivity() {
    let data = {
      ACT_CDE: this.state.activityInfo.ActivityCode,
      ACT_URL: this.state.tempActivityURL,
      ACT_BLURB: this.state.tempActivityBlurb,
      ACT_JOIN_INFO: this.state.tempActivityJoinInfo,
    };
    await activity.editActivity(this.state.activityInfo.ActivityCode, data);
    this.onClose();
    this.refresh();
  }

  // Called when confirm remove image from the alert remove image dialog box
  async onRemoveImage() {
    await activity.resetImage(this.state.activityInfo.ActivityCode);
    this.onClose();
    this.refresh();
  }

  onClose() {
    this.setState({
      openEditActivity: false,
      alertRemoveImage: false,
    });
  }

  refresh() {
    window.location.reload();
  }

  render() {
    if (this.state.error) {
      throw this.state.error;
    }
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      let editActivity;
      const redButton = {
        background: gordonColors.secondary.red,
        color: 'white',
      };
      const {
        ActivityDescription: activityDescription,
        ActivityBlurb: activityBlurb,
        ActivityJoinInfo: activityJoinInfo,
        ActivityURL: activityURL,
        ActivityImagePath: activityImagePath,
      } = this.state.activityInfo;
      if (this.state.isAdmin) {
        editActivity = (
          <section align="center" padding={6}>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={this.openEditActivityDialog}
                raised
              >
                Edit Activity
              </Button>
            </CardContent>
            <Dialog open={this.state.openEditActivity}>
              <DialogTitle> Edit {activityDescription}</DialogTitle>
              <DialogContent>
                <Grid container align="center">
                  <Grid item xs={12} sm={4} md={4} lg={4}>
                    <Button variant="contained" onClick={this.alertRemoveImage} style={redButton}>
                      Remove image
                    </Button>
                  </Grid>
                  <Dialog open={this.state.openRemoveImage} keepMounted align="center">
                    <DialogTitle>Are you sure you want to remove image?</DialogTitle>
                    <DialogContent>
                      <Grid container>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.onRemoveImage}
                            raised
                          >
                            OK
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Button variant="contained" onClick={this.onClose} raised>
                            CANCEL
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogContent>
                  </Dialog>
                  <Grid item xs={12} align="center" padding={6}>
                    <Typography>Description</Typography>
                    <Input
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue={activityBlurb}
                      onChange={this.handleChange('tempActivityBlurb')}
                    />
                  </Grid>
                  <Grid item xs={12} align="center" padding={6}>
                    <Typography>Special Information for Joining</Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      defaultValue={activityJoinInfo}
                      onChange={this.handleChange('tempActivityJoinInfo')}
                    />
                  </Grid>
                  <Grid item xs={12} align="center" padding={6}>
                    <Typography>Website</Typography>
                    <TextField
                      fullWidth
                      defaultValue={activityURL}
                      onChange={this.handleChange('tempActivityURL')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} padding={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.onEditActivity}
                      raised
                    >
                      Submit changes
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} padding={6}>
                    <Button variant="contained" color="primary" onClick={this.onClose} raised>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Dialog>
          </section>
        );
      }
      const { SessionDescription: sessionDescription } = this.state.sessionInfo;
      let description;
      if (activityBlurb.length !== 0) {
        description = (
          <Typography variant="body1">
            <strong>Description: </strong>
            {activityBlurb}
          </Typography>
        );
      }
      let website;
      if (activityURL.length !== 0) {
        website = (
          <Typography variant="body1">
            <strong>Website: </strong>
            <a href={activityURL}> {activityURL}</a>
          </Typography>
        );
      }
      let groupContacts = <GroupContacts groupAdmin={this.state.activityGroupAdmins} />;
      let advisors = <Advisors advisors={this.state.activityAdvisors} />;
      const followersNum = this.state.activityFollowers;
      const membersNum = this.state.activityMembersNum;
      let membership = (
        <Membership
          members={this.state.activityMembers}
          sessionInfo={this.state.sessionInfo}
          activityCode={this.state.activityInfo.ActivityCode}
          activityDescription={this.state.activityInfo.ActivityDescription}
          participationDetail={this.state.participationDetail}
          id={this.state.id}
          isAdmin={this.state.isAdmin}
          status={this.state.activityStatus}
        />
      );
      content = (
        <section className="gordon-activity-profile">
          <Card>
            <CardContent>
              <Typography align="center" variant="display1">
                {activityDescription}
              </Typography>
              <Grid align="center" className="activity-image" item>
                <img alt={activity.activityDescription} src={activityImagePath} className="img" />
              </Grid>
              <Grid item>{editActivity}</Grid>
              <Typography variant="body1">
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
              <Typography variant="body1">
                <strong>Current Activity Roster: </strong>
                {membersNum} Member(s) and {followersNum} follower(s)
              </Typography>
            </CardContent>
            {membership}
          </Card>
        </section>
      );
    }

    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            {content}
          </Grid>
        </Grid>
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
