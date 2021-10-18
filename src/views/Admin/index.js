import { Grid } from '@material-ui/core';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useAuth, useNetworkStatus } from 'hooks';
import { useEffect, useState } from 'react';
import user from 'services/user';
import AdminList from './components/AdminList';
import InvolvementStatusList from './components/InvolvementsStatus';

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isOnline = useNetworkStatus();
  const authenticated = useAuth();

  useEffect(() => {
    if (authenticated) {
      setIsAdmin(user.getLocalInfo().college_role === 'god');
    }
  }, [authenticated]);

  if (authenticated) {
    if (isOnline) {
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
    } else {
      return <GordonOffline feature="Editing Administrators" />;
    }
  } else {
    return <GordonUnauthorized feature={'the admin page'} />;
  }
};

export default Admin;
