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
  <Grid container>
    <Grid item xs={12} md={12} padding={1}>
      <Card sx={{ width: '100%' }}>
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
  </Grid>
);

export default TaskList;
