import { CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';

const EventItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid
      component="section"
      container
      direction="row"
      onClick={() => setExpanded((e) => !e)}
      className={styles.event_item}
    >
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" className={styles.event_column}>
          {event.title}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography className={styles.event_column}>{event.date}</Typography>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography className={styles.event_column}>{event.timeRange}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography className={styles.event_column}>{event.location}</Typography>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography type="caption" className={styles.descriptionText}>
            {event.Description || 'No description available'}
          </Typography>
        </CardContent>
      </Collapse>
    </Grid>
  );
};

export default EventItem;
