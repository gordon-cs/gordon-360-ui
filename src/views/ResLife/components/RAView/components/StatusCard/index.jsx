import { Card, CardContent, CardHeader, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StatusCard = () => (
  <Card>
    <CardHeader align="center" title={'My Status Schedule '} className="gc360_header" />
    <CardContent>
      <Typography>
        <RouterLink
          to="statusmanager"
          className="gc360_text_link"
          style={{ textDecoration: 'none' }}
        >
          <ListItemText primary="Status Creator" />
        </RouterLink>
      </Typography>
    </CardContent>
  </Card>
);

export default StatusCard;
