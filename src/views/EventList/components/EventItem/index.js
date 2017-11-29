import { List } from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';

import Typography from 'material-ui/Typography';
import React, { Component } from 'react';

import event from '../../../../services/event';

export default class GordonEventItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allEvents: {},
    };
  }
  componentWillMount() {
    this.loadEvents();
  }
  async loadEvents() {
    const allEvents = await event.getAllEvents();
    this.setState({ allEvents });
  }
  render() {
    const content = (
      <Typography type="display1">No Activities Found</Typography>
    );

    // if (Array.isArray(this.state.allEvents) && this.state.allEvents.length > 0) {
    //   content = this.state.allEvents
    //     .map(allEvents => (
    //       <ListItem
    //         primaryText={this.state.allEvents.Event_Title}
    //         secondaryText={this.state.allEvents.Occurrences[2]}
    //       />
    //     ));
    // }

    return (
      <List>
        {content}
      </List>
    );
  }
}

