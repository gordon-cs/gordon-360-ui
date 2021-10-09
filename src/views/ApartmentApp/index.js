import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { useAuth } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
// eslint-disable-next-line no-unused-vars
import { Dispatch, SetStateAction, useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { NotFoundError } from 'services/error';
import housing from 'services/housing';
import user from 'services/user';
import styles from './ApartmentApp.module.css';
import StaffMenu from './components/StaffMenu';
import StudentApplication from './components/StudentApplication';

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

    if (authenticated) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setUserProfile(null);
      setCanUseStaff(false);
      setIsUserStudent(false);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [authenticated]);

  if (loading) {
    return <GordonLoader />;
  } else if (!isAuthenticated) {
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
        <div className={'student_apartment_application'}>
          <StudentApplication userProfile={userProfile} />
        </div>
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
