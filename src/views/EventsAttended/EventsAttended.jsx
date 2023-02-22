import { useIsAuthenticated } from '@azure/msal-react';
import { Button, Grid, List, Typography } from '@mui/material';
import EventList from 'components/EventList/EventList';
import GordonUnauthorized from 'components/GordonUnauthorized/GordonUnauthorized';
import GordonLoader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import event from 'services/event';
import { gordonColors } from 'theme';

const style = {
  button: {
    background: gordonColors.primary.cyan,
    color: 'white',
  },
};

const EventsAttended = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      event.getAttendedChapelEvents().then(setEvents);
    }
    setLoading(false);
  }, [isAuthenticated]);

  let content;

  if (loading === true) {
    content = <GordonLoader />;
  } else if (!isAuthenticated) {
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
    <Grid container justifyContent="center">
      <Grid item xs={12} md={12} lg={8}>
        <List>{content}</List>
      </Grid>
    </Grid>
  );
};

export default EventsAttended;
