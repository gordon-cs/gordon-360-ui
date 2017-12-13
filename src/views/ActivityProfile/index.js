import Button from 'material-ui/Button';
import Card, { CardContent, CardActions } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Email from 'material-ui-icons/Email';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import activity from '../../services/activity';
import '../../app.css';
import GordonLoader from '../../components/Loader';
import session from '../../services/session';
import '../../_vars.scss';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityInfo: null,
      // activityAdvisors: [],
      activityFollowers: 0,
      activityGroupAdmins: [],
      activityMembers: 0,
      activityStatus: null,
      sessionInfo: null,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const { sessionCode, activityCode } = this.props.match.params;
    const [activityInfo,
      // activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembers,
      activityStatus,
      sessionInfo] = await Promise.all([
      activity.get(activityCode),
      // activity.getAdvisors(activityCode, sessionCode),
      activity.getFollowersNum(activityCode, sessionCode),
      activity.getGroupAdmins(activityCode, sessionCode),
      activity.getMembersNum(activityCode, sessionCode),
      activity.getStatus(activityCode, sessionCode),
      session.get(sessionCode),
    ]);

    this.setState({
      activityInfo,
      // activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembers,
      activityStatus,
      sessionInfo,
      loading: false,
    });
  }
  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const { ActivityDescription: activityDescription } = this.state.activityInfo;
      const { ActivityImagePath: activityImagePath } = this.state.activityInfo;
      const followers = this.state.activityFollowers;
      const members = this.state.activityMembers;
      const { SessionDescription: sessionDescription } = this.state.sessionInfo;
      let admins;
      let groupContacts;
      if (this.state.activityGroupAdmins.length > 0) {
        groupContacts = <Typography type="body1">Group Contacts:</Typography>;
        admins = this.state.activityGroupAdmins
          .map(activityGroupAdmins => (
            <li key={activityGroupAdmins.FirstName}>
              {activityGroupAdmins.FirstName} {activityGroupAdmins.LastName}
              <IconButton color="primary">
                <Email
                  style={{ width: 16, height: 16 }}
                />
              </IconButton>
            </li>
          ));
      }
      const { ActivityBlurb: activityBlurb } = this.state.activityInfo;
      let description;
      if (activityBlurb.length !== 0) {
        description = <Typography type="body1">Description: {activityBlurb} </Typography>;
      }
      const { ActivityURL: activityURL } = this.state.activityInfo;
      let website;
      if (activityURL.length !== 0) {
        website = (
          <Typography type="body1">
            Website: <a href={activityURL}> {activityURL}</a>
          </Typography>
        );
      }
      let disableButtons;
      if (this.state.activityStatus === 'CLOSED') {
        disableButtons = true;
      }
      content = (
        <section>
          <Typography align="center" type="display1">{activityDescription}</Typography>
          <Grid item>
            <img src={activityImagePath} alt={activity.activityDescription} />
          </Grid>
          <Typography type="body1">
            Session: {sessionDescription}
          </Typography>
          <Typography type="body1">
            {groupContacts} {admins}
          </Typography>
          <Typography type="body1">
            {description}
          </Typography>
          <Typography type="body1">
            {website}
          </Typography>
          <Typography type="body1">
            Current Activity Roster: {members} Members and {followers} followers
          </Typography>
          <div>
            <CardActions>
              <Button sm={12} disabled={disableButtons} raised color="primary">Subscribe</Button>
              <Button raised disabled={disableButtons} color="primary">Join</Button>
            </CardActions>
          </div>
        </section>
      );
    }

    return (
      <section>
        <Card>
          <CardContent>
            {content}
          </CardContent>
        </Card>
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
