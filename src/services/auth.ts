import session from 'services/session';
import { parseResponse } from './http';
import storage from './storage';

const base = process.env.REACT_APP_API_URL;

/**
 * Get token for user from backend
 *
 * @param username Username in firstname.lastname format
 * @param password User's
 * @returns Token for use on API requests
 */
const getAuth = async (username: string, password: string): Promise<string> => {
  if (username.includes('@gordon.edu')) username = username.replace('@gordon.edu', '');
  else if (username.includes('Gordon.edu')) username = username.replace('@Gordon.edu', '');

  const loginInfo = new URLSearchParams({
    username,
    password,
    grant_type: 'password',
  });

  const request = new Request(`${base}token`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //mode: 'no-cors',
    credentials: 'include',
    body: loginInfo,
  });

  const response = await fetch(request);
  const data: { access_token: string } = await parseResponse(response);
  return data.access_token;
};

/**
 * Authenticate a user, saving the returned token for later use and caching the user's credentials
 * for refreshing the token when it expires.
 *
 * @param username Username in firstname.lastname format
 * @param password User's password
 * @returns Resolved when token is refreshed
 */
const authenticate = async (username: string, password: string) => {
  const token = await getAuth(username, password);
  storage.store('token', token);
  /* Checks to see if the Service Worker API is available before attempting to access it
   *  This is important because if the API is not available, the site will load
   *  but not allow you to login due to the error "undefined is not a function"
   */
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    // Sends the token, current term code, and a message to the service worker to update cache
    navigator.serviceWorker.controller.postMessage({
      message: 'update-cache-files',
      token: storage.get('token'),
      termCode: session.getTermCode(),
    });
    // Stores the current term in Local Storage for later use when updating the cache
    storage.store('currentTerm', session.getTermCode());
  }
};

/**
 * Check if current session is authenticated
 *
 * @description This is a naive check. The session is considered authenticated if
 * @returns Whether session is authenticated or not
 */
const isAuthenticated = () => {
  try {
    const token: string = storage.get('token');
    // Check that auth contains a token
    return token?.length > 0;
  } catch (err) {
    console.log('auth.js: error occured getting token');
    // Checks to see if Cache API is available
    if ('caches' in window) {
      /**
       * Checks to see if the Service Worker is available since these values would not exist
       * without it. If it does exist, a message is sent to the service worker to remove all of the
       * user's data from cache and to cancel all fetches since it might contain information of
       * the logged out user
       */
      if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage('remove-user-data');
        navigator.serviceWorker.controller.postMessage('cancel-fetches');
        if (localStorage.length > 0) {
          storage.remove('currentTerm');
        }
      }
    }
    return false;
  }
};

/**
 * Sign a user out
 *
 * @description Removes all data from storage and cache
 */
const signOut = () => {
  storage.remove('token');
  // Checks to see if Cache API is available before attempting to access it
  if ('caches' in window) {
    // Checks to see if Service Worker is available since these values would not exist
    // if the service worker was unavailable
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage('cancel-fetches');
      storage.remove('status');
      storage.remove('currentTerm');
    }
  }
};

export { authenticate, isAuthenticated, signOut };
