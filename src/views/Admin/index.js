import React, { useEffect, useState } from 'react';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import GordonUnauthorized from 'components/GordonUnauthorized';
import InvolvementStatusList from './components/InvolvementsStatus';
import AdminList from './components/AdminList';
import user from 'services/user';
import { AuthError } from 'services/error';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';

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
      return (
        <Grid container justify="center" spacing="16">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <Grid
                  item
                  xs={2}
                  alignItems="center"
                  style={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <NoConnectionImage />
                </Grid>
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Revision of administrators has been deactivated due to loss of network.</h4>
                <br />
                <br />
                <Button
                  color="primary"
                  backgroundColor="white"
                  variant="outlined"
                  onClick={() => {
                    window.location.pathname = '';
                  }}
                >
                  Back To Home
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }
  } else {
    return <GordonUnauthorized feature={'the admin page'} />;
  }
};

export default Admin;
