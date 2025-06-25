import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import { differenceInCalendarDays } from 'date-fns';
import academicTermService from 'services/academicTerm';

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
      // const today = new Date('2025-05-14 00:00:00.000 EDT'); // Last day of spring term before summer term
      // const today = new Date('2025-05-14 00:00:00.000 EDT'); // Last day of spring term
      // const today = new Date('2025-05-19 00:00:00.000 EDT'); // First day of summer term
      // const today = new Date('2025-08-15 00:00:00.000 EDT'); // penultimate day of summer term
      // const today = new Date('2025-08-16 00:00:00.000 EDT'); // Last day of summer term
      // const today = new Date('2025-08-17 00:00:00.000 EDT'); // First day of post summer break
      // const today = new Date('2025-08-18 00:00:00.000 EDT'); // Second day of post summer break
      today.setHours(0, 0, 0, 0);

      const currentTerm = await academicTermService.getCurrentTerm();
      if (!currentTerm) {
        setDaysLeftDialog('No active term');
        setTermProgress(0);
        return;
      }

      const termStart = new Date(currentTerm.BeginDate);
      const termEnd = new Date(currentTerm.EndDate);
      const termName = currentTerm.Description.split(' ')[1];

      if (today < termStart) {
        // Case 1: Today is before the term starts
        const daysUntilStart = differenceInCalendarDays(termStart, today);
        setDaysLeftDialog(
          `${daysUntilStart} day${daysUntilStart !== 1 ? 's' : ''} until ${termName} term starts`,
        );
        setTermProgress(0);
      } else if (today >= termStart && today <= termEnd) {
        // Case 2: Today is within the current term
        const daysLeft = differenceInCalendarDays(termEnd, today) + 1;
        const totalDays = differenceInCalendarDays(termEnd, termStart) + 1;
        const progress = Math.round(((totalDays - daysLeft) / totalDays) * 100);

        setDaysLeftDialog(
          `${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining in ${termName} term`,
        );
        setTermProgress(progress);
      } else {
        // Case 3: Today is after the term ended
        const daysSinceEnd = differenceInCalendarDays(today, termEnd);
        setDaysLeftDialog(
          `${daysSinceEnd} day${daysSinceEnd !== 1 ? 's' : ''} since the end of ${termName} term ended`,
        );
        setTermProgress(100);
      }
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
