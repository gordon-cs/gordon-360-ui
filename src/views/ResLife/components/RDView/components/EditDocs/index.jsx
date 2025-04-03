import { ListItemText, List, ListItem } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EditDocs = () => (
  <Typography>
    <List>
      <ListItem></ListItem>
      <ListItem>
        <RouterLink to="roomranges" className="gc360_text_link" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Room Ranges" />
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink to="tasklist" className="gc360_text_link" style={{ textDecoration: 'none' }}>
          <ListItemText primary="RA On-Duty Task Manager" />
        </RouterLink>
      </ListItem>
      <ListItem>
        <RouterLink to="rd-oncall" className="gc360_text_link" style={{ textDecoration: 'none' }}>
          <ListItemText primary="RD On-Call Scheduler" />
        </RouterLink>
      </ListItem>
    </List>
  </Typography>
);

export default EditDocs;
