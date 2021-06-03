import React, { useEffect, useState } from 'react';
import InvolvementStatusList from './components/InvolvementsStatus';
import AdminList from './components/SuperAdmins';
import user from 'services/user';
import { Button, Grid, Card, CardContent } from '@material-ui/core';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import useNetworkStatus from 'hooks/useNetworkStatus';

const Admin = ({ authentication }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    setIsAdmin(user.getLocalInfo().college_role === 'god');
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
