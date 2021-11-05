import { DateTime } from 'luxon';
import http from './http';
import session from './session';

type UnformattedEvent = {
  Event_ID: string;
  Event_Name: string;
  Event_Title: string;
  Event_Type_Name: string;
  HasCLAWCredit: boolean;
  IsPublic: boolean;
  Description: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Organization: string;
};

type UnformattedAttendedEvent = {
  LiveID: string;
  CHDate?: Date;
  CHTermCD: string;
  Required?: number;
  Event_Name: string;
  Event_Title: string;
  Description: string;
  Organization: string;
  StartDate: string;
  EndDate: string;
  Location: string;
};

type EventDisplayProperties = {
  timeRange: string;
  date: string;
  title: string;
  location: string;
};

type Event = UnformattedEvent & EventDisplayProperties;
type AttendedEvent = UnformattedAttendedEvent & EventDisplayProperties;

function formatEvent(event: UnformattedAttendedEvent): AttendedEvent;
function formatEvent(event: UnformattedEvent): Event;
function formatEvent(event: UnformattedAttendedEvent | UnformattedEvent): Event | AttendedEvent {
  return {
    ...event,
    timeRange: `${DateTime.fromISO(event.StartDate).toFormat('t')} - ${DateTime.fromISO(
      event.EndDate,
    ).toFormat('t')}`,
    date: DateTime.fromISO(event.StartDate).toFormat('LLL d, yyyy'),
    title: event.Event_Title || event.Event_Name,
    location: event.Location || 'No Location Listed',
    Description:
      event?.Description?.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(/<\/?[^>]+(>|$)/g, ' ') ||
      'No Description available',
  };
}

const getAllEvents = async (): Promise<Event[]> => {
  const allEvents: UnformattedEvent[] = await http.get('events');
  return allEvents.map((e) => formatEvent(e)).sort(sortEventsByTime);
};

/**
 * Gets upcoming CL&W events and formats them for display
 * TODO: Unused. Consider removing
 *
 * @returns upcoming CL&W events
 */
const getCLWEvents = async (): Promise<Event[]> => {
  const allEvents: UnformattedEvent[] = await http.get('events/claw');
  const now = Date.now();
  return allEvents
    .filter((e) => new Date(e.StartDate).getTime() > now)
    .map((e) => formatEvent(e))
    .sort(sortEventsByTime);
};

const getAllGuestEvents = async (): Promise<Event[]> => {
  const allGuest: UnformattedEvent[] = await http.get('events/public');
  return allGuest.map((e) => formatEvent(e)).sort(sortEventsByTime);
};

/**
 * Get chapel events attended by the user during the current term
 *
 * @returns all CL&W events attended by the user, formatted and sorted
 */
const getAttendedChapelEvents = async (): Promise<AttendedEvent[]> => {
  const termCode = session.getTermCode();
  let attendedEvents: UnformattedAttendedEvent[] = await http.get(`events/attended/${termCode}`);
  return attendedEvents.map((e) => formatEvent(e)).sort(sortAtndEventsByTime);
};

/**
 * Compares two events by the time of their first occurrence
 *
 * @param a the first event to compare
 * @param b the second event to compare
 * @returns the sort order of the two events. -1 if a is first, 1 if b is first, 0 otherwise
 */
function sortEventsByTime(a: Event, b: Event): number {
  const timeA = a.StartDate;
  const timeB = b.StartDate;

  if (timeA < timeB) return -1;
  if (timeA > timeB) return 1;
  return 0;
}

/**
 * Sorts attended CL&W events by time. Time in this case can be either
 * the time of the event, or the time when the user received credit (CHDate).
 * CHDate can be significantly after the time the event occurred, because of processing delays.
 *
 * @param a the first event to compare
 * @param b the second event to compare
 * @returns -1 if a's time is less than b's, 1 if it's more, 0 if they're equal
 */
function sortAtndEventsByTime(a: AttendedEvent, b: AttendedEvent): number {
  const timeA = a.StartDate || a.CHDate;
  const timeB = b.StartDate || b.CHDate;

  if (timeA && timeB) {
    if (timeA < timeB) return -1;
    if (timeA > timeB) return 1;
  }
  return 0;
}

const getFutureEvents = (allEvents: Event[]): Event[] => {
  const now = Date.now();
  return allEvents.filter((e) => new Date(e.StartDate).getTime() > now).sort(sortEventsByTime);
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
 * @param events the events to filter
 * @param filters the list of filters to use
 * @param search the string to search against
 * @returns The filtered list of events
 */
const getFilteredEvents = (events: Event[], filters: string[], search: string): Event[] => {
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
 * @param search The string to search for
 * @returns A function that matches a given event against `search`
 */
const makeMatchesSearch = (search: string) => {
  const matchableSearchString = search.toLowerCase();
  return (event: Event) => {
    return (
      event.title.toLowerCase().includes(matchableSearchString) ||
      event.timeRange.toLowerCase().includes(matchableSearchString) ||
      event.date.toLowerCase().includes(matchableSearchString) ||
      event.location.toLowerCase().includes(matchableSearchString)
    );
  };
};

/**
 * Make a closure over a list of filters.
 *
 * The returned closure determines whether a given `event` matches any filter in `filters`
 *
 * @param filters The list of filters to match an event against
 * @returns A function that matches a given event against `filters`
 */
const makeMatchesFilters =
  (filters: string[]) =>
  (event: Event): boolean => {
    // Since we've closed over filters, we can match the event against only the enabled filters
    // Because most cases involve only 1-2 concurrently active filters, this should improve filtering speed
    for (const filter of filters) {
      // For each of our enabled filters, stop matching and return true if the event matches
      // This allows us to skip checking other filters once we've found a matching one
      switch (filter) {
        case 'Chapel Office':
          if (event.Organization === 'Chapel Office') {
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
