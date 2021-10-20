/**
 * Membership
 *
 * @module membership
 */

import http from './http';

/**
 * @global
 * @typedef Member
 * @property {number} AccountPrivate 0 if false, 1 if private
 * @property {string} ActivityCode Identifier for activity
 * @property {string} ActivityDescription Activity Title
 * @property {string} ActivityImage Often null
 * @property {string} ActivityImagePath URL path for activity image
 * @property {string} Description Comment text for membership
 * @property {string} EndDate Often null
 * @property {string} FirstName First Name.
 * @property {boolean} GroupAdmin boolean if Group Admin or not
 * @property {number} IDNumber User id
 * @property {string} LastName Last Name
 * @property {number} MembershipID Membership ID
 * @property {string} Participation Participation Code or abbreviation
 * @property {string} ParticipationDescription Participation description (eg. "Advisor", "Leader")
 * @property {string} Privacy false if public, true if private, sometimes null
 * @property {string} SessionCode Identifier for session
 * @property {string} SessionDescription Session description
 * @property {string} StartDate Beginning date of session
 */

/**
 * @global
 * @typedef Request
 * @property {string} ActivityCode Identifier for activity
 * @property {string} ActivityDescription Activity Title
 * @property {string} CommentText Comment or text
 * @property {string} DateSent Date sent
 * @property {string} FirstName First Name
 * @property {number} IDNumber User id
 * @property {string} LastName Last Name
 * @property {string} Participation Particpation Code or abbreviation
 * @property {string} ParticipationDescription Participation description (Advisor/Leader/Member/Guest)
 * @property {string} RequestApproved Status of request: Pending, Approved, or Denied
 * @property {number} RequestID Request ID
 * @property {string} SessionCode Identifier for session
 * @property {string} SessionDescription Session description
 */

/**
 * Create a new membership
 *
 * @param {Object} data Data passed in
 * @returns {Promise<any>} Response
 */
function addMembership(data) {
  return http.post('memberships', data);
}

/**
 * Create multiple new memberships
 *
 * @param {Object[]} data Data passed in
 * @returns {Bool[]} Response
 */
const addMemberships = async (dataArr) => {
  console.log('DATAARR: ' + dataArr);
  return await Promise.all(
    dataArr.map(async (data) => {
      console.log('DATA: ' + data);
      return (await http.post('memberships', data)) ? true : false;
    }),
  );
};

/**
 * Approve request
 *
 * @param {string} requestID Request object
 * @returns {Promise<any>} Response
 */
const approveRequest = (requestID) => {
  return http.post(`requests/${requestID}/approve`);
};

/**
 * Check if user is Admin of activity
 *
 * @param {string} id ID of user
 * @param {string} sessionCode Identifier for a session
 * @param {string} activityCode Identifier for an activity
 * @returns {boolean} True if given id is a group admin, else false
 */
