import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import GordonLoader from 'components/Loader';
import session from 'services/session';
import styles from '../Doughnut.module.css';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { theme360 } from 'theme';
import { format, parseISO } from 'date-fns';

const DaysLeft = () => {
  const [daysRemaining, setDaysRemaining] = useState();
  const [daysFinished, setDaysFinished] = useState();
  const [currentSessionDescription, setCurrentSessionDescription] = useState();
  const [loading, setLoading] = useState(true);
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const currSession = await session.getCurrent();
      const firstDay = format(parseISO(currSession.SessionBeginDate), 'MM/dd/yyyy');
      const lastDay = format(parseISO(currSession.SessionEndDate), 'MM/dd/yyyy');
      const [[daysRemaining, daysInSemester], currentSession] = await Promise.all([
        session.getDaysLeft(),
        session.getCurrent(),
      ]);

      const currentSessionDescription = currentSession.SessionDescription.replace(
        /(Academic Year)|(Grad)/gm,
        '',
      );

      setFirstDay(firstDay);
      setLastDay(lastDay);
      setCurrentSessionDescription(currentSessionDescription);
      setDaysRemaining(daysRemaining);
      setDaysFinished(daysInSemester - daysRemaining || 0);
      setLoading(false);
    };

    load();
  }, []);

  const colors = theme360.colorSchemes.light.palette;

  return (
    <Card className={styles.card}>
      <CardHeader title={currentSessionDescription} className="gc360_header">
        <br />
      </CardHeader>
      <CardContent>
        {loading ? (
          <GordonLoader />
        ) : (
          <Grid container direction="column" justifyContent="space-around" spacing={2}>
            <Grid item textAlign="center">
              <Typography variant="subtitle2">{daysRemaining} Days Left</Typography>
            </Grid>
            <Grid item style={{ position: 'relative', maxWidth: '100%' }}>
              <Doughnut
                data={{
                  datasets: [
                    {
                      data: [daysFinished, daysRemaining],
                      backgroundColor: [colors.primary.main, colors.neutral.A400],
                    },
                  ],
                  labels: ['Days Finished', 'Days Remaining'],
                }}
                options={{ legend: false }}
              />
            </Grid>

            <Grid item container justifyContent="center" direction="column" alignItems="center">
              <Typography className={styles.value} color="secondary">
                {daysFinished}
              </Typography>
              <Typography className={styles.label}>Days Finished</Typography>
              <Typography variant="body2" className={styles.label2}>
                {`Current Term: ${firstDay} - ${lastDay}`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default DaysLeft;
