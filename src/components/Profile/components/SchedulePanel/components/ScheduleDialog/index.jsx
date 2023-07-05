import { useState } from 'react';
import { gordonColors } from 'theme';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const ScheduleDialog = (props) => {
  const button = {
    background: gordonColors.primary.cyan,
    color: 'white',
  };

  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle>Add Course Schedule to Calendar</DialogTitle>
        <DialogActions>
          <add-to-calendar-button
            label="Add Course"
            name="[Reminder] Test the Add to Calendar Button"
            startDate="2023-07-08"
            startTime="10:15"
            endTime="23:30"
            timeZone="America/Los_Angeles"
            location="World Wide Web"
            description="Check out the maybe easiest way to include Add to Calendar Buttons to your web projects:[br]→ [url]https://add-to-calendar-button.com/"
            options="'Apple','Google','iCal','Outlook.com','Yahoo'"
            recurrence="weekly"
            recurrence_interval="1"
            recurrence_count="6"
            recurrence_byDay="WE,FR"
            lightMode="system"
            onClick={() => setExpanded((e) => !e)}
          ></add-to-calendar-button>
          <Button onClick={props.handleScheduleDialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
