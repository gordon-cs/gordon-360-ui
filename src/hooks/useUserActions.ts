import { UserActionsContext } from 'contexts/UserContext';
import createUseContext from './createUseContext';

/**
 * Update the logged-in user.
 */
const useUserActions = createUseContext('UserActions', UserActionsContext);
export default useUserActions;
