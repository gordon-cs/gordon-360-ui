import { Box, Card, CardContent, CardHeader, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ContactMethod from 'views/ResLife/components/RAView/components/ContactMethod';

const StatusCard = () => (
  <Card>
    <CardHeader align="center" title={'Availability Preferences '} className="gc360_header" />
    <CardContent>
      <Typography>
        <RouterLink
          to="statusmanager"
          className="gc360_text_link"
          style={{ textDecoration: 'none' }}
        >
          <ListItemText primary="Create Status Schedule" />
        </RouterLink>
        <Box mb="2vh"></Box>
        <ContactMethod />
      </Typography>
    </CardContent>
  </Card>
);

export default StatusCard;
