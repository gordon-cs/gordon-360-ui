import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
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
      const daysLeft = await session.getDaysLeft();
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
      content = <Doughnut data={data} options={options} />;
      subheader = `${daysleft} Days Left in Semester`;
    }

    return (
      <Card>
        <CardContent>
          <CardHeader title="Days Left" subheader={subheader} />
          {content}
        </CardContent>
      </Card>
    );
  }
}
