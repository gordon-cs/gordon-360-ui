import { AlertColor, Autocomplete, Box, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import peopleSearchService from 'services/peopleSearch';

type Building = {
  Code: string;
  Description: string;
};

const UpdateOffice = () => {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState('');
  const [building, setBuilding] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const [buildings, setBuildings] = useState<Building[]>([]);

  useEffect(() => {
    peopleSearchService.getBuildings().then(setBuildings);
  }, []);

  const handleSubmit = async () => {
    try {
      await userService.updateOfficeLocation({ BuildingCode: building, RoomNumber: room });
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

  return (
    <>
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
      >
        <Box
          sx={{ gap: '1rem', marginBlockStart: '1rem', display: 'flex', flexDirection: 'column' }}
        >
          <Autocomplete
            options={buildings}
            renderInput={(params) => <TextField {...params} label="Building" />}
            getOptionLabel={(option) => option.Description}
            onChange={(_event, value) => setBuilding(value!.Code)}
          />
          <TextField
            label="Room"
            value={room}
            onChange={(event) => setRoom(event.target.value)}
            required
          />
        </Box>
      </GordonDialogBox>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity as AlertColor}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default UpdateOffice;
