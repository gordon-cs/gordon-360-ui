import { Card, CardContent, CardHeader, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import MyHall from '../ResidentView/components/MyHall/index';
import { useEffect, useState } from 'react';
import { checkIfCheckedIn } from 'services/residentLife/RA_Checkin';
import { useUser } from 'hooks';
import HousingBanner from '../ResidentView/components/HousingWelcome/Banner';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';
import TaskList from './components/TaskList';
import OnDutyRD from './components/RD-OnCall';
import StatusCard from './components/StatusCard';

const RAView = () => {
  const { profile } = useUser();
  const [isCheckedIn, setCheckedIn] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchIsCheckedIn = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchIsCheckedIn();
  }, [profile?.ID]);

  const OnCallTable = () => {
    return (
      <Grid item xs={12} md={12}>
        <Card sx={{ width: '100%' }}>
          <CardHeader
            title={
              <Grid container direction="row" alignItems="center">
                <Grid item xs={12} align="center">
                  RA/AC On-Duty by Hall
                </Grid>
              </Grid>
            }
            className="gc360_header"
          />
          <CardContent>
            <OnDutyMobile />
          </CardContent>
        </Card>
      </Grid>
    );
  };

  if (isMobile) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <MyHall />
            <OnDutyRD />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <OnCallTable />
            <StatusCard />
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <TaskList />
          </Stack>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container item spacing={2}>
      <HousingBanner />

      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <OnDutyRD />
          <OnCallTable />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <MyHall />
          <StatusCard />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <TaskList />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RAView;
