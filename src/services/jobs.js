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

/**
 * Get active jobs for current user
 * @return {Promise.<String>} User's active jobs
 */
const getActiveJobsForUser = userID => {
  return http.get(`jobs/getJobs/${userID}`);
};

export default { getE2eTestResult, getActiveJobsForUser };
