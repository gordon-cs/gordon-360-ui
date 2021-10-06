import { UserContext } from 'contexts/UserContext';
import createUseContext from './createUseContext';

/**
 * Subscribe to user info.
 */
const useUser = createUseContext('User', UserContext);
export default useUser;
