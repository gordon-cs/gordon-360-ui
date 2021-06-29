import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonUnauthorized from 'components/GordonUnauthorized';
import InvolvementStatusList from './components/InvolvementsStatus';
import AdminList from './components/AdminList';
import user from 'services/user';
import { AuthError } from 'services/error';
import GordonOffline from 'components/GordonOffline';

const Admin = ({ authentication }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    try {
      setIsAdmin(user.getLocalInfo().college_role === 'god');
    } catch (error) {
      if (error instanceof AuthError) {
        // Unauthorized exception expected when user not authenticated
      } else {
        throw error;
      }
    }
  }, [authentication]);

  if (authentication) {
    if (isOnline) {
      if (isAdmin) {
        return (
          <Grid container justify="center" spacing={2}>
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
