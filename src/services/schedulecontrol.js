/**
 * ScheduleControl
 *
 * @module schedulecontrol
 */

import http from './http';

/**
 * @global
 * @typedef ScheduleControl
 * @property {Number} IsSchedulePrivate
 * @property {DateTime} ModifiedTimeStamp
 * @property {String} Description
 * @property {Number} gordon_id
 */

/**
 @example
{
    "IsSchedulePrivate": 0,
    "ModifiedTimeStamp": null,
    "Description": "It is my description",
    "gordon_id": "50179789"
}
*/

async function setSchedulePrivacy(makePrivate) {
  // 'Y' = private, 'N' = public
  await http.put('schedulecontrol/schedule_privacy/update/' + (makePrivate ? 'Y' : 'N'));
}

async function setModifiedTimeStamp(TimeStamp) {
  // TimeStamp should be converted to string
  await http.put('schedulecontrol/timestamp/update/' + TimeStamp);
}

async function setScheduleDescription(Description) {
  await http.put('schedulecontrol/description/update/' + Description);
}

/**
 * Get schedule control data for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<ScheduleControl>} returns the schedule control data
 */

const getScheduleControl = async username => {
  let schedule;
  if (username) {
    schedule = await http.get(`schedulecontrol/${username}/`);
  } else {
    schedule = await http.get('schedulecontrol');
  }
  return schedule;
};

export default {
  setSchedulePrivacy,
  setModifiedTimeStamp,
  setScheduleDescription,
  getScheduleControl,
};
