import { Box, Card, Grid, Typography, CardContent } from '@mui/material';
import { useUser } from 'hooks';
import HousingBanner from './components/HousingWelcome/Banner';

// Components for Resident View
import MyHall from './components/MyHall';
import MyRAC from './components/MyRA';
import OnDuty from './components/OnDuty';
import Resources from './components/Resources';

const ResidentView = () => {
  const { loading } = useUser();

  // Show loading state if profile is not yet loaded
  if (loading) {
    return (
      <Typography align="center" color="textSecondary">
        Loading your hall details...
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} padding={3}>
      {/* Page Header */}
      <HousingBanner />

      {/* Horizontal Card Section for OnDuty, MyHall, and MyRA */}
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          {/* OnDuty */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <OnDuty />
              </CardContent>
            </Card>
          </Grid>
          {/* MyHall */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <MyHall />
              </CardContent>
            </Card>
          </Grid>
          {/* MyRAC */}
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <MyRAC />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box mt={6} />
      </Grid>

      {/* Resources Section */}
      <Grid item xs={12}>
        <Box mt={2}>
          <Resources />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ResidentView;
