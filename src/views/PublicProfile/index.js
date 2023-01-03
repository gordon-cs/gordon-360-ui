import { useIsAuthenticated } from '@azure/msal-react';
import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Profile from 'components/Profile';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useParams } from 'react-router-dom';
import userService from 'services/user';

const PublicProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const isOnline = useNetworkStatus();
  const { username } = useParams();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    setProfile({});
    setLoading(true);
    if (isAuthenticated) {
      try {
        userService
          .getProfileInfo(username)
          .then(setProfile)
          .then(() => setLoading(false));
      } catch (error) {
        setError(error);
      }
    }
  }, [isAuthenticated, username]);

  if (!isAuthenticated) {
    return <GordonUnauthorized feature={'this profile'} />;
  }

  if (!isOnline) {
    return <GordonOffline feature="Viewing a public profile" />;
  }

  if ((error && error.name === 'NotFoundError') || !profile) {
    return <Navigate to="/profilenotfound" />;
  }

  if (loading) {
    return <GordonLoader />;
  }

  return <Profile profile={profile} myProf={false} />;
};

export default PublicProfile;
