import { addMonths, addWeeks } from 'date-fns';
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

export type FinalExamEvent = UnformattedEvent & {
  date: string;
  time: string;
};

const shortTimeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
const shortDateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'short' });

function formatEvent(event: UnformattedEvent): Event {
  const startDate = new Date(event.StartDate);
  const endDate = new Date(event.EndDate);

  let timeRange = 'No time listed';
  let date = 'No date listed';

  try {
    timeRange = shortTimeFormatter.formatRange(startDate, endDate);
  } catch {
    // `Intl.DateTimeFormat#format` throws for invalid dates. We will just catch potential errors and
    // Catch any potential error and fallback to the default specified above
  }

  try {
    date = shortDateFormatter.format(startDate);
  } catch {
    // `Intl.DateTimeFormat#formatRange` throws if it finds an invalid date
    // Catch any potential error and fallback to the default specified above
  }

  return {
    ...event,
    timeRange,
    date,
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

export async function getFinalExamEventsForUserByTerm(
  username: string,
  termStart: string,
  termEnd: string,
  yearCode: string,
  termCode: string,
): Promise<UnformattedEvent[]> {
  const params = new URLSearchParams({
    termStart,
    termEnd,
    yearCode,
    termCode,
  });

  return http.get<UnformattedEvent[]>(`events/finalexams/${username}?${params.toString()}`);
}

export function formatFinalExamEvent(event: UnformattedEvent): FinalExamEvent {
  return {
    ...event,
    date: new Date(event.StartDate).toLocaleDateString(),
    time:
      new Date(event.StartDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' - ' +
      new Date(event.EndDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}

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

export const TIME_FILTERS = Object.freeze(['1 Week', '2 Weeks', '1 Month', '4 Months']);

/**
 * Make a closure over a time filter.
 *
 * The returned closure determines whether a given `event` falls within the time range
 * @param timeFilter The time filter to use
 * @returns A function that matches a given event against `timeFilter`
 */
const makeMatchesTimeFilter =
  (timeFilter: string) =>
  (event: Event): boolean => {
    const eventStart = new Date(event.StartDate);
    const now = new Date();
    if (timeFilter === '1 Week') {
      return eventStart <= addWeeks(now, 1) && eventStart >= addWeeks(now, -1);
    } else if (timeFilter === '2 Weeks') {
      return eventStart <= addWeeks(now, 2) && eventStart >= addWeeks(now, -2);
    } else if (timeFilter === '1 Month') {
      return eventStart <= addMonths(now, 1) && eventStart >= addMonths(now, -1);
    } else if (timeFilter === '4 Months') {
      return eventStart <= addMonths(now, 4) && eventStart >= addMonths(now, -4);
    } else {
      return false;
    }
  };

/**
 * Make a closure over a search string.
 *
 * The returned closure determines whether a given `event` matches the`search` string
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
  getFinalExamEventsForUserByTerm,
};

export default eventService;
