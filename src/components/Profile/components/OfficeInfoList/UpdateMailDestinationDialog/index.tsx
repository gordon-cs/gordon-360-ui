import { AlertColor, FormControl, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect, ReactNode } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateMail = (props: { changeMailLocation: (mailStop: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [mailStop, setMailStop] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const [mailStops, setMailStops] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      await userService.updateMailStop(mailStop);
      props.changeMailLocation(mailStop);
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
    userService.getMailStops().then(setMailStops);
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
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <SearchField
            name="mail stop"
            value={mailStop}
            updateValue={(event) => setMailStop(event.target.value)}
            options={mailStops}
            select
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

export default UpdateMail;
