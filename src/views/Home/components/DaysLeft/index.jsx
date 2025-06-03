import { useEffect, useState } from 'react';
import session from 'services/session';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import { addDays } from 'date-fns';

/* DaysLeft calculates the start and end date of each term and the breaks in between. 
It uses the difference between term start and end dates to find the length of each term break. 
The loop iterates over each start and end date to find which term the current date is in between.
Once the current term is found the values that each term holds in termValues are used to set the 
value of the progress bar and the text that is displayed. 
TESTING: First change localhost to PROD. If it is currently in the fall semester add 1 to the 
current year of the spring and summer start and end dates. If it is currently beyond the new year 
then subtract 1 from the year for the start and end of the fall. You can then change the current 
date in the today const to test. e.g. '2023-12-05'*/

const DaysLeft = () => {
  const [loading, setLoading] = useState(true);
  const [sessionList, setSessionList] = useState({});
  const [termDialog, setTermDialog] = useState('');
  const [termProgress, setTermProgress] = useState(0);
  const msPerDay = 24 * 3600 * 1000; // milliseconds per day (time diffs are in milliseconds)
  const currentYear = new Date().getFullYear();
  //const now = new Date();
  //const now = new Date('2025-05-15 00:00:00.000 EDT'); //TESTING
  //const now = new Date('2025-01-12 00:00:00.000 EST'); // Last day of winter break
  //const now = new Date('2025-01-13 00:00:00.000 EST'); // First day of spring term
  //const now = new Date('2025-05-18 00:00:00.000 EDT'); // Last day of sprint term
  //const now = new Date('2025-05-16 00:00:00.000 EDT'); // First day of summer term
  //const now = new Date('2025-08-10 00:00:00.000 EDT'); // Last day of summer term
  //const now = new Date('2025-08-11 00:00:00.000 EDT'); // First day of summer break
  const now = new Date('2025-08-12 00:00:00.000 EDT'); // Second day of summer break
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const getSessionList = async () => {
    const sessList = await session.getAll();
    return sessList;
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [sessionList] = await Promise.all([getSessionList()]);
      setSessionList(sessionList);
      setLoading(false);
    };
    load();
  }, [currentYear]);

  useEffect(() => {
    if (!loading) {
      let termStart = null;
      let termEnd = null;
      let termName = null;
      let nextStart = null;
      let nextName = null;

      // placeholder for object holding data for the session after the current session
      // (which is the previous entry in the sessionList since we're working through sessions
      // in reverse chronological order)
      let progress = 100;
      let termDialog = null;

      // determine which session today's date belongs to or, if it is not in any session,
      // determine the sessions that it lies between
      for (let s of sessionList) {
        //console.log(s.SessionCode, s.SessionBeginDate, s.SessionEndDate);
        termStart = new Date(s.SessionBeginDate);
        termEnd = new Date(s.SessionEndDate);
        switch (s.SessionCode.substring(4)) {
          case '01':
            termName = 'Spring';
            break;
          case '05':
            termName = 'Summer';
            break;
          case '09':
            termName = 'Fall';
          default:
            break;
        }

        console.log('today:  ', today);
        console.log('start:  ', termStart);
        console.log('end:    ', termEnd);
        if (nextStart == null && today > termEnd) {
          // today is after the end of the most recent session; can't compute how many days
          // until the next session starts so just show number days since last term ended
          let days = Math.round((today - termEnd) / msPerDay);
          termDialog = `${days} day${days != 1 ? 's' : ''} since the end of ${termName} Term`;
          progress = 100;
          break;
        } else if (today >= termStart && today <= termEnd) {
          // we are in a defined session (fall, spring, or summer)
          let days = Math.round((termEnd - today) / msPerDay) + 1;
          termDialog = `${days} day${days != 1 ? 's' : ''} remaining in ${termName} Term`;
          progress = Math.round(
            (((today - termStart) / msPerDay + 1) /
              (Math.round((termEnd - termStart) / msPerDay) + 1)) *
              100,
          );
          break;
        } else if (today > termEnd && today < nextStart) {
          // we are between two defined sessions
          let days = Math.round((nextStart - today) / msPerDay);
          termDialog = `${days} day${days != 1 ? 's' : ''} until ${nextName} Term`;
          progress = Math.round(
            (((today - termStart) / msPerDay + 1) /
              (Math.round((termEnd - termStart) / msPerDay) + 1)) *
              100,
          );
          termStart = addDays(termEnd, 1);
          termEnd = addDays(nextStart, -1);
          break;
        }

        // since we're working backward in time, the session we've just process chronologically
        // follows the one we're about to consider
        nextStart = termStart;
        nextName = termName;
      }

      console.log('termDialog:', termDialog);
      console.log('progress:', progress);
      setTermDialog(termDialog);
      setTermProgress(progress);
    }
  }, [loading, sessionList]);

  /* This won't display if termDialog is empty, specifically when on train because it doesn't 
  access the correct dates.The width of the front container is 10,000 / termProgress to correctly 
  overlap with the  backContainer and make it seem like the color changes as the backContainer
  gets covered*/
  return (
    <Grid align="center">
      {termDialog !== '' ? (
        <div className={styles.backContainer}>
          {termDialog}
          <div className={styles.boundBox} style={{ width: termProgress + '%' }}>
            <div className={styles.frontContainer} style={{ width: 10000 / termProgress + '%' }}>
              {termDialog}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </Grid>
  );
};

export default DaysLeft;
