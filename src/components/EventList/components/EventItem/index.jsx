import { Button, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';
import 'add-to-calendar-button';
import { format } from 'date-fns';

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
        <Typography className={styles.event_column}>
          {event.date === 'Invalid DateTime' ? 'No Date Listed' : event.date}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={2}>
        <Typography className={styles.event_column}>
          {event.timeRange === 'Invalid DateTime - Invalid DateTime'
            ? 'No Time Listed'
            : event.timeRange}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography className={styles.event_column}>{event.location}</Typography>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography type="caption" className={styles.descriptionText}>
            {event.Description || 'No description available'}
          </Typography>
          {event.StartDate !== '' && event.EndDate !== '' && (
            <add-to-calendar-button
              name={event.title}
              options="'Apple','Google','Outlook.com','MicrosoftTeams'"
              location={event.location}
              startDate={format(new Date(event.StartDate), 'yyyy-MM-dd')}
              endDate={format(new Date(event.EndDate), 'yyyy-MM-dd')}
              startTime={format(new Date(event.StartDate), 'HH:mm')}
              endTime={format(new Date(event.EndDate), 'HH:mm')}
              //default timeZone setting is "currentBrowser", and saved setting "America/New_York" if needed in case
              timeZone="currentBrowser"
              description={event.Description}
              onClick={() => setExpanded((e) => !e)}
              lightMode="system" // Set to system @TODO use localstorage setting to update
              /*currently will just be set to the users system setting, no way of knowing the
              360 local set mode. For users in system color scheme, and those who have 
              their system set the same as 360, the button will appear correct, but otherwise the 
              button might be light in dark mode and vice versa.
              For now, it works in some cases, and doesn't look too terrible otherwise
              Potential fix is to query the localStorage key to get the theme mode setting for the 
              user.*/
            ></add-to-calendar-button>
          )}
        </CardContent>
      </Collapse>
    </Grid>
  );
};

export default EventItem;
