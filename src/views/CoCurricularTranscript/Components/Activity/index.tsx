import { compareAsc, differenceInCalendarMonths, format } from 'date-fns';
import { Participation } from 'services/membership';
import sessionService from 'services/session';
import { MembershipInterval } from 'services/transcript';
import { MembershipHistorySession } from 'services/user';
import styles from './Activity.module.css';

type Props = {
  description: string;
  sessions: MembershipHistorySession[];
};

const Activity = ({ description, sessions }: Props) => {
  const leaderSessions = sessions.filter((s) => s.Participation === Participation.Leader);
  return (
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
};
export default Activity;

/**
 * Formats a list of sessions that the user was a member of this activity into a single string.
 * The string is a resume-like (e.g. 'MMM yyyy') series of intervals, where each interval is a
 * period of time representing consecutive semesters that the user was a member of the activity.
 *
 * @param sessionRecords - a list of sessions that user was a member of the same activity
 * @returns A string representing the duration of the user's membership based on the sessionRecords
 */
const formatDuration = (sessionRecords: MembershipHistorySession[]) => {
  const sessions = sessionRecords
    .map((s) => sessionService.parseSessionCode(s.SessionCode))
    .sort(compareAsc);

  const intervalDescriptions: string[] = [];
  let interval: MembershipInterval | undefined;

  sessions.forEach((session) => {
    if (interval === undefined) {
      // If this is the first session, initialize interval.
      interval = new MembershipInterval(session);
    } else if (interval.consecutiveWith(session)) {
      // If the current session is consecutive with the current interval, extend the interval.
      interval.extendTo(session);
    } else {
      // If there is a break between the current interval and the current session,
      // push description of the current interval
      intervalDescriptions.push(interval.toString());
      // And begin a new interval from the current session.
      interval = new MembershipInterval(session);
    }
  });

  // If there was at least 1 session, the last interval will not be descrbied, so push it's description now
  if (interval) {
    intervalDescriptions.push(interval.toString());
  }

  return intervalDescriptions.join(', ');
};
