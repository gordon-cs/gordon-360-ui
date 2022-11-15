import http from './http';

type Session = {
  SessionBeginDate: string;
  SessionCode: string;
  SessionDescription: string;
  SessionEndDate: string;
};

type DaysLeft = [daysRemaining: number, daysCompleted: number];

const get = (sessionCode: string): Promise<Session> => http.get(`sessions/${sessionCode}`);

const getAll = (): Promise<Session[]> =>
  http.get<Session[]>('sessions').then((sessions) => sessions.reverse());

const getCurrent = (): Promise<Session> => http.get('sessions/current');

const getDaysLeft = (): Promise<DaysLeft> => http.get('sessions/daysLeft');

const terms = {
  spring: 'SP',
  fall: 'FA',
};

/**
 * Convert a session code to a readable session
 * e.g. '202109' -> '2021fall'
 *
 * @param sessionCode the session code
 * @returns List of sessions
 */
const decodeSessionCode = (sessionCode: string): string => {
  let sessionCodeYear = sessionCode.substr(0, 4);
  let sessionCodeSeason = sessionCode.substr(4);
  switch (sessionCodeSeason) {
    case '01':
      return sessionCodeYear + 'spring';
    case '05':
      return sessionCodeYear + 'summer';
    case '09':
      return sessionCodeYear + 'fall';
    default:
      break;
  }
  return sessionCode;
};

/**
 * Convert a readable session code to a session code
 * e.g. '2021fall' -> '202109'
 *
 * @param readableSessionCode the readable session code
 * @returns List of sessions
 */
const encodeSessionCode = (readableSessionCode: string): string => {
  let sessionCodeYear = readableSessionCode.substr(0, 4);
  let sessionCodeSeason = readableSessionCode.substr(4);
  switch (sessionCodeSeason) {
    case 'spring':
      return sessionCodeYear + '01';
    case 'summer':
      return sessionCodeYear + '05';
    case 'fall':
      return sessionCodeYear + '09';
    default:
      break;
  }
  return readableSessionCode;
};

const getTermCode = (): string => {
  const now = new Date();

  // Decide what term it is, defaulting to fall
  let term = terms.fall;
  let year = now.getFullYear();
  if (now.getMonth() <= 6) {
    term = terms.spring;
    // If spring term, decrement current year to get current academic year
    year -= 1;
  }

  return `${year.toString().substr(-2)}${term}`;
};

const sessionService = {
  get,
  getAll,
  getCurrent,
  getDaysLeft,
  getTermCode,
  decodeSessionCode,
  encodeSessionCode,
};

export default sessionService;
