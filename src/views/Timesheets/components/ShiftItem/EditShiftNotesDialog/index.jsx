import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateMail = () => {
  const [open, setOpen] = useState(false);
  const [shitNote, setShiftNote] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const handleSubmit = async () => {
    try {
      await userService.updateMailStop(mailStop);
      setSnackbar({
        message: 'Your mail destination will update within a couple hours.',
        severity: 'success',
        open: true,
      });
    } catch {
      setSnackbar({
        message: 'Mail destination failed to update. Please contact CTS.',
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
        title="Edit Shift Notes"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
        handleSubmit
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <SearchField
            name="shift notes"
            value={shitNote}
            updateValue={(event) => setMailStop(event.target.value)}
            options={mailStops}
            select
            size={200}
            required="required"
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

export default UpdateMail;
