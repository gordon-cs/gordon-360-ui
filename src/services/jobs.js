/**
 *
 * @module jobs
 */

import http from './http';

/**
 * Activate our hello world test
 * @return {Promise.<String>} E2e test result
 */
const getE2eTestResult = () => {
  return http.get(`jobs/hello-world`);
};

export default { getE2eTestResult };
