import GordonUnauthorized from 'components/GordonUnauthorized/GordonUnauthorized';
import GordonLoader from 'components/Loader/Loader';
import Profile from 'components/Profile/Profile';
import { useUser } from 'hooks/hooks';

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
