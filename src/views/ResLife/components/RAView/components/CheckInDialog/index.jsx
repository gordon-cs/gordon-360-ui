import { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';
import {
  checkIfCheckedIn,
  submitCheckIn,
  getRACurrentHalls,
} from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';

const CheckInDialog = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { profile } = useUser();
  const [hallName, setHallName] = useState('');
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [checkedInHalls, setCheckedInHalls] = useState([]);
  const hallCodeToNameMap = {
    BRO: 'Bromley',
    CHA: 'Chase',
    EVN: 'Evans',
    FER: 'Ferrin',
    FUL: 'Fulton',
    NYL: 'Nyland',
    TAV: 'Tavilla',
    WIL: 'Wilson',
    CON: 'Conrad',
    GRA: 'Grace',
    RID: 'Rider',
    MCI: 'MacInnis',
    village: 'The Village',
  };

  const [hallState, setHallState] = useState({
    BRO: false,
    CHA: false,
    EVN: false,
    FER: false,
    FUL: false,
    NYL: false,
    TAV: false,
    WIL: false,
    village: false,
  });

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  // Fetch check-in status and initialize hall data
  useEffect(() => {
    const fetchData = async () => {
      if (profile?.ID) {
        try {
          const isCheckedIn = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isCheckedIn);

          if (isCheckedIn) {
            const currentHalls = await getRACurrentHalls(profile.AD_Username);
            setHallState((prevState) => {
              const updatedState = { ...prevState };
              currentHalls.forEach((hall) => {
                updatedState[hall] = true;
              });
              return updatedState;
            });
          } else if (profile.hall) {
            setHallState((prevState) => ({
              ...prevState,
              [profile.hall]: true,
              village: ['CON', 'GRA', 'RID', 'MCI'].includes(profile.hall),
            }));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [profile?.ID]);

  useEffect(() => {
    const fetchData = async () => {
      if (profile?.ID) {
        try {
          const halls = await getRACurrentHalls(profile.AD_Username);
          setCheckedInHalls(halls);
        } catch (error) {
          console.error('Error fetching checked-in halls:', error);
        }
      }
    };
    fetchData();
  }, [profile?.ID]);

  const handleConfirm = () => {
    setConfirmOpen(true);

    let tempName = '';

    for (let hall in hallState) {
      if (hallState[hall] && hall !== 'village' && !checkedInHalls.includes(hall)) {
        // Map hall codes to names using the mapping object
        const hallName = hallCodeToNameMap[hall];
        tempName = tempName ? `${tempName}, ${hallName}` : hallName;
      }
    }

    setHallName(tempName);
  };

  const handleSubmit = async () => {
    const selectedHallCodes = Object.keys(hallState).filter(
      (hall) => hallState[hall] && hall !== 'village' && !checkedInHalls.includes(hall),
    ); //exclude village for checkin

    if (!profile?.ID || selectedHallCodes.length === 0) {
      createSnackbar(
        'Please select a hall and ensure profile information is loaded before checking in.',
        'warning',
      );
      return;
    }

    try {
      await submitCheckIn(profile.ID, selectedHallCodes);
      setCheckedIn(true);
      setConfirmOpen(false);
      setOpen(false);
      createSnackbar(`Successfully checked into ${hallName}`, 'success');
    } catch (error) {
      console.error('Error checking in:', error);
      createSnackbar('Failed to check in. Please try again.', 'error');
    }
  };

  useEffect(() => {
    var check = false;
    for (let hall in hallState) {
      if (hallState[hall]) {
        check = true;
        break;
      }
    }
    setIsChecked(check);
  }, [hallState]);

  const { BRO, CHA, EVN, FER, FUL, NYL, TAV, WIL, village } = hallState;

  const handleHallChecked = (event) => {
    const { name, checked } = event.target;

    setHallState((prevState) => {
      const updatedState = { ...prevState, [name]: checked };

      //when village checked mark needed halls
      if (name === 'village' && checked) {
        updatedState.CON = true;
        updatedState.GRA = true;
        updatedState.RID = true;
        updatedState.MCI = true;
      }

      if (name === 'village' && !checked) {
        updatedState.CON = false;
        updatedState.GRA = false;
        updatedState.RID = false;
        updatedState.MCI = false;
      }

      return updatedState;
    });
  };

  return (
    <Grid container item justifyContent="center" alignItems="center">
      <Grid item xs={12} md={4}>
        <Button variant="contained" fullWidth={true} onClick={() => setOpen(true)}>
          {isCheckedIn ? 'check in to additional Halls?' : 'Check In To Your Shift'}
        </Button>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={open}
            onClose={() => setOpen(false)}
            title={'Choose Which Hall to Check Into'}
            buttonName="Check In"
            buttonClicked={handleConfirm}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setOpen(false)}
          >
            <Grid item>
              <FormControl required={true}>
                <FormLabel error>Select a Hall</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    key="BRO"
                    checked={BRO}
                    disabled={checkedInHalls?.includes('BRO')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Bromley"
                    name="BRO"
                  />
                  <FormControlLabel
                    key="CHA"
                    checked={CHA}
                    disabled={checkedInHalls?.includes('CHA')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Chase"
                    name="CHA"
                  />
                  <FormControlLabel
                    key="EVN"
                    checked={EVN}
                    disabled={checkedInHalls?.includes('EVN')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Evans"
                    name="EVN"
                  />
                  <FormControlLabel
                    key="FER"
                    checked={FER}
                    disabled={checkedInHalls?.includes('FER')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Ferrin"
                    name="FER"
                  />
                  <FormControlLabel
                    key="FUL"
                    checked={FUL}
                    disabled={checkedInHalls?.includes('FUL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Fulton"
                    name="FUL"
                  />
                  <FormControlLabel
                    key="NYL"
                    checked={NYL}
                    disabled={checkedInHalls?.includes('NYL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Nyland"
                    name="NYL"
                  />
                  <FormControlLabel
                    key="TAV"
                    checked={TAV}
                    disabled={checkedInHalls?.includes('TAV')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Tavilla"
                    name="TAV"
                  />
                  <FormControlLabel
                    key="WIL"
                    checked={WIL}
                    disabled={checkedInHalls?.includes('WIL')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Wilson"
                    name="WIL"
                  />
                  <FormControlLabel
                    key="village"
                    checked={village}
                    disabled={checkedInHalls?.includes('village')}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="The Village"
                    name="village"
                  />
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
                NOTE: You are checking into {hallName || 'Unknown Hall'} to be on duty. Is this what
                you meant to do?
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

export default CheckInDialog;
