import { useIsAuthenticated } from '@azure/msal-react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Profile from 'components/Profile';
import { useEffect, useState } from 'react';
import user from 'services/user';

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      try {
        setProfile(await user.getProfileInfo());
        setLoading(false);
      } catch (error) {
        // Do Nothing
      }
    }

    if (isAuthenticated) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return loading ? <GordonLoader /> : <Profile profile={profile} myProf />;
  }
  return <GordonUnauthorized feature={'your profile'} />;
};

export default MyProfile;
