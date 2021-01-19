/**
 * Event
 *
 * @module event
 */
import { DateTime } from 'luxon';
import http from './http';
import session from './session';

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
 * @property {String} Event_ID The ID of the event, from 25Live
 * @property {String} Event_Name The internal name of the event
 * @property {String} Event_Title The title, to be displayed, of the event
 * @property {boolean} HasCLAWCredit Whether the event offers CL&W Credit
 * @property {String} Description The description of the event
 * @property {EventOccurrence[]} Occurrences All scheduled occurrences of the event
 */

/**
 * @global
 * @typedef AttendedEvent
 * @property {String} CHDate The date and time that the user received CL&W credit
 * @property {String} CHTermCD Term code of the event
 * @property {String} Description Given description of the event
 * @property {String} Event_Name The generic name of the event
 * @property {String} Event_Title Specific title of the event
 * @property {EventOccurrence[]} Occurrences All scheduled occurrences of the event
 * @property {String} Organization Organization hosting the event
 * @property {Number} Required Required CL&W credits for the user
 */

/**
 * Gets all events from the backend, and then formats and sorts them
 * @returns {Event[]} All events
 */
const getAllEvents = async () => {
  const allEvents = await http.get('events/25Live/All');
  return allEvents.map((e) => formatevent(e)).sort(sortEventsByTime);
};

/**
 * Gets upcoming CL&W events and formats them for display
 * TODO: Unused. Consider removing
 * @returns {Event[]} upcoming CL&W events
 */
const getCLWEvents = async () => {
  const allEvents = await http.get('events/25Live/CLAW');
  const now = Date.now();
  return allEvents
    .filter((e) => new Date(e.Occurrences[0].StartDate).getTime() > now)
    .map((e) => formatevent(e))
    .sort(sortEventsByTime);
};

/**
 * Gets all public events from the backend, and then formats and sorts them
 * @returns {Event[]} All events
 */
const getAllGuestEvents = async () => {
  const allGuest = await http.get('events/25Live/Public');
  return allGuest.map((e) => formatevent(e)).sort(sortEventsByTime);
};

/**
 * Get chapel events attended by the user during the current term
 * @return {AttendedEvent[]} all CL&W events attended by the user, formatted and sorted
 */
const getAttendedChapelEvents = async () => {
  const termCode = session.getTermCode();
  let attendedEvents = await http.get(`events/chapel/${termCode}`);
  return attendedEvents.map((e) => formatevent(e)).sort(sortAtndEventsByTime);
};

/**
 *  Format an event for display on the front end
 * @param {Event} event The event to format
 * @returns {Event} The formatted event
 */
function formatevent(event) {
  let formattedEvent = { ...event };
  if (event.Occurrences?.[0]) {
    const beginTime = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('t');
    const endTime = DateTime.fromISO(event.Occurrences[0].EndDate).toFormat('t');
    formattedEvent.timeRange = `${beginTime} - ${endTime}`;
    formattedEvent.date = DateTime.fromISO(event.Occurrences[0].StartDate).toFormat('LLL d, yyyy');
  }

  formattedEvent.title = event.Event_Title || event.Event_Name;

  formattedEvent.location = event.Occurrences?.[0]?.Location || 'No Location Listed';

  if (!formattedEvent.Description) {
    formattedEvent.Description = 'No description available';
  } else {
    // Remove markup from event description.
    formattedEvent.Description = formattedEvent.Description.replace(
      /&(#[0-9]+|[a-zA-Z]+);/g,
      ' ',
    ).replace(/<\/?[^>]+(>|$)/g, ' ');
  }

  return formattedEvent;
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

/**
 * Compares two events by the time of their first occurrence
 * @param {Event} a the first event to compare
 * @param {Event} b the second event to compare
 * @returns {int} the sort order of the two events. -1 if a is first, 1 if b is first, 0 otherwise
 */
function sortEventsByTime(a, b) {
  const timeA = a.Occurrences[0].StartDate;
  const timeB = b.Occurrences[0].StartDate;

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
}

/**
 * Sorts attended CL&W events by time. Time in this case can be either
 * the first occurrence of the event, or the time when the user received credit (CHDate).
 * CHDate can be significantly after the time the event occurred, because of processing delays.
 *
 * @param {AttendedEvent} a the first event to compare
 * @param {AttendedEvent} b the second event to compare
 * @returns {int} -1 if a's time is less than b's, 1 if it's more, 0 if they're equal
 */
function sortAtndEventsByTime(a, b) {
  const timeA = a.Occurrences?.[0]?.StartDate || a.CHDate;
  const timeB = b.Occurrences?.[0]?.StartDate || b.CHDate;

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
}

/**
 * Filters events for only those whose first occurrence is in the future
 * @param {Event[]} allEvents The events to filter
 * @returns {Event[]} all events that occur in the future
 */
const getFutureEvents = (allEvents) => {
  const now = Date.now();
  return allEvents
    .filter((e) => new Date(e.Occurrences[0].StartDate).getTime() > now)
    .sort(sortEventsByTime);
};

/**
 * Filters events based on the active filters and search text
 * TODO: Refactor to take in an explicit events array, search text, and list of filters.
 *       Currently, the Events component is passing it's entire state, which is poor encapsulation
 *       and makes this method much less reusable.
 * @param {Object} filters the events and filters to use
 * @returns {Event[]} The filtered events
 */
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
  getFutureEvents,
  getCLWEvents,
  getFilteredEvents,
  getAllGuestEvents,
  getAttendedChapelEvents,
};
