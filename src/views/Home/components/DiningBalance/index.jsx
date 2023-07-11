import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import session from 'services/session';
import user from 'services/user';
import { gordonColors } from 'theme';
import styles from '../Doughnut.module.css';
import EditIcon from '@mui/icons-material/Edit';
//import styles from './DiningBalance.module.scss';
import { useTheme } from '@emotion/react';
import { FaPen } from 'react-icons/fa';

const lowBalance = 20; //dollars
const reallyLowBalance = 10; //dollars

const DiningBalance = () => {
  const [loading, setLoading] = useState(true);
  const [diningInfo, setDiningInfo] = useState(null);
  const [[daysRemaining, daysInSession], setDaysLeft] = useState([null, null]);

  //Doesn't re-render colors when using getColor!!!!!
  let daysColor = gordonColors.primary.blue;
  let swipesColor = gordonColors.secondary.green;
  let dollarsColor = gordonColors.secondary.yellow;
  let guestColor = gordonColors.secondary.orange;
  let emptyColor = gordonColors.neutral.lightGray;

  let balanceColor = gordonColors.secondary.green;

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
    <Card>
      <CardContent>
        <Grid container direction="row" alignItems="center" spacing={0}>
          <Grid item xs={7} align="left">
            <CardHeader title="Dining Balance" />
          </Grid>
          <Grid item xs={5} align="right">
            <Button
              variant="contained"
              style={{
                backgroundColor: 'var(--mui-palette-secondary-main)',
                color: 'var(--mui-palette-secondary-contrastText',
              }}
              component={Link}
              href="https://gordon.cafebonappetit.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TODAY'S MENU
            </Button>
          </Grid>
          <Grid container direction="row" alignSelf="center">
            <Grid item xs={11} align="right">
              <IconButton
                title="Change Meal Plan"
                className={styles.gc360_my_profile_edit_icon}
                component={Link}
                href="https://www.gordon.edu/mealplan"
                size="small"
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* <Grid container direction="row" alignSelf="right">
            <Grid item xs={1} align="right">
              <IconButton
                title="Change Meal Plan"
                className={styles.gc360_my_profile_edit_icon}
                component={Link}
                href="https://www.gordon.edu/mealplan"
                size="small"
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid item xs={5} align="right">
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'var(--mui-palette-secondary-main)',
                  color: 'var(--mui-palette-secondary-contrastText',
                }}
                component={Link}
                href="https://gordon.cafebonappetit.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TODAY'S MENU
              </Button>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={7} align="left">
            <CardHeader title="Dining Balance" />
          </Grid>
          <Grid item xs={5} align="right" className={styles.value}>
            <Grid item>
              <Button
                variant="contained"
                style={{
                  backgroundColor: 'var(--mui-palette-secondary-main)',
                  color: 'var(--mui-palette-secondary-contrastText',
                }}
                component={Link}
                href="https://gordon.cafebonappetit.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                TODAY'S MENU
              </Button>
            </Grid>
            <Grid item>
              <IconButton
                title="Change Meal Plan"
                className={styles.gc360_my_profile_edit_icon}
                component={Link}
                href="https://www.gordon.edu/mealplan"
                size="small"
              >
                <EditIcon />
              </IconButton>
            </Grid>
          </Grid> */}
        </Grid>
        {content}
      </CardContent>
    </Card>
  );
};

export default DiningBalance;
