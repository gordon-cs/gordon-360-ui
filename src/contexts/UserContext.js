import { createContext, useEffect, useState } from 'react';
import { isAuthenticated } from 'services/auth';
import userService from 'services/user';

export const UserContext = createContext();
export const AuthContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const updateUser = async () =>
    setUser(isAuthenticated() ? await userService.getProfileInfo() : null);

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider value={updateUser}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default UserContextProvider;
