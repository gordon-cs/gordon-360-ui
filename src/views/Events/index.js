import React, { Component } from 'react';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';

import event from './../../services/event';
import EventItem from './components/EventItem';
import GordonLoader from '../../components/Loader';

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      search: '',
      loading: true,
    };
  }
  componentWillMount() {
    this.loadEvents();
  }
  async loadEvents() {
    this.setState({ loading: true });
    const events = await event.getFutureEvents();
    this.setState({ events, loading: false });
  }
  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events) {
      content = this.state.events
        .map(currEvent => <EventItem event={currEvent} key={currEvent.Event_ID} />);
    }
    return (
      <section>
        <Grid item xs={12} md={12} lg={6}>
          <TextField
            id="search"
            label="Search"
            value={this.state.search}
            onChange={null}
            margin="none"
            fullWidth
          />
        </Grid>
        <List>
          { content }
        </List>
      </section>
    );
  }
}
