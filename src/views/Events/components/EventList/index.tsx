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

const tableHeader = (
  <Grid container direction="row">
    <Grid item xs={4} key="Name">
      <Typography variant="h5" className={styles.header_text}>
        Name
      </Typography>
    </Grid>
    <Grid item xs={2} key="Date">
      <Typography variant="h5" className={styles.header_text}>
        Date
      </Typography>
    </Grid>
    <Grid item xs={2} key="Time">
      <Typography variant="h5" className={styles.header_text}>
        Time
      </Typography>
    </Grid>
    <Grid item xs={4} key="Location">
      <Typography variant="h5" className={styles.header_text}>
        Location
      </Typography>
    </Grid>
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

const EventList = ({ events, loading }: Props) => {
  const [width] = useWindowSize();

  return (
    <Card>
      <CardHeader
        title="Events"
        subheader={width > windowBreakWidths.breakSM ? tableHeader : undefined}
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
