import { Card, CardContent, CardHeader, Grid, useMediaQuery, Stack } from '@mui/material';
import MyHall from '../ResidentView/components/MyHall/index';
import { useEffect, useState } from 'react';
import { checkIfCheckedIn } from 'services/residentLife/RA_Checkin';
import ContactMethod from './components/ContactMethod';
import { useUser } from 'hooks';
import HousingBanner from '../ResidentView/components/HousingWelcome/Banner';
import OnDutyMobile from '../RDView/components/OnDutyMobileView';
import TaskList from './components/TaskList';
import CheckIn from './components/CheckIn';

const RAView = () => {
  const { profile } = useUser();
  const [isCheckedIn, setCheckedIn] = useState(false);

  useEffect(() => {
    const fetchIsCheckdIn = async () => {
      if (profile?.ID) {
        try {
          const isChecked = await checkIfCheckedIn(profile.ID);
          setCheckedIn(isChecked);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchIsCheckdIn();
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

  return (
    <Grid container item spacing={2}>
      <HousingBanner />

      <Grid item xs={12} md={4}>
        <OnCallTable />
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <MyHall />
          <ContactMethod />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <TaskList />
      </Grid>
    </Grid>
  );
};

export default RAView;
