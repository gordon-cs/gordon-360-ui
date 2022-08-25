import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import session from 'services/session';
import user from 'services/user';
import { gordonColors } from 'theme';
import styles from './DiningBalance.module.css';

const lowBalance = 20; //dollars
const reallyLowBalance = 10; //dollars

let daysColor = gordonColors.primary.blue;
let swipesColor = gordonColors.secondary.green;
let dollarsColor = gordonColors.secondary.yellow;
let guestColor = gordonColors.secondary.orange;
let emptyColor = gordonColors.neutral.lightGray;

const style = {
  button: {
    background: gordonColors.primary.cyan,
    color: 'white',
  },
};

const DiningBalance = () => {
  const [loading, setLoading] = useState(true);
  const [diningInfo, setDiningInfo] = useState(null);
  const [[daysRemaining, daysCompleted], setDaysLeft] = useState([null, null]);
  const [isFacStaff, setIsFacStaff] = useState('');
  const { profile } = useUser();

  useEffect(() => {
    const loadData = async () => {
      const [diningInfo, daysLeft] = await Promise.all([
        user.getDiningInfo(),
        session.getDaysLeft(),
      ]);
      setDiningInfo(diningInfo);
      setDaysLeft(daysLeft);

      if (profile.PersonType?.includes('fac')) {
        setIsFacStaff(true);
      }
      setLoading(false);
    };

    if (profile) {
      loadData();
    }
  }, [profile]);

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else if (isFacStaff || typeof diningInfo !== 'object') {
    //Set color to use when displaying balance based on how low it is...
    const diningBalance = parseInt(diningInfo);
    let balanceColor = gordonColors.secondary.green;
    if (lowBalance >= diningBalance && diningBalance > reallyLowBalance) {
      balanceColor = gordonColors.secondary.yellow;
    } else if (reallyLowBalance >= diningBalance && diningBalance > 0) {
      balanceColor = gordonColors.secondary.orange;
    } else if (diningBalance === 0) {
      balanceColor = gordonColors.neutral.lightGray;
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
        <div className={styles.label_text} style={{ color: balanceColor }}>
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

    const daysLeftRounded = Math.min(daysRemaining, 0);
    const daysFinished = daysCompleted - daysLeftRounded;

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
            <Typography variant="body2" style={{ color: 'gray', textAlign: 'center' }}>
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
            <div className={styles.label_text} style={{ color: swipesColor }}>
              {swipeInit === 0 ? '\u221E' : swipeCurr}
            </div>
            <div className={styles.entry_text}>Swipes</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className={styles.label_text} style={{ color: dollarsColor }}>
              ${dollarCurr}
            </div>
            <div className={styles.entry_text}>Dining Dollars</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className={styles.label_text} style={{ color: guestColor }}>
              {guestCurr}
            </div>
            <div className={styles.entry_text}>Guest Swipes</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={styles.dining_balance}>
      <CardContent>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={7} align="left">
            <CardHeader title="Dining Balance" />
          </Grid>
          <Grid item xs={5} align="right">
            <Button
              variant="contained"
              style={style.button}
              onClick={() => window.open('https://gordon.cafebonappetit.com/', '_blank')}
            >
              TODAY'S MENU
            </Button>
          </Grid>
        </Grid>
        {content}
      </CardContent>
    </Card>
  );
};

export default DiningBalance;
