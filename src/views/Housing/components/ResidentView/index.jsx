import { Box, Card, Grid } from '@mui/material';

// Components for Resident View
import MyHall from './components/MyHall';
import MyRAC from './components/MyRAC';
import OnDuty from './components/OnDuty';
import Resources from './components/Resources';

const ResidentView = () => (
  <Grid container>
    <Box ml={5} /> {/* margin-left for all elements */}
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <OnDuty className="jsx" />
      </Card>
      <Box mt={5} /> {/* margin-top between OnDuty and MyHall cards */}
      <Card>
        <MyHall className="jsx" />
      </Card>
    </Grid>
    <Box mr={50} /> {/* margin-right of 35 between My Hall and MyRA cards */}
    <Grid item xs={12} md={4} padding={1}>
      <Card>
        <MyRAC className="jsx" />
      </Card>
    </Grid>
    <Box padding={4} /> {/* margin-top between MyRA and Resources cards */}
    <Resources className="jsx" />
  </Grid>
);

export default ResidentView;
