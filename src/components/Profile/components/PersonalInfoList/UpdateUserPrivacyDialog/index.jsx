import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateOffice = () => {
  const [open, setOpen] = useState(false);
  const [Field, setField] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [VisibilityGroup, setVisibilityGroup] = useState('');
  const [privacyOptions, setPrivacyOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      await userService.setUserPrivacy({ PrivacySetting: privacy });
      setSnackbar({
        message: 'Your office location will update within a couple hours.',
        severity: 'success',
        open: true,
      });
    } catch {
      setSnackbar({
        message: 'Office location failed to update. Please contact CTS.',
        severity: 'error',
        open: true,
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    userService.getBuildings().then(setBuildings);
  }, []);

  return (
    <div>
      <IconButton style={{ marginBottom: '0.5rem' }} onClick={() => setOpen(true)} size="large">
        <EditIcon style={{ fontSize: 20 }} />
      </IconButton>
      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title="Update Office Location"
        buttonName="UPDATE"
        buttonClicked={handleSubmit}
        cancelButtonName="CANCEL"
        cancelButtonClicked={() => setOpen(false)}
        handleSubmit
      >
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <SearchField
            name="building"
            value={building}
            updateValue={(event) => setBuilding(event.target.value)}
            options={buildings}
            select
            size={200}
          />
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <InputLabel htmlFor="formatted-text-mask-input">Room Number</InputLabel>
          <Input
            id="room-number-input"
            name="room"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
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

export default UpdateOffice;
