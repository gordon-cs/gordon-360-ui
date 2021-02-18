import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import user from './../../services/user';
import ProfileList from './../../components/ProfileList';
import Office from './../../components/OfficeList';
import { Involvements } from '../../components/Involvements/index';
import Button from '@material-ui/core/Button';
import GordonLoader from './../../components/Loader';
import GordonSchedulePanel from '../../components/SchedulePanel';
import Identification from '../../components/Identification';
import { Redirect } from 'react-router';

import './profile.css';
import '../../app.css';
import { useNetworkStatus } from '../../contexts/NetworkContext';
import OfflinePanel from '../../components/OfflinePanel';

//Public profile view
const Profile = ({ authentication, match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({});
  const [memberships, setMemberships] = useState([]);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    if (authentication) {
      loadProfile(match.params.username);
    }
  }, [authentication, match]);

  const loadProfile = async (searchedUser) => {
    setLoading(true);
    try {
      const [searchedProfile, memberships] = await Promise.all([
        user.getProfileInfo(searchedUser),
        user.getPublicMemberships(searchedUser),
      ]);
      setProfile(searchedProfile);
      setMemberships(memberships);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  if (loading) {
    return <GordonLoader />;
  } else if (authentication) {
    if (!isOnline) {
      return <OfflinePanel componentName="Profile" />;
    } else if (error && error.name === 'NotFoundError') {
      return <Redirect to="/profilenotfound" />;
    } else {
      return (
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} lg={10}>
            <Identification profile={profile} isOnline={isOnline} myProf={false} />
          </Grid>

          <Grid item xs={12} lg={10} align="center">
            <Grid container xs={12} lg={12} spacing={0} justify="center">
              <Grid item xs={12} lg={12}>
                <GordonSchedulePanel profile={profile} myProf={false} isOnline={isOnline} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={2}>
              <Office profile={profile} />
              <ProfileList profile={profile} myProf={false} />
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Involvements memberships={memberships} myProf={false} />
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

export default Profile;
