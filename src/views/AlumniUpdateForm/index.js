import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import UpdateForm from './components/UpdateForm';

/**
 * A form for alumni to request an update to their profile information.
 */

const AlumniUpdateForm = () => {
  const { profile, loading } = useUser();
  if (loading) return <GordonLoader />;

  if (!profile) return <GordonUnauthorized feature={'the Alumni Update Page'} />;

  return <UpdateForm profile={profile} />;
};

export default AlumniUpdateForm;
