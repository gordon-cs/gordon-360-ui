import { useIsAuthenticated } from '@azure/msal-react';
import { Grid } from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useNetworkStatus } from 'hooks';
import { useEffect, useState } from 'react';
// import storageService from 'services/storage';
import AdminList from './components/AdminList';
import InvolvementStatusList from './components/InvolvementsStatus';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) {
      // setIsAdmin(storageService.getLocalInfo().college_role === 'god');
      setIsAdmin(true);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <GordonUnauthorized feature={'the admin page'} />;
  }

  if (!isOnline) {
    return <GordonOffline feature="Editing Administrators" />;
  }

  if (isAdmin) {
    return (
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} lg={8}>
          <InvolvementStatusList status={'Open'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <InvolvementStatusList status={'Closed'} />
        </Grid>

        <Grid item xs={12} lg={8}>
          <AdminList />
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Admin;
