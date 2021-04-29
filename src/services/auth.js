/**
 * Authenticate with the API
 *
 * @module auth
 */

import { parseResponse } from './http';
import storage from './storage';

const base = process.env.REACT_APP_API_URL;

/**
 * Handle an authentication error
 * @param {Error} err An authentication error
 * @throws {Error} An error that can be shown to users (`error.message`)
 */
const handleError = (err) => {
  console.error('Could not authenticate user:', err);
  if (err.error && err.error_description) {
    throw new Error(err.error_description);
  } else {
    throw new Error('Something went wrong! Please contact CTS for help.');
  }
};

/**
 * Get token for user from backend
 * @param {String} username Username in firstname.lastname format
 * @param {String} password User's
 *
 * @return {String} Token for use on API requests
 */
const getAuth = (username, password) => {
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

  return fetch(request)
    .then(parseResponse)
    .then((data) => data.access_token)
    .catch(handleError);
};

/**
 * Authenticate a user, saving the returned token for later use and caching the user's credentials
 * for refreshing the token when it expires.
 * @param {String} username Username in firstname.lastname format
 * @param {String} password User's password
 * @return {Promise.<undefined>} Resolved when token is refreshed
 */
const authenticate = (username, password) =>
  getAuth(username, password)
    .then((token) => {
      storage.store('token', token);
    })
    .then(() => {
      console.log('auth.js: authenticate() - done');
    });

/**
 * Check if current session is authenticated
 * @description This is a naive check. The session is considered authenticated if
 * @return {boolean} Whether session is authenticated or not
 */
const isAuthenticated = () => {
  try {
    const token = storage.get('token');
    // Check that auth contains a token
    return token && token.length > 0;
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
