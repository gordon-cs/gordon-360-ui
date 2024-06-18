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
  const [termDates, setTermDates] = useState({});
  const [termDialogue, setTermDialogue] = useState('');
  const [termProgress, setTermProgress] = useState(0);
  const currentYear = new Date().getFullYear();
  const today = new Date();

  // Gathers all the academic term start and end dates that are used to find the term breaks values.
  const fetchTermDates = async () => {
    const termDates = {
      fall: {
        start: new Date((await session.get(`${currentYear}09`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear}09`)).SessionEndDate),
      },
      spring: {
        start: new Date((await session.get(`${currentYear}01`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear}01`)).SessionEndDate),
      },
      summer: {
        start: new Date((await session.get(`${currentYear}05`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear}05`)).SessionEndDate),
      },
    };
    return termDates;
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [[daysInSemester], currentSession, termDates] = await Promise.all([
        session.getDaysLeft(),
        session.getCurrent(),
        fetchTermDates(),
      ]);

      setLoading(false);
      setTermDates(termDates);
    };

    load();
  }, [currentYear]);

  // When performing math on dates multiply the answer by this to convert from ms to days
  const msToDays = 1.1574074074074e-8;
  // Stores the needed values to compute and display the progress bar properly
  useEffect(() => {
    if (!loading) {
      const termValues = {
        fall: {
          name: 'Fall',
          label: 'Fall',
          type: 'Academic',
          start: termDates.fall?.start,
          end: termDates.fall?.end,
        },
        spring: {
          name: 'Spring',
          label: 'Spring',
          type: 'Academic',
          start: termDates.spring?.start,
          end: termDates.spring?.end,
        },
        summer: {
          name: 'Summer',
          label: 'Summer',
          type: 'Academic',
          start: termDates.summer?.start,
          end: termDates.summer?.end,
        },
        winter: {
          name: 'Winter',
          label: 'Spring',
          type: 'Break',
          start: addDays(termDates.fall?.end, 1),
          end: addDays(termDates.spring?.start, -1),
        },
        preSummer: {
          name: 'Pre-Summer',
          label: 'Summer',
          type: 'Break',
          start: addDays(termDates.spring?.end, 1),
          end: addDays(termDates.summer?.start, -1),
        },
        postSummer: {
          name: 'Post-Summer',
          label: 'Fall',
          type: 'Break',
          start: addDays(termDates.summer?.end, 1),
          end: addDays(termDates.fall?.start, -1),
        },
      };
      const termLoop = [
        termValues.fall,
        termValues.winter,
        termValues.spring,
        termValues.preSummer,
        termValues.summer,
        termValues.postSummer,
      ];

      let currentTerm = 'Fall';
      let currentLabel = 'Fall';
      let currentDaysLeft = '';
      let currentProgress = '';
      let currentType = '';

      // Iterate through all term start and end dates to find what term the current date is in
      for (let term of termLoop) {
        if (today >= term.start && today <= term.end) {
          currentTerm = term.name;
          currentLabel = term.label;
          currentDaysLeft = Math.round((term.end - today) * msToDays) + 1;
          currentProgress = Math.round(
            (((today - term.start) * msToDays + 1) /
              (Math.round((term.end - term.start) * msToDays) + 1)) *
              100,
          );
          currentType = term.type;

          break;
        }
      }

      /* Applys the proper dialogue based on if we are in an academic term or a term break with 
      a condition to make days singular if there is only 1 day left*/
      const termDialogue = termLoop.find(
        (term) => term.name === currentTerm && term.type === 'Academic' && currentDaysLeft > 1,
      )
        ? `${currentDaysLeft} Days Remaining in ${currentTerm} Term`
        : currentType === 'Academic' && currentDaysLeft === 1
          ? `${currentDaysLeft} Day Remaining in ${currentTerm} Term`
          : currentDaysLeft > 1
            ? `${currentDaysLeft} Days Until ${currentLabel} Term`
            : `${currentDaysLeft} Day Until ${currentLabel} Term`;

      setTermDialogue(termDialogue);
      setTermProgress(currentProgress);
    }
  }, [loading, termDates]);

  /* The width of the front container is 10,000 / termProgress to correctly overlap with the 
  backContainer and make it seem like the color changes as the backContainer gets covered*/
  return (
    <Grid align="center">
      <div className={styles.backContainer}>
        {termDialogue}
        <div className={styles.boundBox} style={{ width: termProgress + '%' }}>
          <div className={styles.frontContainer} style={{ width: 10000 / termProgress + '%' }}>
            {termDialogue}
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default DaysLeft;
