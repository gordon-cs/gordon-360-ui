//Main apartment application page
import React, { useState, useEffect } from 'react';
import 'date-fns';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import GordonLoader from '../../components/Loader';
import ApartmentPeopleSearch from '../../components/ApartmentPeopleSearch';
import user from '../../services/user';
import housing from '../../services/housing';
import './apartmentApp.css';

const ApartApp = (props) => {
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState('online');
  const [profile, setProfile] = useState({});
  const [isUserStudent, setIsUserStudent] = useState(false);
  // TODO - For end-to-end Hello World debug. Remove the next 2 lines before merge
  const [onCampusRoom, setOnCampusRoom] = useState(null);
  const [onOffCampus, setOnOffCampus] = useState(null);

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        let profile = await user.getProfileInfo();
        setProfile(profile);
        // const personType = String(profile.PersonType);
        // setPersonType(personType);
        profile.PersonType.includes('stu') ? setIsUserStudent(true) : setIsUserStudent(false);
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }
    loadProfile();
  }, []);

  useEffect(() => {
    async function infoGet() {
      setLoading(true);
      try {
        let housingInfo = await housing.getHousingInfo();
        // setHousingInfo(housingInfo);
        let onOffCampus = String(housingInfo[0].OnOffCampus);
        setOnOffCampus(onOffCampus);
        let onCampusRoom = String(housingInfo[0].OnCampusRoom);
        setOnCampusRoom(onCampusRoom);
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }
    infoGet();
  }, []);

  if (props.Authentication) {
    /* Used to re-render the page when the network connection changes.
     *  this.state.network is compared to the message received to prevent
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

    /* Gets status of current network connection for online/offline rendering
     *  Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    if (networkStatus === 'online' && isUserStudent && props.Authentication) {
      return (
        <div className="apartment-application">
          {loading && <GordonLoader />}
          {!loading && (
            <div className="apartment-application-card">
              <Card>
                <CardContent
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  <h1>Hello World</h1>
                  <br />
                  <h3>{'You name: ' + profile.fullName}</h3>
                  <br />
                  <h3>{'On/Off Campus: ' + onOffCampus}</h3>
                  <br />
                  <h3>{'Your room number: ' + onCampusRoom}</h3>
                  <br />
                  <TextField
                    placeholder="People Search"
                    value={profile.fullName}
                    // inputRef={ref}
                    className={'text-field'}
                    InputProps={{
                      classes: {
                        root: 'people-search-root',
                        input: 'people-search-input',
                        inputDisabled: 'people-search-disabled',
                      },
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <br />
                  <ApartmentPeopleSearch Authentication={props.Authentication} />
                  <br />
                  <ApartmentPeopleSearch Authentication={props.Authentication} />
                  <br />
                  <ApartmentPeopleSearch Authentication={props.Authentication} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      );
    } else {
      // If the network is offline or the user type is non-student
      if (networkStatus === 'offline' || !isUserStudent) {
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
                  {networkStatus === 'offline' && (
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
                      <img
                        src={require(`${'../../NoConnection.svg'}`)}
                        alt="Internet Connection Lost"
                      />
                    </Grid>
                  )}
                  <br />
                  <h1>
                    {networkStatus === 'offline'
                      ? 'Please re-establish connection'
                      : 'Apartment application Unavailable'}
                  </h1>
                  <h4>
                    {networkStatus === 'offline'
                      ? 'Apartment application entry has been disabled due to loss of network.'
                      : 'Apartment application is currently available for students only. Support for staff will come soon!'}
                  </h4>
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
    }
  } else {
    // The user is not logged in
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
              <h4>You must be logged in to use the Apartment Applications page.</h4>
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

export default ApartApp;
