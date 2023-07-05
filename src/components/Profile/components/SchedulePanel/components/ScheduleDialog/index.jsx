import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';
import { useState } from 'react';

const GordonScheduleDialog = (props) => {
  const [myScheduleOpen, setMyScheduleOpen] = useState(false);

  return (
    <Dialog
      open={props.scheduleDialogOpen}
      onClose={props.handleScheduleDialogClose}
      fullWidth="true"
      maxWidth="md"
    >
      <DialogTitle>Add Course Event to Calendar</DialogTitle>

      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={props.handleScheduleDialogClose} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GordonScheduleDialog;
