import { Grid } from '@material-ui/core';
import Profile from 'components/Profile';
import GordonSnackBar from 'components/Snackbar';
import { useAuthGroups } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useCallback, useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import { ProfileOptions } from './components';

const Settings = ({ setting, myProf }) => {
  const [snakbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';

  const createSnakbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={myProf ? 16 : 24} lg={myProf ? 12 : 20}>
        <ProfileOptions />
      </Grid>
    </Grid>
  );
};

export default Settings;
