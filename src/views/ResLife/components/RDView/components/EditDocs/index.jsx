import { ListItemText, List, ListItem, Link } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EditDocs = () => (
  <Typography>
    <List>
      <ListItem></ListItem>
      <ListItem>
        <RouterLink to="/RoomRanges" className="gc360_text_link" style={{ textDecoration: 'none' }}>
          <ListItemText primary="Room Ranges" />
        </RouterLink>
      </ListItem>
    </List>
  </Typography>
);

export default EditDocs;
