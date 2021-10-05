import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 * @typedef { import('services/user').StaffProfileInfo } StaffProfileInfo
 */

/**
 * Custom hook to subscribe to user info.
 *
 * Can be used by any functional component under the UserContextProvider in App.js
 *
 * @returns {StudentProfileInfo | StaffProfileInfo | null} The user's info if authenticated, or null
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be called within UserContextProvider`);
  }

  return context;
};
export default useUser;
