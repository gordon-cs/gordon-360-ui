import http from './http';
import { compareByProperty } from './utils';

type UnformattedEvent = {
  Event_Name: string;
  Event_Title: string;
  Description: string;
  StartDate: string;
  EndDate: string;
  Location: string;
  Organization: string;
  Event_ID: string;
  Event_Type_Name: string;
  HasCLAWCredit: boolean;
  IsPublic: boolean;
};

export type Event = UnformattedEvent & {
  timeRange: string;
  date: string;
  title: string;
  location: string;
};

const shortTimeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
const shortDateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });

function formatEvent(event: UnformattedEvent): Event {
  const startDate = new Date(event.StartDate);
  const endDate = new Date(event.EndDate);
  return {
    ...event,
    timeRange: shortTimeFormatter.formatRange(startDate, endDate),
    date: shortDateFormatter.format(startDate),
    title: event.Event_Title || event.Event_Name,
    location: event.Location || 'No Location Listed',
    Description:
      event?.Description?.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(/<\/?[^>]+(>|$)/g, ' ') ||
      'No Description available',
  };
}

const formatAndSort = (events: UnformattedEvent[]): Event[] =>
  events.map(formatEvent).sort(compareByProperty('StartDate'));

const getAllEvents = (): Promise<Event[]> =>
  http.get<UnformattedEvent[]>('events').then(formatAndSort);

const getAllGuestEvents = (): Promise<Event[]> =>
  http.get<UnformattedEvent[]>('events/public').then(formatAndSort);

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

const getFilteredEvents = (
  events: Event[],
  filters: string[],
  search: string,
  timeFilter: string,
): Event[] => {
  const matchesSearch = makeMatchesSearch(search);
  const matchesFilters = makeMatchesFilters(filters);
  const matchesTimeFilter = makeMatchesTimeFilter(timeFilter);
  if (search && filters.length && timeFilter) {
    return events.filter(
      (event) => matchesSearch(event) && matchesFilters(event) && matchesTimeFilter(event),
    );
  } else if (filters.length && timeFilter) {
    return events.filter((event) => matchesFilters(event) && matchesTimeFilter(event));
  } else if (search && timeFilter) {
    return events.filter((event) => matchesSearch(event) && matchesTimeFilter(event));
  } else if (search && filters.length) {
    return events.filter((event) => matchesSearch(event) && matchesFilters(event));
  } else if (search) {
    return events.filter(matchesSearch);
  } else if (filters.length) {
    return events.filter(matchesFilters);
  } else if (timeFilter) {
    return events.filter(matchesTimeFilter);
  } else {
    return events;
  }
};

/**
 * Make a closure over a time filter.
 *
 * The returned closure determines whether a given `event` falls before the time range
 *
 * @param timeFilter The time filter to use
 * @returns A function that matches a given event against `timeFilter`
 */
const makeMatchesTimeFilter =
  (timeFilter: string) =>
  (event: Event): boolean => {
    if (timeFilter === '1 Week') {
      return new Date(event.StartDate) <= new Date(new Date().setDate(new Date().getDate() + 7));
    } else if (timeFilter === '2 Weeks') {
      return new Date(event.StartDate) <= new Date(new Date().setDate(new Date().getDate() + 14));
    } else if (timeFilter === '1 Month') {
      return new Date(event.StartDate) <= new Date(new Date().setMonth(new Date().getMonth() + 1));
    } else if (timeFilter === '4 Months') {
      return new Date(event.StartDate) <= new Date(new Date().setMonth(new Date().getMonth() + 4));
    } else {
      return false;
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
  getFilteredEvents,
  getAllGuestEvents,
};

export default eventService;
