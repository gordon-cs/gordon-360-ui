import React, { Component } from 'react';
import Email from 'material-ui-icons/Email';
import IconButton from 'material-ui/IconButton';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import GordonLoader from '../../../../components/Loader';

export default class Advisors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activityAdvisors: [],
    };
  }
  componentWillMount() {
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

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (advisors.length > 0) {
        content = (
          <section className="gordon-activity-profile">
            <Typography type="body1">
              <strong>Advisors:</strong>
            </Typography>
            <List dense disablePadding>
              {advisors.map(activityAdvisor => (
                <ListItem className="contacts" key={activityAdvisor.Email}>
                  <IconButton
                    classes={{ root: 'email-button' }}
                    color="primary"
                    href={`mailto:${activityAdvisor.Email}`}
                    padding={0}
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
    return <section>{content}</section>;
  }
}
