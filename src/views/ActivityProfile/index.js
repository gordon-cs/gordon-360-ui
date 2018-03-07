import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Typography from 'material-ui/Typography';

import activity from '../../services/activity';
import membership from '../../services/membership';
import './activity-profile.css';
import Advisors from './components/Advisors';
import GordonLoader from '../../components/Loader';
import GroupContacts from './components/GroupContacts';
import Membership from './components/Membership';
import session from '../../services/session';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembersNum: 0,
      activityMembers: [],
      activityStatus: null,
      sessionInfo: null,
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
    });
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
          activityDescription={this.state.activityInfo.ActivityDescription}
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
                {membersNum} Member(s) and {followers} follower(s)
              </Typography>
              {membership}
            </CardContent>
          </Card>
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
