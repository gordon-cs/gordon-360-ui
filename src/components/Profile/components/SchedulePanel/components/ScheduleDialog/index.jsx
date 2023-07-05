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
          <Button onClick={props.handleScheduleDialogClose} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
