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
 * @property {String} Privacy
 */

/**
 * Get all activities for a session, sorted alphabetically by description
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<Activity[]>}
 */
const getAll = sessionCode => http.get(`activities/session/${sessionCode}`)
  .then(activities => sortBy(activities, activity => activity.ActivityDescription));

/**
 * Get all activity types for a session
 * @param {String} sessionCode Identifier for a session
 * @return {Promise.<String[]>}
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
    filteredActivities = filteredActivities
      .filter(activity => activity.ActivityTypeDescription === typeDescription);
  }

  if (search !== '') {
    filteredActivities = filteredActivities
      .filter(({ ActivityDescription: description }) =>
        description.toLowerCase().includes(search.toLowerCase()));
  }

  return filteredActivities;
};

export default {
  getAll,
  getTypes,
  filter,
};
