import React, { Component } from 'react';
import List, { ListItem } from 'material-ui/List';

import event from './../../services/event';
import GordonLoader from '../../components/Loader';

export default class EventList extends Component {
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
    let content;
    console.log(this.state.allEvents.eventList);
    // console.log(this.state.allEvents[0].Event_Title);
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (Array.isArray(this.state.allEvents) && this.state.allEvents.length > 0) {
      content = this.state.allEvents
        .map(events => (
          <ListItem
            primaryText={events.Event_Title}
            secondaryText={events.allEvents.Occurrences[2]}
          />
        ));
    }
    return (
      <section>
        <List>
          { content }
        </List>
      </section>
    );
  }
}
