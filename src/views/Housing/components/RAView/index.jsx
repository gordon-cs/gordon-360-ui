import {
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import TaskList from './components/TaskList';
import Schedule from './components/Schedule';
import { React, useEffect, useState } from 'react';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import http from '../../../../../../gordon-360-ui(Main)/src/services/http';
import { useUser } from 'hooks';

const RAView = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { profile } = useUser();

  const [hallName, setHallName] = useState('');

  // check if the RA is currently checked in
  const checkIfCheckedIn = async () => {
    try {
      const data = await http.get(`Housing/is-on-call/${profile.ID}`);
      console.log('API Response:', data);

      if (data && typeof data.IsOnCall === 'boolean') {
        setCheckedIn(data.IsOnCall);
      } else {
        console.warn('Unexpected API response structure:', data);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  // Auto select a hall on checkin prompt based on RA housing
  const initializeHallFromProfile = () => {
    if (profile?.hall) {
      console.log('RA Living Hall from Profile:', profile.hall);

      setHallState((prevState) => {
        const isVillageDorm = ['CON', 'GRA', 'RID', 'MCI'].includes(profile.hall); // Check if the hall is part of the village

        return {
          ...prevState,
          [profile.hall]: true, // Automatically check off the specific hall
          village: isVillageDorm, // Check off "village" if the hall is part of it
        };
      });
    } else {
      console.warn('No HallCode found in profile.');
    }
  };

  useEffect(() => {
    if (profile?.ID) {
      checkIfCheckedIn();
      initializeHallFromProfile();
    }
  }, [profile?.ID]);

  const handleConfirm = () => {
    setConfirmOpen(true);

    var tempName = '';

    for (let hall in hallState) {
      if (hallState[hall] && tempName == '' && hall !== 'village') {
        //exclude village, use actual building codes
        tempName = hall.charAt(0).toUpperCase() + hall.slice(1);
      } else if (hallState[hall] && tempName != '' && hall !== 'village') {
        tempName = tempName + ', ' + hall.charAt(0).toUpperCase() + hall.slice(1);
      } else {
        continue;
      }
    }

    setHallName(tempName);
  };

  const handleSubmit = async () => {
    const selectedHallCodes = Object.keys(hallState).filter(
      (hall) => hallState[hall] && hall !== 'village',
    ); //exclude village for checkin

    if (!profile?.ID || selectedHallCodes.length === 0) {
      alert('Please select a hall and ensure profile information is loaded before checking in.');
      return;
    }

    try {
      await http.post('Housing/ra-checkin', {
        RA_ID: profile.ID,
        Hall_ID: selectedHallCodes, // Send hall codes to the API
      });
      setCheckedIn(true);
      setConfirmOpen(false);
      setOpen(false);
      alert(`Successfully checked into ${hallName}`);
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Failed to check in. Please try again.');
    }
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
    <Grid container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TaskList />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title={'Helpful Links'} className="gc360_header" />
            <CardContent>
              <Typography>
                <List>
                  <ListItem>Work Requests (needs link)</ListItem>
                  <ListItem>Forms (needs link)</ListItem>
                  <ListItem>Resident List (needs link)</ListItem>
                </List>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4} padding={1}>
        <Button variant="contained" onClick={() => setOpen(true)} disabled={isCheckedIn}>
          {isCheckedIn ? 'You Are Checked In To Your Shift' : 'Check In To Your Shift'}
        </Button>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={open}
            onClose={() => setOpen(false)}
            title={'Choose Which Hall to Check Into'}
            isButtonDisabled={!isChecked}
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
                    checked={BRO}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Bromley"
                    name="BRO"
                  />
                  <FormControlLabel
                    checked={CHA}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Chase"
                    name="CHA"
                  />
                  <FormControlLabel
                    checked={EVN}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Evans"
                    name="EVN"
                  />
                  <FormControlLabel
                    checked={FER}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Ferrin"
                    name="FER"
                  />
                  <FormControlLabel
                    checked={FUL}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Fulton"
                    name="FUL"
                  />
                  <FormControlLabel
                    checked={NYL}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Nyland"
                    name="NYL"
                  />
                  <FormControlLabel
                    checked={TAV}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Tavilla"
                    name="TAV"
                  />
                  <FormControlLabel
                    checked={WIL}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Wilson"
                    name="WIL"
                  />
                  <FormControlLabel
                    checked={village}
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
                NOTE: You are checking into {hallName} to be on duty. Is this what you meant to do?
              </Typography>
            </Grid>
          </GordonDialogBox>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
      <Schedule />
    </Grid> */}
    </Grid>
  );
};

export default RAView;
