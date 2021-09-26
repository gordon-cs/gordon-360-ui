/**
 * Session
 *
 * @module version
 */

import http from './http';

/**
 * Get the version of backend
 *
 * @returns {Promise.<string>} Session
 */
const getVersion = () => {
  let version;
  version = http.get('version');
  return version;
};

const versionService = {
  getVersion,
};

export default versionService;
