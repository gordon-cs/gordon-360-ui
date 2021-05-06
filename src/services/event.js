/**
 * Event
 *
 * @module event
 */
import { DateTime } from 'luxon';
import http from './http';
import session from './session';
import moment from 'moment';

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
 * @returns {Promise<Event[]>} All events
 */
const getAllEvents = async () => {
  let allEvents = await http.get('events/25Live/All');
  allEvents = allEvents.map((e) => formatevent(e));
  allEvents = processMultipleOccurences(allEvents);
  return allEvents.sort(sortEventsByTime);
};

/**
 * Gets upcoming CL&W events and formats them for display
 * TODO: Unused. Consider removing
 * @returns {Promise<Event[]>} upcoming CL&W events
 */
const getCLWEvents = async () => {
  let allEvents = await http.get('events/25Live/CLAW');
  allEvents = allEvents.map((e) => formatevent(e));
  allEvents = getFutureEvents(allEvents);
  allEvents = processMultipleOccurences(allEvents);
  return allEvents.sort(sortEventsByTime);
};

/**
 * Gets all public events from the backend, and then formats and sorts them
 * @returns {Promise<Event[]>} All events
 */
const getAllGuestEvents = async () => {
  let allGuest = await http.get('events/25Live/Public');
  allGuest = allGuest.map((e) => formatevent(e));
  allGuest = processMultipleOccurences(allGuest);
  return allGuest.sort(sortEventsByTime);
};

/**
 * Get chapel events attended by the user during the current term
 * @return {Promise<AttendedEvent[]>} all CL&W events attended by the user, formatted and sorted
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

/**
 * Compares two events by the time of their first occurrence
 * @param {Event} a the first event to compare
 * @param {Event} b the second event to compare
 * @returns {int} the sort order of the two events. -1 if a is first, 1 if b is first, 0 otherwise
 */
function sortEventsByTime(a, b) {
  const timeA = a.startDateTime;
  const timeB = b.startDateTime;

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
  const timeA = a.startDateTime || a.CHDate;
  const timeB = b.startDateTime || b.CHDate;

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
    .filter((e) => new Date(e.startDateTime).getTime() > now)
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

/**
 * Splits up multiple occurrences of events into individual events
 * and re-sorts the array
 *
 * @param {Event[]} events the array of events to process
 * @returns {Event[]} the flattened array of events after splitting multiple occurrences
*/
const processMultipleOccurences = (events) => {

  let splitEvents = [];

  for (let thisEvent of events) {

    // if the event has more than 1 occurrences, loop over them and create new events for each; otherwise add the event itself
    if (thisEvent.Occurrences && thisEvent.Occurrences.length > 1) {
      let count = 0;
      for (let thisOccurrence of thisEvent.Occurrences) {

        const thisOccurrenceStartDateTime = DateTime.fromISO(thisOccurrence.StartDate).toJSDate();
        const thisOccurrenceEndDateTime = DateTime.fromISO(thisOccurrence.EndDate).toJSDate();
        const thisOccurrenceDate = DateTime.fromISO(thisOccurrence.StartDate).toFormat('LLL dd, yyyy');
        const thisOccurrenceTimeRange = ("" + moment(thisOccurrenceStartDateTime).format('h:mm A') + " - " + moment(thisOccurrenceEndDateTime).format('h:mm A'));

        splitEvents.push({
          Description: thisEvent.Description,
          Event_ID: ("" + thisEvent.Event_ID + "-" + count),
          Event_Name: thisEvent.Event_Name,
          Event_Title: thisEvent.Event_Title,
          Event_Type_Name: thisEvent.Event_Type_Name,
          HasCLAWCredit: thisEvent.HasCLAWCredit,
          IsPublic: thisEvent.IsPublic,
          Organization: thisEvent.Organization,
          date: thisOccurrenceDate,
          location: (thisOccurrence.location ? thisOccurrence.location : thisEvent.location),
          timeRange: thisOccurrenceTimeRange,
          title: thisEvent.title,
          startDateTime: thisOccurrenceStartDateTime,
          recurring: true
        });
        count++;
      }
    } else {
      thisEvent.startDateTime = DateTime.fromISO(thisEvent.Occurrences[0].StartDate).toJSDate();
      thisEvent.recurring = false;
      splitEvents.push(thisEvent);
    }
  }

  return splitEvents;
}

/**
* Removes recurring events from the events list
* 
* @param {Event[]} events the list of events to be filtered
* @returns {Event[]} the list of non-recurring events
*/
const removeRecurring = (events) => {
  return events.filter((event) => (!event.recurring));
}

export default {
  getAllEvents,
  getFutureEvents,
  getCLWEvents,
  getFilteredEvents,
  getAllGuestEvents,
  getAttendedChapelEvents,
  processMultipleOccurences,
  removeRecurring,
};
