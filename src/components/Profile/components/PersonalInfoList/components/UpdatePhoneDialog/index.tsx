import {
  AlertColor,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputBaseComponentProps,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { forwardRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import userService from 'services/user';
import styles from './UpdatePhone.module.css';

interface SnackbarState {
  message: string;
  severity: AlertColor;
  open: boolean;
}

const UpdatePhone = () => {
  const [open, setOpen] = useState(false);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    severity: 'info',
    open: false,
  });

  const handleSubmit = async () => {
    try {
      await userService.setMobilePhoneNumber(mobilePhoneNumber);
      const updatedProfile = await userService.getProfileInfo();
      createSnackbar('Your phone number will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Phone number failed to update. Please contact CTS.', 'error');
    }
    setOpen(false);
  };

  const createSnackbar = (message: string, severity: AlertColor) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleInputChange = (_: string | undefined, value: string) => {
    setMobilePhoneNumber(value);
  };

  return (
    <div>
      <IconButton
        className={styles.edit_button}
        onClick={() => setOpen(true)}
        size="large"
        aria-label="Update mobile phone number"
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Phone Number"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        isButtonDisabled={mobilePhoneNumber.replace(/\D/g, '').length !== 10}
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
            onChange={() => {}} // required to suppress React warning
            inputComponent={forwardRef(function MaskedPhoneInput(props, ref) {
              const { name, ...rest } = props as InputBaseComponentProps & {
                onChange: (name: string | undefined, value: string) => void;
              };
              return (
                <IMaskInput
                  {...rest}
                  mask="(000) 000-0000"
                  unmask={true}
                  onAccept={(value: string) => handleInputChange(name, value)}
                  overwrite
                />
              );
            })}
            required
            autoFocus
          />
        </FormControl>
      </GordonDialogBox>

      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

export default UpdatePhone;
