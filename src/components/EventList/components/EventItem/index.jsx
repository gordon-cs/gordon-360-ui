import { Button, CardContent, Collapse, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import styles from './EventItem.module.css';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const EventItem = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  const convertDate = (dateString) => {
    const dateParts = dateString.split(' ');
    const month = dateParts[0];
    const day = dateParts[1].slice(0, -1); // Remove the comma at the end
    const year = dateParts[2];
  
    // Convert month abbreviation to month number
    const monthIndex = new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1;
    const monthString = monthIndex.toString().padStart(2, '0');
    const dayString = day.padStart(2, '0');
  
    return `${year}-${monthString}-${dayString}`;
  };
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
        <AddToCalendarButton
          name= {event.title}
          options={['Apple','Google']}
          location= {event.location}
          startDate={convertDate(event.date)}
          endDate= {convertDate(event.date)}
          startTime={startHour + ':' + startMinute}
          endTime={endHour + ':' + endMinute}
          timeZone="America/New_York"
          description = {event.Description}
        ></AddToCalendarButton>
        </CardContent>
      </Collapse>
    </Grid>
  );
};

export default EventItem;
