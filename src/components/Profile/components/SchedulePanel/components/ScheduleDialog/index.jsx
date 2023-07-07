import { useState } from 'react';
import { gordonColors } from 'theme';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';
import styles from './ScheduleDialog.module.css';
import 'add-to-calendar-button';
import { format } from 'date-fns';

const recurSchedule =
  'RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' + 'MO,WE,FR' + ';UNTIL=20231019T000000Z';

const ScheduleDialog = (props) => {
  const button = {
    background: gordonColors.primary.cyan,
    color: 'white',
  };

  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle>Add Course Schedule to Calendar</DialogTitle>
        <DialogContent>
          <Typography>Course Title: {props.selectedCourseInfo?.title}</Typography>
          <Typography>Are we meeting on Friday: {props.courseInfo[0]?.CRS_TITLE}</Typography>
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden' }}>
          {props.selectedCourseInfo && (
            <>
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate={format(new Date(props.selectedCourseInfo.start), 'yyyy-MM-dd')}
                //endDate={format(new Date(props.selectedCourseInfo.end), 'yyyy-MM-dd')}
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
                options="'Apple','Google','Outlook.com','MicrosoftTeams'"
                buttonsList
                hideTextLabelButton
                buttonStyle="round"
                recurrence={recurSchedule}
                lightMode="bodyScheme"
              ></add-to-calendar-button>
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate={format(new Date(props.selectedCourseInfo.start), 'yyyy-MM-dd')}
                //endDate={format(new Date(props.selectedCourseInfo.end), 'yyyy-MM-dd')}
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
              ></add-to-calendar-button>
            </>
          )}
          <Button onClick={props.handleScheduleDialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
