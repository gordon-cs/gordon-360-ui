import CollapsableEventItem from './components/CollapsableEventItem';
import EventItem from './components/EventItem';
import { gordonColors } from 'theme';

import styles from './EventList.module.css';
import useWindowSize from 'hooks/useWindowSize';

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

const EventList = ({ events }) => {
  const breakpointWidth = 540;
  const [width] = useWindowSize();

  let content;
  let header;

  if (!events || events.length === 0) {
    content = noEvents;
  } else if (width < breakpointWidth) {
    content = events.map((currEvent) => (
      <CollapsableEventItem event={currEvent} key={currEvent.Event_ID} />
    ));
  } else if (events.length > 0) {
    content = events.map((currEvent) => <EventItem event={currEvent} key={currEvent.Event_ID} />);
  }

  header = width < breakpointWidth ? smallHeader : fullHeader;

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
