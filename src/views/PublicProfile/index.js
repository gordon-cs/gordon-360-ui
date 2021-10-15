import GordonOffline from 'components/GordonOffline';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Profile from 'components/Profile';
import { useAuth } from 'hooks';
import useNetworkStatus from 'hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import user from 'services/user';

const PublicProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';
  const { username } = useParams();
  const authenticated = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        setProfile(await user.getProfileInfo(username));
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    if (authenticated) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [authenticated, username]);

  if (authenticated) {
    if (error && error.name === 'NotFoundError') {
      return <Redirect to="/profilenotfound" />;
    }
    if (network === 'online') {
      if (loading) {
        return <GordonLoader />;
      } else {
        return <Profile profile={profile} myProf={false} />;
      }
    } else {
      return <GordonOffline feature="Viewing a public profile" />;
    }
  } else {
    return <GordonUnauthorized feature={'this profile'} />;
  }
};

export default PublicProfile;
