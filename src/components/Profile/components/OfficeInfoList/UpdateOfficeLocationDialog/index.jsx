import { FormControl, IconButton, Input, InputLabel, Select } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonSnackbar from 'components/Snackbar';
import { forwardRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import userService from 'services/user';

const UpdateOffice = () => {
  const [open, setOpen] = useState(false);
  const [room, setRoom] = useState('');
  const [building, setBuilding] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  //const [buildings, setBuildings] = useState<string[]>([]);

  const handleSubmit = async () => {
    const values = room + ',' + building;
    try {
      await userService.setOfficeLocation(values.toString());
      createSnackbar('Your phone number will update within a couple hours.', 'success');
    } catch {
      createSnackbar('Phone number failed to update. Please contact CTS.', 'error');
    }
    setOpen(false);
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };
  //   console.log(userService.getBuildings()); // I am adding this not working yet
  //   setBuildings(userService.getBuildings());
  //console.log(buildings);
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
      >
        <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input">Building</InputLabel>
          {/* <Select
            type="tel"
            id="building-input"
            name="building"
            value={building}
            onChange={(event) => setbuilding(event.target.value)}
            required="required"
            autoFocus
          >
            {buildingsDescriptions.map((item) => (
              <MenuItem
                value={item.ID}
                onClick={async () => {
                  await handleChangeParticipantStatus(item.ID);
                  setAnchorEl(null);
                }}
              >
                {item.Description}
              </MenuItem>
            ))}
          </Select> */}
          <Input
            type="tel"
            id="building-input"
            name="building"
            value={building}
            onChange={(event) => setBuilding(event.target.value)}
            required="required"
            autoFocus
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="formatted-text-mask-input">Room Number</InputLabel>
          <Input
            type="tel"
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
