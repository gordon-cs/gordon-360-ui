import {
  Button,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import { React, useCallback, useEffect, useMemo, useState } from 'react';
import SimpleSnackbar from 'components/Snackbar';
import GordonDialogBox from 'components/GordonDialogBox';
import { submitCheckIn, getRACurrentHalls } from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';
import { getAllHalls } from 'services/residentLife/halls';

const CheckIn = () => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { profile } = useUser();
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });

  const [checkedInHalls, setCheckedInHalls] = useState([]);

  const [hallState, setHallState] = useState({});

  const selectedHalls = useMemo(
    () =>
      Object.values(hallState).filter(
        (hall) => hall.isChecked && !checkedInHalls.includes(hall.BuildingCode),
      ),
    [hallState, checkedInHalls],
  );

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Fetch check-in status and initialize hall data
  useEffect(() => {
    const fetchData = async () => {
      if (!profile) {
        return;
      }

      try {
        const halls = await getAllHalls();
        halls.forEach((hall) => (hall.isChecked = false));
        const hallState = Object.fromEntries(halls.map((hall) => [hall.BuildingCode, hall]));

        const currentHalls = await getRACurrentHalls(profile.AD_Username);
        setCheckedInHalls(currentHalls);

        // if RA is checked in
        if (currentHalls.length > 0) {
          currentHalls.forEach((currentlyCheckedHallCode) => {
            halls[currentlyCheckedHallCode].isChecked = true;
          });
        } else if (profile.hall) {
          halls[profile.hall].isChecked = true;
        }

        setHallState(hallState);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [profile]);

  const handleSubmit = async () => {
    if (!profile?.ID || selectedHalls.length === 0) {
      createSnackbar(
        'Please select a hall and ensure profile information is loaded before checking in.',
        'warning',
      );
      return;
    }

    try {
      await submitCheckIn(
        profile.ID,
        selectedHalls.map((hall) => hall.BuildingCode),
      );
      await getRACurrentHalls(profile.AD_Username).then(setCheckedInHalls);
      setConfirmOpen(false);
      setOpen(false);
      createSnackbar(
        `Successfully checked into ${selectedHalls.map((hall) => hall.Name).join(', ')}`,
        'success',
      );
    } catch (error) {
      console.error('Error checking in:', error);
      createSnackbar('Failed to check in. Please try again.', 'error');
    }
  };

  const handleHallChecked = (event) => {
    const { name, checked } = event.target;

    setHallState((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], isChecked: checked },
    }));
  };

  return (
    <Grid container item justifyContent="center" alignItems="center">
      <Grid item xs={12} md={12}>
        <Button variant="contained" fullWidth={true} onClick={() => setOpen(true)}>
          {checkedInHalls?.length > 0 ? 'check in to extra Halls' : 'Check In To Your Shift'}
        </Button>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={open}
            onClose={() => setOpen(false)}
            title={'Choose Which Hall to Check Into'}
            buttonName="Check In"
            buttonClicked={() => setConfirmOpen(true)}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setOpen(false)}
          >
            <Grid item>
              <FormControl required={true}>
                <FormLabel error>Select a Hall</FormLabel>
                <FormGroup>
                  {Object.values(hallState)
                    //Exclude village buildings, since village RAs check in for the whole village at once
                    // .filter((hall) => !VillageBuildingCodes.includes(hall.BuildingCode))
                    .map((hall) => (
                      <FormControlLabel
                        key={hall.BuildingCode}
                        checked={hall.isChecked}
                        disabled={checkedInHalls?.includes(hall.BuildingCode)}
                        control={<Checkbox />}
                        onChange={handleHallChecked}
                        label={hall.Name}
                        name={hall.BuildingCode}
                      />
                    ))}
                </FormGroup>
              </FormControl>
            </Grid>
          </GordonDialogBox>
        </Grid>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            title={'Confirmation'}
            buttonName="Yes"
            buttonClicked={handleSubmit}
            cancelButtonName="No"
            cancelButtonClicked={() => setConfirmOpen(false)}
          >
            <Grid item>
              <Typography>
                NOTE: You are checking into{' '}
                {selectedHalls.map((hall) => hall.Name).join(', ') || 'Unknown Hall'} to be on duty.
                Is this what you meant to do?
              </Typography>
            </Grid>
          </GordonDialogBox>
          <SimpleSnackbar
            open={snackbar.open}
            text={snackbar.message}
            severity={snackbar.severity}
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CheckIn;
