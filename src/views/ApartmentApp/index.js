import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Button } from '@material-ui/core/';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import StaffMenu from './components/StaffMenu';
import StudentApplication from './components/StudentApplication';
import useNetworkStatus from 'hooks/useNetworkStatus';
import housing from 'services/housing';
import user from 'services/user';
import './apartmentApp.css';
import { NotFoundError } from 'services/error';
import GordonOffline from 'components/GordonOffline';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

const ApartApp = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(authentication);

  /**
   * @type {[StudentProfileInfo, React.Dispatch<React.SetStateAction<StudentProfileInfo>>]} UserProfile
   */
  const [userProfile, setUserProfile] = useState({});
  const [isUserStudent, setIsUserStudent] = useState(false);
  const [canUseStaff, setCanUseStaff] = useState(false);

  const isOnline = useNetworkStatus();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      setIsAuthenticated(true);
      try {
        const profileInfo = await user.getProfileInfo();
        setUserProfile(profileInfo);
        setIsUserStudent(profileInfo.PersonType.includes('stu'));
        try {
          setCanUseStaff(await housing.checkHousingAdmin());
        } catch (e) {
          if (!(e instanceof NotFoundError)) {
            console.debug(e);
          }
          setCanUseStaff(false);
        }
      } catch {
        setUserProfile(null);
        setCanUseStaff(false);
        setIsUserStudent(false);
      } finally {
        setLoading(false);
      }
    };

    if (authentication) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authentication becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setUserProfile(null);
      setCanUseStaff(false);
      setIsUserStudent(false);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authentication]);

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Apartment Application page'} />;
  } else if (isOnline) {
    if (canUseStaff) {
      return (
        <div className="staff-apartment-application">
          <StaffMenu userProfile={userProfile} />
        </div>
      );
    } else if (isUserStudent) {
      return (
        <div className="student-apartment-application">
          <StudentApplication userProfile={userProfile} authentication={authentication} />
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
    return <GordonOffline feature="Apartment Applications" />;
  }
};

export default ApartApp;
