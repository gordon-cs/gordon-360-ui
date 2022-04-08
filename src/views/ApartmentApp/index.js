// import StudentApplication from './components/StudentApplication';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useAuth } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
// eslint-disable-next-line no-unused-vars
import { Dispatch, SetStateAction, useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { Link } from 'react-router-dom';
import { NotFoundError } from 'services/error';
import housing from 'services/housing';
import user from 'services/user';
import styles from './ApartmentApp.module.css';
import StaffMenu from './components/StaffMenu';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

const ApartApp = () => {
  const [loading, setLoading] = useState(true);
  const authenticated = useAuth();

  /**
   * @type {[StudentProfileInfo, Dispatch<SetStateAction<StudentProfileInfo>>]} UserProfile
   */
  const [userProfile, setUserProfile] = useState({});
  const [isUserStudent, setIsUserStudent] = useState(false);
  const [canUseStaff, setCanUseStaff] = useState(false);

  const isOnline = useNetworkStatus();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
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

    if (authenticated) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setUserProfile(null);
      setCanUseStaff(false);
      setIsUserStudent(false);
      setLoading(false);
    }
  }, [authenticated]);

  if (loading) {
    return <GordonLoader />;
  } else if (!authenticated) {
    // The user is not logged in
    return <GordonUnauthorized feature={'the Apartment Application page'} />;
  } else if (isOnline) {
    if (canUseStaff) {
      return (
        <div className={styles.staff_apartment_application}>
          <StaffMenu userProfile={userProfile} />
        </div>
      );
    } else if (isUserStudent) {
      return (
        // <div className={'student_apartment_application'}>
        //   <StudentApplication userProfile={userProfile} />
        // </div>
        <Grid container justifyContent="center" spacing="16">
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent
                style={{
                  margin: 'auto',
                  textAlign: 'center',
                }}
              >
                <br />
                <h1>Apartment Application Period Closed</h1>
                <h4>
                  The apartment application period closed at 5PM, Monday April 4th, 2022. Please
                  contact{' '}
                  <a href="mailto:housing@gordon.edu" className="gc360_text_link">
                    the Housing Office (Housing@gordon.edu)
                  </a>{' '}
                  with any questions.
                </h4>
                <br />
                <br />
                <Button variant="contained" component={Link} to="">
                  Back to Home
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <GordonLimitedAvailability
          pageName="Apartment Application"
          availableTo="students or housing staff"
        />
      );
    }
  } else {
    return <GordonOffline feature="Apartment Applications" />;
  }
};

export default ApartApp;
