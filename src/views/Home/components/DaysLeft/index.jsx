import { useEffect, useState } from 'react';
import session from 'services/session';
import styles from '../Doughnut.module.css';
import { Card, CardContent, CardHeader, Grid, Typography, checkboxClasses } from '@mui/material';
import { theme360 } from 'theme';
import { format, parseISO } from 'date-fns';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const DaysLeft = () => {
  const [daysRemaining, setDaysRemaining] = useState();
  const [daysFinished, setDaysFinished] = useState();
  const [currentSessionDescription, setCurrentSessionDescription] = useState();
  const [loading, setLoading] = useState(true);
  const [first, setFirstDay] = useState('');
  const [last, setLastDay] = useState('');
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const [fallEnd, setFallEnd] = useState('');
  const [springBegin, setSpringBegin] = useState('');
  const [summerEnd, setSummerEnd] = useState('');
  const [summerBegin, setSummerBegin] = useState('');
  const [fallBegin, setFallBegin] = useState('');
  const [springEnd, setSpringEnd] = useState('');
  const [nextFallBegin, setNextFallBegin] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [[daysRemaining, daysInSemester], currentSession] = await Promise.all([
        session.getDaysLeft(),
        session.getCurrent(),
      ]);
      const first = format(parseISO(currentSession.SessionBeginDate), 'MM/dd/yyyy');
      const last = format(parseISO(currentSession.SessionEndDate), 'MM/dd/yyyy');
      const fallBegin = new Date((await session.get(`${currentYear - 1}09`)).SessionBeginDate);
      const fallEnd = new Date((await session.get(`${currentYear - 1}09`)).SessionEndDate);
      const springBegin = new Date((await session.get(`${currentYear}01`)).SessionBeginDate);
      const springEnd = new Date((await session.get(`${currentYear}01`)).SessionEndDate);
      const summerBegin = new Date((await session.get(`${currentYear}05`)).SessionBeginDate);
      const summerEnd = new Date((await session.get(`${currentYear}05`)).SessionEndDate);
      const nextFallBegin = new Date((await session.get(`${currentYear}09`)).SessionBeginDate);

      setFirstDay(first);
      setLastDay(last);
      setCurrentSessionDescription(currentSessionDescription);
      setDaysRemaining(daysRemaining);
      setDaysFinished(daysInSemester - daysRemaining || 0);
      setLoading(false);
      setFallEnd(fallEnd);
      setSpringBegin(springBegin);
      setSummerBegin(summerBegin);
      setSummerEnd(summerEnd);
      setSpringEnd(springEnd);
      setFallBegin(fallBegin);
      setNextFallBegin(nextFallBegin);
    };

    load();
  }, []);

  const academicTerms = ['Fall', 'Spring', 'Summer'];

  const termBreaks = ['Winter', 'PreSummer', 'PostSummer'];

  const msToDays = 1.15741e-8;
  const winterBreak = Math.round((springBegin - fallEnd) * msToDays);
  const daysRemainingWinter = Math.round((springBegin - today) * msToDays);
  const winterProgress = (Math.round((today - fallEnd) * msToDays) / winterBreak) * 100;
  const preSummer = Math.round((summerBegin - springEnd) * msToDays);
  const preSummerProgress = (Math.round((today - springEnd) * msToDays) / preSummer) * 100;
  const daysRemainingPreSummer = Math.round((summerBegin - today) * msToDays);
  const postSummer = Math.round((nextFallBegin - summerEnd) * msToDays);
  const daysRemainingPostSummer = Math.round((nextFallBegin - today) * msToDays);
  const postSummerProgress = (Math.round((today - summerEnd) * msToDays) / postSummer) * 100;

  const termLoop = [
    { start: fallBegin, end: fallEnd, type: academicTerms[0] },
    { start: fallEnd, end: springBegin, type: termBreaks[0] },
    { start: springBegin, end: springEnd, type: academicTerms[1] },
    { start: springEnd, end: summerBegin, type: termBreaks[1] },
    { start: summerBegin, end: summerEnd, type: academicTerms[2] },
    { start: summerEnd, end: nextFallBegin, type: termBreaks[2], condition: postSummer > 1 },
  ];

  let termFinder = academicTerms[0];

  for (let term of termLoop) {
    if (
      today >= term.start &&
      today <= term.end &&
      (term.condition === undefined || term.condition)
    ) {
      termFinder = term.type;
      break;
    }
  }

  const daysRemainingTermBreaks =
    termFinder === termBreaks[0]
      ? daysRemainingWinter
      : termFinder === termBreaks[1]
        ? daysRemainingPreSummer
        : termFinder === termBreaks[2]
          ? daysRemainingPostSummer
          : '';

  const termLabelLoop = [
    { term: academicTerms[0], label: academicTerms[0] },
    { term: academicTerms[1], label: academicTerms[1] },
    { term: academicTerms[2], label: academicTerms[2] },
    { term: termBreaks[0], label: academicTerms[1] },
    { term: termBreaks[1], label: academicTerms[2] },
    { term: termBreaks[2], label: academicTerms[0] },
  ];

  let termLabel = academicTerms[0];

  for (let currentLabel of termLabelLoop) {
    if (termFinder === currentLabel.term) {
      termLabel = currentLabel.label;
    }
  }

  const termDialogue = academicTerms.includes(termFinder)
    ? daysRemaining + ' Days\u00A0Remaining\u00A0in\u00A0' + termLabel + '\u00A0Term'
    : termBreaks.includes(termFinder)
      ? daysRemainingTermBreaks + ' Days\u00A0Until\u00A0' + termLabel + '\u00A0Term'
      : '';

  const termProgress = academicTerms.includes(termFinder)
    ? daysFinished
    : termFinder === termBreaks[0]
      ? winterProgress
      : termFinder === termBreaks[1]
        ? preSummerProgress
        : termFinder === termBreaks[2]
          ? postSummerProgress
          : '';

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 50,
      borderRadius: 5,
      position: 'relative',
    },
    colorPrimary: {
      backgroundColor: '#00aeef',
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#014983',
    },
  }))(LinearProgress);

  return (
    <Grid align="center">
      <div style={{ position: 'relative', width: '100%' }}>
        <BorderLinearProgress variant="determinate" value={termProgress} />
        <div
          className={styles.value}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '1rem',
          }}
        >
          {`${termDialogue}`}
        </div>
      </div>
    </Grid>
  );
};

export default DaysLeft;
