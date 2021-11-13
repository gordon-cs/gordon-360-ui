import { AuthContext } from 'contexts/UserContext';
import createUseContext from './createUseContext';

/**
 * Hook to Subscribe to Authentication updates.
 *
 * @returns whether the user is logged in or not
 */
const useAuth = createUseContext('Auth', AuthContext);
export default useAuth;
