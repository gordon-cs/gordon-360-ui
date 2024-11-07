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
  Grid,
  Typography,
} from '@mui/material';
import TaskList from './components/TaskList';
import Schedule from './components/Schedule';
import { React, useEffect, useState } from 'react';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';

const RAView = () => {
  const [isCheckedIn, updateCheckedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const handleSubmit = () => {
    updateCheckedIn(true);
    setOpen(false);
  };

  const [hallState, setHallState] = useState({
    village: false,
    conrad: false,
  });

  const handleHallChecked = (event) => {
    setHallState({
      ...hallState,
      [event.target.name]: event.target.checked,
    });
  };

  const { village, conrad } = hallState;

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
          {isCheckedIn ? 'You Are Checked In To Your Shift' : 'Check-In To Your Shift'}
        </Button>
        <Grid item xs={12} md={4} padding={1}>
          <GordonDialogBox
            open={open}
            onClose={() => setOpen(false)}
            title={'Choose Which Hall to Check Into'}
            buttonName="Check In"
            buttonClicked={handleSubmit}
            cancelButtonName="CANCEL"
            cancelButtonClicked={() => setOpen(false)}
          >
            <Grid item>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Bromley" />
                <FormControlLabel control={<Checkbox />} label="Chase" />
                <FormControlLabel control={<Checkbox />} label="Evans" />
                <FormControlLabel control={<Checkbox />} label="Ferrin" />
                <FormControlLabel control={<Checkbox />} label="Fulton" />
                <FormControlLabel control={<Checkbox />} label="Nyland" />
                <FormControlLabel control={<Checkbox />} label="Tavilla" />
                <FormControlLabel control={<Checkbox />} label="Wilson" />
                <FormControlLabel
                  checked={village}
                  control={<Checkbox />}
                  onChange={handleHallChecked}
                  label="The Village"
                  name="village"
                />
                <FormControlLabel
                  checked={village ? village : conrad}
                  control={<Checkbox />}
                  onChange={handleHallChecked}
                  label="Conrad"
                  name="conrad"
                />
                <FormControlLabel checked={village} control={<Checkbox />} label="Grace" />
                <FormControlLabel checked={village} control={<Checkbox />} label="Hilton" />
                <FormControlLabel checked={village} control={<Checkbox />} label="Rider" />
                <FormControlLabel checked={village} control={<Checkbox />} label="McInnis" />
              </FormGroup>
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
