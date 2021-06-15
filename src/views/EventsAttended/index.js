import React, { Component } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import event from 'services/event';
import GordonLoader from 'components/Loader';
import EventList from 'components/EventList';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';

import { List, Grid, Button, Typography } from '@material-ui/core';

export default class EventsAttended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };
  }
  componentDidMount() {
    if (this.props.authentication) {
      this.loadEvents();
    }
  }

  async loadEvents() {
    this.setState({ loading: true });
    const events = await event.getAttendedChapelEvents();
    this.setState({ events, loading: false });
  }

  render() {
    let content;

    const style = {
      button: {
        background: gordonColors.primary.cyan,
        color: 'white',
      },
    };

    if (this.props.authentication) {
      if (this.state.loading === true) {
        content = <GordonLoader />;
      } else if (this.state.events.length > 0) {
        content = (
          <Grid container direction="row" justify="center" spacing="2">
            <Grid item align="center">
              <Button
                variant="contained"
                style={style.button}
                component={Link}
                to="/events?CLW%20Credits"
              >
                Need More Chapel Credits?
              </Button>
            </Grid>
            <Grid item>
              <EventList events={this.state.events} />
            </Grid>
          </Grid>
        );
      } else {
        content = (
          <Grid item align="center">
            <br />
            <br />
            <Typography variant="h4" align="center">
              No Events To Show
            </Typography>
            <br />
            <Button
              variant="contained"
              style={style.button}
              component={Link}
              to="/events?CLW%20Credits"
            >
              Need More Chapel Credits?
            </Button>
          </Grid>
        );
      }
    } else {
      content = <GordonUnauthorized feature={'your attended events'} />;
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
