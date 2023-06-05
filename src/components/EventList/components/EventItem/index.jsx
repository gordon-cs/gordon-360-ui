import { Button, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';
import 'add-to-calendar-button';
import { format } from 'date-fns';

const EventItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  const convertTime = (timeString) => {
    const times = timeString.split(' - ');
    const startTime = times[0];
    const endTime = times[1];

    const convertSingleTime = (singleTime) => {
      const [time, period] = singleTime.split(' ');
      const [hours, minutes] = time.split(':');
      let convertedHours = parseInt(hours, 10);

      if (period.toLowerCase() === 'pm' && convertedHours !== 12) {
        convertedHours += 12;
      } else if (period.toLowerCase() === 'am' && convertedHours === 12) {
        convertedHours = 0;
      }

      return `${convertedHours.toString().padStart(2, '0')}:${minutes}`;
    };

    const convertedStartTime = convertSingleTime(startTime);
    const convertedEndTime = convertSingleTime(endTime);

    return {
      startHour: convertedStartTime.split(':')[0],
      startMinute: convertedStartTime.split(':')[1],
      endHour: convertedEndTime.split(':')[0],
      endMinute: convertedEndTime.split(':')[1],
    };
  };

  const { startHour, startMinute, endHour, endMinute } = convertTime(event.timeRange);

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
          <add-to-calendar-button
            name={event.title}
            options="'Apple','Google'"
            location={event.location}
            startDate={format(new Date(event.date), 'yyyy-MM-dd')}
            endDate={format(new Date(event.date), 'yyyy-MM-dd')}
            startTime={startHour + ':' + startMinute}
            endTime={endHour + ':' + endMinute}
            timeZone="America/New_York"
            description={event.Description}
          ></add-to-calendar-button>
        </CardContent>
      </Collapse>
    </Grid>
  );
};

export default EventItem;
