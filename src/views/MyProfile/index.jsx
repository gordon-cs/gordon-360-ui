import GordonUnauthenticated from 'components/GordonUnauthenticated';
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

  return <GordonUnauthenticated feature={'your profile'} />;
};

export default MyProfile;
