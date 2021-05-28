import React, { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import user from 'services/user';
import Profile from 'components/Profile';

import { Button, Card, CardContent, Grid } from '@material-ui/core';

const MyProfile = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        setProfile(await user.getProfileInfo());
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }

    if (authentication) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [authentication]);

  // AUTHENTICATED
  if (authentication) {
    if (loading) {
      return <GordonLoader />;
    } else {
      return <Profile profile={profile} myProf />;
    }
  }
  // NOT AUTHENTICATED
  else {
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
              <h4>You must be logged in to view your profile.</h4>
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

export default MyProfile;
