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
import { checkIfCheckedIn, submitCheckIn } from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';

const RAView = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { profile } = useUser();

  const [hallName, setHallName] = useState('');

  // Fetch check-in status and initialize hall data
  useEffect(() => {
    const fetchData = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);

          if (profile.hall) {
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
      await submitCheckIn(profile.ID, selectedHallCodes);
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
