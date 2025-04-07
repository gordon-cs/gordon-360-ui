import { ListItemText, List, ListItem, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PhoneNumberEditor from '../EditPhones';

const EditDocs = () => (
  <Grid container direction="column" spacing={2}>
    <Grid item>
      <Typography>
        <List>
          <ListItem></ListItem>
          <ListItem>
            <RouterLink
              to="roomranges"
              className="gc360_text_link"
              style={{ textDecoration: 'none' }}
            >
              <ListItemText primary="Room Ranges" />
            </RouterLink>
          </ListItem>
          <ListItem>
            <RouterLink
              to="tasklist"
              className="gc360_text_link"
              style={{ textDecoration: 'none' }}
            >
              <ListItemText primary="RA On-Duty Task Manager" />
            </RouterLink>
          </ListItem>
          <ListItem>
            <RouterLink
              to="rd-oncall"
              className="gc360_text_link"
              style={{ textDecoration: 'none' }}
            >
              <ListItemText primary="RD On-Call Scheduler" />
            </RouterLink>
          </ListItem>
          <ListItem>
            <PhoneNumberEditor />
          </ListItem>
        </List>
      </Typography>
    </Grid>
  </Grid>
);

export default EditDocs;
