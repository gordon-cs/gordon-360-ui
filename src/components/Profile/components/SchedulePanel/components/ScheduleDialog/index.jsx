import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import 'add-to-calendar-button';
import { format, setDay } from 'date-fns';

const dayArr = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const ScheduleDialog = (props) => {
  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle sx={{ fontWeight: 'regular' }} align="center">
          Add Course Schedule to Calendar
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: 'bold', fontSize: 'large' }} align="center">
            Course Title: {props.selectedCourseInfo?.title}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: 'large' }} align="center">
            Time Range: {format(new Date(props.selectedCourseInfo.start), 'HH:mm')} -{' '}
            {format(new Date(props.selectedCourseInfo.end), 'HH:mm')}
          </Typography>
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden', flexDirection: 'column' }}>
          {props.selectedCourseInfo && (
            <>
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate={format(
                  setDay(
                    new Date(props.firstDay),
                    dayArr.indexOf(props.selectedCourseInfo.resourceId) + 1,
                  ),
                  'yyyy-MM-dd',
                )}
                // endDate={format(new Date(props.lastDay), 'yyyy-MM-dd')}
                startTime={
                  props.selectedCourseInfo.allDay
                    ? null
                    : format(new Date(props.selectedCourseInfo.start), 'HH:mm')
                }
                endTime={
                  props.selectedCourseInfo.allDay
                    ? null
                    : format(new Date(props.selectedCourseInfo.end), 'HH:mm')
                }
                description={props.selectedCourseInfo.allDay ? 'ASYNC Courses' : 'SYNC Courses'}
                options="'Google'"
                buttonsList
                hideTextLabelButton
                buttonStyle="round"
                recurrence={
                  'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' +
                  props.recurringDays +
                  ';UNTIL=' +
                  format(new Date(props.lastDay), 'yyyyMMdd')
                }
                lightMode="bodyScheme"
                Timezone="currentBrowser"
              ></add-to-calendar-button>
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate={format(new Date(props.selectedCourseInfo.start), 'yyyy-MM-dd')}
                endDate={format(new Date(props.selectedCourseInfo.end), 'yyyy-MM-dd')}
                startTime={
                  props.selectedCourseInfo.allDay
                    ? null
                    : format(new Date(props.selectedCourseInfo.start), 'HH:mm')
                }
                endTime={
                  props.selectedCourseInfo.allDay
                    ? null
                    : format(new Date(props.selectedCourseInfo.end), 'HH:mm')
                }
                description={props.selectedCourseInfo.allDay ? 'ASYNC Courses' : 'SYNC Courses'}
                options="'Outlook.com','MicrosoftTeams','Apple'"
                buttonsList
                hideTextLabelButton
                buttonStyle="round"
                lightMode="bodyScheme"
                Timezone="currentBrowser"
              ></add-to-calendar-button>
            </>
          )}
          <Grid style={{ marginTop: '20px' }}>
            <Button onClick={props.handleScheduleDialogClose} variant="contained" size="medium">
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
