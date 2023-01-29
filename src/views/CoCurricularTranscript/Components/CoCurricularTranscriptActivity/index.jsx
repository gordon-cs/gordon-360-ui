import { format } from 'date-fns';
import sessionService from 'services/session';
import styles from './CoCurricularTranscriptActivity.module.css';

const Activity = ({ description, sessions, leaderSessions }) => (
  <div className={styles.experience_transcript_activities}>
    <div className={styles.organization_role}>{description}</div>
    <div className={styles.date}> {formatDuration(sessions)} </div>
    {leaderSessions.length > 0 && (
      <div className={styles.leadership_line}>
        <div className={styles.organization_role}>Leader</div>
        <div className={styles.date}>{formatDuration(leaderSessions)}</div>
      </div>
    )}
  </div>
);

export default Activity;

// Helper functions for parsing and translating sessionCode which is of the format "YYYYSE"
// where SE is 09 for fall, 01 for spring, 05 for summer

// Returns: string of month (Mon), month being last month of the given semester
const sliceEnd = (sesCode) => {
  switch (sesCode.slice(4, 6)) {
    case '09':
      return 'Dec';
    case '01':
      return 'May';
    case '05':
      return 'Sep';
    default:
      console.log('An unrecognized semester code was provided');
      return '';
  }
};

/**
 * Check whether two sessions are consecutive.
 *
 * Sessions are consecutive if they occur in the same calendar year, or if the earlier session was
 * a fall session and the later session is the following spring session.
 *
 * TODO: This logic assumes that sessions will be either fall or spring.
 * It might not handle winter, summer, graduate sessions correctly.
 *
 * @param {Date} earlierSession the chronologically earlier of the two sessions
 * @param {Date} laterSession the chronologically later of the two sessions
 * @returns Whether the later session is immediately after the earlier session
 */
const areConsecutive = (earlierSession, laterSession) => {
  const earlierYear = earlierSession.getFullYear();
  const laterYear = laterSession.getFullYear();
  return (
    earlierYear === laterYear ||
    (earlierYear + 1 === laterYear &&
      earlierSession.getMonth() > 4 &&
      laterSession.getMonth() === 0)
  );
};

// Prepares a list of sessions to be displayed as one coherent string representing the timepsan
// of the membership.

// Param: sessionsList - a list of sessionCodes
// Returns: A string representing the duration of the user's membership based on the sessionsList
const formatDuration = (sessionsList) => {
  let duration = '';
  sessionsList.sort(function (sessA, sessB) {
    return sessA - sessB;
  });

  // Pop first session code from array and split into months and years, which are saved as
  // the initial start and end dates
  let curSess = sessionsList.shift();

  let endDate = sessionService.parseSessionCode(curSess);

  // format sessions into a string representing the timespan(s) of the membership
  let startMon = format(endDate, 'MMM');
  let endMon = sliceEnd(curSess);
  let startYear = format(endDate, 'yyyy'),
    endYear = startYear;

  // For each other session, if it is consecutive to the current end date,
  // save its end date as the new end date, otherwise, add the current start and end dates to
  // the string 'duration' (because the streak is broken) and prepare to start a new streak.
  // Loop assumes sessions will be sorted from earliest to latest
  while (sessionsList.length > 0) {
    curSess = sessionsList.shift();
    let nextStartDate = sessionService.parseSessionCode(curSess);
    if (areConsecutive(endDate, nextStartDate)) {
      // a streak of consecutive involvement continues
      endMon = sliceEnd(curSess);
      endYear = format(nextStartDate, 'yyyy');
    } else {
      // a streak has been broken; add its start and end to the string and start new streak

      // don't show the year twice if the months are of the same year
      if (startYear === endYear) {
        duration += startMon;
      } else {
        duration += startMon + ' ' + startYear;
      }
      duration += '-' + endMon + ' ' + endYear + ', ';
      startMon = format(nextStartDate, 'MMM');
      endMon = sliceEnd(curSess);
      startYear = endYear = format(nextStartDate, 'yyyy');
    }

    endDate = nextStartDate;
  }

  // Flush the remaining start and end info to duration.
  // Again, don't show the year twice if the months are of the same year
  if (startYear === endYear) {
    duration += startMon;
  } else {
    duration += startMon + ' ' + startYear;
  }
  duration += '-' + endMon + ' ' + endYear;

  return duration;
};
