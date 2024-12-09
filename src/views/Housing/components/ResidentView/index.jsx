import { useState, useEffect } from 'react';
import { Box, Card, Grid, Typography, CardContent } from '@mui/material';
import { useUser } from 'hooks';
import { staffType } from '../../utils/staffType/staffType';

// Components for Resident View
import MyHall from './components/MyHall';
import MyRAC from './components/MyRA';
import OnDuty from './components/OnDuty';
import Resources from './components/Resources';

const ResidentView = () => {
  const [staffTypeLabel, setStaffTypeLabel] = useState('');
  const { profile } = useUser();

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      // Display either 'RA' or 'AC' depending on the resident's building
      setStaffTypeLabel(staffType[hallID] || 'N/A');
    }
  }, [profile]);

  // Show loading state if profile is not yet loaded
  if (!profile) {
    return (
      <Typography align="center" color="textSecondary">
        Loading your hall details...
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} padding={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <Box
          sx={{
            border: '2px solid',
            borderColor: 'secondary.main',
            borderRadius: 2,
            padding: 3,
            backgroundColor: 'background.paper',
          }}
        >
          <Typography variant="h4" align="center" color="secondary" gutterBottom>
            Welcome to the Resident Life Dashboard
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary">
            View your {staffTypeLabel} details, on-duty schedules, and available resources
          </Typography>
        </Box>
      </Grid>

      {/* Horizontal Card Section for OnDuty, MyHall, and MyRA */}
      <Grid item xs={12}>
        <Grid container spacing={3} justifyContent="center">
          {/* OnDuty */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <OnDuty />
              </CardContent>
            </Card>
          </Grid>
          {/* MyHall */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <MyHall />
              </CardContent>
            </Card>
          </Grid>
          {/* MyRAC */}
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
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
