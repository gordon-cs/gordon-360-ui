/**
 * ScheduleControl
 *
 * @module schedulecontrol
 */

import http from './http';

/**
 * @global
 * @typedef ScheduleControl
 * @property {number} IsSchedulePrivate Whether the schedule is private
 * @property {DateTime} ModifiedTimeStamp When the schedule was last modified
 * @property {string} Description A description of the schedule
 */

async function setSchedulePrivacy(makePrivate) {
  // 'Y' = private, 'N' = public
  await http.put('schedulecontrol/privacy/' + (makePrivate ? 'Y' : 'N'));
}

async function setScheduleDescription(Description) {
  var replaced;
  var encoded;
  replaced = Description.replace(/\//g, 'SlSh');
  replaced = replaced.replace(new RegExp(':', 'g'), 'CoLn');
  replaced = replaced.replace(/\./g, 'dOT');
  encoded = encodeURIComponent(replaced);
  await http.put('schedulecontrol/description/' + encoded);
}

/**
 * Get schedule control data for a given user or the current user if `username` is not provided
 *
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<ScheduleControl>} returns the schedule control data
 */

const getScheduleControl = async (username) => {
  let schedule;
  if (username) {
    schedule = await http.get(`schedulecontrol/${username}/`);
  } else {
    schedule = await http.get('schedulecontrol');
  }
  return schedule;
};

const scheduleControlService = {
  setSchedulePrivacy,
  setScheduleDescription,
  getScheduleControl,
};

export default scheduleControlService;
