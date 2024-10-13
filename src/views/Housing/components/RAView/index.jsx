import {
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
import { React, useEffect, useState } from 'react';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';

const RAView = () => (
  <>
    <TaskList />
    <Grid Container>
      <Grid item>
        <Card>
          <CardHeader title={`Helpful Links`} className="gc360_header" />
          <CardContent>
            <List>
              <ListItem>Work Requests (needs link)</ListItem>
              <ListItem>Forms (needs link)</ListItem>
              <ListItem>Resident List (needs link)</ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </>
);

export default RAView;
