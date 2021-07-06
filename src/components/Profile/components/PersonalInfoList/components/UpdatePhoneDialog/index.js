import { useState } from 'react';
import MaskedInput from 'react-text-mask';
import EditIcon from '@material-ui/icons/Edit';
import {
  IconButton,
  FormControl,
  Input,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import userService from 'services/user';
import GordonSnackbar from 'components/Snackbar';
import './index.css';

const UpdatePhone = () => {
  const [open, setOpen] = useState(false);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const handleSubmit = async () => {
    await userService.setMobilePhoneNumber(mobilePhoneNumber);
    setOpen(false);
    handleChangeMobilePhoneNumber();
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleChangeMobilePhoneNumber = async (mobilePhoneNumber) => {
    try {
      await userService.setMobilePhoneNumber(mobilePhoneNumber);
      createSnackbar('Your phone number will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Phone number failed to update. Please contact CTS.', 'error');
    }
  };

  return (
    <div className="gc360-updatephone-dialog">
      <IconButton className="gc360-my-profile_edit-icon" onClick={() => setOpen(true)}>
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="gc360-updatephone-dialog_title">Update Phone Number</DialogTitle>
        <DialogContent className="gc360-updatephone-dialog_content">
          {/* SUBMISSION GUIDELINES */}
          <DialogContentText className="gc360-updatephone-dialog_content_text">
            Update your phone number below. When done, click update.
          </DialogContentText>

          {/* PHONE NUMBER ENTRY */}
          <FormControl>
            <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
            <Input
              type="tel"
              id="mobile-phone-number-input"
              name="mobile-phone-number"
              value={mobilePhoneNumber}
              onChange={(event) => setMobilePhoneNumber(event.target.value)}
              inputComponent={phoneMaskUS}
              required="required"
              autoFocus
            />
          </FormControl>
        </DialogContent>

        {/* CANCEL/UPDATE */}
        <DialogActions className="gc360-updatephone-dialog_actions">
          <Button onClick={() => setOpen(false)} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={mobilePhoneNumber.replace(/[-()\s\D]/g, '').length !== 10}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

// From material ui website
// https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
export function phoneMaskUS(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
    />
  );
}

export default UpdatePhone;
