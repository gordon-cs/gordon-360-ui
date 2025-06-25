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
import { forwardRef, useState, useCallback, useMemo } from 'react';
import { IMaskInput } from 'react-imask';
import userService from 'services/user';
import styles from './UpdatePhone.module.css';

type SnackbarState = {
  message: string;
  severity: AlertColor;
  open: boolean;
};

interface UpdatePhoneProps {
  currentPhone?: string;
  onUpdateSuccess?: (newPhone: string) => void;
}

const PhoneMaskInput = forwardRef<HTMLElement, InputBaseComponentProps>((props, ref) => {
  const { onChange, ...rest } = props;
  return (
    <IMaskInput
      {...rest}
      mask="(000) 000-0000"
      unmask={true}
      onAccept={(value: string) =>
        onChange?.({ target: { value } } as React.ChangeEvent<HTMLInputElement>)
      }
      overwrite
      inputRef={ref as React.Ref<HTMLInputElement>}
    />
  );
});

const UpdatePhone = ({ currentPhone, onUpdateSuccess }: UpdatePhoneProps) => {
  const [open, setOpen] = useState(false);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    severity: 'info',
    open: false,
  });

  const isValidPhone = useMemo(() => {
    return /^\d{10}$/.test(mobilePhoneNumber.replace(/\D/g, ''));
  }, [mobilePhoneNumber]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await userService.setMobilePhoneNumber(mobilePhoneNumber);
      if (onUpdateSuccess) onUpdateSuccess(mobilePhoneNumber);
      showSnackbar('Your phone number will update within a couple hours.', 'success');
    } catch (error) {
      showSnackbar(
        error instanceof Error
          ? error.message
          : 'Phone number failed to update. Please contact CTS.',
        'error',
      );
    }
    setLoading(false);
    setOpen(false);
  };

  const showSnackbar = useCallback((message: string, severity: AlertColor) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const handleOpen = () => {
    setMobilePhoneNumber(currentPhone ?? '');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMobilePhoneNumber('');
  };

  return (
    <div>
      <IconButton
        className={styles.edit_button}
        onClick={handleOpen}
        size="large"
        aria-label="Update mobile phone number"
      >
        <EditIcon fontSize="small" />
      </IconButton>

      <GordonDialogBox
        open={open}
        onClose={handleClose}
        title="Update Phone Number"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        isButtonDisabled={loading || !isValidPhone}
        cancelButtonName="CANCEL"
        cancelButtonClicked={handleClose}
      >
        <FormControl className={styles.form} fullWidth>
          <InputLabel htmlFor="mobile-phone-number-input">Phone Number</InputLabel>
          <Input
            type="tel"
            id="mobile-phone-number-input"
            value={mobilePhoneNumber}
            onChange={(e) => setMobilePhoneNumber(e.target.value)}
            inputComponent={PhoneMaskInput}
            required
            autoFocus
            aria-label="Mobile phone number"
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
