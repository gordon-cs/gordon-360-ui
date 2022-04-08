import GordonUnauthorized from 'components/GordonUnauthorized';
import Profile from 'components/Profile';
import { useUser } from 'hooks';

const MyProfile = () => {
  const { profile } = useUser();

  if (profile) {
    return <Profile profile={profile} myProf />;
  }
  return <GordonUnauthorized feature={'your profile'} />;
};

export default MyProfile;
