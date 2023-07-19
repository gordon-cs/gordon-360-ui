import { Button, Card, CardContent, CardHeader, Grid, Link, Typography } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import session from 'services/session';
import user from 'services/user';
import styles from '../Doughnut.module.css';
import { theme360 } from 'theme';

const lowBalance = 20; //dollars
const reallyLowBalance = 10; //dollars

const DiningBalance = () => {
  const [loading, setLoading] = useState(true);
  const [diningInfo, setDiningInfo] = useState(null);
  const [[daysRemaining, daysInSession], setDaysLeft] = useState([null, null]);

  //other than the transparent background, colors don't need to change to dark mode
  const colors = theme360.colorSchemes.light.palette;

  let daysColor = colors.primary.main;
  let swipesColor = colors.success.main;
  let dollarsColor = colors.warning.main;
  let guestColor = colors.error.main;
  let emptyColor = colors.neutral.A700;
  let balanceColor = colors.success.main;

  useEffect(() => {
    Promise.all([user.getDiningInfo(), session.getDaysLeft()]).then(([diningInfo, daysLeft]) => {
      setDiningInfo(diningInfo);
      setDaysLeft(daysLeft);

      setLoading(false);
    });
  }, []);

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else if (typeof diningInfo !== 'object') {
    //Set color to use when displaying balance based on how low it is...
    const diningBalance = parseInt(diningInfo);
    if (lowBalance >= diningBalance && diningBalance > reallyLowBalance) {
      balanceColor = colors.warning.main;
    } else if (reallyLowBalance >= diningBalance && diningBalance > 0) {
      balanceColor = colors.error.main;
    } else if (diningBalance === 0) {
      balanceColor = colors.neutral.dark;
    }

    content = (
      <div
        style={{
          marginTop: '1rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div className={styles.value} style={{ color: balanceColor }}>
          ${diningInfo}
        </div>
      </div>
    );
  } else {
    const swipeInit = diningInfo.Swipes.InitialBalance;
    const swipeCurr = swipeInit === 0 ? 1 : diningInfo.Swipes.CurrentBalance;
    const swipeUsed = swipeInit === 0 ? 0 : swipeInit - swipeCurr;

    const dollarInit = diningInfo.DiningDollars.InitialBalance;

    const dollarCurrNotRounded = diningInfo.DiningDollars.CurrentBalance;
    const dollarCurr = Math.round(dollarCurrNotRounded * 100) / 100;
    const dollarUsedNotRounded = dollarInit - dollarCurr;
    //fixed issue of too many decimal places in meal points
    const dollarUsed = Math.round(dollarUsedNotRounded * 100) / 100;

    const guestInit = diningInfo.GuestSwipes.InitialBalance;
    const guestCurr = diningInfo.GuestSwipes.CurrentBalance;
    const guestUsed = guestInit - guestCurr;

    const daysLeftRounded = Math.max(daysRemaining, 0);
    const daysFinished = daysInSession - daysLeftRounded;

    const options = {
      cutoutPercentage: 0,
      tooltips: {
        // Allow different tooltips for different datasets within the same pie;
        callbacks: {
          // Code taken from https://github.com/chartjs/Chart.js/issues/1417
          label: function (item, data) {
            return (
              data.datasets[item.datasetIndex].label[item.index] +
              ': ' +
              (swipeInit === 0 &&
              data.datasets[item.datasetIndex].label[item.index].includes('Swipes') &&
              !data.datasets[item.datasetIndex].label[item.index].includes('Guest')
                ? '\u221E'
                : data.datasets[item.datasetIndex].data[item.index])
            );
          },
        },
      },
      legend: false,
    };

    const data = {
      legendEntries: ['A', 'B', 'C', 'D'], // Just used as key
      datasets: [
        {
          label: ['Days Finished', 'Days Remaining'],
          data: [daysFinished, daysLeftRounded],
          backgroundColor: [daysColor, emptyColor],
        },
        {
          label: ['Swipes Used', 'Swipes Remaining'],
          data: [swipeUsed, swipeCurr],
          backgroundColor: [emptyColor, swipesColor],
        },
        {
          label: ['Dining Dollars Used', 'Dining Dollars Remaining'],
          data: [dollarUsed, dollarCurr],
          backgroundColor: [emptyColor, dollarsColor],
        },
        {
          label: ['Guest Swipes Used', 'Guest Swipes Remaining'],
          data: [guestUsed, guestCurr],
          backgroundColor: [emptyColor, guestColor],
        },
      ],
    };

    content = (
      <div>
        <Grid
          container
          justifyContent="space-around"
          spacing={0}
          style={{ paddingTop: 5, paddingBottom: 10 }}
        >
          <Grid item>
            <Typography variant="body2" className={styles.label2}>
              {diningInfo.ChoiceDescription}
            </Typography>
          </Grid>
        </Grid>
        <Doughnut data={data} height={175} options={options} />
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className={styles.value} style={{ color: swipesColor }}>
              {swipeInit === 0 ? '\u221E' : swipeCurr}
            </div>
            <div className={styles.label}>Swipes</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className={styles.value} style={{ color: dollarsColor }}>
              ${dollarCurr}
            </div>
            <div className={styles.label}>Dining Dollars</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className={styles.value} style={{ color: guestColor }}>
              {guestCurr}
            </div>
            <div className={styles.label}>Guest Swipes</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={styles.card}>
      <CardHeader
        title={
          <Grid container direction="row" alignItems="center">
            <Grid item xs={7} align="left">
              Dining Balance
            </Grid>
            <Grid item xs={5} align="right">
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href="https://gordon.cafebonappetit.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TODAY'S MENU
              </Button>
            </Grid>
          </Grid>
        }
        className={'gc360_header'}
      />
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default DiningBalance;
