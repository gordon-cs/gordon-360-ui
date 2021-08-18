import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';

/**
 * Custom hook to subscribe to authentication status.
 *
 * Can be used by any functional component under the UserContextProvider in App.js
 *
 * @returns {Boolean} Whether or not the current user is authenticated
 */
const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be called within UserContextProvider`);
  }

  return !!context;
};
export default useAuth;
