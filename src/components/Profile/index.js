import React from 'react';

import {
  Identification,
  MembershipsList,
  OfficeInfoList,
  PersonalInfoList,
  SchedulePanel,
  VictoryPromiseDisplay,
} from './components';
import { Grid } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';

const Profile = ({ profile, myProf }) => {
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';

  return (
    <Grid container justify="center" spacing={2}>
      <Grid
        item
        xs={12}
        md={myProf && profile.PersonType?.includes('stu') ? 8 : 12}
        lg={myProf && profile.PersonType?.includes('stu') ? 6 : 10}
      >
        <Identification profile={profile} network={network} myProf={myProf} />
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
          <PersonalInfoList profile={profile} myProf={myProf} network={network} />
        </Grid>
      </Grid>

      <Grid item xs={12} lg={5}>
        <MembershipsList user={myProf ? profile.ID : profile.AD_Username} myProf={myProf} />
      </Grid>
    </Grid>
  );
};

export default Profile;
