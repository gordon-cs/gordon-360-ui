import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import user from './../../services/user';
import GordonLoader from '../../components/Loader';
import EventList from './../../components/EventList';

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.loadEvents();
  }

  async loadEvents() {
    this.setState({ loading: true });
    const events = await user.getAttendedChapelEventsFormatted();
    this.setState({ events, loading: false });
  }
  render() {
    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else if (this.state.events.length > 0) {
      content = <EventList events={this.state.events} />;
    } else {
      content = (
        <Grid item>
          <br />
          <br />
          <Typography variant="display1" align="center">
            No Events To Show
          </Typography>
        </Grid>
      );
    }
    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <List>{content}</List>
          </Grid>
        </Grid>
      </section>
    );
  }
}
