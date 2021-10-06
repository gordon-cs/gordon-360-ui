import { UpdateUserContext } from 'contexts/UserContext';
import createUseContext from './createUseContext';

/**
 * Update the logged-in user.
 */
const useUpdateUser = createUseContext('UpdateUser', UpdateUserContext);
export default useUpdateUser;
