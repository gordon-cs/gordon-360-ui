import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

import { gordonColors } from 'theme';
import session from 'services/session';
import GordonLoader from 'components/Loader';

import { Card, CardHeader, CardContent, Typography, Grid } from '@material-ui/core';

export default class DaysLeft extends Component {
  constructor(props) {
    super(props);

    this.loadDaysLeft = this.loadDaysLeft.bind(this);

    this.state = {
      daysLeft: [],
      currSessionDescription: '',
      error: null,
      loading: true,
    };
  }
  componentDidMount() {
    this.loadDaysLeft();
  }
  async loadDaysLeft() {
    this.setState({ loading: true });
    try {
      const daysLeftPromise = await session.getDaysLeft();
      const currSessionPromise = session.getCurrent();
      const daysLeft = await daysLeftPromise;
      const currSession = await currSessionPromise;
      const currSessionDescription = currSession.SessionDescription.replace(
        /(Academic Year)|(Grad)/gm,
        '',
      );
      this.setState({ loading: false, daysLeft, currSessionDescription });
      this.setState({ loading: false, daysLeft });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    if (this.state.error) {
      throw this.state.error;
    }

    let content;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const daysleft = this.state.daysLeft[0];
      const pastDays = this.state.daysLeft[1] - daysleft;
      const data = {
        datasets: [{ data: [pastDays, daysleft], backgroundColor: [gordonColors.primary.blue] }],
        labels: ['Days Finished', 'Days Remaining'],
      };
      const options = {
        legend: false,
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
                {`${daysleft} Days Left`}
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
              <div className="label-text" style={{ color: gordonColors.primary.blue }}>
                {pastDays}
              </div>
              <div className="entry-text">Days Finished</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Card>
        <CardContent>
          <Grid container direction="row" alignItems="center">
            <CardHeader title={this.state.currSessionDescription} />
          </Grid>
          {content}
        </CardContent>
      </Card>
    );
  }
}
