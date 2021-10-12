/**
 * Session
 *
 * @module admin
 */

import http from './http';

/**
 * Get superadmins
 *
 * @returns {Promise.<admins>} List of superadmins
 */
const getAdmins = () => http.get(`/admins`);

/**
 * Remove superadmin with the given id
 *
 * @param {string} id Identifier for an admin
 * @returns {Promise<any>} Response body
 */
const removeAdmin = (id) => http.del(`/admins/${id}`);

/**
 * Add superadmin with the given id
 *
 * @param {string} dataURI of the superadmin being added
 * @returns {Promise<any>} Response body
 */
const addAdmin = (dataURI) => http.post(`/admins/`, dataURI);

const adminService = {
  getAdmins,
  removeAdmin,
  addAdmin,
};

export default adminService;
