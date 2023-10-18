import { Grid } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useAuthGroups } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useCallback, useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import scheduleService from 'services/schedule';
import {
  EmergencyInfoList,
  Identification,
  MembershipsList,
  OfficeInfoList,
  PersonalInfoList,
  SchedulePanel,
  VictoryPromise,
} from './components';

const Profile = ({ profile, myProf }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isOnline = useNetworkStatus();
  const viewerIsPolice = useAuthGroups(AuthGroup.Police);
  const [canReadStudentSchedules, setCanReadStudentSchedules] = useState();
  const profileIsStudent = profile.PersonType?.includes('stu');

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    scheduleService.getCanReadStudentSchedules().then(setCanReadStudentSchedules);
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid
        item
        xs={12}
        md={myProf && profileIsStudent ? 8 : 12}
        lg={myProf && profileIsStudent ? 6 : 10}
      >
        <Identification
          profile={profile}
          isOnline={isOnline}
          myProf={myProf}
          createSnackbar={createSnackbar}
        />
      </Grid>

      {myProf && profileIsStudent && (
        <Grid item xs={12} md={4}>
          <VictoryPromise />
        </Grid>
      )}

      <Grid item xs={12} lg={10}>
        <Grid container spacing={2}>
          <OfficeInfoList profile={profile} myProf={myProf} />

          {viewerIsPolice ? <EmergencyInfoList username={profile.AD_Username} /> : null}
        </Grid>
      </Grid>

      {/* Schedule is visible when:
          1. on my profile
          2. profile belongs to fac/staff
          3. the viewer has permission to view other's schedules
      */}
      {(myProf || profile.PersonType?.includes('fac') || canReadStudentSchedules) && (
        <Grid item xs={12} lg={10} align="center">
          <SchedulePanel profile={profile} myProf={myProf} isOnline={isOnline} />
        </Grid>
      )}

      <Grid item xs={12} lg={5}>
        <Grid container spacing={2}>
          <PersonalInfoList
            profile={profile}
            myProf={myProf}
            isOnline={isOnline}
            createSnackbar={createSnackbar}
          />
          {viewerIsPolice ? <EmergencyInfoList username={profile.AD_Username} /> : null}
        </Grid>
      </Grid>

      <Grid item xs={12} lg={5}>
        <MembershipsList
          username={profile.AD_Username}
          myProf={myProf}
          PersonType={profile.PersonType}
          createSnackbar={createSnackbar}
        />
      </Grid>

      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Grid>
  );
};

export default Profile;
