import { useIsAuthenticated } from '@azure/msal-react';
import { createContext, useEffect, useState } from 'react';
import userService, { Profile, ProfileImages } from 'services/user';

type User = {
  profile: Profile | null;
  images: ProfileImages;
  loading: boolean;
};

const initialUserState = {
  profile: null,
  images: {
    def: '',
  },
  loading: false,
};

type UserActions = {
  updateProfile: () => Promise<void>;
  updateImage: () => Promise<void>;
};

export const UserContext = createContext<User>(initialUserState);

export const UserActionsContext = createContext<UserActions | undefined>(undefined);

const getUserProfile = () => userService.getProfileInfo();
const getUserImages = () => userService.getImage();
const getAllUserData = () => Promise.all([getUserProfile(), getUserImages()]);

const UserContextProvider = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const isAuthenticated = useIsAuthenticated();
  const [user, setUser] = useState<User>(initialUserState);

  const updateProfile = () =>
    getUserProfile().then((p) => setUser((u) => ({ ...u, profile: p ?? null })));

  const updateImage = async () =>
    getUserImages().then((i) => setUser((u) => ({ ...u, images: i })));

  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated) {
        setUser((u) => ({ ...u, loading: true }));
        const [profile, images] = await getAllUserData();
        setUser({ profile: profile ?? null, images, loading: false });
        // setUser({ profile, images, loading: true });
      } else {
        setUser(initialUserState);
      }
    };
    loadUser();
  }, [isAuthenticated]);

  return (
    <UserActionsContext.Provider value={{ updateProfile, updateImage }}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </UserActionsContext.Provider>
  );
};

export default UserContextProvider;
