import { useIsAuthenticated } from '@azure/msal-react';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Settings from 'components/Settings';
import { useNetworkStatus, useUser } from 'hooks';
import { useEffect, useRef, useState } from 'react';

const MySettings = () => {
  const [settings, setSettings] = useState([]);
  const [error, setError] = useState(null);
  const isAuthenticated = useIsAuthenticated();

  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  }

  if (Settings) {
    return <Settings setting={profile.IsMobilePhonePrivate} myProf />;
  }

  return <GordonUnauthorized feature={'your settings'} />;
};

export default MySettings;
