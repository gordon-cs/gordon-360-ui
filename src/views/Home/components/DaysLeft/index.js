import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import { Doughnut, defaults } from 'react-chartjs-2';

import { gordonColors } from '../../../../theme';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';


export default class DaysLeft extends Component {
  constructor(props) {
    super(props);

    this.getDaysLeft = this.getDaysLeft.bind(this);

    this.state = {
      daysLeft: [],
      loading: true,
    };
  }
  componentWillMount() {
    this.getDaysLeft();
  }
  async getDaysLeft() {
    const daysLeft = await session.getDaysLeft();
    this.setState({ daysLeft });
    this.setState({ loading: false });
  }
  render() {
    defaults.global.legend.display = false;
    let content;
    const daysleft = this.state.daysLeft[0];
    const pastDays = this.state.daysLeft[1] - daysleft;
    const Data = {
      datasets: [{ data: [pastDays, daysleft], backgroundColor: [gordonColors.primary.blue] }],
      labels: [
        'Days Finished',
        'Days Remaining',
      ],
    };
    const Options = {
      options: {
        legend: {
          display: false,
        },
      },
    };
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Card>
          <CardContent>
            <figure>
              <figcaption>
                <h3>Days Left in Semester</h3>
                <h4>{daysleft} Days Remaining</h4>
              </figcaption>
            </figure>
            <Doughnut data={Data} options={Options} />
          </CardContent >
        </Card>);
    }

    return (
      content
    );
  }
}
