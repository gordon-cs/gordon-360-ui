import GordonLoader from 'components/Loader';
import GordonUnauthorized from 'components/GordonUnauthorized';
import { useUser } from 'hooks';
import UpdateForm from './components/UpdateForm';

/**
 * A form for alumni to request an update to their profile information.
 */

const AlumniUpdateForm = (props) => {
  const { profile, loading } = useUser();
  return loading ? (
    <GordonLoader />
  ) : profile ? (
    <UpdateForm profile={profile} authentication={props.authentication} />
  ) : (
    <GordonUnauthorized feature={'the Alumni Update Page'} />
  );
};

export default AlumniUpdateForm;
