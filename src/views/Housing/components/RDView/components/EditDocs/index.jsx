import { ListItemText, List, ListItem, Link } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import UpdateTasks from '../UpdateTasks';

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
        <Link
          href="http://127.0.0.1:5500/index.html"
          underline="hover"
          className="gc360_text_link"
          target="_blank"
        >
          <ListItemText primary="Room Ranges" />
        </Link>
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
