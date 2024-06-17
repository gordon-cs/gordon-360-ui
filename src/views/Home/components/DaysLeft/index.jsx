import { useEffect, useState } from 'react';
import session from 'services/session';
import styles from './ProgressBar.module.css';
import { Grid } from '@mui/material';
import { format, parseISO } from 'date-fns';

const DaysLeft = () => {
  const [daysRemaining, setDaysRemaining] = useState();
  const [daysFinished, setDaysFinished] = useState();
  const [loading, setLoading] = useState(true);
  const [first, setFirstDay] = useState('');
  const [last, setLastDay] = useState('');
  const [termDates, setTermDates] = useState({});
  const [termFinder, setTermFinder] = useState('Fall');
  const [termDialogue, setTermDialogue] = useState('');
  const [termProgress, setTermProgress] = useState(0);
  const currentYear = new Date().getFullYear();
  const today = new Date();

  const fetchTermDates = async () => {
    const termDates = {
      fall: {
        name: 'Fall',
        start: new Date((await session.get(`${currentYear - 1}09`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear - 1}09`)).SessionEndDate),
      },
      spring: {
        name: 'Spring',
        start: new Date((await session.get(`${currentYear}01`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear}01`)).SessionEndDate),
      },
      summer: {
        name: 'Summer',
        start: new Date((await session.get(`${currentYear}05`)).SessionBeginDate),
        end: new Date((await session.get(`${currentYear}05`)).SessionEndDate),
      },
      nextFall: {
        name: 'Next Fall',
        start: new Date((await session.get(`${currentYear}09`)).SessionBeginDate),
      },
    };
    return termDates;
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const [[daysRemaining, daysInSemester], currentSession, termDates] = await Promise.all([
        session.getDaysLeft(),
        session.getCurrent(),
        fetchTermDates(),
      ]);

      const first = format(parseISO(currentSession.SessionBeginDate), 'MM/dd/yyyy');
      const last = format(parseISO(currentSession.SessionEndDate), 'MM/dd/yyyy');

      setFirstDay(first);
      setLastDay(last);
      setDaysRemaining(daysRemaining);
      setDaysFinished(daysInSemester - daysRemaining || 0);
      setLoading(false);
      setTermDates(termDates);
    };

    load();
  }, [currentYear]);

  const msToDays = 1.15741e-8;

  useEffect(() => {
    if (!loading) {
      const termBreaks = {
        winter: {
          name: 'Winter',
          label: 'Spring',
          length: Math.round((termDates.spring?.start - termDates.fall?.end) * msToDays),
          daysLeft: Math.round((termDates.spring?.start - today) * msToDays),
        },
        preSummer: {
          name: 'Pre-Summer',
          label: 'Summer',
          length: Math.round((termDates.summer?.start - termDates.spring?.end) * msToDays),
          daysLeft: Math.round((termDates.summer?.start - today) * msToDays),
        },
        postSummer: {
          name: 'Post-Summer',
          label: 'Fall',
          length: Math.round((termDates.nextFall?.start - termDates.summer?.end) * msToDays),
          daysLeft: Math.round((termDates.nextFall?.start - today) * msToDays),
        },
      };

      const winterProgress =
        (Math.round((today - termDates.fall?.end) * msToDays) / termBreaks.winter?.length) * 100;
      const preSummerProgress =
        (Math.round((today - termDates.spring?.end) * msToDays) / termBreaks.preSummer.length) *
        100;
      const postSummerProgress =
        (Math.round((today - termDates.summer?.end) * msToDays) / termBreaks.postSummer.length) *
        100;

      const termLoop = [
        { ...termDates.fall, type: 'Academic' },
        {
          start: termDates.fall?.end,
          end: termDates.spring?.start,
          name: termBreaks.winter?.name,
          type: 'Break',
        },
        { ...termDates.spring, type: 'Academic' },
        {
          start: termDates.spring?.end,
          end: termDates.summer?.start,
          name: termBreaks.preSummer?.name,
          type: 'Break',
        },
        { ...termDates.summer, type: 'Academic' },
        {
          start: termDates.summer?.end,
          end: termDates.nextFall?.start,
          name: termBreaks.postSummer?.name,
          type: 'Break',
          condition: termBreaks.postSummer?.length > 1,
        },
      ];

      let foundTerm = 'Fall';

      for (let term of termLoop) {
        if (
          today >= term.start &&
          today <= term.end &&
          (term.condition === undefined || term.condition)
        ) {
          foundTerm = term.name;
          break;
        }
      }

      const daysRemainingTermBreaks =
        foundTerm === termBreaks.winter?.name
          ? termBreaks.winter?.daysLeft
          : foundTerm === termBreaks.preSummer?.name
            ? termBreaks.preSummer?.daysLeft
            : foundTerm === termBreaks.postSummer?.name
              ? termBreaks.postSummer?.daysLeft
              : '';

      const termLabel =
        foundTerm === termBreaks.winter?.name
          ? termBreaks.winter?.label
          : foundTerm === termBreaks.preSummer?.name
            ? termBreaks.preSummer?.label
            : foundTerm === termBreaks.postSummer?.name
              ? termBreaks.postSummer?.label
              : '';

      const dialogue = termLoop.find((term) => term.name === foundTerm && term.type === 'Academic')
        ? `${daysRemaining} Days Remaining in ${foundTerm} Term`
        : `${daysRemainingTermBreaks} Days Until ${termLabel} Term`;

      const progress = termLoop.find((term) => term.name === foundTerm && term.type === 'Academic')
        ? daysFinished
        : foundTerm === termBreaks.winter?.name
          ? winterProgress
          : foundTerm === termBreaks.preSummer?.name
            ? preSummerProgress
            : foundTerm === termBreaks.postSummer?.name
              ? postSummerProgress
              : '';

      setTermFinder(foundTerm);
      setTermDialogue(dialogue);
      setTermProgress(progress);
    }
  }, [loading, termDates, daysRemaining, daysFinished]);

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
