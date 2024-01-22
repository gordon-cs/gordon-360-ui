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
import { STORAGE_COLOR_PREFERENCE_KEY } from 'theme';
import { CourseEvent, courseDayIds, scheduleCalendarResources } from 'services/schedule';
import { Session } from 'services/session';

type Props = {
  course: CourseEvent;
  session: Session;
  onClose: () => void;
};

const ScheduleDialog = ({ course, session, onClose }: Props) => {
  const addToCalendarProps = {
    name: course.title,
    iCalFileName: course.title,
    startDate: format(
      // nextDay counts from Sunday as 0, but courseDayIds start Monday as 0
      nextDay(
        new Date(session.SessionBeginDate),
        (courseDayIds.indexOf(course.resourceId[0]) + 1) as Day,
      ),
      'yyyy-MM-dd',
    ),
    startTime: course.allDay ? null : format(course.start, 'HH:mm'),
    endTime: course.allDay ? null : format(course.end, 'HH:mm'),
    description: course.name,
    Location: course.location,
    buttonStyle: 'round',
    lightMode: localStorage.getItem(STORAGE_COLOR_PREFERENCE_KEY) ?? 'system',
    Timezone: 'currentBrowser',
    listStyle: 'modal',
  };

  return (
    <Dialog open={Boolean(course)} fullWidth={true} maxWidth="xs">
      <DialogTitle>{course.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Title: {course.name}
          <br />
          Room: {course.location}
          <br />
          Time:
          {format(course.start, " hh:mm aaaaa'm' ")}-{format(course.end, " hh:mm aaaaa'm' ")}
          <br />
          Week Day{course.resourceId.length > 1 && <>(s)</>}:{' '}
          {course.resourceId
            .map((resourceId) => scheduleCalendarResources.find((r) => r.id === resourceId)?.title)
            .join(', ')}
          <br />
          Term Date: {format(new Date(session.SessionBeginDate), 'yyyy-MM-dd')} to
          {format(new Date(session.SessionEndDate), ' yyyy-MM-dd')}
        </DialogContentText>
        <br />
        <Divider variant="middle" />
        <br />
        <Typography>Add as a recurring event (not supported by all calendars):</Typography>
        {/* There are two separate add-to-calendar button elements because Google calendar is the only
          calendar that supports recurring events, the other add-to-calendar button is for the other
          options that users can choose and manually set the course as recurring */}
        {/* @TODO: TypeScript does not like the Web Component. The add-to-calendar-button docs mention a
            way to fix this with a global type definition file, but I couldn't get it to work.
            The best solution would be the official react wrapper around the Web Component, but we
            need to be on React 18 to use it. */}
        {/* @ts-ignore */}
        <add-to-calendar-button
          {...addToCalendarProps}
          options="'Google','iCal'"
          recurrence={
            'RRULE:FREQ=WEEKLY;INTERVAL=1;WKST=MO;BYDAY=' +
            course.resourceId.join(',') +
            ';UNTIL=' +
            format(new Date(session.SessionEndDate), "yyyyMMdd'T000000Z'")
          }
        >
          {/* @ts-ignore */}
        </add-to-calendar-button>
        <br />
        <Divider variant="middle" />
        <br />
        <Typography>Add as one-time event:</Typography>
        {/* @ts-ignore */}
        <add-to-calendar-button
          {...addToCalendarProps}
          options="'Microsoft365|Gordon Outlook','Outlook.com|Microsoft Outlook','MicrosoftTeams','Apple'"
        >
          {/* @ts-ignore */}
        </add-to-calendar-button>
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
