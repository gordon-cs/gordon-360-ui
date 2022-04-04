/**
 * Update Alumni
 *
 * @module update
 */
import http from './http';

/**
 * @global
 * @typedef StudentInfo
 * @property {string} email_content Student's update information
 */

const requestInfoUpdate = async (
  email_content
  ) => {
  const alumniInfo = {
    Content: email_content,
  };
  http.post('profiles/updateRequest/', alumniInfo);
};
 
const updateAlumniInfo = {
  requestInfoUpdate,
};
 
export default updateAlumniInfo;