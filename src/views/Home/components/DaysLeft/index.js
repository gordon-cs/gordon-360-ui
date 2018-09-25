import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { Doughnut, defaults } from 'react-chartjs-2';

import { gordonColors } from '../../../../theme';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';

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
  componentWillMount() {
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

    defaults.global.legend.display = false;
    let content;
    let subheader;
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
        options: {
          legend: {
            display: false,
          },
        },
      };
      content = (
        <div>
          <Grid container direction="column" spacing={16}>
            <Grid item>
              <Doughnut data={data} options={options} />
            </Grid>
            <Grid item align="center">
              <div className="label-text" style={{ color: gordonColors.primary.blue }}>
                {pastDays}
              </div>
              <div class="entry-text">Days Finished</div>
            </Grid>
          </Grid>
        </div>
      );
      subheader = `${daysleft} Days Left in Semester`;
    }

    return (
      <Card>
        <CardContent>
          <CardHeader
            title={this.state.currSessionDescription}
            subheader={subheader}
            align="center"
          />
          {content}
        </CardContent>
      </Card>
    );
  }
}
