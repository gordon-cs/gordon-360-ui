/**
 * Membership
 *
 * @module membership
 */

import http from './http';

/**
 * @global
 * @typedef Member
 * @property {Number} AccountPrivate 0 if false, 1 if private
 * @property {String} ActivityCode Identifier for activity
 * @property {String} ActivityDescription Activity Title
 * @property {String} ActivityImage Often null
 * @property {String} ActivityImagePath URL path for activity image
 * @property {String} Description Comment text for membership
 * @property {String} EndDate Often null
 * @property {String} FirstName First Name
 * @property {boolean} GroupAdmin Boolean if Group Admin or not
 * @property {Number} IDNumber User id
 * @property {String} LastName Last Name
 * @property {Number} MembershipID Membership ID
 * @property {String} Participation Participation Code or abbreviation
 * @property {String} ParticipationDescription Participation description
 * @property {String} Privacy 0 if not private, 1 if private, sometimes null
 * @property {String} SessionCode Identifier for session
 * @property {String} SessionDescription Session description
 * @property {String} StartDate Beginning date of session
 */

/**
 * Create a new membership
 * @param {*} data Data passed in
 * @return {Promise<any>} Response
 */
function addMembership(data) {
  return http.post(`memberships`, data).catch(reason => {
    console.log(reason);
  });
}

/**
 * Check if user is Admin of activity
 * @param {String} id ID of user
 * @param {String} sessionCode Identifier for a session
 * @param {String} activityCode Identifier for an activity
 * @return {boolean} True if given id is a group admin, else false
 */
const checkAdmin = (id, sessionCode, activityCode) => {
  let isGroupAdmin = http
    .get(`memberships/activity/${activityCode}/group-admin`)
    .then(function(result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].ActivityCode === activityCode) {
          if (result[i].SessionCode === sessionCode) {
            if (result[i].IDNumber === parseInt(id, 10)) {
              return true;
            }
          }
        }
      }
      return false;
    });
  return isGroupAdmin;
};

/**
 * Filters members for current session
 * @param {Member[]} memberArray List of all members in an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Member[]} List of filtered members for given session
 */
const filterCurrent = (memberArray, sessionCode) => {
  let currentSessionMembership = [];
  for (var i = 0; i < memberArray.length; i++) {
    if (memberArray[i].SessionCode === sessionCode) {
      currentSessionMembership.push(memberArray[i]);
    }
  }
  return currentSessionMembership;
};

/**
 * Get specific membership for the activity and given session code
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Member[]} List of members in given session
 */
const get = (activityCode, sessionCode) => {
  let allMembership = getAll(activityCode).then(function(result) {
    return filterCurrent(result, sessionCode);
  });
  return allMembership;
};

/**
 * Get all memberships
 * @param {String} activityCode Identifier for an activity
 * @return {Member[]} List of all memberships for activity
 */
const getAll = activityCode => http.get(`memberships/activity/${activityCode}`);

/**
 * Get all group admins
 * @param {String} activityCode Identifier for an activity
 * @return {Member[]} List of all group admins
 */
const getAllGroupAdmins = activityCode =>
  http.get(`memberships/activity/${activityCode}/group-admin`);

/**
 * Get number of followers (guests) of an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {Number} Number of followers
 */
const getFollowersNum = (activityCode, sessionCode) =>
  http.get(`memberships/activity/${activityCode}/followers/${sessionCode}`);

/**
 * Get number of members of an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {Number} Number of members
 */
const getMembersNum = (activityCode, sessionCode) =>
  http.get(`memberships/activity/${activityCode}/members/${sessionCode}`);

/**
 * Get a given user's list of memberships
 * @param {String} userID ID of user
 * @return {Member[]} Array of the given student's memberships
 */
const getIndividualMembership = userID =>
  http.get(`memberships/student/${userID}`).then(function(result) {
    return result;
  });

/**
 * Remove given membershipID from membership table (Example of successful delete)
 * @param {String} membershipID The membershipID to remove
 * @return {Promise.<Object>} Response body
 */
const remove = membershipID => {
  return http.del(`memberships/${membershipID}`);
};

/**
 * Request membership
 * @param {Object} data Data passed in
 * @return {Promise<Object>} Response body
 */
function requestMembership(data) {
  console.log(data);
  return http.post(`requests`, data).catch(reason => {
    console.log(reason);
  });
}

/**
 * Search to see details of user with given id relating to given activtiy and session
 * @param {String} id User id
 * @param {String} sessionCode Identifier for session
 * @param {String} activityCode Identifier for activity
 * @return {Array[]} 3 elements: boolean if in specific activity and session, boolean if guest,
 *                  and membershipID if in specific activity and session
 */
const search = (id, sessionCode, activityCode) => {
  let found = http.get(`memberships/student/${id}`).then(function(result) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].ActivityCode === activityCode) {
        if (result[i].SessionCode === sessionCode) {
          if (result[i].Participation === 'GUEST') {
            return [true, true, result[i].MembershipID];
          }
          return [true, false, result[i].MembershipIDnull];
        }
      }
    }
    return [false, false, null];
  });
  return found;
};

/**
 * Toggle whether or not a member with given membershipID is a groupAdmin (Example of succesful put)
 * @param {Object} membershipID MembershipID of user to edit groupAdmin status
 * @param {Object} data Data passed in
 * @return {Promise<any>} Response
 */
const toggleGroupAdmin = (membershipID, data) => {
  return http.put(`memberships/${membershipID}/group-admin`, data);
};

export default {
  addMembership,
  checkAdmin,
  get,
  getAll,
  getAllGroupAdmins,
  getFollowersNum,
  getMembersNum,
  getIndividualMembership,
  remove,
  requestMembership,
  search,
  toggleGroupAdmin,
};
