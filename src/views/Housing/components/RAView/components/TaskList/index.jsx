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
import { React, useEffect, useState } from 'react';
import { ListItemIcon, ListItemText, ListSubheader, List, ListItem, Link } from '@mui/material';

// const [checked, setChecked] = useState(0);

// const handleTaskCheckOff = (value) => {
//   setChecked(value);
// };

const TaskList = () => (
  <Grid item xs={12} md={12} padding={0}>
    <Card>
      <CardHeader title={`On-Shift Tasks`} className="gc360_header" />
      <CardContent>
        <Typography>
          <List>
            <ListItem>
              <ListItemText>No tasks to see</ListItemText>
            </ListItem>
          </List>
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default TaskList;
