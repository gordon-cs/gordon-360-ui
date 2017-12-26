import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Email from 'material-ui-icons/Email';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import activity from '../../services/activity';
import './activity-profile.css';
import GordonLoader from '../../components/Loader';
import session from '../../services/session';

class ActivityProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityInfo: null,
      activityAdvisors: [],
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
      activityAdvisors,
      activityFollowers,
      activityGroupAdmins,
      activityMembers,
      activityStatus,
      sessionInfo] = await Promise.all([
      activity.get(activityCode),
      activity.getAdvisors(activityCode, sessionCode),
      activity.getFollowersNum(activityCode, sessionCode),
      activity.getGroupAdmins(activityCode, sessionCode),
      activity.getMembersNum(activityCode, sessionCode),
      activity.getStatus(activityCode, sessionCode),
      session.get(sessionCode),
    ]);

    this.setState({
      activityInfo,
      activityAdvisors,
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
      const {
        ActivityDescription: activityDescription,
        ActivityImagePath: activityImagePath,
      } = this.state.activityInfo;
      const followers = this.state.activityFollowers;
      const members = this.state.activityMembers;
      const { SessionDescription: sessionDescription } = this.state.sessionInfo;
      let groupContacts;
      if (this.state.activityGroupAdmins.length > 0) {
        groupContacts = (
          <section className="gordon-activity-profile">
            <Typography type="body1">
              <strong>Group Contacts:</strong>
            </Typography>
            <List dense disablePadding>
              {this.state.activityGroupAdmins
                .map(activityGroupAdmin => (
                  <div>
                    <ListItem className="contacts" key={activityGroupAdmin.Email}>
                      <IconButton
                        classes={({ root: 'email-button' })}
                        color="primary"
                        href={`mailto:${activityGroupAdmin.Email}`}
                        padding={0}
                      >
                        <Email
                          color="primary"
                          style={{ width: 16, height: 16 }}
                        />
                      </IconButton>
                      <Typography>
                        &emsp;{activityGroupAdmin.FirstName} {activityGroupAdmin.LastName}
                      </Typography>
                    </ListItem>
                  </div>
                ))}
            </List>
          </section>
        );
      }
      let advisors;
      if (this.state.activityAdvisors.length > 0) {
        advisors = (
          <section className="gordon-activity-profile">
            <Typography type="body1">
              <strong>Advisors:</strong>
            </Typography>
            <List dense disablePadding>
              {this.state.activityAdvisors
                .map(activityAdvisor => (
                  <ListItem className="contacts" key={activityAdvisor.Email}>
                    <IconButton
                      classes={({ root: 'email-button' })}
                      color="primary"
                      href={`mailto:${activityAdvisor.Email}`}
                      padding={0}
                    >
                      <Email
                        color="primary"
                        style={{ width: 16, height: 16 }}
                      />
                    </IconButton>
                    <Typography>
                      &emsp;{activityAdvisor.FirstName} {activityAdvisor.LastName}
                    </Typography>
                  </ListItem>
                ))}
            </List>
          </section>
        );
      }
      const { ActivityBlurb: activityBlurb } = this.state.activityInfo;
      let description;
      if (activityBlurb.length !== 0) {
        description = (
          <Typography type="body1">
            <strong>Description: </strong>{activityBlurb}
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
      let disableButtons;
      if (this.state.activityStatus === 'CLOSED') {
        disableButtons = true;
      }
      content = (
        <section className="gordon-activity-profile">
          <Typography align="center" type="display1">{activityDescription}</Typography>
          <Grid align="center" className="activity-image" item>
            <img alt={activity.activityDescription} src={activityImagePath} className="img" />
          </Grid>
          <Typography type="body1">
            <strong>Session: </strong>{sessionDescription}
          </Typography>
          {description}
          {website}
          {groupContacts}
          {advisors}
          <Typography type="body1">
            <strong>Current Activity Roster: </strong>
            {members} Members and {followers} followers
          </Typography>
          <div>
            <CardActions>
              <Button color="primary" disabled={disableButtons} raised>Subscribe</Button>
              <Button color="primary" disabled={disableButtons} raised>Join</Button>
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
