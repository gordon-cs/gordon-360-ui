import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { forwardRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import userService from 'services/user';

const UpdatePlannedGraduationYear = () => {
  const [open, setOpen] = useState(false);
  const [plannedGraduationYear, setPlannedGraduationYear] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const handleSubmit = async () => {
    try {
      await userService.setPlannedGraduationYear(plannedGraduationYear);
      createSnackbar('Your Planned Graduation Year will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Planned Graduation Year failed to update. Please contact CTS.', 'error');
    }
    setOpen(false);
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  return (
    <div>
      <IconButton style={{ marginBottom: '0.5rem' }} onClick={() => setOpen(true)} size="large">
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Planned Graduation Year"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
      >
        <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
          <Input
            name="plannedGraduationYear"
            value={plannedGraduationYear}
            onChange={(event) => setPlannedGraduationYear(event.target.value)}
            required="required"
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

export default UpdatePlannedGraduationYear;
