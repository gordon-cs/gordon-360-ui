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
  const [periodDialog, setPeriodDialog] = useState({});
  const [termDialogue, setTermDialogue] = useState('');
  const [termProgress, setTermProgress] = useState(0);
  const currentYear = new Date().getFullYear();
  const now = new Date('2025-01-13 13:59:59.000 EST');
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`)
  const msPerDay = 24 * 3600 * 1000; // milliseconds per day (time diffs are in milliseconds)

  const getCurrentPeriod = async () => {
    let currentPeriod = {
      type: null,
      name: null,
      start: null,
      end: null,
    };

    const sessionList = await session.getAll();

    let previousPeriod = null;
    /*
    for (let s of sessionList) {
      console.log(s.SessionCode, s.SessionDescription)
      console.log(s.SessionBeginDate, s.SessionEndDate)
    }
    */
    for (let s of sessionList) {
      console.log(s.SessionCode, s.SessionBeginDate, s.SessionEndDate);
      currentPeriod.start = new Date(s.SessionBeginDate);
      currentPeriod.end = new Date(s.SessionEndDate);
      switch (s.SessionCode.substring(4)) {
        case '01':
          currentPeriod.name = 'Spring';
          break;
        case '05':
          currentPeriod.name = 'Summer';
          break;
        case '09':
          currentPeriod.name = 'Fall';
        default:
          break;
      }

      console.log('  ', today);
      console.log('  ', currentPeriod.start);
      console.log('  ', currentPeriod.end);
      if (previousPeriod == null && today > currentPeriod.end) {
        // today is after the end of the most recent session, so we can't compute how many
        // days until the next session starts
        console.log('After session', s.SessionCode);
        currentPeriod.type = 'break';
        break;
      } else if (today >= currentPeriod.start && today <= currentPeriod.end) {
        // we are in a defined session (fall, spring, or summer)
        console.log('In session', s.SessionCode);
        currentPeriod.type = 'term';
        break;
      } else if (today > currentPeriod.end && today < previousPeriod.start) {
        // we are between two defined sessions
        console.log('Between sessions; after session', s.SessionCode);
        currentPeriod.name = previousPeriod.name;
        currentPeriod.start = addDays(currentPeriod.end, 1);
        currentPeriod.end = addDays(previousPeriod.start, -1);
        currentPeriod.type = 'break';
        break;
      }
      previousPeriod = Object.assign({}, currentPeriod);
    }

    return currentPeriod;
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [periodDialog] = await Promise.all([getCurrentPeriod()]);
      setPeriodDialog(periodDialog);
      setLoading(false);
    };

    load();
  }, [currentYear]);

  useEffect(() => {
    if (!loading) {
      let currentDaysLeft = Math.round((periodDialog.end - today) / msPerDay);
      //      console.log("currentDaysLeft =", currentDaysLeft);
      let currentProgress = Math.round(
        (((today - periodDialog.start) / msPerDay + 1) /
          (Math.round((periodDialog.end - periodDialog.start) / msPerDay) + 1)) *
          100,
      );

      let termDialogue = null;
      if (currentDaysLeft > 0) {
        /* Applies the proper dialogue based on if we are in an academic term or a term break with 
        a condition to make days singular if there is only 1 day left*/
        termDialogue =
          periodDialog.type === 'term'
            ? `${currentDaysLeft} day${currentDaysLeft > 1 ? 's' : ''} remaining in ${periodDialog.name} Term`
            : `${currentDaysLeft} day${currentDaysLeft > 1 ? 's' : ''} until ${periodDialog.name} Term`;
      } else {
        currentDaysLeft = -currentDaysLeft;
        termDialogue = `${currentDaysLeft} day${currentDaysLeft != 1 ? 's' : ''} since the end of ${periodDialog.name} Term`;
        currentProgress = 100;
      }
      setTermDialogue(termDialogue);
      setTermProgress(currentProgress);
    }
  }, [loading, periodDialog]);

  /* This won't display if termDialogue is empty, specifically when on train because it doesn't 
  access the correct dates.The width of the front container is 10,000 / termProgress to correctly 
  overlap with the  backContainer and make it seem like the color changes as the backContainer
  gets covered*/
  return (
    <Grid align="center">
      {termDialogue !== '' ? (
        <div className={styles.backContainer}>
          {termDialogue}
          <div className={styles.boundBox} style={{ width: termProgress + '%' }}>
            <div className={styles.frontContainer} style={{ width: 10000 / termProgress + '%' }}>
              {termDialogue}
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
