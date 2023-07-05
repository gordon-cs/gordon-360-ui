import { useState } from 'react';
import { gordonColors } from 'theme';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const ScheduleDialog = (props) => {
  const [descInput, setDescInput] = useState(props.descriptiontext ?? '');
  const [formValid, setFormValid] = useState(true);

  var maxCharacter = 4096;

  const handleSubmit = (e) => {
    e.preventDefault();
    var desc = descInput;
    props.onDialogSubmit(desc);
    handleClose();
  };

  const handleChange = (e) => {
    setDescInput(e.target.value);
  };

  const handleClose = () => {
    props.handleEditDescriptionClose();
    setFormValid(true);
  };

  const button = {
    background: gordonColors.primary.cyan,
    color: 'white',
  };

  return (
    <Dialog open={props.scheduleDialogOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div>
        <DialogTitle>Add Course Schedule to Calendar</DialogTitle>

        <TextField
          id="descInput"
          label="Description"
          multiline
          rows={3}
          defaultValue={descInput}
          value={descInput}
          onChange={handleChange}
          inputProps={{ maxLength: maxCharacter - 1 }}
        />

        <DialogActions>
          <Button onClick={props.handleEditDescriptionClose} variant="contained">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ScheduleDialog;
