import React, { createContext, useEffect, useState } from 'react';
import { isAuthenticated } from 'services/auth';
import userService from 'services/user';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (auth) => {
      if (auth) {
        const user = await userService.getProfileInfo();
        setUser(user);
      } else {
        setUser(null);
      }
    };

    fetchUser(isAuthenticated());
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
