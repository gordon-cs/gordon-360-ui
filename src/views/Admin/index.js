import React, { useEffect, useState } from 'react';
import InvolvementsStatus from './components/InvolvementsStatus';
import SuperAdmin from './components/SuperAdmins';
import user from 'services/user';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import useNetworkStatus from 'hooks/useNetworkStatus';

const Admin = ({ authentication }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    setIsSuperAdmin(user.getLocalInfo().college_role === 'god');
  }, [authentication]);

  if (authentication) {
    if (isOnline) {
      if (isSuperAdmin) {
        return (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} lg={8}>
              <InvolvementsStatus status={'Open'} />
            </Grid>

            <Grid item xs={12} lg={8}>
              <InvolvementsStatus status={'Closed'} />
            </Grid>

            <Grid item xs={12} lg={8}>
              <SuperAdmin />
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
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent
              style={{
                margin: 'auto',
                textAlign: 'center',
              }}
            >
              <h1>You are not logged in.</h1>
              <br />
              <h4>You must be logged in to view this page.</h4>
              <br />
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  window.location.pathname = '';
                }}
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
};

export default Admin;
