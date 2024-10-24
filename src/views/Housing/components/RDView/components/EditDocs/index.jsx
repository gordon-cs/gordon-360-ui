import { ListItemText, List, ListItem, Link } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import UpdateTasks from '../UpdateTasks';
import { Link as RouterLink } from 'react-router-dom';

const EditDocs = () => (
  <Typography>
    <List>
      <ListItem>
        <Grid>
          <ListItemText primary="RA/AC Task List" />
        </Grid>
        <Grid item>
          <UpdateTasks />
        </Grid>
      </ListItem>
      <ListItem>
        <Link
          href="https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration"
          underline="hover"
          className="gc360_text_link"
          target="_blank"
        >
          <ListItemText primary="Sharepoint" />
        </Link>
      </ListItem>
      <ListItem>
        <RouterLink to="/RoomRanges" className="gc360_text_link" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Room Ranges" />
        </RouterLink>
      </ListItem>
      <ListItem>
        <Link
          href="https://groups.gordon.edu"
          underline="hover"
          className="gc360_text_link"
          target="_blank"
        >
          <ListItemText primary="RA/AC Access" />
        </Link>
      </ListItem>
    </List>
  </Typography>
);

export default EditDocs;
