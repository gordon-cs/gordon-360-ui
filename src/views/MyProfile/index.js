import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ProfileList from './../../components/ProfileList';
import Office from './../../components/OfficeList';
import user from './../../services/user';
import storage from '../../services/storage';
import activity from './../../services/activity';
import { gordonColors } from '../../theme';
import MyProfileActivityList from './../../components/MyProfileActivityList';
import { Link } from 'react-router-dom';
import 'cropperjs/dist/cropper.css';
import GordonLoader from '../../components/Loader';
import GordonSchedulePanel from '../../components/SchedulePanel';
import './myProfile.css';
import '../../app.css';
import { withWidth } from '@material-ui/core';
import VictoryPromiseDisplay from './Components/VictoryPromiseDisplay/index.js';
import { Identification } from './Components/Identification/index';

const MyProfile = props => {
  const style = {
    img: {
      width: '200px',
      height: '200px',
    },

    centerGridContainer: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },

    button: {
      background: gordonColors.primary.cyan,
      color: 'white',
    },
    uncontainedButton: {
      color: gordonColors.primary.cyan,
      fontSize: '1rem',
    },
    publicProfileButton: {
      background: gordonColors.primary.blue,
      fontSize: '1rem',
      color: 'white',
    },
  };

  const [personType, setPersonType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);
  const [officeInfo, setOfficeInfo] = useState(null);
  const [profile, setProfile] = useState({});
  const [memberships, setMemberships] = useState([]);
  const [involvementsAndTheirPrivacy, setInvolvementsAndTheirPrivacy] = useState([]);
  const [network, setNetwork] = useState('online');

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      let profile;
      try {
        profile = await user.getProfileInfo();
        let profileInfo = <ProfileList profile={profile} myProf={true} />;
        const personType = String(profile.PersonType);
        let officeInfo = <Office profile={profile} />;
        setProfileInfo(profileInfo);
        setOfficeInfo(officeInfo);
        setProfile(profile);
        setPersonType(personType);
        const memberships = await user.getMembershipsAlphabetically(profile.ID);
        const involvementsAndTheirPrivacy = await getInvolvementAndPrivacyDictionary(memberships);
        setLoading(false);
        setMemberships(memberships);
        setInvolvementsAndTheirPrivacy(involvementsAndTheirPrivacy);
      } catch (error) {
        // Do Nothing
      }
    }
    loadProfile();
  }, []);

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
    window.addEventListener('message', event => {
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

  async function getInvolvementAndPrivacyDictionary(membershipsList) {
    let involvementAndPrivacyDictionary = [];
    for (let i = 0; i < membershipsList.length; i++) {
      let involvement = await activity.get(membershipsList[i].ActivityCode);
      involvementAndPrivacyDictionary.push({
        key: membershipsList[i],
        value: involvement.Privacy,
      });
    }
    return involvementAndPrivacyDictionary;
  }

  // AUTHENTICATED
  if (props.Authentication) {
    let involvementAndPrivacyList;
    if (memberships.length === 0) {
      involvementAndPrivacyList = (
        <div>
          <Link to={`/involvements`}>
            <Typography variant="body2" className="noInvolvements">
              No Involvements to display. Click here to see Involvements around campus!
            </Typography>
          </Link>
        </div>
      );
    } else {
      involvementAndPrivacyList = involvementsAndTheirPrivacy.map(
        involvementPrivacyKeyValuePair => (
          <MyProfileActivityList
            Membership={involvementPrivacyKeyValuePair.key}
            InvolvementPrivacy={involvementPrivacyKeyValuePair.value}
          />
        ),
      );
    }

    // Creates the My Profile button link depending on the status of the network found in local storage
    let MyProfile;
    // AUTHENTICATED - NETWORK STATUS: ONLINE
    if (network === 'online') {
      MyProfile = (
        <div>
          {loading && <GordonLoader />}
          {!loading && (
            <div className="personal-profile">
              <Grid container justify="center" spacing={2}>
                {/* START OF IDENTIFICATION CARD */}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={profile.PersonType === 'stu' ? 8 : 12}
                  lg={profile.PersonType === 'stu' ? 6 : 10}
                >
                  <Identification profile={profile} width={props.width} />
                </Grid>
                {/* END OF IDENTIFICATION CARD */}

                {/* START OF VICTORY PROMISE */}
                {String(personType).includes('stu') && (
                  <Grid item xs={12} md={4} lg={4} sm={12}>
                    <VictoryPromiseDisplay />
                  </Grid>
                )}
                {/* END OF VICTORY PROMISE */}

                <Grid item xs={12} lg={10} align="center">
                  <Grid container xs={12} lg={12} spacing={0} justify="center">
                    <Grid item xs={12} lg={12}>
                      <GordonSchedulePanel profile={profile} myProf={true} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container spacing={2}>
                    {profileInfo}
                    {officeInfo}
                  </Grid>
                </Grid>

                <Grid item xs={12} lg={5}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Grid container direction="row" alignItems="center">
                            <Grid item xs={7}>
                              <CardHeader title="Involvements" />
                            </Grid>
                            <Grid item xs={5} align="right">
                              <Link className="gc360-link" to="/transcript">
                                <Button variant="contained" style={style.button}>
                                  Experience Transcript
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                          <List>{involvementAndPrivacyList}</List>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      );
    }
    // AUTHENTICATED - NETWORK STATUS: OFFLINE
    else {
      MyProfile = (
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
                  {
                    <img
                      src={require(`${'../../NoConnection.svg'}`)}
                      alt="Internet Connection Lost"
                    />
                  }
                </Grid>
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Editing your profile has been deactivated due to loss of network.</h4>
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

export default withWidth()(MyProfile);
