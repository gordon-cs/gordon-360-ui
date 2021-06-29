import React, { useState, useCallback } from 'react';
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
import { Grid } from '@material-ui/core';
import GordonSnackbar from 'components/Snackbar';
import useNetworkStatus from 'hooks/useNetworkStatus';

const Profile = ({ profile, myProf }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';
  const isPolice = user.getLocalInfo().college_role === 'gordon police';

  const createSnackbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  return (
    <Grid container justify="center" spacing={2}>
      <Grid
        item
        xs={12}
        md={myProf && profile.PersonType?.includes('stu') ? 8 : 12}
        lg={myProf && profile.PersonType?.includes('stu') ? 6 : 10}
      >
        <Identification
          profile={profile}
          network={network}
          myProf={myProf}
          createSnackbar={createSnackbar}
        />
      </Grid>

      {myProf && profile.PersonType?.includes('stu') && (
        <Grid item xs={12} md={4}>
          <VictoryPromiseDisplay network={network} />
        </Grid>
      )}

      <Grid item xs={12} lg={10} align="center">
        <SchedulePanel profile={profile} myProf={myProf} network={network} />
      </Grid>

      <Grid item xs={12} lg={5}>
        <Grid container spacing={2}>
          <OfficeInfoList profile={profile} />
          <PersonalInfoList
            profile={profile}
            myProf={myProf}
            network={network}
            createSnackbar={createSnackbar}
          />
          {isPolice ? <EmergencyInfoList username={profile.AD_Username} /> : null}
        </Grid>
      </Grid>

      <Grid item xs={12} lg={5}>
        <MembershipsList
          user={myProf ? profile.ID : profile.AD_Username}
          myProf={myProf}
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
