import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import academicTermService from 'services/academicTerm';

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

        if (termLabel.startsWith('Break before ')) {
          const nextTerm = termLabel.replace('Break before ', '').replace(/^\d{4}-\d{4}\s*/, '');
          daysLeftDialog = `${daysLeft} day${plural} until ${nextTerm} term starts`;
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
