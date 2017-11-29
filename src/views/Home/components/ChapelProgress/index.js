import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card, { CardContent, CardHeader } from 'material-ui/Card';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import GordonLoader from '../../../../components/Loader';

export default class ChapelProgress extends Component {
  constructor(props) {
    super(props);

    this.loadChapel = this.loadChapel.bind(this);

    this.state = {
      loading: true,
      chapelCredits: {},
    };
  }
  componentWillMount() {
    this.loadChapel();
  }
  async loadChapel() {
    this.setState({ loading: true });
    const chapelCredits = await user.getChapelCredits();
    this.setState({ loading: false, chapelCredits });
  }
  render() {
    let content;
    let subheader;
    const { current, required } = (this.state.chapelCredits);
    const remaining = required - current;
    const data = {
      datasets: [{
        data: [current, remaining],
        backgroundColor: [gordonColors.primary.blue],
      }],
      labels: [
        'CL&W Credits',
        'CL&W Credits Remaining',
      ],
    };
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = <Doughnut data={data} />;
      if (current === 1) {
        subheader = `${current} CL&W`;
      } else {
        subheader = `${current} CL&W's`;
      }
    }
    return (
      <Card>
        <CardContent>
          <CardHeader
            title="Chapel Progress"
            subheader={subheader}
          />
          {content}
        </CardContent >
      </Card>
    );
  }
}
