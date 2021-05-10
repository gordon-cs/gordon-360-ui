import React, { Component } from 'react';
import Email from '@material-ui/icons/Email';

import GordonLoader from 'components/Loader';

import { IconButton, List, ListItem, Typography } from '@material-ui/core';

export default class Advisors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityAdvisors: [],
    };
  }
  componentDidMount() {
    this.loadAdvisors();
  }
  async loadAdvisors() {
    this.setState({ loading: true });
    try {
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    const { advisors } = this.props;
    if (this.state.error) {
      throw this.state.error;
    }

    let content = null;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (advisors.length > 0) {
        content = (
          <section className="gordon-activity-profile">
            <Typography variant="body2">
              <strong>Advisors:</strong>
            </Typography>
            <List dense disablePadding>
              {advisors.map((activityAdvisor) => (
                <ListItem className="contacts" key={activityAdvisor.Email}>
                  <IconButton
                    classes={{ root: 'email-button' }}
                    color="primary"
                    href={`mailto:${activityAdvisor.Email}`}
                    padding={0}
                    edge="end"
                  >
                    <Email color="primary" style={{ width: 16, height: 16 }} />
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
    }
    return content;
  }
}
