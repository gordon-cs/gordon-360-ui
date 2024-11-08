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

const RAView = () => {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [hallName, setHallName] = useState('');

  const handleConfirm = () => {
    setConfirmOpen(true);

    var tempName = '';

    for (let hall in hallState) {
      if (hallState[hall] && tempName == '') {
        tempName = hall.charAt(0).toUpperCase() + hall.slice(1);
      } else if (hallState[hall] && tempName != '') {
        tempName = tempName + ', ' + hall.charAt(0).toUpperCase() + hall.slice(1);
      } else {
        continue;
      }
    }

    setHallName(tempName);
  };

  const handleSubmit = (event) => {
    setCheckedIn({ ...isCheckedIn, [event.target.name]: event.target.value });
    // isCheckedIn will need to be updated by the API later...
    setConfirmOpen(false);
    setOpen(false);
  };

  const [hallState, setHallState] = useState({
    bromley: false,
    chase: false,
    evans: false,
    ferrin: false,
    fulton: false,
    nyland: false,
    tavilla: false,
    wilson: false,
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

  const { bromley, chase, evans, ferrin, fulton, nyland, tavilla, wilson, village } = hallState;

  const handleHallChecked = (event) => {
    setHallState({
      ...hallState,
      [event.target.name]: event.target.checked,
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
            <CardHeader title={`Helpful Links`} className="gc360_header" />
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
                    checked={bromley}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Bromley"
                    name="bromley"
                  />
                  <FormControlLabel
                    checked={chase}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Chase"
                    name="chase"
                  />
                  <FormControlLabel
                    checked={evans}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Evans"
                    name="evans"
                  />
                  <FormControlLabel
                    checked={ferrin}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Ferrin"
                    name="ferrin"
                  />
                  <FormControlLabel
                    checked={fulton}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Fulton"
                    name="fulton"
                  />
                  <FormControlLabel
                    checked={nyland}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Nyland"
                    name="nyland"
                  />
                  <FormControlLabel
                    checked={tavilla}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Tavilla"
                    name="tavilla"
                  />
                  <FormControlLabel
                    checked={wilson}
                    control={<Checkbox />}
                    onChange={handleHallChecked}
                    label="Wilson"
                    name="wilson"
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
