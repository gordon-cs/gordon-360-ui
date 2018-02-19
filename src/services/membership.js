/**
 * Membership
 *
 * @module membership
 */

import http from './http';

/**
 * @global
 * @typedef Member
 * @property {Number} AccountPrivate
 * @property {String} ActivityCode
 * @property {String} ActivityDescription
 * @property {String} ActivityImage
 * @property {String} ActivityImagePath
 * @property {String} Description
 * @property {String} EndDate
 * @property {String} FirstName
 * @property {String} GroupAdmin
 * @property {Number} IDNumber
 * @property {String} LastName
 * @property {Number} MembershipID
 * @property {String} Participation
 * @property {String} ParticipationDescription
 * @property {String} Privacy
 * @property {String} SessionCode
 * @property {String} SessionDescription
 * @property {String} StartDate
 */

/**
 * Create a new membership
 * @param {String} studentID Identifier for stduent
 * @return {Promise<any>} Response
 */
const addMembership = studentID => http.post(`memberships/${studentID}`);

/**
 * Get specific membership for the activity and given session code
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Member[]} List of members in given session
 */
const get = (activityCode, sessionCode) => {
  let allMembership = http.get(`memberships/activity/${activityCode}`).then(function(result) {
    return filterCurrent(result, sessionCode);
  });
  return allMembership;
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
 * Get number of followers of an activity
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
 * Get a student's list of memberships
 * @param {String} studentID Student ID
 * @return {Member[]} Array of the given student's memberships
 */
const getStudentMembership = studentID => http.get(`memberships/student/${studentID}`);

export default {
  addMembership,
  get,
  getAll,
  getAllGroupAdmins,
  getFollowersNum,
  getMembersNum,
  getStudentMembership,
};
