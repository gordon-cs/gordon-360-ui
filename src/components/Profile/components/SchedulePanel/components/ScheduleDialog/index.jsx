import { useState } from 'react';
import { gordonColors } from 'theme';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import styles from './ScheduleDialog.module.css';
import 'add-to-calendar-button';
import { format, setDay } from 'date-fns';

const recurSchedule =
  'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' + 'MO,WE,FR' + ';UNTIL=20231019T000000Z';

const dayArr = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
[];

const ScheduleDialog = (props) => {
  const button = {
    background: gordonColors.primary.cyan,
    color: 'white',
  };

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
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden', flexDirection: 'column' }}>
          {props.selectedCourseInfo && (
            <>
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate={format(
                  setDay(new Date(props.firstDay), dayArr.indexOf('WE')),
                  'yyyy-MM-dd',
                )}
                endDate={format(new Date(props.lastDay), 'yyyy-MM-dd')}
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
                recurrence={'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' + props.recurringDays}
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
