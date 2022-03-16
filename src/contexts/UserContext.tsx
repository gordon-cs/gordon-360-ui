import { useIsAuthenticated } from '@azure/msal-react';
import { createContext, useEffect, useState } from 'react';
import { authenticate, signOut } from 'services/auth';
import userService, { Profile, ProfileImages } from 'services/user';

type User = {
  profile: Profile | null;
  images: ProfileImages;
};

const initialUserState = {
  profile: null,
  images: {
    def: '',
  },
};

type UserActions = {
  login: () => void;
  logout: () => void;
  updateProfile: () => void;
  updateImage: () => void;
};

export const UserContext = createContext<User>(initialUserState);

export const UserActionsContext = createContext<UserActions | undefined>(undefined);

export const AuthContext = createContext<boolean | undefined>(undefined);

const getUserProfile = () => userService.getProfileInfo();
const getUserImages = () => userService.getImage();
const getAllUserData = () => Promise.all([getUserProfile(), getUserImages()]);

const UserContextProvider = ({ children }: {children?: JSX.Element | JSX.Element[]}) => {
  const isAuthenticated = useIsAuthenticated();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>(initialUserState);

  const login = async () => {
    await authenticate();
    const [profile, images] = await getAllUserData();

    setUser({ profile, images });
  };

  const logout = () => {
    signOut();
  };

  const updateProfile = () => getUserProfile().then((p) => setUser((u) => ({ ...u, profile: p })));

  const updateImage = async () =>
    getUserImages().then((i) => setUser((u) => ({ ...u, images: i })));

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      if (isAuthenticated) {
        const [profile, images] = await getAllUserData();
        setUser({ profile, images });
      } else {
        setUser(initialUserState);
      }
      setLoading(false);
    };
    loadUser();
  }, [isAuthenticated]);

  if (loading) {
    return null;
  }

  return (
    <UserActionsContext.Provider value={{ login, logout, updateProfile, updateImage }}>
      <AuthContext.Provider value={isAuthenticated && user.profile !== null}>
        <UserContext.Provider value={user}>{children}</UserContext.Provider>
      </AuthContext.Provider>
    </UserActionsContext.Provider>
  );
};

export default UserContextProvider;
