import { createContext, useEffect, useReducer } from 'react';
import { authenticate, isAuthenticated, signOut } from 'services/auth';
import userService from 'services/user';

/**
 * @template T
 * @typedef {import('react').Context<T>} Context
 */

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 * @typedef { import('services/user').StaffProfileInfo } StaffProfileInfo
 */

/**
 * @typedef {(StudentProfileInfo | StaffProfileInfo | null)} Profile
 */

/**
 * @typedef User
 * @property {Profile} profile profile data of the user
 * @property {Object} images the user's images
 * @property {string} images.def the user's default image
 * @property {string} [images.pref] the user's preferred image
 */

/**
 * @typedef UserContextState
 * @property {boolean} loading Whether the user data is loading
 * @property {User} user data for the logged-in user
 * @property {boolean} authenticated Whether the user is authenticated
 */

/**
 * @typedef {Object} UserActions
 * @property {(username: string, password: string) => void} login login the user based on their typed username/password
 * @property {() => void} logout logout the current user
 * @property {() => void} updateProfile fetch the updated profile info of the current user
 * @property {() => void} updateImage fetch the updated profile image of the current user
 */

/**
 * @type {Context<User>}
 */
export const UserContext = createContext();

/**
 * @type {Context<UserActions>}
 */
export const UserActionsContext = createContext();

/**
 * @type {Context<boolean>}
 */
export const AuthContext = createContext();

const UserActions = Object.freeze({
  Load: 'Load',
  Login: 'Login',
  Logout: 'Logout',
  UpdateProfile: 'UpdateProfile',
  UpdateImage: 'UpdateImage',
});

/**
 * @type {UserContextState}
 */
const initialState = {
  loading: true,
  user: {
    profile: null,
    images: {
      def: '',
    },
  },
  authenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.Load:
      return { ...state, loading: true };
    case UserActions.Login:
      return { user: action.payload, authenticated: true, loading: false };
    case UserActions.Logout:
      return { ...initialState, loading: false };
    default:
      return state;
  }
};

const getUserProfile = async () => await userService.getProfileInfo();
const getUserImages = async () => await userService.getImage();
const getAllUserData = async () => await Promise.all([getUserProfile(), getUserImages()]);

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const login = async (username, password) => {
    await authenticate(username, password);
    const [profile, images] = await getAllUserData();

    dispatch({ type: UserActions.Login, payload: { profile, images } });
  };

  const logout = () => {
    signOut();
    dispatch({ type: UserActions.Logout });
  };

  const updateProfile = async () =>
    dispatch({ type: UserActions.UpdateProfile, payload: await getUserProfile() });

  const updateImage = async () =>
    dispatch({ type: UserActions.UpdateImage, payload: await getUserImages() });

  useEffect(() => {
    const loadUser = async () => {
      if (isAuthenticated()) {
        const [profile, images] = await getAllUserData();
        dispatch({
          type: UserActions.Login,
          payload: { profile, images },
        });
      } else {
        dispatch({ type: UserActions.Logout });
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
