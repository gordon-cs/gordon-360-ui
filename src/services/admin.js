/**
 * Session
 *
 * @module admin
 */

import http from './http';

/**
 * Get superadmins
 * @return {Promise.<admins>} List of superadmins
 */
const getAdmins = () => http.get(`/admins`);

/**
 * Remove superadmin with the given id
 * @param {String} id Identifier for an admin
 * @return {Promise<any>} Response body
 */
const removeAdmin = (id) => http.del(`/admins/${id}`);

/**
 * Add superadmin with the given id
 * @param {String} dataURI of the superadmin being added
 * @return {Promise<any>} Response body
 */
const addAdmin = (dataURI) => http.post(`/admins/`, dataURI);

export default {
  getAdmins,
  removeAdmin,
  addAdmin,
};
