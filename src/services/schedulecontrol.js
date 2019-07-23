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
 */


async function setSchedulePrivacy(makePrivate) {
  // 'Y' = private, 'N' = public
  await http.put('schedulecontrol/privacy/' + (makePrivate ? 'Y' : 'N'));
}

async function setScheduleDescription(Description) {
  var replaced;
  var encoded;
  replaced = Description.replace(/\//g, "SlSh");
  replaced = replaced.replace(new RegExp(':', 'g'), "CoLn");
  replaced = replaced.replace(/\./g, "dOT");
  encoded = encodeURIComponent(replaced);
  await http.put('schedulecontrol/description/' + encoded);
  
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
  setScheduleDescription,
  getScheduleControl,
};
