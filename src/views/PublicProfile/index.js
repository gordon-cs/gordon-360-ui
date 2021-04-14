import React, { useEffect, useState } from 'react';
import user from 'services/user';
import PersonalInfoList from 'components/ProfileInfo/PersonalInfoList';
import OfficeInfoList from 'components/ProfileInfo/OfficeInfoList';
import MembershipsList from 'components/ProfileInfo/MembershipsList';
import GordonLoader from 'components/Loader';
import GordonSchedulePanel from 'components/ProfileInfo/SchedulePanel';
import Identification from 'components/ProfileInfo/Identification';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import { ReactComponent as NoConnectionImage } from 'NoConnection.svg';
import { Grid, Card, CardContent, Button } from '@material-ui/core';
import useNetworkStatus from 'hooks/useNetworkStatus';
import './profile.css';

//Public profile view
const PublicProfile = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';
  const { username } = useParams();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        setProfile(await user.getProfileInfo(username));
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    if (authentication) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [authentication, username]);

  if (authentication) {
    if (error && error.name === 'NotFoundError') {
      return <Redirect to="/profilenotfound" />;
    }
    // Creates the Public Profile page depending on the status of the network
    if (network === 'online') {
      if (loading) {
        return <GordonLoader />;
      } else {
        return (
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} lg={10}>
              <Identification profile={profile} network={network} myProf={false} />
            </Grid>

            <Grid item xs={12} lg={10} align="center">
              <GordonSchedulePanel profile={profile} myProf={false} network={network} />
            </Grid>

            <Grid item xs={12} lg={5}>
              <Grid container spacing={2}>
                <OfficeInfoList profile={profile} />
                <PersonalInfoList profile={profile} myProf={false} />
              </Grid>
            </Grid>

            <Grid item xs={12} lg={5}>
              <MembershipsList user={profile?.AD_Username} myProf={false} />
            </Grid>
          </Grid>
        );
      }
    } else {
      return (
        <Grid container justify="center" spacing={2}>
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
                <h4>Viewing a public profile has been deactivated due to loss of network.</h4>
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
              <h4>You must be logged in to view this profile.</h4>
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

export default PublicProfile;
