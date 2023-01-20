import { CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';

//Switched to table rows
const EventItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false)

  const eventDescription = event.Description || 'No description available';

  return (
    <Grid
      component="section"
      container
      direction="row"
      onClick={() => setExpanded(e => !e)}
      className={styles.event_item}
    >
      <Grid item xs={4}>
        <Typography className={styles.event_column}>{event.title}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography className={styles.event_column}>{event.location}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={styles.event_column}>{event.date}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography className={styles.event_column}>{event.timeRange}</Typography>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography className={styles.descriptionText}>Description:</Typography>
          <Typography type="caption" className={styles.descriptionText}>
            {eventDescription}
          </Typography>
        </CardContent>
      </Collapse>
    </Grid>
  );
}

export default EventItem
