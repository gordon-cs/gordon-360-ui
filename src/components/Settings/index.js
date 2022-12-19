import { Grid } from '@material-ui/core';
import Profile from 'components/Profile';
import GordonSnackbar from 'components/Snackbar';
import { useAuthGroups } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useCallback, useEffect, useState } from 'react';
import { AuthGroup } from 'services/auth';
import { ProfileOptions } from './components';

const Settings = ({ setting, myProf }) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const isOnline = useNetworkStatus();

  const createSnakbar = useCallback((message, severity) => {
    setSnackbar({ message, severity, open: true });
  }, []);

  return (
    <Grid container justifyContent="center" spacing={2}>
      <Grid item xs={12} md={myProf ? 16 : 24} lg={myProf ? 12 : 20}>
        <ProfileOptions isOnline={isOnline} createSnackbar={createSnakbar} myProf={myProf} />
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

export default Settings;
