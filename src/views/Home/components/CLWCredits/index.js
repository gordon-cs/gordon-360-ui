import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import GordonLoader from '../../../../components/Loader';

export default class ChapelProgress extends Component {
  constructor(props) {
    super(props);

    this.loadChapel = this.loadChapel.bind(this);

    this.state = {
      error: null,
      loading: true,
      chapelCredits: {},
    };
  }
  componentWillMount() {
    this.loadChapel();
  }
  async loadChapel() {
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

    let content;
    let subheader;
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      const { current, required } = this.state.chapelCredits;
      const remaining = current > required ? 0 : required - current;
      const data = {
        datasets: [
          {
            data: [current, remaining],
            backgroundColor: [gordonColors.primary.blue],
          },
        ],
        labels: ['CL&W Credits', 'CL&W Credits Remaining'],
      };
      content = <Doughnut data={data} />;
      if (current === 1) {
        subheader = `${current} CL&W Credit`;
      } else {
        subheader = `${current} CL&W Credits`;
      }
    }
    return (
      <Card>
        <CardContent>
          <CardHeader title="CL&W Credits" subheader={subheader} />
          {content}
        </CardContent>
      </Card>
    );
  }
}
