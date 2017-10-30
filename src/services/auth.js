/**
 * Authenticate with the API
 *
 * @module auth
 */

import storage from './storage';

const base = process.env.REACT_APP_API_URL;

/**
 * Get a date/time that a token expires
 * @param {Number} secondsFromNow How many seconds until expiration
 * @return {Date} Expiration date/time of the token
 */
const getExpiration = (secondsFromNow) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + secondsFromNow);
  return now;
};

/**
 * Get auth for user from backend
 * @param {String} username Username in firstname.lastname format
 * @param {String} password User's password
 * @return {Auth}
 */
const getAuth = (username, password) => {
  const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  const body = new URLSearchParams({
    username,
    password,
    grant_type: 'password',
  });
  const request = new Request(`${base}token`, { method: 'post', headers, body });

  return fetch(request).then(res => res.json()).then(data => ({
    token: data.access_token,
    expires: getExpiration(data.expires_in),
  }));
};

/**
 * Authenticate a user, saving the returned token for later use and caching the user's credentials
 * for refreshing the token when it expires.
 * @param {String} username Username in firstname.lastname format
 * @param {String} password User's password
 * @return {Promise.<undefined>}
 */
const authenticate = (username, password) => getAuth(username, password)
  .then(auth => storage.store('auth', auth))
  .then(() => storage.store('credentials', { username, password }))
  .catch(err => console.error('Could not authenticate user:', err));

/**
 * Refresh stored token with stored credentials
 * @return {Promise.<undefined|boolean>} Returns promise that resolves when token is refreshed or
 * immediately with `false` if there are no stored credentials
 */
const refreshToken = () => {
  const { username, password } = storage.get('credentials');
  if (username && password) {
    return authenticate(username, password);
  }
  return Promise.resolve(false);
};

/**
 * Check if token is expired; refresh if necessary
 * @return {Promise.<undefined|boolean>} Returns a promise that resolves when token is refreshed
 * or immediately with `false` if token does not exist or is not expired
 */
const checkToken = () => {
  let auth;
  try {
    auth = storage.get('auth');
  } catch (err) {
    return Promise.resolve(false);
  }

  const now = new Date();
  const expires = new Date(auth.expires);
  if (now < expires) {
    return Promise.resolve(false);
  }
  return refreshToken();
};

export {
  authenticate,
  checkToken,
};
