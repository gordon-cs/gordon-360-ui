import { DateTime } from 'luxon';
import http from './http';
import session from './session';
import { compareByProperty, filter } from './utils';

type BaseEvent = {
  Event_Name: string;
  Event_Title: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Organization: string;
};

type UnformattedEvent = BaseEvent & {
  Event_ID: string;
  Event_Type_Name: string;
  HasCLAWCredit: boolean;
  IsPublic: boolean;
};

type UnformattedAttendedEvent = BaseEvent & {
  LiveID: string;
  CHDate?: Date;
  CHTermCD: string;
  Required?: number;
};

type EventDisplayProperties = {
  timeRange: string;
  date: string;
  title: string;
  location: string;
};

type ChapelEventInfo = {
  EventNumber: number;
  EventHash: string;
  EventTitle: string;
  StartDate: DateTime;
  EndDate: DateTime;
  EventLocation: string;
};

type Event = UnformattedEvent & EventDisplayProperties;
type AttendedEvent = UnformattedAttendedEvent & EventDisplayProperties;

function formatEvent<T extends BaseEvent>(event: T): T & EventDisplayProperties {
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

const formatAndSort = <T extends BaseEvent>(events: T[]): (T & EventDisplayProperties)[] =>
  events.map(formatEvent).sort(compareByProperty('StartDate'));

const getAllEvents = (): Promise<Event[]> =>
  http.get<UnformattedEvent[]>('events').then(formatAndSort);

// TODO: Unused. Consider removing
const getCLWEvents = (): Promise<Event[]> => {
  const now = Date.now();
  return http
    .get<UnformattedEvent[]>('events/claw')
    .then(filter((e) => new Date(e.StartDate).getTime() > now))
    .then(formatAndSort);
};

const getAllGuestEvents = (): Promise<Event[]> =>
  http.get<UnformattedEvent[]>('events/public').then(formatAndSort);

const getAttendedChapelEvents = (): Promise<AttendedEvent[]> =>
  http
    .get<UnformattedAttendedEvent[]>(`events/attended/${session.getTermCode()}`)
    .then(formatAndSort);

const getFutureEvents = (allEvents: Event[]): Event[] => {
  const now = Date.now();
  return allEvents
    .filter((e) => new Date(e.StartDate).getTime() > now)
    .sort(compareByProperty('StartDate'));
};

export const EVENT_FILTERS = Object.freeze([
  'CLW Credits',
  'Admissions',
  'Arts',
  'Athletics',
  'CEC',
  'Chapel Office',
  'Student Life',
]);

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

const getChapelEventInfo = (eventId: number): Promise<ChapelEventInfo> =>
  http.get<ChapelEventInfo>(`events/chapel/${eventId}`);

const eventService = {
  getAllEvents,
  getFutureEvents,
  getCLWEvents,
  getFilteredEvents,
  getAllGuestEvents,
  getAttendedChapelEvents,
  getChapelEventInfo,
};

export default eventService;
