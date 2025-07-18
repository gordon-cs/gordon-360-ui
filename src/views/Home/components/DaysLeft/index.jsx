import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import academicTermService from 'services/academicTerm';
import React from 'react';

const DaysLeft = () => {
  const [daysLeftDialog, setDaysLeftDialog] = useState('');
  const [termProgress, setTermProgress] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await academicTermService.getDaysLeft();

        const daysLeft = data.DaysLeft;
        const totalDays = data.TotalDays;
        const termLabel = data.TermLabel;
        const plural = daysLeft !== 1 ? 's' : '';

        let daysLeftDialog = null;

        // There are two different format of term labels:
        // 1. "2024-2025 Fall" when today is in the term.
        // 2. "Break before 2024-2025 Spring" when today is between terms
        // We need to handle both cases to display the correct message in the daysLeftDialog.
        if (termLabel.startsWith('Break before ')) {
          const nextTerm = termLabel.replace('Break before ', '').replace(/^\d{4}-\d{4}\s*/, '');
          daysLeftDialog = `${daysLeft} day${plural} until start of ${nextTerm} term`;
        } else {
          const cleanLabel = termLabel.replace(/^\d{4}-\d{4}\s*/, '');
          daysLeftDialog = `${daysLeft} day${plural} remaining in ${cleanLabel} term`;
        }

        setDaysLeftDialog(daysLeftDialog);

        const termProgress =
          totalDays > 0 ? Math.round(((totalDays - daysLeft) / totalDays) * 100) : 0;

        setTermProgress(termProgress);
      } catch (err) {
        console.error('Error fetching days left:', err);
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
