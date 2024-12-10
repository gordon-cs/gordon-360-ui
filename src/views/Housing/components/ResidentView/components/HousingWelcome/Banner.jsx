import { useEffect, useState } from 'react';
import { staffType } from 'views/Housing/utils/staffType/staffType';
import { useUser } from 'hooks';
import { Box, Grid, Typography } from '@mui/material';
import { useAuthGroups } from 'hooks';
import { AuthGroup } from 'services/auth';

const HousingBanner = () => {
  const [staffTypeLabel, setStaffTypeLabel] = useState('');
  const { profile } = useUser();
  const [roleMessage, setRoleMessage] = useState('');
  const isRA = useAuthGroups(AuthGroup.ResidentAdvisor);

  useEffect(() => {
    if (profile) {
      const hallID = profile.OnCampusBuilding;
      setStaffTypeLabel(staffType[hallID] || 'N/A');
    }
  }, [profile]);

  useEffect(() => {
    if (profile) {
      if (isRA) {
        setRoleMessage(
          'Check in to your shift, set your preferred contact method, and view available resources',
        );
      } else {
        setRoleMessage(
          `View your ${staffTypeLabel} details, on-duty schedules, and available housing resources.`,
        );
      }
    }
  }, [profile, staffTypeLabel, isRA]);

  return (
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
          {roleMessage}
        </Typography>
      </Box>
    </Grid>
  );
};

export default HousingBanner;
