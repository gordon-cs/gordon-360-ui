//Main apartment application page
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import GordonLoader from '../../components/Loader';
import StudentApplication from './components/StudentApplication';
import StaffMenu from './components/StaffMenu';
import user from '../../services/user';
import housing from '../../services/housing';
import './apartmentApp.scss';

const ApartApp = (props) => {
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState('online');
  const [userProfile, setUserProfile] = useState({});
  const [canUseStaff, setCanUseStaff] = useState(false);
  const [isUserStudent, setIsUserStudent] = useState(false);

  /* useEffect(() => {
    loadProfile();
  }); */

  /**
   * Loads the user's profile info only once (at start)
   */
  /* const loadProfile = async () => {
    this.setState({ loading: true });
    try {
      const profile = await user.getProfileInfo();
      this.setState({ userProfile: profile });
      this.setState({ isUserStudent: String(profile.PersonType).includes('stu') });
      this.setState({ loading: false });
    } catch (error) {
      // Do Nothing
    }
  };  */

  /**
   * Loads the user's profile info only once (at start)
   */
  useEffect(() => {
    setLoading(true);
    user.getProfileInfo().then((data) => {
      setUserProfile(data);
      data.PersonType.includes('stu') ? setIsUserStudent(true) : setIsUserStudent(false);
    });
    setLoading(false);
  }, []);

  // disabled lint in some lines in order to remove warning about race condition that does not apply
  // in our current case.
  useEffect(() => {
    async function getCanUseStaff() {
      try {
        let canUse = await housing.checkStaff();

        if (canUse.length === 1) {
          setCanUseStaff(true);
        } else {
          setCanUseStaff(false);
        }
      } catch (error) {
        setCanUseStaff(false);
      }
    }

    getCanUseStaff();

    // eslint-disable-next-line
  }, []);

  if (props.authentication) {
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
        this.setState({ network: 'online' });
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });

    /**
     * Gets status of current network connection for online/offline rendering
     * Defaults to online in case of PWA not being possible
     */
    const networkStatus = JSON.parse(localStorage.getItem('network-status')) || 'online';

    if (networkStatus === 'online') {
      if (loading) {
        return <GordonLoader />;
      } else if (isUserStudent) {
        return (
          <div className="student-apartment-application">
            <StudentApplication userProfile={userProfile} authentication={props.authentication} />
          </div>
        );
      } else if (canUseStaff) {
        return (
          <div className="staff-apartment-application">
            <StaffMenu authentication={props.authentication} />
          </div>
        );
      }
    } else if (networkStatus === 'offline' || !isUserStudent) {
      // If the network is offline or the user type is non-student
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
                    : 'Apartment application is available for students or housing staff only.'}
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
