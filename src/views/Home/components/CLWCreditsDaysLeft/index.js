import React, { useState, useEffect } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { gordonColors } from 'theme';
import user from 'services/user';
import session from 'services/session';
import GordonLoader from 'components/Loader';

import './CLWChart.css';

import { Card, CardHeader, CardContent, Typography, Grid, Button } from '@material-ui/core';

const style = {
  button: {
    background: gordonColors.primary.cyan,
    color: 'white',
  },
};

const CLWCreditsDaysLeft = () => {
  const [daysLeft, setDaysLeft] = useState([]);
  const [chapelCredits, setChapelCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currSessionDescription, setCurrSessionDescription] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const daysLeft = await session.getDaysLeft();
      const chapelCredits = await user.getChapelCredits();
      const currSession = await session.getCurrent();
      const currSessionDescription = currSession.SessionDescription.replace(
        /(Academic Year)|(Grad)/gm,
        '',
      );

      setDaysLeft(daysLeft);
      setChapelCredits(chapelCredits);
      setCurrSessionDescription(currSessionDescription);
      setLoading(false);
    };

    loadData();
  }, []);

  let daysColor = gordonColors.primary.blue;
  let chapelColor = gordonColors.primary.cyan;
  let emptyColor = gordonColors.neutral.lightGray;

  defaults.global.legend.display = false;

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
      legendColors: [gordonColors.primary.blue, gordonColors.primary.cyan],
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
      <React.Fragment>
        <Grid
          container
          justify="space-around"
          spacing={0}
          style={{ paddingTop: 5, paddingBottom: 10 }}
        >
          <Grid item>
            <Typography variant="body2" style={{ color: 'gray', textAlign: 'center' }}>
              {`${daysRemaining} Days Left`}
            </Typography>
          </Grid>
          {required != 0 ? (
            <Grid item>
              <Typography variant="body2" style={{ color: 'gray', textAlign: 'center' }}>
                {`${remaining} CL&W Credit` + (remaining === 1 ? '' : 's') + ' Left'}
              </Typography>
            </Grid>
          ) : (
            ''
          )}
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
            <div className="label-text" style={{ color: daysColor }}>
              {daysFinished}
            </div>
            <div className="entry-text">
              {'Day' + (daysFinished === 1 ? '' : 's') + ' Finished'}
            </div>
          </div>

          {required != 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div className="label-text" style={{ color: chapelColor }}>
                {current}
              </div>
              <div className="entry-text">{'CL&W Credit' + (current === 1 ? '' : 's')}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }

  return (
    <Card className="clw-credits-days-left">
      <CardContent>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4} align="left">
            <Button variant="contained" style={style.button} component={Link} to="/attended">
              ATTENDED EVENTS
            </Button>
          </Grid>
          <Grid item xs={4} align="center">
            <CardHeader title={currSessionDescription} />
          </Grid>
          <Grid item xs={4} align="right">
            <Button
              variant="contained"
              style={style.button}
              component={Link}
              to="/events?CLW%20Credits"
            >
              MORE CREDITS
            </Button>
          </Grid>
        </Grid>
        {content}
      </CardContent>
    </Card>
  );
};

export default CLWCreditsDaysLeft;
