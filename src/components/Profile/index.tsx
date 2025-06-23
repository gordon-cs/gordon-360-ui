import { Grid, AlertColor } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { Profile as profileType, isFacStaff as checkIsFacStaff } from 'services/user';
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

type Props = {
  profile: profileType;
  myProf: boolean;
};

type SnackbarState = {
  message: string;
  severity: string;
  open: boolean;
  link?: string;
  linkText?: string; // Add the optional link property
};

const Profile = ({ profile, myProf }: Props) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    severity: '',
    open: false,
  });

  const isOnline = useNetworkStatus();
  const viewerIsPolice = useAuthGroups(AuthGroup.Police);
  const [canReadStudentSchedules, setCanReadStudentSchedules] = useState<boolean>();
  const profileIsStudent = profile.PersonType?.includes('stu');
  const profileIsStaff = profile.Type == 'Staff'; // should we create an dict enum of the possible values?

  const createSnackbar = useCallback(
    (message: string, severity: AlertColor, link?: string, linkText?: string) => {
      setSnackbar({ message, severity, open: true, link, linkText }); // Include the link property
    },
    [],
  );

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

      {checkIsFacStaff(profile) && (
        <Grid item xs={12} lg={10}>
          <Grid container spacing={2}>
            <OfficeInfoList profile={profile} myProf={myProf} />

            {viewerIsPolice ? <EmergencyInfoList username={profile.AD_Username} /> : null}
          </Grid>
        </Grid>
      )}

      {
        // is it only faculty that have schedule? could we say if faculty instead here?
        <Grid item xs={12} lg={10}>
          <SchedulePanel profile={profile} myProf={myProf} />
        </Grid>
      }

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
        severity={snackbar.severity as AlertColor}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        link={snackbar.link}
        linkText={snackbar.linkText} // Pass the link property to the snackbar
      />
    </Grid>
  );
};

export default Profile;
