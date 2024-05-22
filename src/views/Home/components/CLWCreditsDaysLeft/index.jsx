import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import GordonLoader from 'components/Loader';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { defaults, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import session from 'services/session';
import user from 'services/user';
import styles from '../Doughnut.module.css';
import { theme360 } from 'theme';

const CLWCreditsDaysLeft = () => {
  const [firstDay, setFirstDay] = useState('');
  const [lastDay, setLastDay] = useState('');
  const [daysLeft, setDaysLeft] = useState([]);
  const [chapelCredits, setChapelCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currSessionDescription, setCurrSessionDescription] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const daysLeft = await session.getDaysLeft();
      const chapelCredits = await user.getChapelCredits();
      const currSession = await session.getCurrent();
      const firstDay = format(parseISO(currSession.SessionBeginDate), 'MM/dd/yyyy');
      const lastDay = format(parseISO(currSession.SessionEndDate), 'MM/dd/yyyy');
      const currSessionDescription = currSession.SessionDescription.replace(
        /(Academic Year)|(Grad)/gm,
        '',
      );

      setFirstDay(firstDay);
      setLastDay(lastDay);
      setDaysLeft(daysLeft);
      setChapelCredits(chapelCredits);
      setCurrSessionDescription(currSessionDescription);
      setLoading(false);
    };

    loadData();
  }, []);

  // variable colors do not work in chartjs, so fixed colors from the light palette are used
  const colors = theme360.colorSchemes.light.palette;

  let daysColor = colors.primary.main;
  let chapelColor = colors.secondary.main;
  let emptyColor = colors.neutral.A700;

  defaults.global.legend.display = true;

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else {
    const daysRemaining = daysLeft[0] < 0 ? 0 : daysLeft[0];
    const daysFinished = daysLeft[1] - daysRemaining;

    const options = {
      cutoutPercentage: 25,
      tooltips: {
        // Allow different tooltips for different datasets within the same pie;
        callbacks: {
          // Code taken from https://github.com/chartjs/Chart.js/issues/1417
          label: function (item, data) {
            return (
              data.datasets[item.datasetIndex].label[item.index] +
              ': ' +
              data.datasets[item.datasetIndex].data[item.index]
            );
          },
        },
      },
      legend: false,
    };

    const { current, required } = chapelCredits;
    const remaining = current > required ? 0 : required - current;
    const data = {
      legendEntries: ['Days Finished', 'CL&W Credits'],
      legendColors: [daysColor, chapelColor],
      datasets: [
        {
          label: ['Days Finished', 'Days Remaining'],
          data: [daysFinished, daysRemaining],
          backgroundColor: [daysColor, emptyColor],
        },
        {
          label: ['CL&W Credits Earned', 'CL&W Credits Remaining'],
          data: [current, remaining],
          backgroundColor: [chapelColor, emptyColor],
        },
      ],
    };

    content = (
      <>
        <Grid
          container
          justifyContent="space-around"
          spacing={0}
          style={{ paddingTop: 5, paddingBottom: 10 }}
        >
          <Grid item>
            <Typography variant="body2" className={styles.label2}>
              {`${daysRemaining} Days Left`}
            </Typography>
          </Grid>
          {required ? (
            <Grid item>
              <Typography variant="body2" className={styles.label2}>
                {`${remaining} CL&W Credit${remaining === 1 ? '' : 's'} Left`}
              </Typography>
            </Grid>
          ) : null}
        </Grid>

        <Doughnut data={data} height={175} options={options} />
        <Grid container alignItems="start">
          <Grid
            item
            xs={required ? 6 : 12}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <div
              className={styles.value}
              style={{ color: theme360.vars.palette.link.contrastText }}
            >
              {daysFinished}
            </div>
            <div className={styles.label}>
              {'Day' + (daysFinished === 1 ? '' : 's') + ' Finished'}
            </div>
            <Typography variant="body2" className={styles.label2}>
              {`Current Term: ${firstDay} - ${lastDay}`}
            </Typography>
          </Grid>

          {required ? (
            <Grid
              item
              xs={6}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <div className={styles.value} style={{ color: chapelColor }}>
                {current}
              </div>
              <div className={styles.label}>{`CL&W Credit${current === 1 ? '' : 's'}`}</div>
            </Grid>
          ) : null}
        </Grid>
      </>
    );
  }

  return (
    <Card>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              {currSessionDescription}
            </Grid>
            <Grid item xs={5} align="right">
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/events?CLW%20Credits"
              >
                MORE CREDITS
              </Button>
            </Grid>
          </Grid>
        }
        className="gc360_header"
      />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default CLWCreditsDaysLeft;
