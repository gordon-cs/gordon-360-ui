import React, { useEffect, useState } from 'react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonOffline from 'components/GordonOffline';
import user from 'services/user';
import GordonLoader from 'components/Loader';
import { Redirect } from 'react-router';
import { useParams } from 'react-router-dom';
import useNetworkStatus from 'hooks/useNetworkStatus';
import Profile from 'components/Profile';

const PublicProfile = ({ authentication }) => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);
  const isOnline = useNetworkStatus();
  const network = isOnline ? 'online' : 'offline';
  const { username } = useParams();

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

    if (authentication) {
      loadProfile();
    } else {
      setProfile(null);
    }
  }, [authentication, (username)]);

  if (authentication) {
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
