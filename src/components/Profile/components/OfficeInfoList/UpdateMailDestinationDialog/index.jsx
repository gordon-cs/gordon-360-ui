import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateMail = () => {
  const [open, setOpen] = useState(false);
  const [mailStop, setMailStop] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [mailDestinations, setMailDestinations] = useState([]);

  const handleSubmit = async () => {
    try {
      await userService.updateMailDestination(mailStop);
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

  useEffect(() => {
    userService.getMailDestinations().then(setMailDestinations);
  }, []);

  return (
    <div>
      <IconButton style={{ marginBottom: '0.5rem' }} onClick={() => setOpen(true)} size="large">
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Mail Destination"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
        handleSubmit
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <SearchField
            name="mail stop"
            value={mailStop}
            updateValue={(event) => setMailStop(event.target.value)}
            options={mailDestinations}
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
