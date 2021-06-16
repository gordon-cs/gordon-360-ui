// https://material-ui.com/components/dialogs/#simple-dialogs
// https://material-ui.com/components/text-fields/
// https://medium.com/web-dev-survey-from-kyoto/how-to-handle-invalid-user-inputs-in-react-forms-for-ux-design-best-practices-e3108ef8a793
// https://www.telerik.com/blogs/up-and-running-with-react-form-validation

import React, { useState } from 'react';
import userService from 'services/user';
import EditIcon from '@material-ui/icons/Edit';
import {
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import './index.css';

const EditPhoneDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    let result = await userService.setMobilePhoneNumber(mobilePhoneNumber);
    // if (result === undefined) {
    //   // this.updateSnackbar('Mobile Phone Number Failed to Edit');
    // } else {
    //   // this.updateSnackbar('Mobile Phone Number Edited Successfully');
    // }

    handleClose();
  };

  return (
    <div className="gc360-editphone-dialog">
      <IconButton className="gc360-my-profile_edit-icon" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="gc360-editphone-dialog_title">Edit Phone Number</DialogTitle>
        <DialogContent className="gc360-editphone-dialog_content">
          <DialogContentText className="gc360-editphone-dialog_content_text">
            Paste or Edit your phone number below. When done, click Edit.
          </DialogContentText>
          <TextField
            id="mobile-phone-number-input"
            label="Phone Number"
            variant="outlined"
            margin="dense"
            inputMode="decimal"
            autoFocus
            fullWidth
            required
            value={mobilePhoneNumber}
            onChange={(event) => setMobilePhoneNumber(event.target.value)}
          />
        </DialogContent>
        <DialogActions className="gc360-editphone-dialog_actions">
          <Button onClick={handleClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPhoneDialog;
