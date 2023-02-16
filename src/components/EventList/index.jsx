import EventItem from './components/EventItem';
import { windowBreakWidths } from 'theme';

import useWindowSize from 'hooks/useWindowSize';

import { List, Grid, Typography, Card, CardHeader } from '@mui/material';
import styles from './EventList.module.css';

const smallHeader = (
  <Typography variant="h5" className={styles.header_text}>
    Events
  </Typography>
);

const headings = [
  {
    name: 'Event',
    size: '4',
  },
  {
    name: 'Date',
    size: '2',
  },
  {
    name: 'Time',
    size: '2',
  },
  {
    name: 'Location',
    size: '4',
  },
];

const fullHeader = (
  <Grid container direction="row">
    {headings.map(({ name, size }) => (
      <Grid item xs={size}>
        <Typography variant="h5" className={styles.header_text}>
          {name}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

const noEvents = (
  <Grid item align="center">
    <br />
    <Typography variant="h4" align="center">
      No Events To Show
    </Typography>
    <br />
  </Grid>
);

const breakpointWidth = windowBreakWidths.breakSM;

const EventList = ({ events }) => {
  const [width] = useWindowSize();

  const header = width < breakpointWidth ? smallHeader : fullHeader;

  return (
    <Card>
      <CardHeader title={header} className={styles.header} />
      <Grid>
        <List className="gc360_event_list" disablePadding>
          {events?.length < 1
            ? noEvents
            : events.map((event) => <EventItem event={event} key={event.Event_ID} />)}
        </List>
      </Grid>
    </Card>
  );
};
export default EventList;
