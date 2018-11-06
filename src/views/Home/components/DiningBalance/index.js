import React, { Component } from 'react';
//import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';
//import { Button } from '@material-ui/core';
import GordonLoader from '../../../../components/Loader';
import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import { CardContent } from '../../../../../node_modules/@material-ui/core';

import './DiningBalance.css';

export default class DiningBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.diningInfo = null;
    this.daysLeft = null;

    this.balanceTypes = ['Dining Dollars', 'Swipes', 'Guest Swipes'];
    this.facStaffBalance = '';
  }
  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    const { college_role } = user.getLocalInfo();
    const diningInfoPromise = user.getDiningInfo();
    const daysLeftPromise = session.getDaysLeft();
    const daysLeft = await daysLeftPromise;
    const diningInfo = await diningInfoPromise;
    this.daysLeft = daysLeft;
    if (college_role === 'student') {
      this.diningInfo = diningInfo;
    } else {
      this.facStaffBalance = diningInfo;
    }
    this.setState({ loading: false });
  }
  render() {
    let daysColor = gordonColors.primary.blue;
    let swipesColor = gordonColors.secondary.green;
    let dollarsColor = gordonColors.secondary.yellow;
    let guestColor = gordonColors.secondary.orange;
    let emptyColor = gordonColors.neutral.lightGray;

    defaults.global.legend.display = false;
    let content;
    let description = '';
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      if (this.facStaffBalance) {
        content = (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {/*They aren't really swipes, but green is nicer if it's the only one*/}
            <div className="label-text" style={{ color: swipesColor }}>
              ${this.facStaffBalance}
            </div>
          </div>
        );
      } else {
        description = this.diningInfo.ChoiceDescription;

        const swipeInit = this.diningInfo.Swipes.InitialBalance;
        const swipeCurr = swipeInit === 0 ? 1 : this.diningInfo.Swipes.CurrentBalance;
        const swipeUsed = swipeInit === 0 ? 0 : swipeInit - swipeCurr;

        const dollarInit = this.diningInfo.DiningDollars.InitialBalance;
        const dollarCurr = this.diningInfo.DiningDollars.CurrentBalance;
        const dollarUsed = dollarInit - dollarCurr;

        const guestInit = this.diningInfo.GuestSwipes.InitialBalance;
        const guestCurr = this.diningInfo.GuestSwipes.CurrentBalance;
        const guestUsed = guestInit - guestCurr;

        const daysLeft = this.daysLeft[0] < 0 ? 0 : this.daysLeft[0];
        const daysFinished = this.daysLeft[1] - daysLeft;

        const options = {
          cutoutPercentage: 0,
          tooltips: {
            // Allow different tooltips for different datasets within the same pie;
            callbacks: {
              // Code taken from https://github.com/chartjs/Chart.js/issues/1417
              label: function(item, data) {
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
              data: [daysFinished, daysLeft],
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

        if (description === 'None') {
          content = (
            <div>
              <Grid
                container
                justify="space-around"
                spacing={0}
                style={{ paddingTop: 5, paddingBottom: 5 }}
              >
                <Grid item>
                  <Typography variant="body1" style={{ color: 'gray', textAlign: 'center' }}>
                    No Meal Plan
                  </Typography>
                </Grid>
              </Grid>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img className="sandwich" src={require('./sandwich.svg')} alt="Enjoy your food!" />
              </div>
            </div>
          );
        } else {
          content = (
            <div>
              <Grid
                container
                justify="space-around"
                spacing={0}
                style={{ paddingTop: 5, paddingBottom: 10 }}
              >
                <Grid item>
                  <Typography variant="body1" style={{ color: 'gray', textAlign: 'center' }}>
                    {this.diningInfo.ChoiceDescription}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid container justify="center">
                <Grid item>
                  <div class="legend">
                    <div class="entry">
                        <span class="entry-label" style={{ background: gordonColors.primary.blue }} />
                        <span class="entry-text">Days Finished</span>
                    </div>
                    <div class="entry">
                      <span class="entry-label" style={{ background: gordonColors.primary.cyan }} />
                      <span class="entry-text">Swipes</span>
                    </div>
                    <div class="entry">
                      <span class="entry-label" style={{ background: '#b2bb1c' }} />
                      <span class="entry-text">Dining Dollars</span>
                    </div>
                    <div class="entry">
                      <span class="entry-label" style={{ background: '#fdb913' }} />
                      <span class="entry-text">Guest Swipes</span>
                    </div>
                  </div>
                </Grid>
              </Grid> */}
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
                  <div className="label-text" style={{ color: swipesColor }}>
                    {swipeInit === 0 ? '\u221E' : swipeCurr}
                  </div>
                  <div class="entry-text">Swipes</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="label-text" style={{ color: dollarsColor }}>
                    ${dollarCurr}
                  </div>
                  <div class="entry-text">Dining Dollars</div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="label-text" style={{ color: guestColor }}>
                    {guestCurr}
                  </div>
                  <div class="entry-text">Guest Swipes</div>
                </div>
              </div>
            </div>
          );
        }
      }
    }
    return (
      <Card>
        <CardContent>
          <Typography variant="headline" style={{ textAlign: 'center', paddingTop: 5 }}>
            {this.state.loading ? '' : 'Dining Balance'}
          </Typography>
          {content}
        </CardContent>
      </Card>
    );
  }
}
