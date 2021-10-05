import { UpdateUserContext } from 'contexts/UserContext';
import { useContext } from 'react';

/**
 * Custom hook to update the logged-in user.
 *
 * Can be used by any functional component under the UserContextProvider in App.js
 *
 * @returns {function(): void} A function that will update (or null) the logged-in user
 */
const useUpdateUser = () => {
  const context = useContext(UpdateUserContext);
  if (context === undefined) {
    throw new Error(`useUser must be called within UserContextProvider`);
  }

  return context;
};
export default useUpdateUser;
