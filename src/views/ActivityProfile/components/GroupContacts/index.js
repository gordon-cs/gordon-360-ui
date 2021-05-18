import React, { Component } from 'react';
import Email from '@material-ui/icons/Email';

import GordonLoader from 'components/Loader';

import { IconButton, List, ListItem, Typography } from '@material-ui/core';

export default class GroupContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityGroupAdmins: [],
    };
  }
  componentDidMount() {
    this.loadGroupContacts();
  }
  async loadGroupContacts() {
    this.setState({ loading: true });
    try {
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    const { groupAdmin } = this.props;
    if (this.state.error) {
      throw this.state.error;
    }

    let content = null;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (groupAdmin.length > 0) {
        content = (
          <section className="gordon-activity-profile">
            <Typography variant="body2">
              <strong>Group Contacts:</strong>
            </Typography>
            <List dense disablePadding>
              {groupAdmin.map((activityGroupAdmin) => (
                <ListItem className="contacts" key={activityGroupAdmin.Email}>
                  <IconButton
                    classes={{ root: 'email-button' }}
                    color="primary"
                    href={`mailto:${activityGroupAdmin.Email}`}
                    padding={0}
                    edge="end"
                  >
                    <Email color="primary" style={{ width: 16, height: 16 }} />
                  </IconButton>
                  <Typography>
                    &emsp;{activityGroupAdmin.FirstName} {activityGroupAdmin.LastName}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </section>
        );
      }
    }
    return content;
  }
}
