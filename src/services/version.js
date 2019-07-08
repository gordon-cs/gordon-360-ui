/**
 * Session
 *
 * @module version
 */

import http from './http';

/**
 * Get the version of backend
 * @return {Promise.<String>} Session
 */
const getVersion = () => {
  let version;
  version = http.get('version');
  return version;
};

export default {
  getVersion,
};
