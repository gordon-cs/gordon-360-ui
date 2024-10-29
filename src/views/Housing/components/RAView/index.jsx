import {
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import TaskList from './components/TaskList';
import Schedule from './components/Schedule';
import { React, useEffect, useState } from 'react';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';

const RAView = () => (
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
      <Button variant="contained">Check-In To Your Shift</Button>
    </Grid>

    <Grid item xs={12}>
      <Schedule />
    </Grid>
  </Grid>
);

export default RAView;
