import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import GordonLoader from '../../components/Loader';
import GordonSchedulePanel from '../../components/SchedulePanel';
import { Identification } from '../../components/Identification/index';
import { Involvements } from '../../components/Involvements/index';
import Office from './../../components/OfficeList';
import ProfileList from './../../components/ProfileList';
import storage from '../../services/storage';
import user from './../../services/user';
import VictoryPromiseDisplay from './Components/VictoryPromiseDisplay/index.js';
import '../../app.css';
import './myProfile.css';
import 'cropperjs/dist/cropper.css';

const MyProfile = (props) => {
  const [loading, setLoading] = useState(true);
  const [memberships, setMemberships] = useState([]);
  const [network, setNetwork] = useState('online');
  const [officeInfo, setOfficeInfo] = useState(null);
  const [personType, setPersonType] = useState(null);
  const [profile, setProfile] = useState({});
  const [profileInfo, setProfileInfo] = useState(null);

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        let profile = await user.getProfileInfo();
        setProfile(profile);
        let profileInfo = <ProfileList profile={profile} myProf={true} network={network} />;
        setProfileInfo(profileInfo);
        const personType = String(profile.PersonType);
        setPersonType(personType);
        let officeInfo = <Office profile={profile} />;
        setOfficeInfo(officeInfo);
        const memberships = await user.getMembershipsAlphabetically(profile.ID);
        setMemberships(memberships);
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }
    loadProfile();
  }, [network]);

  useEffect(() => {
    let networkStatus;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      networkStatus = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      networkStatus = 'online';
    }

    // Saves the network's status to this component's state
    setNetwork(networkStatus);
  }, [network]);

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     *  The state's network variable is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        setNetwork('online');
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });
    return window.removeEventListener('message', () => {});
  }, [network]);

  // AUTHENTICATED
  if (props.authentication) {
    // Creates the My Profile Page
    let MyProfile = (
      <div>
        {loading && <GordonLoader />}
        {!loading && (
          <div className="personal-profile">
            <Grid container justify="center" spacing={2}>
              <Grid
                item
                xs={12}
                sm={12}
                md={profile.PersonType === 'stu' ? 8 : 12}
                lg={profile.PersonType === 'stu' ? 6 : 10}
              >
                <Identification profile={profile} network={network} myProf={true} />
              </Grid>

              {String(personType).includes('stu') && (
                <Grid item xs={12} md={4} lg={4} sm={12}>
                  <VictoryPromiseDisplay network={network} />
                </Grid>
              )}

              <Grid item xs={12} lg={10} align="center">
                <Grid container xs={12} lg={12} spacing={0} justify="center">
                  <Grid item xs={12} lg={12}>
                    <GordonSchedulePanel profile={profile} myProf={true} network={network} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={5}>
                <Grid container spacing={2}>
                  {officeInfo}
                  {profileInfo}
                </Grid>
              </Grid>

              <Grid item xs={12} lg={5}>
                <Involvements memberships={memberships} myProf={true} />
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );

    return MyProfile;
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
