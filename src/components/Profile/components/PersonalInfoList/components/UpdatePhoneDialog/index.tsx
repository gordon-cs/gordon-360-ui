import {
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputBaseComponentProps,
  InputProps,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar, { severityType } from 'components/Snackbar';
import { forwardRef, useState, FormEvent } from 'react';
import { IMaskInput } from 'react-imask';
import userService from 'services/user';
import styles from './UpdatePhone.module.css';

const UpdatePhone = () => {
  const [open, setOpen] = useState(false);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });

  const handleSubmit = async () => {
    try {
      await userService.setMobilePhoneNumber(mobilePhoneNumber);
      createSnackbar('Your phone number will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Phone number failed to update. Please contact CTS.', 'error');
    }
    setOpen(false);
  };

  const createSnackbar = (message: string, severity: severityType) => {
    setSnackbar({ message, severity, open: true });
  };

  return (
    <div>
      <IconButton className={styles.edit_button} onClick={() => setOpen(true)} size="large">
        <EditIcon fontSize="small" />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Phone Number"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        isButtonDisabled={mobilePhoneNumber.replace(/[-()\s\D]/g, '').length !== 10}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
      >
        <FormControl className={styles.form}>
          <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
          <Input
            type="tel"
            id="mobile-phone-number-input"
            name="mobilePhoneNumber"
            value={mobilePhoneNumber}
            onChange={(event) => setMobilePhoneNumber(event.target.value)}
            inputComponent={phoneMaskUS}
            required
            autoFocus
          />
        </FormControl>
      </GordonDialogBox>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity as severityType}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

// From material ui website
// https://material-ui.com/components/text-fields/#integration-with-3rd-party-input-libraries
const phoneMaskUS = forwardRef(
  (props: { onChange: ({}) => void; name?: string } & InputBaseComponentProps, ref) => {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        ref={ref}
        mask="(000) 000-0000"
        placeholderChar={'\u2000'}
        unmask={true}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
);

export default UpdatePhone;
