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
 * @property {String} FirstName First Name.
 * @property {boolean} GroupAdmin Boolean if Group Admin or not
 * @property {Number} IDNumber User id
 * @property {String} LastName Last Name
 * @property {Number} MembershipID Membership ID
 * @property {String} Participation Participation Code or abbreviation
 * @property {String} ParticipationDescription Participation description
 * @property {String} Privacy false if public, true if private, sometimes null
 * @property {String} SessionCode Identifier for session
 * @property {String} SessionDescription Session description
 * @property {String} StartDate Beginning date of session
 */

/**
 * @global
 * @typedef Request
 * @property {String} ActivityCode Identifier for activity
 * @property {String} ActivityDescription Activity Title
 * @property {String} CommentText Comment or text
 * @property {String} DateSent Date sent
 * @property {String} FirstName First Name
 * @property {Number} IDNumber User id
 * @property {String} LastName Last Name
 * @property {String} Participation Particpation Code or abbreviation
 * @property {String} ParticipationDescription Participation description (Advisor/Leader/Member/Guest)
 * @property {String} RequestApproved Status of request: Pending, Approved, or Denied
 * @property {Number} RequestID Request ID
 * @property {String} SessionCode Identifier for session
 * @property {String} SessionDescription Session description
 */

/**
 * Create a new membership
 * @param {Object} data Data passed in
 * @return {Promise<any>} Response
 */
function addMembership(data) {
  return http.post(`memberships`, data).catch(reason => {
    console.log(reason);
  });
}

/**
 * Approve request
 * @param {String} requestID Request object
 * @return {Promise<any>} Response
 */
const approveRequest = requestID => {
  return http.post(`requests/${requestID}/approve`);
};

/**
 * Check if user is Admin of activity
 * @param {String} id ID of user
 * @param {String} sessionCode Identifier for a session
 * @param {String} activityCode Identifier for an activity
 * @return {boolean} True if given id is a group admin, else false
 */
const checkAdmin = (id, sessionCode, activityCode) => {
  let isGroupAdmin = getAllGroupAdmins(activityCode).then(function(result) {
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
 * @param {String} requestID Request object
 * @return {Promise<any>} Response
 */
const denyRequest = requestID => {
  return http.post(`requests/${requestID}/deny`);
};

/**
 * Cancel request with given request id
 * @param {String} requestID request id
 * @return {Promise.<Object>} deleted object
 */
const cancelRequest = requestID => {
  return http.del(`requests/${requestID}`);
};

/**
 * Edit membership with given membership id
 * @param {String} id Membership id
 * @param {Object} data Data passed in
 * @return {Promise.<Object>} Response body
 */
const editMembership = (id, data) => {
  return http.put(`memberships/${id}`, data);
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

//Change the privacy value for a club membership
const toggleMembershipPrivacy = userMembership => {
  let currentMembershipPrivacy = userMembership.Privacy;
  let newMembershipPrivacy = !currentMembershipPrivacy;
  let setMembershipPrivacy = async function(value) {
    return http
      .put('/memberships/' + userMembership.MembershipID + '/privacy/' + value, value)
      .catch(reason => {
        console.log(reason);
        //TODO handle error
      });
  };
  // let transition = function () {
  userMembership.Privacy = newMembershipPrivacy;
  // }
  setMembershipPrivacy(newMembershipPrivacy);

  //   .then(transition);
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
 * Get email account details of given email
 * @param {String} email Email
 * @return {Object} Email details
 */
const getEmailAccount = async email => {
  return await http.get(`accounts/email/${email}/`);
};

/**
 * Get number of subscribers (guests) of an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {Number} Number of subscribers
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
 * Get requests for specific activity and filtered by session code
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Request[]} List of requests for activity and session
 */
const getRequests = (activityCode, sessionCode) => {
  let allRequests = http.get(`requests/activity/${activityCode}`).then(function(result) {
    return filterCurrentRequests(result, sessionCode);
  });
  return allRequests;
};

/**
 * Filters only penidng requests for an activity
 * @param {Request[]} requestsArray List of all the requests for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Request[]} Filtered requests
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
const getDiffDays = function(date) {
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
  return http.post(`requests`, data).catch(reason => {
    console.log(reason);
  });
}

/**
 * Search to see details of user with given id relating to given activtiy and session
 * @param {String} id User id
 * @param {String} sessionCode Identifier for session
 * @param {String} activityCode Identifier for activity
 * @return {Array} 3 elements: boolean if in specific activity and session, string of participation description,
 *                  and membershipID if in specific activity and session
 */
const search = (id, sessionCode, activityCode) => {
  let found = http.get(`memberships/student/${id}`).then(function(result) {
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
 * @param {Object} membershipID MembershipID of user to edit groupAdmin status
 * @param {Object} data Data passed in
 * @return {Promise<any>} Response
 */
const toggleGroupAdmin = async (membershipID, data) => {
  return await http.put(`memberships/${membershipID}/group-admin`, data);
};

export default {
  addMembership,
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
