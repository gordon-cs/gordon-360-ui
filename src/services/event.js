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
 *
 * @global
 * @typedef EventOccurrence
 * @property {string} StartDate The datetime, as a string, when the occurence begins
 * @property {string} EndDate The datetime, as a string, when the occurence ends
 * @property {string} Location The location of the occurence
 */

/**
 * @global
 * @typedef Event
 * @property {string} Event_ID The ID of the event, from 25Live
 * @property {string} Event_Name The internal name of the event
 * @property {string} Event_Title The title, to be displayed, of the event
 * @property {boolean} HasCLAWCredit Whether the event offers CL&W Credit
 * @property {string} Description The description of the event
 * @property {EventOccurrence[]} Occurrences All scheduled occurrences of the event
 */

/**
 * @global
 * @typedef AttendedEvent
 * @property {string} CHDate The date and time that the user received CL&W credit
 * @property {string} CHTermCD Term code of the event
 * @property {string} Description Given description of the event
 * @property {string} Event_Name The generic name of the event
 * @property {string} Event_Title Specific title of the event
 * @property {EventOccurrence[]} Occurrences All scheduled occurrences of the event
 * @property {string} Organization Organization hosting the event
 * @property {number} Required Required CL&W credits for the user
 */

/**
 * Gets all events from the backend, and then formats and sorts them
 *
 * @returns {Promise<Event[]>} All events
 */
const getAllEvents = async () => {
  const allEvents = await http.get('events/25Live/All');
  return allEvents.map((e) => formatevent(e)).sort(sortEventsByTime);
};

/**
 * Gets upcoming CL&W events and formats them for display
 * TODO: Unused. Consider removing
 *
 * @returns {Promise<Event[]>} upcoming CL&W events
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
 *
 * @returns {Promise<Event[]>} All events
 */
const getAllGuestEvents = async () => {
  const allGuest = await http.get('events/25Live/Public');
  return allGuest.map((e) => formatevent(e)).sort(sortEventsByTime);
};

/**
 * Get chapel events attended by the user during the current term
 *
 * @returns {Promise<AttendedEvent[]>} all CL&W events attended by the user, formatted and sorted
 */
const getAttendedChapelEvents = async () => {
  const termCode = session.getTermCode();
  let attendedEvents = await http.get(`events/chapel/${termCode}`);
  return attendedEvents.map((e) => formatevent(e)).sort(sortAtndEventsByTime);
};

/**
 *  Format an event for display on the front end
 *
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

/**
 * Compares two events by the time of their first occurrence
 *
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
 *
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
 * The list of valid event filters
 */
export const EVENT_FILTERS = Object.freeze([
  'CLW Credits',
  'Admissions',
  'Arts',
  'Athletics',
  'CEC',
  'Chapel Office',
  'Student Life',
]);

/**
 * Filter a list of events for a given list of filters and a given search string
 *
 * @param {Event[]} events the events to filter
 * @param {string[]} filters the list of filters to use
 * @param {string} search the string to search against
 * @returns {Event[]} The filtered list of events
 */
const getFilteredEvents = (events, filters, search) => {
  const matchesSearch = makeMatchesSearch(search);
  const matchesFilters = makeMatchesFilters(filters);
  if (search && filters.length) {
    return events.filter((event) => matchesSearch(event) && matchesFilters(event));
  } else if (search) {
    return events.filter(matchesSearch);
  } else if (filters.length) {
    return events.filter(matchesFilters);
  } else {
    return events;
  }
};

/**
 * Make a closure over a search string.
 *
 * The returned closure determines whether a given `event` matches the`search` string
 *
 * @param {string} search The string to search for
 * @returns {function(Event): boolean} A function that matches a given event against `search`
 */
const makeMatchesSearch = (search) => (event) => {
  const matchableSearchString = search.toLowerCase();
  return (
    event.title.toLowerCase().includes(matchableSearchString) ||
    event.timeRange.toLowerCase().includes(matchableSearchString) ||
    event.date.toLowerCase().includes(matchableSearchString) ||
    event.location.toLowerCase().includes(matchableSearchString)
  );
};

/**
 * Make a closure over a list of filters.
 *
 * The returned closure determines whether a given `event` matches any filter in `filters`
 *
 * @param {string[]} filters The list of filters to match an event against
 * @returns {function(Event): boolean} A function that matches a given event against `filters`
 */
const makeMatchesFilters = (filters) => (event) => {
  // Since we've closed over filters, we can match the event against only the enabled filters
  // Because most cases involve only 1-2 concurrently active filters, this should improve filtering speed
  for (const filter of filters) {
    // For each of our enabled filters, stop matching and return true if the event matches
    // This allows us to skip checking other filters once we've found a matching one
    switch (filter) {
      case 'Chapel Office':
        if (event.organization === 'Chapel Office') {
          return true;
        }
        break;
      case 'Arts':
        if (
          event.Organization === 'Music Department' ||
          event.Organization === 'Theatre' ||
          event.Organization === 'Art Department'
        ) {
          return true;
        }
        break;
      case 'CEC':
        if (event.Organization === 'Campus Events Council (CEC)') {
          return true;
        }
        break;
      case 'Admissions':
        if (event.Organization === 'Admissions') {
          return true;
        }
        break;
      case 'Athletics':
        if (event.Organization === 'Athletics') {
          return true;
        }
        break;
      case 'Student Life':
        if (event.Organization === 'Office of Student Life') {
          return true;
        }
        break;
      case 'CLW Credits':
        if (event.HasCLAWCredit) {
          return true;
        }
        break;
      default:
        break;
    }
  }
  return false;
};

const eventService = {
  getAllEvents,
  getFutureEvents,
  getCLWEvents,
  getFilteredEvents,
  getAllGuestEvents,
  getAttendedChapelEvents,
};

export default eventService;
