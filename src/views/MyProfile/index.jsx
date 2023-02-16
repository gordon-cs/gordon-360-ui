import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import Profile from 'components/Profile';
import { useUser } from 'hooks';

const MyProfile = () => {
  const { profile, loading } = useUser();

  if (loading) {
    return <GordonLoader />;
  }

  if (profile) {
    return <Profile profile={profile} myProf />;
  }

  return <GordonUnauthorized feature={'your profile'} />;
};

export default MyProfile;