const checkAdmin = (id, sessionCode, activityCode) => {
  let isGroupAdmin = getAllGroupAdmins(activityCode).then(function (result) {
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
 * Deny request
 *
 * @param {string} requestID Request object
 * @returns {Promise<any>} Response
 */
const denyRequest = (requestID) => {
  return http.post(`requests/${requestID}/deny`);
};

/**
 * Cancel request with given request id
 *
 * @param {string} requestID request id
 * @returns {Promise.<Object>} deleted object
 */
const cancelRequest = (requestID) => {
  return http.del(`requests/${requestID}`);
};

/**
 * Edit membership with given membership id
 *
 * @param {string} id Membership id
 * @param {Object} data Data passed in
 * @returns {Promise.<Object>} Response body
 */
const editMembership = (id, data) => {
  return http.put(`memberships/${id}`, data);
};

/**
 * Filters members for current session
 *
 * @param {Member[]} memberArray List of all members in an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {Member[]} List of filtered members for given session
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
 *
 * @param {string} activityCode Identifier for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {Member[]} List of members in given session
 */
const get = (activityCode, sessionCode) => {
  let allMembership = getAll(activityCode).then(function (result) {
    return filterCurrent(result, sessionCode);
  });
  return allMembership;
};

//Change the privacy value for a club membership
const toggleMembershipPrivacy = async (userMembership) => {
  return await http.put(
    `memberships/${userMembership.MembershipID}/privacy/${!userMembership.Privacy}`,
    !userMembership.Privacy,
  );
};

/**
 * Get all memberships
 *
 * @param {string} activityCode Identifier for an activity
 * @returns {Member[]} List of all memberships for activity
 */
const getAll = (activityCode) => http.get(`memberships/activity/${activityCode}`);

/**
 * Get all group admins
 *
 * @param {string} activityCode Identifier for an activity
 * @returns {Member[]} List of all group admins
 */
const getAllGroupAdmins = (activityCode) =>
  http.get(`memberships/activity/${activityCode}/group-admin`);

/**
 * Get email account details of given email
 *
 * @param {string} email Email
 * @returns {Object} Email details
 */
const getEmailAccount = async (email) => {
  return await http.get(`accounts/email/${email}/`);
};

/**
 * Get number of subscribers (guests) of an activity
 *
 * @param {string} activityCode Identifier for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {number} Number of subscribers
 */
const getFollowersNum = (activityCode, sessionCode) =>
  http.get(`memberships/activity/${activityCode}/followers/${sessionCode}`);

/**
 * Get number of members of an activity
 *
 * @param {string} activityCode Identifier for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {number} Number of members
 */
const getMembersNum = (activityCode, sessionCode) =>
  http.get(`memberships/activity/${activityCode}/members/${sessionCode}`);

/**
 * Get a given user's list of memberships
 *
 * @param {string} userID ID of user
 * @returns {Member[]} Array of the given student's memberships
 */
const getIndividualMembership = (userID) =>
  http.get(`memberships/student/${userID}`).then(function (result) {
    return result;
  });

/**
 * Get requests for specific activity and filtered by session code
 *
 * @param {string} activityCode Identifier for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {Request[]} List of requests for activity and session
 */
const getRequests = (activityCode, sessionCode) => {
  let allRequests = http.get(`requests/activity/${activityCode}`).then(function (result) {
    return filterCurrentRequests(result, sessionCode);
  });
  return allRequests;
};

/**
 * Filters only penidng requests for an activity
 *
 * @param {Request[]} requestsArray List of all the requests for an activity
 * @param {string} sessionCode Identifier for a session
 * @returns {Request[]} Filtered requests
 */
const filterCurrentRequests = (requestsArray, sessionCode) => {
  let filteredRequestsArray = [];
  for (var i = 0; i < requestsArray.length; i++) {
    if (
      requestsArray[i].SessionCode === sessionCode &&
      requestsArray[i].RequestApproved === 'Pending'
    ) {
      filteredRequestsArray.push(requestsArray[i]);
    }
  }
  return filteredRequestsArray;
};

// Get the difference in days bewteen today and specified date
// Returns integer and printable string
const getDiffDays = function (date) {
  let currentDate = new Date();
  let requestDate = new Date(date);
  let timeDiff = Math.abs(currentDate.getTime() - requestDate.getTime());
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  let diffString;
  if (diffDays === 0) {
    diffString = 'Today';
  } else if (diffDays === 1) {
    diffString = 'Yesterday';
  } else {
    diffString = diffDays.toString() + ' days ago';
  }
  return diffString;
};

/**
 * Remove given membershipID from membership table (Example of successful delete)
 *
 * @param {string} membershipID The membershipID to remove
 * @returns {Promise.<Object>} Response body
 */
const remove = (membershipID) => {
  return http.del(`memberships/${membershipID}`);
};

/**
 * Request membership
 *
 * @param {Object} data Data passed in
 * @returns {Promise<Object>} Response body
 */
function requestMembership(data) {
  return http.post(`requests`, data);
}

/**
 * Search to see details of user with given id relating to given activtiy and session
 *
 * @param {string} id User id
 * @param {string} sessionCode Identifier for session
 * @param {string} activityCode Identifier for activity
 * @returns {Array} 3 elements: boolean if in specific activity and session, string of participation description,
 *                  and membershipID if in specific activity and session
 */
const search = (id, sessionCode, activityCode) => {
  let found = http.get(`memberships/student/${id}`).then(function (result) {
    for (var i = 0; i < result.length; i++) {
      if (result[i].ActivityCode === activityCode) {
        if (result[i].SessionCode === sessionCode) {
          return [true, result[i].ParticipationDescription, result[i].MembershipID];
        }
      }
    }
    return [false, null, null];
  });
  return found;
};

/**
 * Toggle whether or not a member with given membershipID is a groupAdmin (Example of succesful put)
 *
 * @param {Object} membershipID MembershipID of user to edit groupAdmin status
 * @param {Object} data Data passed in
 * @returns {Promise<any>} Response
 */
const toggleGroupAdmin = async (membershipID, data) => {
  return await http.put(`memberships/${membershipID}/group-admin`, data);
};

const membershipService = {
  addMembership,
  addMemberships,
  approveRequest,
  checkAdmin,
  denyRequest,
  cancelRequest,
  editMembership,
  get,
  getAll,
  getAllGroupAdmins,
  getEmailAccount,
  getFollowersNum,
  getMembersNum,
  getIndividualMembership,
  getRequests,
  filterCurrentRequests,
  getDiffDays,
  remove,
  requestMembership,
  search,
  toggleGroupAdmin,
  toggleMembershipPrivacy,
};

export default membershipService;
