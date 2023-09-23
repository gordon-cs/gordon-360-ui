import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Divider,
  DialogContentText,
} from '@mui/material';
import 'add-to-calendar-button';
import { format, nextDay } from 'date-fns';
import styles from './ScheduleDialog.module.css';
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import { courseDayIds, scheduleCalendarResources } from 'services/schedule';

const ScheduleDialog = ({ course, session, onClose }) => {
  if (!course) return null;

  const addToCalendarProps = {
    name: course.title,
    startDate: format(
      // setDay counts from Sunday as 0, but courseDayIds start Monday as 0
      nextDay(new Date(session.SessionBeginDate), courseDayIds.indexOf(course.resourceId) + 1),
      'yyyy-MM-dd',
    ),
    startTime: course.allDay ? null : format(course.start, 'HH:mm'),
    endTime: course.allDay ? null : format(course.end, 'HH:mm'),
    description: course.name,
    Location: course.location,
    buttonStyle: 'round',
    lightMode: localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY) ?? 'system',
    //Get user theme mode preference
    Timezone: 'currentBrowser',
  };

  return (
    <Dialog open={Boolean(course)} fullWidth={true} maxWidth="xs">
      <DialogTitle className={styles.dialogTitle} align="center">
        {course.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Title: {course.name}
          <br />
          Room: {course.location}
          <br />
          Time:
          {format(course.start, " hh:mm aaaaa'm' ")}-{format(course.end, " hh:mm aaaaa'm' ")}
          <br />
          Week Day{course.meetingDays.length > 1 && <>(s)</>}:{' '}
          {course.meetingDays
            .map((resourceId) => scheduleCalendarResources.find((r) => r.id === resourceId).title)
            .join(', ')}
          <br />
          Term Date: {format(new Date(session.SessionBeginDate), 'yyyy-MM-dd')} to
          {format(new Date(session.SessionEndDate), ' yyyy-MM-dd')}
        </DialogContentText>
        <br />
        <Divider variant="middle" />
        <br />
        <Typography>Add as a Recurring Event (only supported by Google Calendar):</Typography>
        {/* There are two separate add-to-calendar button elements because Google calendar is the only
          calendar that supports recurring events, the other add-to-calendar button is for the other
          options that users can choose and manually set the course as recurring */}
        <add-to-calendar-button
          {...addToCalendarProps}
          labal="Add to Google Calendar"
          options="'Google'"
          recurrence={
            'RRULE:FREQ=WEEKLY;INTERVAL=1;WKST=MO;BYDAY=' +
            course.meetingDays.join(',') +
            ';UNTIL=' +
            format(new Date(session.SessionEndDate), "yyyyMMdd'T000000Z'")
          }
        ></add-to-calendar-button>
        <br />
        <Divider variant="middle" />
        <br />
        <Typography>Add as one-time event:</Typography>
        <add-to-calendar-button
          {...addToCalendarProps}
          options="'Microsoft365|Gordon','Outlook.com|Outlook','MicrosoftTeams','Apple'"
        ></add-to-calendar-button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleDialog;
