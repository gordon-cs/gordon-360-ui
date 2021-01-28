//Main apartment application page
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import GordonLoader from '../../components/Loader';
import StudentApplication from './components/StudentApplication';
import StaffMenu from './components/StaffMenu';
import user from '../../services/user';
import housing from '../../services/housing';
import './apartmentApp.scss';

const ApartApp = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [network, setNetwork] = useState('online');
  const [userProfile, setUserProfile] = useState({});
  const [canUseStaff, setCanUseStaff] = useState(false);
  const [isUserStudent, setIsUserStudent] = useState(false);

  useEffect(() => {
    setLoading(true);
    user.getProfileInfo().then((data) => {
      setUserProfile(data);
      data.PersonType.includes('stu') ? setIsUserStudent(true) : setIsUserStudent(false);
    });
    checkHousingStaff();
    setLoading(false);
  }, []);

  /**
   * Check if the current user is authorized to view the application staff page
   */
  const checkHousingStaff = async () => {
    try {
      const isHousingStaff = await housing.checkHousingStaff();
      if (isHousingStaff) {
        setCanUseStaff(true);
      } else {
        setCanUseStaff(false);
      }
    } catch (error) {
      setCanUseStaff(false);
    }
  };

  if (authentication) {
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
            <StudentApplication userProfile={userProfile} />
          </div>
        );
      } else if (canUseStaff) {
        return (
          <div className="staff-apartment-application">
            <StaffMenu />
          </div>
        );
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
                  <br />
                  <h1>Apartment application Unavailable</h1>
                  <h4>Apartment application is available for students or housing staff only.</h4>
                  <br />
                  <br />
                  <Button
                    className="back-home-button"
                    color="primary"
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
      // If the network is offline
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
                <br />
                <h1>Please Re-establish Connection</h1>
                <h4>Viewing Apartment Applications has been deactivated due to loss of network.</h4>
                <br />
                <br />
                <Button
                  className="back-home-button"
                  color="primary"
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
