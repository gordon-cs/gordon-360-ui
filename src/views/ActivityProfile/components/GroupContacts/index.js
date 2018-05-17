import React, { Component } from 'react';
import Email from 'material-ui-icons/Email';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import GordonLoader from '../../../../components/Loader';

export default class GroupContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityGroupAdmins: [],
    };
  }
  componentWillMount() {
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

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (groupAdmin.length > 0) {
        content = (
          <section className="gordon-activity-profile">
            <Typography type="body1">
              <strong>Group Contacts:</strong>
            </Typography>
            <List dense disablePadding>
              {groupAdmin.map(activityGroupAdmin => (
                <ListItem className="contacts" key={activityGroupAdmin.Email}>
                  <IconButton
                    classes={{ root: 'email-button' }}
                    color="primary"
                    href={`mailto:${activityGroupAdmin.Email}`}
                    padding={0}
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
    return <section>{content}</section>;
  }
}
