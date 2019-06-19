/**
 * Schedule
 *
 * @module schedule
 */
import { DateTime } from 'luxon';
import http from './http';

/**
 * The first element is the start time of the course, the second element is the end time of the
 * course, and the third element is the location of the course.
 * @global
 * @typedef {Array} ScheduleOccurrence
 * @example
 * [
 *   "2017-11-18T19:00:00-05:00",
 *   "2017-11-18T22:00:00-05:00",
 *   "KOSC 221"
 * ]
 */

/**
 * @global
 * @typedef Schedule
 * @property {String} Schedule_ID
 * @property {String} Schedule_Name
 * @property {String} Schedule_Title
 * @property {Number} Schedule_userID
 * @property {String} Schedule_Description
 * @property {ScheduleOccurrence[]} Occurrences
 */

/**
 * Get all events
 * @return {Promise.<Event[]>} returns all the events
 */

const getAllSchedule = () => http.get('schedule/getAll');

function formatSchedule(schedule) {
  let beginTime;
  let endTime;
  if (schedule.Occurrences[0] && schedule.Occurrences[0][0] && schedule.Occurrences[0][1]) {
    beginTime = DateTime.fromISO(schedule.Occurrences[0][0]).toFormat('t');
    endTime = DateTime.fromISO(schedule.Occurrences[0][1]).toFormat('t');
  }
  const timeRange = `${beginTime} - ${endTime}`;
  schedule.timeRange = timeRange;

  let date;
  if (schedule.Occurrences[0] && schedule.Occurrences[0][0]) {
    date = DateTime.fromISO(schedule.Occurrences[0][0]).toFormat('LLL d, yyyy');
  }
  schedule.date = date;

  let title;
  if (schedule.Schedule_Title === '') {
    title = schedule.Schedule_Name;
  } else {
    title = schedule.Schedule_Title;
  }
  schedule.title = title;

  let location;
  if (schedule.Occurrences[0] && schedule.Occurrences[0][2]) {
    location = `${schedule.Occurrences[0][2]} `;
  } else {
    location = 'No location Listed';
  }
  schedule.location = location;

  if (schedule.Description) {
    if (schedule.Description === '' || schedule.Description.substring(0, 4) === '<res') {
      schedule.Description = 'No description available';
    }
    schedule.Description = schedule.Description.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(
      /<\/?[^>]+(>|$)/g,
      ' ',
    );
  }
  return schedule;
}

//Calls getAllEvents to get from database and then formats events
const getAllScheduleFormatted = async () => {
  const allSchedule = await getAllSchedule();
  const schedule = [];
  allSchedule.sort(sortByTime);
  for (let i = 0; i < allSchedule.length; i += 1) {
    schedule.push(allSchedule[i]);
    formatSchedule(allSchedule[i]);
  }
  return schedule.sort(sortByTime);
};

function sortByTime(a, b) {
  if (a.Occurrences[0][0] < b.Occurrences[0][0]) {
    return -1;
  }
  if (a.Occurrences[0][0] > b.Occurrences[0][0]) {
    return 1;
  }
  return 0;
}

//Takes parameter of all events(formatted) so getting from database is not needed
const getFutureEvents = allEvents => {
  const futureEvents = [];
  const date = new Date().getTime();
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    const startDate = new Date(allEvents[i].Occurrences[0][0]).getTime();
    if (startDate > date) {
      futureEvents.push(allEvents[i]);
    }
  }
  return futureEvents.sort(sortByTime);
};

export default {
  getAllSchedule,
  getAllScheduleFormatted,
  formatSchedule,
};
