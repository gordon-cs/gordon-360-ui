import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import academicTermService from 'services/academicTerm';

/* DaysLeft calculates the start and end date of each term and the breaks in between.
It uses the difference between term start and end dates to find the length of each term break.
The loop iterates over each start and end date to find which term the current date is in between.
Once the current term is found the values that each term holds in termValues are used to set the
value of the progress bar and the text that is displayed. */

const DaysLeft = () => {
  const [daysLeftDialog, setDaysLeftDialog] = useState('');
  const [termProgress, setTermProgress] = useState(0);

  useEffect(() => {
    const load = async () => {
      const today = new Date();
      /* TESTING: First modify .env.development so that VITE_API_URL=https://360Api.gordon.edu/;
         this means we use the production API server to get the most up-to-date sessions.
         Change the value assigned to "today" to try various dates, focusing on those on the
         session start and end dates.  Be sure to try dates just before and after these dates too.
         Examples for the 2024-2025 academic year are provided below. */
      // const today = new Date('2024-12-19 00:00:00.000 EST'); // Last day of Fall semester
      // const today = new Date('2024-12-20 00:00:00.000 EST'); // First day of winter break
      // const today = new Date('2025-01-14 00:00:00.000 EST'); // Last day of winter break
      // const today = new Date('2025-01-15 00:00:00.000 EST'); // First day of spring term
      // const today = new Date('2025-03-15 00:00:00.000 EDT'); // Approximate middle day of spring term
      // const today = new Date('2025-05-14 00:00:00.000 EDT'); // Last day of spring term
      // const today = new Date('2025-05-19 00:00:00.000 EDT'); // First day of summer term
      // const today = new Date('2025-08-15 00:00:00.000 EDT'); // penultimate day of summer term
      // const today = new Date('2025-08-16 00:00:00.000 EDT'); // Last day of summer term
      // const today = new Date('2025-08-17 00:00:00.000 EDT'); // First day of post summer break
      // const today = new Date('2025-08-18 00:00:00.000 EDT'); // Second day of post summer break
      today.setHours(0, 0, 0, 0);

      const termList = await academicTermService.getUndergradTerms();
      console.log('Fetched Terms:', termList);

      let nextTermStart = null;
      let nextTermName = null;
      let termProgress = null;
      let daysLeftDialog = null;

      // The session list is in reverse chronological order with the most recent session first.
      // In the main loop we search for the session we are currently in, or determine if we are
      // between sessions.
      //
      // There are three cases:
      //   (1) we're past the end of the most recent session
      //   (2) we're in a regular session
      //   (3) we're between two existing sessions.
      // Once we've found our place we construct the dialog to display and determine the fraction
      // (as a percentage) of the session or break we've already completed.
      for (let term of termList) {
        const termStart = new Date(term.BeginDate);
        const termEnd = new Date(term.EndDate);

        const termName = term.Description.split(' ')[1];

        if (nextTermStart == null && today > termEnd) {
          // Case 1: today is after the end of the most recent session; can't compute how many
          // days until the next session starts so just show number days since last term ended
          const daysSinceEndOfTerm = differenceInCalendarDays(today, termEnd);
          daysLeftDialog = `${daysSinceEndOfTerm} day${daysSinceEndOfTerm !== 1 ? 's' : ''} since the end of ${termName} Term`;

          termProgress = 100;

          break;
        } else if (today >= termStart && today <= termEnd) {
          // Case 2: we are within a defined session (fall, spring, or summer)
          const daysUntilEndOfTerm = differenceInCalendarDays(termEnd, today) + 1;
          daysLeftDialog = `${daysUntilEndOfTerm} day${daysUntilEndOfTerm !== 1 ? 's' : ''} remaining in ${termName} Term`;

          const daysSinceStartOfTerm = differenceInCalendarDays(today, termStart);
          const daysInTerm = differenceInCalendarDays(termEnd, termStart) + 1;
          termProgress = Math.round((daysSinceStartOfTerm / daysInTerm) * 100);

          break;
        } else if (today > termEnd && today < nextTermStart) {
          // Case 3: we are between two defined sessions
          const daysUntilStartOfNextTerm = differenceInCalendarDays(nextTermStart, today);
          daysLeftDialog = `${daysUntilStartOfNextTerm} day${daysUntilStartOfNextTerm !== 1 ? 's' : ''} until ${nextTermName} Term`;

          const daysSinceStartOfBreak = differenceInCalendarDays(today, termEnd) - 1;
          const daysBetweenTerms = differenceInCalendarDays(nextTermStart, termEnd) - 1;
          termProgress = Math.round((daysSinceStartOfBreak / daysBetweenTerms) * 100);

          break;
        }

        // since we're working backward in time, the session we've just process chronologically
        // follows the one we're about to consider
        nextTermStart = termStart;
        nextTermName = termName;
      }

      setDaysLeftDialog(daysLeftDialog);
      setTermProgress(termProgress);
    };
    load();
  }, []);

  /* This won't display if daysLeftDialog is empty, specifically when on train because it doesn't
  access the correct dates. The width of the front container is 10,000 / termProgress to correctly
  overlap with the  backContainer and make it seem like the color changes as the backContainer
  gets covered. */
  return (
    <Grid align="center">
      {daysLeftDialog !== '' ? (
        <div className={styles.backContainer}>
          {daysLeftDialog}
          <div className={styles.boundBox} style={{ width: termProgress + '%' }}>
            <div className={styles.frontContainer} style={{ width: 10000 / termProgress + '%' }}>
              {daysLeftDialog}
            </div>
          </div>
        </div>
      ) : null}
    </Grid>
  );
};

export default DaysLeft;
