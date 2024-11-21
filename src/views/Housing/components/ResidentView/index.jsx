import { Box, Card, Grid } from '@mui/material';

// Components for Resident View
import MyHall from './components/MyHall';
import MyRAC from './components/MyRA';
import OnDuty from './components/OnDuty';
import Resources from './components/Resources';

const ResidentView = () => (
  <Grid
    container
    spacing={3} // Increase spacing between sections
    padding={3} // Add padding around the container
  >
    {/* OnDuty and MyHall Section */}
    <Grid item xs={12} md={4}>
      <Card>
        <OnDuty />
      </Card>
      <Box mt={3} /> {/* Increase space between cards */}
      <Card>
        <MyHall />
      </Card>
    </Grid>

    {/* Responsive spacer between MyHall and MyRAC */}
    <Grid item xs={false} md={4} lg={4} xl={4} />

    {/* MyRAC Section */}
    <Grid item xs={12} md={4}>
      <Card>
        <MyRAC />
      </Card>
    </Grid>
    {/* Resources Section */}
    <Grid item xs={12}>
      <Resources />
    </Grid>
  </Grid>
);

export default ResidentView;
