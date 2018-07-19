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
const handleError = err => {
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

  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  const body = new URLSearchParams({
    username,
    password,
    grant_type: 'password',
  });
  const request = new Request(`${base}token`, { method: 'post', headers, body });

  return fetch(request)
    .then(parseResponse)
    .then(data => data.access_token)
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
    .then(token => storage.store('token', token))
    .then(console.log('auth.js: authenticate() - done'));

/**
 * Check if current session is authenticated
 * @description This is a naive check. The session is considered authenticated if
 * @return {Promise.<boolean>} Whether session is authenticated or not
 */
const isAuthenticated = () => {
  console.log('auth.js: entered isAuthenticated()');
  try {
    // Check that auth exists
    const token = storage.get('token');
    console.log('auth.js: got token from storage');
    // Check that auth contains a token
    console.log('auth.js: checking token length');
    return token && token.length > 0;
  } catch (err) {
    console.log('auth.js: error occured getting token');
    return false;
  }
};

/**
 * Sign a user out
 * @description Removes token from storage.
 */
const signOut = () => {
  storage.remove('token');
};

export { authenticate, isAuthenticated, signOut };
