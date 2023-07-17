import { useState } from 'react';
import styles from './EditDescriptionDialog.module.css';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@mui/material';

const EditDescriptionDialog = (props) => {
  const [descInput, setDescInput] = useState(props.descriptiontext ?? '');
  const [formValid, setFormValid] = useState(true);

  var maxCharacter = 4000;
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

  return (
    <Dialog open={props.editDescriptionOpen} keepMounted fullWidth={true} maxWidth="xs">
      <div className={styles.desc_tile}>
        <DialogTitle className={styles.desc_title}>Edit Office Hours</DialogTitle>

        <TextField
          id="descInput"
          label="Description"
          multiline
          rows={3}
          defaultValue={descInput}
          value={descInput}
          onChange={handleChange}
          className={styles.desc_description}
          inputProps={{ maxLength: maxCharacter - 1 }}
        />

        <DialogActions className={styles.desc_buttons}>
          <Button onClick={props.handleEditDescriptionClose} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default EditDescriptionDialog;
