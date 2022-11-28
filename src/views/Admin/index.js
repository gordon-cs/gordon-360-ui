import { useIsAuthenticated } from '@azure/msal-react';
import { Card, CardHeader, Grid, Link, Typography } from '@mui/material';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useAuthGroups, useNetworkStatus } from 'hooks';
import { AuthGroup } from 'services/auth';
// import storageService from 'services/storage';
import styles from './Admin.module.css';
import CliftonStrengthsUpload from './components/CliftonStrengthsUpload';
import InvolvementStatusList from './components/InvolvementsStatus';

const Admin = () => {
  const isAdmin = useAuthGroups(AuthGroup.SiteAdmin);
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();

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
          <CliftonStrengthsUpload />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader title="Site Admins" align="center" class={styles.cardheader} />
            <Grid container justifyContent="center">
              <Typography variant="p">
                Visit{' '}
                <Link href="https://groups.gordon.edu/group/360-SiteAdmin-SG" target="_blank">
                  groups.gordon.edu
                </Link>{' '}
                to view and make changes.
              </Typography>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default Admin;
