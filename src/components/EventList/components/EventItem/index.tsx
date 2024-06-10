import { Button, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';
import 'add-to-calendar-button';
import { format } from 'date-fns';
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';

export interface GordonEvent {
  title: string;
  Description?: string;
  location?: string;
  date?: JSX.Element | string | number;
  StartDate: string | Date | number;
  EndDate: string | Date | number;
  timeRange?: string;
  Event_ID?: string;
}

const checkLightMode = (mode: string | null) => {
  if (mode === 'system') {
    return 'system';
  } else if (mode === 'dark') {
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
    event: GordonEvent;
}

const EventItem = ({event}: Props) => {
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
          <Typography sx={{ type: 'caption', className: styles.descriptionText }}>
            {event.Description || 'No description available'}
          </Typography>
          {event.StartDate !== '' && event.EndDate !== '' && (
            <Button onClick={() => setExpanded((e) => !e)}>
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
                lightMode={
                  checkLightMode(localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY)) ?? 'system'
                }
                //Get user theme mode preference
              ></add-to-calendar-button>
            </Button>
          )}
        </CardContent>
      </Collapse>
    </Grid>
  );
};

export default EventItem;
