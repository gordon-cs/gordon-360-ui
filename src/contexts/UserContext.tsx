import { Context, createContext, FunctionComponent, useEffect, useReducer } from 'react';
import { authenticate, isAuthenticated, signOut } from 'services/auth';
import userService, { Profile, ProfileImages } from 'services/user';

type User = {
profile?: Profile
images: ProfileImages
}

type UserContextState = {
loading: boolean
user: User
authenticated: boolean
}

const initialState: UserContextState = {
  loading: true,
  user: {
    profile: undefined,
    images: {
      def: '',
    },
  },
  authenticated: false,
};

type UserContextActions = {
  login: (username: string, password: string) => void
  logout: () => void
  updateProfile: () => void
  updateImage: () => void
}

export const UserContext = createContext(initialState.user);

export const UserActionsContext: Context<UserContextActions> = createContext({
  login: (username, password) => {},
  logout: () => {},
  updateProfile: () => {},
  updateImage: () => {}
});

export const AuthContext = createContext(isAuthenticated());

type UserActions =
  | { type: 'Load' }
  | { type: 'Login', payload: User}
  | { type: 'Logout' }
  | { type: 'UpdateProfile', payload: Profile}
  | { type: 'UpdateImage', payload: ProfileImages }


const userReducer = (state = initialState, action: UserActions) => {
  switch (action.type) {
    case 'Load':
      return { ...state, loading: true };
    case 'Login':
      return { user: action.payload, authenticated: true, loading: false };
    case 'Logout':
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

const getUserProfile = () => userService.getProfileInfo();
const getUserImages = () => userService.getImage();
const getAllUserData = () => Promise.all([getUserProfile(), getUserImages()]);

const UserContextProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (username: string, password: string) => {
    await authenticate(username, password);
    const [profile, images] = await getAllUserData();

    dispatch({ type: 'Login', payload: { profile, images } });
  };

  const logout = () => {
    signOut();
    dispatch({ type: 'Logout' });
  };

  const updateProfile = async () =>
    dispatch({ type: 'UpdateProfile', payload: await getUserProfile() });

  const updateImage = async () =>
    dispatch({ type: 'UpdateImage', payload: await getUserImages() });

  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated()) {
        const [profile, images] = await getAllUserData();
        dispatch({
          type: 'Login',
          payload: { profile, images },
        });
      } else {
        dispatch({ type: 'Logout' });
      }
    };
    loadUser();
  }, []);

  if (state.loading) {
    return null;
  }

  return (
    <UserActionsContext.Provider value={{ login, logout, updateProfile, updateImage }}>
      <AuthContext.Provider value={state.authenticated}>
        <UserContext.Provider value={state.user}>{children}</UserContext.Provider>
      </AuthContext.Provider>
    </UserActionsContext.Provider>
  );
};

export default UserContextProvider;
