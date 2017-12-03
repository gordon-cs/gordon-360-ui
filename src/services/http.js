/**
 * Handle HTTP requests to the API
 *
 * @module http
 */

import storage from './storage';

import { checkToken } from './auth';

const base = process.env.REACT_APP_API_URL;

/**
 * @global
 * @typedef Auth
 * @property {String} token Bearer token
 * @property {Date} expires Date/time when token expires
 */

/**
 * Make a headers object for use with the API
 * @description Provides the correct authorization for API requests.
 * @return {Headers} A headers object
 */
const makeHeaders = () => {
  try {
    const auth = storage.get('auth');
    const { token } = auth;
    return new Headers({
      Authorization: `Bearer ${token}`,
    });
  } catch (err) {
    throw new Error('User is not authenticated.');
  }
};

/**
 * Make a request object with the correct URL and headers for the API
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {String} method HTTP method
 * @param {object|array} body data to send with request
 * @return {Request} A request object
 */
const makeRequest = (url, method, body) => new Request(`${base}api/${url}`, {
  method,
  body,
  headers: makeHeaders(),
});

/**
 * Parse an HTTP response
 * @param {Response} res HTTP response
 * @return {object|array} Body of response
 */
const parseResponse = res => res.json()
  .catch(() => { throw new Error(`Got non-JSON response from request to ${res.url}`); });

/**
 * Get
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const get = url => checkToken().then(() => fetch(makeRequest(url, 'get'))).then(parseResponse);

/**
 * Put
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const put = (url, body) => checkToken().then(() => fetch(makeRequest(url, 'put', body)).then(parseResponse));

/**
 * Post
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const post = (url, body) => checkToken().then(() => fetch(makeRequest(url, 'post', body)).then(parseResponse));

/**
 * Delete
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const del = url => checkToken().then(() => fetch(makeRequest(url, 'delete')).then(parseResponse));

export default {
  del,
  get,
  post,
  put,
};
