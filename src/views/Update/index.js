import { useUser } from 'hooks';
import GordonUnauthorized from 'components/GordonUnauthorized';
import GordonLoader from 'components/Loader';
import { UpdatePage } from './components/UpdatePage';

/**
 * Sends an update form to the development office
 */

const Update = (props) => {
  const { profile, loading } = useUser();
  return loading
    ? <GordonLoader />
    : profile
      ? <UpdatePage profile={profile} authentication={props.authentication} />
       :<GordonUnauthorized feature={'the Alumni Update Page'} />
};

export default Update;
