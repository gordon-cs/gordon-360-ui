import { Grid } from '@material-ui/core';
import GordonSnackbar from 'components/Snackbar';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useCallback, useEffect, useState } from 'react';
import scheduleService from 'services/schedule';
import user from 'services/user';
import {
  EmergencyInfoList,
  Identification,
  MembershipsList,
  OfficeInfoList,
  PersonalInfoList,
  SchedulePanel,
  VictoryPromiseDisplay,
} from './components';

const Profile = ({ profile, myProf }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';
  const viewerIsPolice = user.getLocalInfo().college_role === 'gordon police';
  const [canReadStudentSchedules, setCanReadStudentSchedules] = useState();
  const profileIsStudent = profile.PersonType?.includes('stu');

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  useEffect(() => {
    const fetchReadStudentSchedulesPermission = async () => {
      setCanReadStudentSchedules(await scheduleService.getCanReadStudentSchedules());
    };
    fetchReadStudentSchedulesPermission();
  });

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
          network={network}
          myProf={myProf}
          createSnackbar={createSnackbar}
        />
      </Grid>

      {myProf && profileIsStudent && (
        <Grid item xs={12} md={4}>
          <VictoryPromiseDisplay network={network} />
        </Grid>
      )}

      {(myProf || !profileIsStudent || canReadStudentSchedules) && (
        <Grid item xs={12} lg={10} align="center">
          <SchedulePanel profile={profile} myProf={myProf} network={network} />
        </Grid>
      )}

      <Grid item xs={12} lg={5}>
        <Grid container spacing={2}>
          <OfficeInfoList profile={profile} myProf={myProf} />
          <PersonalInfoList
            profile={profile}
            myProf={myProf}
            network={network}
            createSnackbar={createSnackbar}
          />
          {viewerIsPolice ? <EmergencyInfoList username={profile.AD_Username} /> : null}
        </Grid>
      </Grid>

      <Grid item xs={12} lg={5}>
        <MembershipsList
          user={myProf ? profile.ID : profile.AD_Username}
          myProf={myProf}
          PersonType={profile.PersonType}
          createSnackbar={createSnackbar}
        />
      </Grid>

      <GordonSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </Grid>
  );
};

export default Profile;
