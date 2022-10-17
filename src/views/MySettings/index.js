import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Settings from 'components/Settings';
import { useUser } from 'hooks';

const MySettings = () => {
  const { settings, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  }

  if (Settings) {
    return <Settings setting={settings} myProf />;
  }

  return <GordonUnauthorized feature={'your settings'} />;
};

export default MySettings;
