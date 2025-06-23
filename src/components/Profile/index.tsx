import { Grid, AlertColor } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { Profile as profileType, isFacStaff as checkIsFacStaff } from 'services/user';
import { useAuthGroups } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useCallback, useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import scheduleService from 'services/schedule';
import user from 'services/user';
import {
  EmergencyInfoList,
  Identification,
  MembershipsList,
  OfficeInfoList,
  PersonalInfoList,
  SchedulePanel,
  VictoryPromise,
} from './components';
import { useLocation } from 'react-router-dom';

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

const Profile = ({ profile: propsProfile, myProf }: Props) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    severity: '',
    open: false,
  });
  const [profile, setProfile] = useState<profileType>(propsProfile);

  const isOnline = useNetworkStatus();
  const viewerIsPolice = useAuthGroups(AuthGroup.Police);
  const [canReadStudentSchedules, setCanReadStudentSchedules] = useState<boolean>();
  const profileIsStudent = profile.PersonType?.includes('stu');
  const location = useLocation();

  const createSnackbar = useCallback(
    (message: string, severity: AlertColor, link?: string, linkText?: string) => {
      setSnackbar({ message, severity, open: true, link, linkText }); // Include the link property
    },
    [],
  );

  const fetchProfile = async () => {
    const updatedProfile = await user.getProfileInfo(profile.AD_Username);
    if (updatedProfile) setProfile(updatedProfile);
  };

  useEffect(() => {
    // Refetch profile whenever the location changes (i.e., user navigates back)
    fetchProfile();
    // eslint-disable-next-line
  }, [location.pathname]);

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
          fetchProfile={fetchProfile}
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

      {(myProf || !profileIsStudent || canReadStudentSchedules) && (
        <Grid item xs={12} lg={10}>
          <SchedulePanel profile={profile} myProf={myProf} />
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
        severity={snackbar.severity as AlertColor}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        link={snackbar.link}
        linkText={snackbar.linkText} // Pass the link property to the snackbar
      />
    </Grid>
  );
};

export default Profile;
