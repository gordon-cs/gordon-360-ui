import { windowBreakWidths } from 'theme';
import EventItem from './components/EventItem';

import useWindowSize from 'hooks/useWindowSize';

import { Card, CardHeader, Grid, List, Typography } from '@mui/material';
import { Event } from 'services/event';
import styles from './EventList.module.css';
import GordonLoader from 'components/Loader';

type Props = {
  events: Event[];
  loading: boolean;
};

const smallHeader = (
  <Typography variant="h5" className={styles.header_text}>
    Events
  </Typography>
);

const headings = [
  {
    name: 'Event',
    size: 4,
  },
  {
    name: 'Date',
    size: 2,
  },
  {
    name: 'Time',
    size: 2,
  },
  {
    name: 'Location',
    size: 4,
  },
];

const fullHeader = (
  <Grid container direction="row">
    {headings.map(({ name, size }) => (
      <Grid item xs={size} key={name}>
        <Typography variant="h5" className={styles.header_text}>
          {name}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

const noEvents = (
  <Grid item alignItems="center">
    <br />
    <Typography variant="h4" align="center">
      No Events To Show
    </Typography>
    <br />
  </Grid>
);

const breakpointWidth = windowBreakWidths.breakSM;

const EventList = ({ events, loading }: Props) => {
  const [width] = useWindowSize();

  return (
    <Card>
      <CardHeader
        title={width < breakpointWidth ? smallHeader : fullHeader}
        className={styles.header}
      />
      {loading ? (
        <GordonLoader disableShrink />
      ) : (
        <List className="gc360_event_list" disablePadding>
          {events?.length < 1
            ? noEvents
            : events.map((event) => <EventItem event={event} key={event.Event_ID} />)}
        </List>
      )}
    </Card>
  );
};
export default EventList;
