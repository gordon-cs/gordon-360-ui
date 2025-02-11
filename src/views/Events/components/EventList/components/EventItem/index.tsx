import { Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';
import 'add-to-calendar-button';
import { format } from 'date-fns';
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import { Event } from 'services/event';

const checkLightMode = (mode: string | null) => {
  if (mode === 'dark') {
    return 'dark';
  } else if (mode === 'light') {
    return 'light';
  } else if (mode === 'bodyScheme') {
    return 'bodyScheme';
  } else {
    return 'system';
  }
};

type Props = {
  event: Event;
};

const EventItem = ({ event }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid
      component="section"
      container
      direction="row"
      onClick={() => setExpanded((e) => !e)}
      className={styles.event_item}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && e.currentTarget === e.target) {
          setExpanded((e) => !e);
        }
      }}
    >
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">{event.title}</Typography>
      </Grid>
      <Grid item xs={4} sm={2}>
        <Typography>{event.date}</Typography>
      </Grid>
      <Grid item xs={8} sm={2}>
        <Typography>{event.timeRange}</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography>{event.location}</Typography>
      </Grid>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography className={styles.descriptionText} tabIndex={0}>
          {event.Description || 'No description available'}
        </Typography>
        {event.StartDate !== '' && event.EndDate !== '' && (
          <add-to-calendar-button
            name={event.title}
            options="'Google','Microsoft365|Gordon Outlook','Apple','Outlook.com|Outlook','MicrosoftTeams'"
            location={event.location}
            startDate={format(new Date(event.StartDate), 'yyyy-MM-dd')}
            endDate={format(new Date(event.EndDate), 'yyyy-MM-dd')}
            startTime={format(new Date(event.StartDate), 'HH:mm')}
            endTime={format(new Date(event.EndDate), 'HH:mm')}
            //default timeZone setting is "currentBrowser", and saved setting "America/New_York" if needed in case
            timeZone="currentBrowser"
            label="Add to Calendar"
            description={event.Description}
            //Get user theme mode preference
            lightMode={checkLightMode(localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY))}
          ></add-to-calendar-button>
        )}
      </Collapse>
    </Grid>
  );
};

export default EventItem;
