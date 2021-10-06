import { createContext, useEffect, useState } from 'react';
import { isAuthenticated } from 'services/auth';
import userService from 'services/user';

export const UserContext = createContext();
export const UpdateUserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateUser = async () => {
    setUser(isAuthenticated() ? await userService.getProfileInfo() : null);
    setIsLoading(false);
  };

  useEffect(() => {
    updateUser();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <UpdateUserContext.Provider value={updateUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UpdateUserContext.Provider>
  );
};

export default UserContextProvider;
