import React, { useEffect, useState } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import event from 'services/event';
import GordonLoader from 'components/Loader';
import EventList from 'components/EventList';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';

import { List, Grid, Button, Typography } from '@material-ui/core';

const style = {
  button: {
    background: gordonColors.primary.cyan,
    color: 'white',
  },
};

const EventsAttended = (authentication) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      if (authentication) {
        const attendedEvents = await event.getAttendedChapelEvents();
        setEvents(attendedEvents);
      }
      setLoading(false);
    };
    loadEvents();
  }, [authentication]);

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (!authentication) {
    content = <GordonUnauthorized feature={'your attended events'} />;
  } else if (events.length > 0) {
    content = (
      <Grid container direction="row" justifyContent="center" spacing="2">
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
          <EventList events={events} />
        </Grid>
      </Grid>
    );
  } else {
    content = (
      <Grid item align="center">
        <br /> <br />
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

  return (
    <section>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={12} lg={8}>
          <List>{content}</List>
        </Grid>
      </Grid>
    </section>
  );
};

export default EventsAttended;
