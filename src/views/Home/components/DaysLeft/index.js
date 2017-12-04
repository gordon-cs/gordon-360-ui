import React, { Component } from 'react';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
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
      loading: true,
    };
  }
  componentWillMount() {
    this.loadDaysLeft();
  }
  async loadDaysLeft() {
    this.setState({ loading: true });
    const daysLeft = await session.getDaysLeft();
    this.setState({ loading: false, daysLeft });
  }
  render() {
    defaults.global.legend.display = false;
    let content;
    let subheader;
    const daysleft = this.state.daysLeft[0];
    const pastDays = this.state.daysLeft[1] - daysleft;
    const data = {
      datasets: [{ data: [pastDays, daysleft], backgroundColor: [gordonColors.primary.blue] }],
      labels: [
        'Days Finished',
        'Days Remaining',
      ],
    };
    const options = {
      options: {
        legend: {
          display: false,
        },
      },
    };
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = <Doughnut data={data} options={options} />;
      subheader = `${daysleft} Days Left`;
    }

    return (
      <Card>
        <CardContent>
          <CardHeader
            title="Days Left in Semester"
            subheader={subheader}
          />
          {content}
        </CardContent >
      </Card>
    );
  }
}
