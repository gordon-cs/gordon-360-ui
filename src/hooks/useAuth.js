import { AuthContext } from 'contexts/UserContext';
import createUseContext from './createUseContext';

/**
 * Update the logged-in user.
 */
const useAuth = createUseContext('Auth', AuthContext);
export default useAuth;
