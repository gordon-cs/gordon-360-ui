import { useState } from 'react';
import { gordonColors } from 'theme';
import styles from './EditShiftNotesDialog.module.css';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const EditShiftNotesDialog = (props) => {
  const [shiftNoteInput, setShiftNoteInput] = useState(props.descriptiontext ?? '');
  const [formValid, setFormValid] = useState(true);

  var maxCharacter = 4000;
  const handleSubmit = (e) => {
    e.preventDefault();
    var shiftNote = shiftNoteInput;
    props.onDialogSubmit(shiftNote);
    handleClose();
  };

  const handleChange = (e) => {
    setShiftNoteInput(e.target.value);
  };

  const handleClose = () => {
    props.handleShiftNotesClose();
    setFormValid(true);
  };

  const button = {
    background: gordonColors.primary.cyan,
    color: 'white',
  };

  return (
    <Dialog open={props.editDescriptionOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div className={styles.shift_tile}>
        <DialogTitle className={styles.shift_title}>Edit Office Hours</DialogTitle>

        <TextField
          id="shiftNoteInput"
          label="Description"
          multiline
          rows={3}
          defaultValue={shiftNoteInput}
          value={shiftNoteInput}
          onChange={handleChange}
          className={styles.desc_description}
          inputProps={{ maxLength: maxCharacter - 1 }}
        />

        <DialogActions className={styles.shift_notes_buttons}>
          <Button onClick={props.handleShiftNotesClose} variant="contained" style={button}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} style={button}>
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EditShiftNotesDialog;
