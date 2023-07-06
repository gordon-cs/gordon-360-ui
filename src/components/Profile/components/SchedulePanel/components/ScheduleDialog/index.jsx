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
        </DialogContent>
        <DialogActions style={{ overflow: 'hidden' }}>
          {props.selectedCourseInfo ? (
            props.selectedCourseInfo.allDay ? (
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate="2023-07-09"
                description="ASYNC Courses"
                options="'Apple','Google','Outlook.com','MicrosoftTeams'"
                buttonsList
                hideTextLabelButton
                buttonStyle="round"
                lightMode="bodyScheme"
              ></add-to-calendar-button>
            ) : (
              <add-to-calendar-button
                name={props.selectedCourseInfo.title}
                startDate="2023-07-09"
                startTime={format(new Date(props.selectedCourseInfo.start), 'HH:mm')}
                endTime={format(new Date(props.selectedCourseInfo.end), 'HH:mm')}
                timeZone="America/Los_Angeles"
                description="SYNC Courses"
                options="'Apple','Google','Outlook.com','MicrosoftTeams'"
                buttonsList
                hideTextLabelButton
                buttonStyle="round"
                lightMode="bodyScheme"
              ></add-to-calendar-button>
            )
          ) : null}
          <Button onClick={props.handleScheduleDialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
