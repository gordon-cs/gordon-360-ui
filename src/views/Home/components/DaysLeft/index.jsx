import { useEffect, useState } from 'react';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import academicTermService from 'services/academicTerm';

const DaysLeft = () => {
  const [termProgress, setTermProgress] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [totalDays, setTotalDays] = useState(null);
  const [termLabel, setTermLabel] = useState('');

  useEffect(() => {
    const fetchDaysLeft = async () => {
      try {
        const data = await academicTermService.getDaysLeft();
        setDaysLeft(data.daysLeft);
        setTotalDays(data.totalDays);
        setTermLabel(data.termLabel);

        const progress =
          data.totalDays > 0
            ? Math.round(((data.totalDays - data.daysLeft) / data.totalDays) * 100)
            : null;

        setTermProgress(progress);
      } catch (error) {
        console.error('Failed to fetch days left:', error);
      }
    };

    fetchDaysLeft();
  }, []);

  const daysLeftDialog = () => {
    if (daysLeft == null || totalDays == null) return '';
    const plural = daysLeft !== 1 ? 's' : '';
    return `${daysLeft} day${plural} remaining in ${termLabel}`;
  };

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
