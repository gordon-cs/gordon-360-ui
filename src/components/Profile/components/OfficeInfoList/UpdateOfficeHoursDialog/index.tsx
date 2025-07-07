import { AlertColor, FormControl, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState } from 'react';
import userService from 'services/user';

const UpdateOfficeHours = (props: {
  officeHours: string;
  changeOfficeHours: (hours: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(props.officeHours);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const maxCharacter = 4000;

  const handleSubmit = async () => {
    try {
      await userService.updateOfficeHours(hours);
      props.changeOfficeHours(hours);
    } catch {
      setSnackbar({
        message: 'Office hours failed to update. Please contact CTS.',
        severity: 'error',
        open: true,
      });
    }
    setOpen(false);
  };

  return (
    <div>
      <IconButton style={{ marginBottom: '0.5rem' }} onClick={() => setOpen(true)} size="large">
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Office Hours"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
      >
        <FormControl sx={{ m: 2, minWidth: 500 }}>
          <TextField
            id="office-hours-input"
            label="office hours"
            multiline
            rows={3}
            defaultValue={props.officeHours}
            value={hours}
            onChange={(event) => setHours(event.target.value)}
            inputProps={{ maxLength: maxCharacter - 1 }}
            required
          />
        </FormControl>
      </GordonDialogBox>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity as AlertColor}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

export default UpdateOfficeHours;
