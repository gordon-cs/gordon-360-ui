import React, { Component } from 'react';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import { Pie, defaults } from 'react-chartjs-2';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import session from '../../../../services/session';
import GordonLoader from '../../../../components/Loader';

export default class CLWCreditsDaysLeft extends Component {
  constructor(props) {
    super(props);

    this.loadDaysLeft = this.loadDaysLeft.bind(this);
    this.loadChapelCredits = this.loadChapelCredits.bind(this);

    this.state = {
      daysLeft: [],
      chapelCredits: {},
      error: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.loadDaysLeft();
    this.loadChapelCredits();
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

  async loadChapelCredits() {
    this.setState({ loading: true });
    try {
      const chapelCredits = await user.getChapelCredits();
      this.setState({ loading: false, chapelCredits });
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
      const daysLeft = this.state.daysLeft[0];
      const pastDays = this.state.daysLeft[1] - daysLeft;

      const options = {
        options: {
          legend: {
            display: false,
          },
          cutoutPercentage: 25,
        },
      };
      const { current, required } = this.state.chapelCredits;
      const remaining = current > required ? 0 : required - current;
      const datasets = {
        labels: ['Finished', 'Remaining'],
        datasets: [
          {
            label: 'Days Left',
            data: [120, 182],
            backgroundColor: [gordonColors.primary.blue, gordonColors.neutral.lightGray],
          },
          {
            label: 'CL&W Credits',
            data: [10, 20],
            backgroundColor: [gordonColors.primary.cyan, gordonColors.neutral.lightGray],
          },
        ],
      };
      content = <Pie data={datasets} options={options} />;
      subheader = `${daysLeft} Days Left in Semester`;
      if (current === 1) {
        subheader += ` and ${current} CL&W Credit`;
      } else {
        subheader += ` and ${current} CL&W Credits`;
      }
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
