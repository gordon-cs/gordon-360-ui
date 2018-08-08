/**
 * Activity
 *
 * @module activity
 */

import sortBy from 'lodash/sortBy';

import http from './http';

/**
 * @global
 * @typedef Activity
 * @property {String} ActivityBlurb
 * @property {String} ActivityCode
 * @property {String} ActivityDescription
 * @property {String} ActivityImagePath
 * @property {String} ActivityJoinInfo
 * @property {String} ActivityType
 * @property {String} ActivityTypeDescription
 * @property {String} ActivityURL
 * @property {String} Privacy Whether the club is private or public to everyone, such as a scholars group etc. false=public true=private
 */

/**
 * @global
 * @typedef Person
 * @property {String} FirstName First name
 * @property {String} LastName Last name
 * @property {Stirng} Email Email address
 */

/**
 * Close out an activity, like confirm final roster
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Promise<any>} Response body
 */
const closeActivity = async (activityCode, sessionCode) => {
  return await http.put(`activities/${activityCode}/session/${sessionCode}/close`, null);
};
/**
 * Edit activity
 * @param {String} activityCode Identifier for an activity
 * @param {Object} data Data passed in
 * @return {Promise.<Object>} Response body
 */
const editActivity = async (activityCode, data) => {
  return await http.put(`activities/${activityCode}`, data);
};

/**
 * Sets image to new image
 * @param {String} activityCode Identifier for an activity
 * @param {string} dataURI of the image being uploaded
 * @return {Promis<any>} Response body
 */
const setActivityImage = (activityCode, dataURI) => {
  let imageData = new FormData();
  let blob = dataURItoBlob(dataURI);
  let type = blob.type.replace('image/', '');
  let headerOptions = {};
  imageData.append('canvasImage', blob, 'canvasImage.' + type);
  return http.post(`activities/${activityCode}/image/`, imageData, headerOptions);
};

// convert data to blob
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

/**
 * Get an activity
 * @param {String} activityCode Identifier for an activity
 * @return {Promise.<Activity>} Activity
 */
const get = activityCode => http.get(`activities/${activityCode}`);

/**
 * Get advisors for an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {Person[]} List of advisors
 */
const getAdvisors = (activityCode, sessionCode) =>
  http.get(`emails/activity/${activityCode}/advisors/session/${sessionCode}`);

/**
 * Get all activities for a session, sorted alphabetically by description
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<Activity[]>} List of activities
 */
const getAll = sessionCode =>
  http
    .get(`activities/session/${sessionCode}`)
    .then(activities => sortBy(activities, activity => activity.ActivityDescription));

/**
 * Get group administrators for an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {Person[]} List of group administrators
 */
const getGroupAdmins = (activityCode, sessionCode) =>
  http.get(`emails/activity/${activityCode}/group-admin/session/${sessionCode}`);

/**
 * Get the status of an activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @returns {String} Status
 */
const getStatus = (activityCode, sessionCode) =>
  http.get(`activities/${sessionCode}/${activityCode}/status`);

/**
 * Get all activity types for a session
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<String[]>} List of activity types for a session
 */
const getTypes = sessionCode => http.get(`activities/session/${sessionCode}/types`);

/**
 * Filter a list of activities by type and description
 * @param {Activity[]} [activities=[]] List of activities
 * @param {String} typeDescription Activity type description to match exactly against
 * @param {String} [search=''] Search value to fuzzy match description against
 * @return {Activity[]} Filtered activities
 */
const filter = (activities = [], typeDescription, search = '') => {
  let filteredActivities = activities;
  if (typeDescription) {
    filteredActivities = filteredActivities.filter(
      activity => activity.ActivityTypeDescription === typeDescription,
    );
  }

  if (search !== '') {
    filteredActivities = filteredActivities.filter(({ ActivityDescription: description }) =>
      description.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return filteredActivities;
};

/**
 * Reopen a closed activity
 * @param {String} activityCode Identifier for an activity
 * @param {String} sessionCode Identifier for a session
 * @return {Promise<any>} Response body
 */
const reopenActivity = async (activityCode, sessionCode) => {
  return await http.put(`activities/${activityCode}/session/${sessionCode}/open`, null);
};

/**
 * Resets image to default image
 * @param {String} activityCode Identifier for an activity
 * @return {Promis<any>} Response body
 */
const resetImage = async activityCode => {
  return await http.post(`activities/${activityCode}/image/reset`, null);
};

export default {
  closeActivity,
  editActivity,
  setActivityImage,
  get,
  getAdvisors,
  getAll,
  getGroupAdmins,
  getStatus,
  getTypes,
  filter,
  reopenActivity,
  resetImage,
};
