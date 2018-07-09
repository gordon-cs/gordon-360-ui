/**
 * Event
 *
 * @module event
 */
import { DateTime } from 'luxon';
import http from './http';

/**
 * The first element is the start time of the event, the second element is the end time of the
 * event, and the third element is the location of the event.
 * @global
 * @typedef {Array} EventOccurrence
 * @example
 * [
 *   "2017-11-18T19:00:00-05:00",
 *   "2017-11-18T22:00:00-05:00",
 *   "Tavilla Hall 126 - Conference Room"
 * ]
 */

/**
 * @global
 * @typedef Event
 * @property {String} Event_ID
 * @property {String} Event_Name
 * @property {String} Event_Title
 * @property {String} Event_Type_Name
 * @property {Number} Category_Id
 * @property {String} Description
 * @property {EventOccurrence[]} Occurrences
 */

/**
 * Get all events
 * @return {Promise.<Event[]>} returns all the events
 */

const getAllEvents = () => http.get('events/25Live/All');

const getAllCLAWEvents = () => http.get('/events/25Live/CLAW');

function formatevent(event) {
  let beginTime;
  let endTime;
  if (event.Occurrences[0] && event.Occurrences[0][0] && event.Occurrences[0][1]) {
    beginTime = DateTime.fromISO(event.Occurrences[0][0]).toFormat('t');
    endTime = DateTime.fromISO(event.Occurrences[0][1]).toFormat('t');
  }
  const timeRange = `${beginTime} - ${endTime}`;
  event.timeRange = timeRange;

  let date;
  if (event.Occurrences[0] && event.Occurrences[0][0]) {
    date = DateTime.fromISO(event.Occurrences[0][0]).toFormat('LLL d, yyyy');
  }
  event.date = date;

  let title;
  if (event.Event_Title === '') {
    title = event.Event_Name;
  } else {
    title = event.Event_Title;
  }
  event.title = title;

  let location;
  if (event.Occurrences[0] && event.Occurrences[0][2]) {
    location = `${event.Occurrences[0][2]} `;
  } else {
    location = 'No location Listed';
  }
  event.location = location;

  if (event.Description) {
    if (event.Description === '' || event.Description.substring(0, 4) === '<res') {
      event.Description = 'No description available';
    }
    event.Description = event.Description.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(
      /<\/?[^>]+(>|$)/g,
      ' ',
    );
  }
  return event;
}
function filterbyCatagory(filters, allEvents) {
  let filteredEvents = [];
  if (
    filters.chapelOffice ||
    filters.art ||
    filters.cec ||
    filters.calendar ||
    filters.admissions ||
    filters.sports ||
    filters.studentLife ||
    filters.fair ||
    filters.academics
  ) {
    for (let i = 0; i < allEvents.length; i++) {
      if (filters.chapelOffice && allEvents[i].Organization === 'Chapel Office') {
        filteredEvents.push(allEvents[i]);
      } else if (
        filters.art &&
        (allEvents[i].Organization === 'Music Department' ||
          allEvents[i].Organization === 'Theatre' ||
          allEvents[i].Organization === 'Art Department')
      ) {
        filteredEvents.push(allEvents[i]);
      } else if (filters.cec && allEvents[i].Organization === 'Campus Events Council (CEC)') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.calendar && allEvents[i].Event_Type_Name === 'Calendar Announcement') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.admissions && allEvents[i].Organization === 'Admissions') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.sports && allEvents[i].Organization === 'Athletics') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.studentLife && allEvents[i].Organization === 'Office of Student Life') {
        filteredEvents.push(allEvents[i]);
      } else if (
        filters.fair &&
        (allEvents[i].Event_Type_Name === 'Festival' ||
          allEvents[i].Event_Type_Name === 'Exhibition' ||
          allEvents[i].Event_Type_Name === 'Fair/Expo')
      ) {
        filteredEvents.push(allEvents[i]);
      } else if (
        filters.academics &&
        (allEvents[i].Event_Type_Name === 'Research Project' ||
          allEvents[i].Event_Type_Name === 'Lecture/Speaker/Forum')
      ) {
        filteredEvents.push(allEvents[i]);
      }
    }
  } else {
    filteredEvents = null;
  }
  return filteredEvents;
}

function sortByTime(a, b) {
  if (a.Occurrences[0][0] < b.Occurrences[0][0]) {
    return -1;
  }
  if (a.Occurrences[0][0] > b.Occurrences[0][0]) {
    return 1;
  }
  return 0;
}

const getCLWEvents = async () => {
  const allEvents = await getAllCLAWEvents();
  const chapelEvents = [];
  const date = new Date().getTime();
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    const startDate = new Date(allEvents[i].Occurrences[0][0]).getTime();

    if (startDate > date) {
      chapelEvents.push(allEvents[i]);
    }
    formatevent(allEvents[i]);
  }
  return chapelEvents.sort(sortByTime);
};

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

//Calls getAllEvents to get from database and then formats events
const getAllEventsFormatted = async () => {
  const allEvents = await getAllEvents();
  const events = [];
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    events.push(allEvents[i]);
    formatevent(allEvents[i]);
  }
  return events.sort(sortByTime);
};

const getFilteredEvents = filters => {
  const allEvents = filters.events;
  let filteredEvents = [];
  let shownEvents = [];
  filteredEvents = filterbyCatagory(filters, allEvents);
  if (filteredEvents === null) {
    filteredEvents = allEvents;
  }

  if (filters.chapelCredits) {
    for (let k = 0; k < filteredEvents.length; k++) {
      if (filteredEvents[k].Category_Id === '85') {
        shownEvents.push(filteredEvents[k]);
      }
    }
    filteredEvents = shownEvents;
  }

  if (filters.search !== '') {
    shownEvents = [];
    for (let i = 0; i < filteredEvents.length; i++) {
      // search through the event title
      if (filteredEvents[i].title.toLowerCase().includes(filters.search.toLowerCase())) {
        shownEvents.push(filteredEvents[i]);
        // search through the datezZ
      } else if (filteredEvents[i].timeRange.toLowerCase().includes(filters.search.toLowerCase())) {
        shownEvents.push(filteredEvents[i]);
        // search through the event times
      } else if (filteredEvents[i].date.toLowerCase().includes(filters.search.toLowerCase())) {
        shownEvents.push(filteredEvents[i]);
        // search through the location
      } else if (filteredEvents[i].location.toLowerCase().includes(filters.search.toLowerCase())) {
        shownEvents.push(filteredEvents[i]);
      }
    }
    filteredEvents = shownEvents;
  }
  return filteredEvents;
};

export default {
  getAllEvents,
  getAllEventsFormatted,
  getFutureEvents,
  getCLWEvents,
  getFilteredEvents,
  formatevent,
};
