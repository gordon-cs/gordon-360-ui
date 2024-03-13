import GordonLimitedAvailability from 'components/GordonLimitedAvailability';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthenticated from 'components/GordonUnauthenticated';
import GordonLoader from 'components/Loader';
import { useAuthGroups, useUser } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import StudentView from './studentView';
import AdminView from './adminView';

//Imports for application period closed view
import { Card, CardContent, Grid, Button, Link } from '@mui/material';
// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { AuthGroup } from 'services/auth';

const HousingLottery = () => {
  const [loading, setLoading] = useState(true);
  const { profile, loading: loadingProfile } = useUser();
  const [isUserStudent, setIsUserStudent] = useState(false);
  const isHousingAdmin = useAuthGroups(AuthGroup.HousingAdmin);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    const loadPage = async () => {
      setLoading(true);
      try {
        setIsUserStudent(profile.PersonType.includes('stu'));
      } catch {
        setIsUserStudent(false);
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      loadPage();
    } else {
      // Clear out component's person-specific state when authenticated becomes false
      // (i.e. user logs out) so that it isn't preserved falsely for the next user
      setIsUserStudent(false);
      setLoading(false);
    }
  }, [profile]);

  if (loading || loadingProfile) {
    return <GordonLoader />;
  } else if (!profile) {
    // The user is not logged in
    return <GordonUnauthenticated feature={'the Housing Lottery Application page'} />;
  } else if (isOnline) {
    if (isHousingAdmin) {
      return (
        <AdminView userProfile={profile} />
      );
    } else if (isUserStudent) {
      return (
        <div className={'student_housing_application'}>
          <StudentView userProfile={profile} />
        </div>
      );
    } else {
      return (
        <GordonLimitedAvailability
          pageName="Housing Application"
          availableTo="students or housing staff"
        />
      );
    }
  } else {
    return <GordonOffline feature="Housing Applications" />;
  }
};

export default HousingLottery;
