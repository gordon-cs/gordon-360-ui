import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GordonLoader from '../../components/Loader';
import GordonSchedulePanel from '../../components/SchedulePanel';
import Identification from '../../components/Identification';
import { Involvements } from '../../components/Involvements/index';
import Office from './../../components/OfficeList';
import ProfileList from './../../components/ProfileList';
import user from './../../services/user';
import VictoryPromiseDisplay from './Components/VictoryPromiseDisplay/index.js';
import '../../app.css';
import './myProfile.css';
import 'cropperjs/dist/cropper.css';
import { useNetworkIsOnline } from '../../context/NetworkContext';

const MyProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState([]);
  const [personType, setPersonType] = useState(null);
  const [profile, setProfile] = useState({});
  const isOnline = useNetworkIsOnline();

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        let profile = await user.getProfileInfo();
        setProfile(profile);
        const personType = String(profile.PersonType);
        setPersonType(personType);
        const memberships = await user.getMembershipsAlphabetically(profile.ID);
        setMemberships(memberships);
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }
    if (isOnline) {
      loadProfile();
    }
  }, [isOnline]);

  if (loading) {
    return <GordonLoader />;
  } else if (props.authentication) {
    return (
      <div className="personal-profile">
        <Grid container justify="center" spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={profile.PersonType === 'stu' ? 8 : 12}
            lg={profile.PersonType === 'stu' ? 6 : 10}
          >
            <Identification profile={profile} isOnline={isOnline} myProf={true} />
          </Grid>

          {String(personType).includes('stu') && (
            <Grid item xs={12} md={4} lg={4} sm={12}>
              <VictoryPromiseDisplay isOnline={isOnline} />
            </Grid>
          )}

          <Grid item xs={12} lg={10} align="center">
            <Grid container xs={12} lg={12} spacing={0} justify="center">
              <Grid item xs={12} lg={12}>
                <GordonSchedulePanel profile={profile} myProf={true} isOnline={isOnline} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={2}>
              <Office profile={profile} />
              <ProfileList profile={profile} myProf={true} isOnline={isOnline} />
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Involvements memberships={memberships} myProf={true} />
          </Grid>
        </Grid>
      </div>
    );
  } else {
    // Not Authenticated
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
