/**
 * Handle HTTP requests to the API
 *
 * @module http
 */

import { createError } from './error';
import storage from './storage';

const base = process.env.REACT_APP_API_URL;

/**
 * Make a headers object with just authentication options for use with the API
 * @description Provides the correct authorization for API requests.
 * @param {object|array} headerOptions options to put in the header, if empty only auth is added
 * @return {Headers} A headers object
 */
const makeHeaders = headerOptions => {
  if (headerOptions !== undefined) {
    try {
      const token = storage.get('token');
      let header = new Headers({
        Authorization: `Bearer ${token}`,
      });
      for (const key in headerOptions) {
        if (headerOptions.hasOwnProperty(key)) {
          header.append(key, headerOptions[key]);
        }
      }
      return header;
    } catch (err) {
      throw new Error('Token is not available');
    }
  } else {
    //default
    try {
      const token = storage.get('token');
      return new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    } catch (err) {
      throw new Error('Token is not available');
    }
  }
};

/**
 * Create a request object with the correct URL and headers for the API
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {String} method HTTP method
 * @param {object|array} body data to send with request
 * @param {object|array} headerOptions options to put in the header, if empty only auth is added
 * @return {Request} A request object
 */
const createRequest = (url, method, body, headerOptions) =>
  new Request(`${base}api/${url}`, {
    method,
    body,
    headers: makeHeaders(headerOptions),
  });

/**
 * Parse an HTTP response
 * @param {Response} res HTTP response
 * @return {Promise.<Object|Array|String|Number>} Resolves with response body; rejects on non-2xx
 * response code
 */
export const parseResponse = res => {
  // Parse body of response if not empty
  //    Make sure text of response is not empty before trying to convert it
  //    to a JSON object
  const json = res
    .text()
    .then(text => (text.length ? JSON.parse(text) : {}))
    // Handle error if response body is not valid JSON
    .catch(err => Promise.reject(createError(err, res)));

  // Handle error when response body is valid but status code is not
  if (!res.ok) {
    return json.then(data => Promise.reject(createError(data, res)));
  }
  return json;
};

/**
 * Make a request to the API
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {String} method HTTP method
 * @param {object|array} body data to send with request
 * @param {object|array} headerOptions options to send to the header, only auth is added
 * @return {Promise.<Object>} Response body
 */
const makeRequest = (url, method, body, headerOptions) =>
  fetch(createRequest(url, method, body, headerOptions)).then(parseResponse);

/**
 * Get
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const get = url => makeRequest(url, 'get');

/**
 * Put
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request
 * @return {Promise.<Object>} Response body
 */
const put = (url, body) => makeRequest(url, 'put', JSON.stringify(body));

/**
 * Post
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @param {object|array} body data to send with request, needs to be JSON object
 * @param {object|array} headerOptions options to put in the header, if not undefined options are added, if empty only auth is added
 * @return {Promise.<Object>} Response body
 */
const post = (url, body, headerOptions) => {
  if (headerOptions !== undefined) {
    return makeRequest(url, 'post', body, headerOptions);
  } else {
    return makeRequest(url, 'post', JSON.stringify(body));
  }
};

/**
 * Delete
 * @param {String} url relative URL from base, ex: `activity/023487` (no leading slash)
 * @return {Promise.<Object>} Response body
 */
const del = url => makeRequest(url, 'delete');

export default {
  del,
  get,
  post,
  put,
};
