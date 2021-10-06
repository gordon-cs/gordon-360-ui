import { useState, useEffect } from 'react';
import CollapsableEventItem from './components/CollapsableEventItem';
import EventItem from './components/EventItem';
import { gordonColors } from 'theme';

import styles from './EventList.module.css';

import { List, Grid, Typography, Card } from '@material-ui/core';

const headerStyle = {
  backgroundColor: gordonColors.primary.blue,
  color: '#FFF',
  padding: '10px',
};

const smallHeader = (
  <div style={headerStyle}>
    <Grid container direction="row">
      <Grid item xs={12}>
        <Typography variant="body2" style={headerStyle}>
          EVENTS
        </Typography>
      </Grid>
    </Grid>
  </div>
);

const fullHeader = (
  <div style={headerStyle}>
    <Grid container direction="row">
      <Grid item xs={4}>
        <Typography variant="body2" style={headerStyle}>
          EVENT
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="body2" style={headerStyle}>
          LOCATION
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" style={headerStyle}>
          DATE
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" style={headerStyle}>
          TIME
        </Typography>
      </Grid>
    </Grid>
  </div>
);

const noEvents = (
  <Grid item align="center">
    <br />
    <Typography variant="h5" align="center">
      No Events To Show
    </Typography>
    <br />
  </Grid>
);

const EventList = ({ events, loading }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const breakpointWidth = 540;

  useEffect(() => {
    // Checks if the screen has been resized past the mobile breakpoint
    const breakpointPassed = () => {
      if (isMobileView && window.innerWidth > breakpointWidth) return true;
      if (!isMobileView && window.innerWidth < breakpointWidth) return true;
      else return false;
    };
    // Has to rerender on screen resize in order for table to switch to the mobile view
    const resize = () => {
      if (breakpointPassed()) {
        setIsMobileView(!isMobileView);
      }
    };

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [isMobileView]);

  let content;
  let header;

  if (loading) {
    return null;
  } else if (events.length === 0) {
    content = noEvents;
  } else if (window.innerWidth < breakpointWidth) {
    content = events.map((currEvent) => (
      <CollapsableEventItem event={currEvent} key={currEvent.Event_ID} />
    ));
  } else if (events.length > 0) {
    content = events.map((currEvent) => <EventItem event={currEvent} key={currEvent.Event_ID} />);
  }

  header = window.innerWidth < breakpointWidth ? smallHeader : fullHeader;

  return (
    <Card>
      {header}
      <Grid>
        <List className={styles.event_list} disablePadding>
          {content}
        </List>
      </Grid>
    </Card>
  );
};
export default EventList;
