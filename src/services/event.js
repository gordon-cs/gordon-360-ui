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
 * @typedef EventOccurrence
 * @property {string} StartDate The datetime, as a string, when the occurence begins
 * @property {string} EndDate The datetime, as a string, when the occurence ends
 * @property {string} Location The location of the occurence
 */

/**
 * @global
 * @typedef Event
 * @property {String} Event_ID
 * @property {String} Event_Name
 * @property {String} Event_Title
 * @property {boolean} HasCLAWCredit
 * @property {String} Description
 * @property {EventOccurrence[]} Occurrences
 */

/**
 * Get all events
 * @return {Promise.<Event[]>} returns all the events
 */

const getAllEvents = () => http.get('events/25Live/All');

const getAllCLAWEvents = () => http.get('events/25Live/CLAW');

const getAllGuestEvents = () => http.get('events/25Live/Public');

/**
 *  Format an event for display on the front end
 * @param {Event} event The event to format
 * @returns {Event} The formatted event
 */
function formatevent(event) {
  if (event.Occurrences[0]) {
    let beginTime = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('t');
    let endTime = DateTime.fromISO(event.Occurrences[0].EndDate).toFormat('t');
    event.timeRange = `${beginTime} - ${endTime}`;
    event.date = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('LLL d, yyyy');
  }

  event.title = event.Event_Title || event.Event_Name;

  event.location = event.Occurrences[0].Location || 'No Location Listed';

  if (!event.Description) {
    event.Description = 'No description available';
  }

  // Remove markup from event description.
  event.Description = event.Description.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(
    /<\/?[^>]+(>|$)/g,
    ' ',
  );

  return event;
}

function filterbyCategory(filters, allEvents) {
  let filteredEvents = [];
  if (
    filters.chapelOffice ||
    filters.art ||
    filters.cec ||
    filters.admissions ||
    filters.sports ||
    filters.studentLife ||
    filters.chapelCredits
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
      } else if (filters.admissions && allEvents[i].Organization === 'Admissions') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.sports && allEvents[i].Organization === 'Athletics') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.studentLife && allEvents[i].Organization === 'Office of Student Life') {
        filteredEvents.push(allEvents[i]);
      } else if (filters.chapelCredits && allEvents[i].HasCLAWCredit) {
        filteredEvents.push(allEvents[i]);
      }
    }
  } else {
    filteredEvents = null;
  }
  return filteredEvents;
}

function sortByTime(a, b) {
  if (a.Occurrences[0].StartDate < b.Occurrences[0].StartDate) {
    return -1;
  }
  if (a.Occurrences[0].StartDate > b.Occurrences[0].StartDate) {
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
    const startDate = new Date(allEvents[i].Occurrences[0].StartDate).getTime();

    if (startDate > date) {
      chapelEvents.push(allEvents[i]);
    }
    formatevent(allEvents[i]);
  }
  return chapelEvents.sort(sortByTime);
};

//Takes parameter of all events(formatted) so getting from database is not needed
const getFutureEvents = (allEvents) => {
  const futureEvents = [];
  const date = new Date().getTime();
  allEvents.sort(sortByTime);
  for (let i = 0; i < allEvents.length; i += 1) {
    const startDate = new Date(allEvents[i].Occurrences[0].StartDate).getTime();
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

//Calls getAllGuestEvents to get from database and then formats events
const getAllGuestEventsFormatted = async () => {
  const allGuest = await getAllGuestEvents();
  const events = [];
  allGuest.sort(sortByTime);
  for (let i = 0; i < allGuest.length; i += 1) {
    events.push(allGuest[i]);
    formatevent(allGuest[i]);
  }
  return events.sort(sortByTime);
};

const getFilteredEvents = (filters) => {
  const allEvents = filters.events;
  let filteredEvents = [];
  let shownEvents = [];
  filteredEvents = filterbyCategory(filters, allEvents);
  if (filteredEvents === null) {
    filteredEvents = allEvents;
  }

  if (filters.search !== '') {
    shownEvents = [];
    for (let i = 0; i < filteredEvents.length; i++) {
      // search through the event title
      if (filteredEvents[i].title.toLowerCase().includes(filters.search.toLowerCase())) {
        shownEvents.push(filteredEvents[i]);
        // search through the date
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
  getAllGuestEvents,
  getAllGuestEventsFormatted,
};
