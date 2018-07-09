import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import user from './../../services/user';
import gordonEvent from './../../services/event';
import GordonLoader from '../../components/Loader';
import EventList from './../../components/EventList';

const styles = {
  searchBar: {
    margin: '0 auto',
  },
};

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      events: [],
      filteredEvents: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.loadEvents();
  }

  search(name) {
    return async event => {
      await this.setState({
        [name]: event.target.value,
      });
      const events = await gordonEvent.getFilteredEvents(this.state);
      this.setState({ filteredEvents: events, loading: false });
    };
  }

  async loadEvents() {
    this.setState({ loading: true });
    const events = await user.getAttendedChapelEventsFormatted();
    this.setState({ events, loading: false, filteredEvents: events });
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
          <Typography variant="display1">No Events To Show</Typography>
        </Grid>
      );
    }
    return (
      <section>
        <Grid container justify="center">
          <Grid item xs={12} md={12} lg={8}>
            <Grid container alignItems="baseline" style={styles.searchBar}>
              <Grid item xs={8} sm={9} md={10} lg={10}>
                <TextField
                  id="search"
                  label="Search"
                  value={this.state.search}
                  onChange={this.search('search')}
                  margin="none"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={8}>
            <List>{content}</List>
          </Grid>
        </Grid>
      </section>
    );
  }
}
