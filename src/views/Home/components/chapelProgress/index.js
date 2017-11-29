import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card, { CardContent } from 'material-ui/Card';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import GordonLoader from '../../../../components/Loader';

export default class ChapelPsrogress extends Component {
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
    const chapelCredits = await user.getChapelCredits();
    this.setState({ loading: false });
    this.setState({ chapelCredits });
  }
  render() {
    let content;
    const { current, required } = (this.state.chapelCredits);
    const remaining = required - current;
    const Data = {
      datasets: [{
        data: [current, remaining],
        backgroundColor: [gordonColors.primary.blue],
      }],
      labels: [
        'Chapel Events Attended',
        'Events Remaining',
      ],
    };
    if (this.state.loading === true) {
      content = <GordonLoader />;
    } else {
      content = (
        <Card>
          <CardContent>
            <figure>
              <figcaption>
                <h3>Chapel Progress</h3>
                <h4>{current}/{required} Attended Chapels Events</h4>
              </figcaption>
            </figure>
            <Doughnut data={Data} />
          </CardContent >
        </Card>);
    }
    return (
      content
    );
  }
}
