import React, { useState, useEffect } from 'react';
import GordonLoader from 'components/Loader';
import GordonSchedulePanel from 'components/ProfileInfo/SchedulePanel';
import Identification from 'components/ProfileInfo/Identification';
import MembershipsList from 'components/ProfileInfo/MembershipsList';
import OfficeInfoList from 'components/ProfileInfo/OfficeInfoList';
import PersonalInfoList from 'components/ProfileInfo/PersonalInfoList';
import user from 'services/user';
import VictoryPromiseDisplay from './Components/VictoryPromiseDisplay/index.js';
import './myProfile.css';

import { Button, Card, CardContent, Grid } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus.js';

const MyProfile = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';

  /**
   * Loads the user's profile info only once (at start)
   */
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
      return (
        <Grid container justify="center" spacing={2}>
          <Grid
            item
            xs={12}
            md={profile?.PersonType?.includes('stu') ? 8 : 12}
            lg={profile?.PersonType?.includes('stu') ? 6 : 10}
          >
            <Identification profile={profile} network={network} myProf={true} />
          </Grid>

          {profile?.PersonType?.includes('stu') && (
            <Grid item xs={12} md={4}>
              <VictoryPromiseDisplay network={network} />
            </Grid>
          )}

          <Grid item xs={12} lg={10}>
            <GordonSchedulePanel profile={profile} myProf={true} network={network} />
          </Grid>

          <Grid item xs={12} lg={5}>
            <OfficeInfoList profile={profile} />
            <PersonalInfoList profile={profile} myProf={true} network={network} />
          </Grid>

          <Grid item xs={12} lg={5}>
            <MembershipsList user={profile?.ID} myProf={true} />
          </Grid>
        </Grid>
      );
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
