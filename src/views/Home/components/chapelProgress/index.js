import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card, { CardContent } from 'material-ui/Card';

import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';

export default class ChapelPsrogress extends Component {
  constructor(props) {
    super(props);

    this.loadChapel = this.loadChapel.bind(this);

    this.state = {
      chapelCredits: {},
    };
  }
  componentWillMount() {
    this.loadChapel();
  }
  async loadChapel() {
    const chapelCredits = await user.getChapelCredits();
    this.setState({ chapelCredits });
  }
  render() {
    // console.log(chapelEvents);
    const remaining = (this.state.chapelCredits.current);
    // console.log(this.state.chapelCredits);
    const numEvents = this.state.chapelCredits.required;
    const Data = {
      datasets: [{ data: [numEvents, remaining], backgroundColor: [gordonColors.primary.blue] }],
    };
    return (
      <Card>
        <CardContent>
          <figure>
            <figcaption>
              <h3>Chapel Progress</h3>
            </figcaption>
          </figure>
          <Doughnut data={Data} />
        </CardContent >
      </Card>
    );
  }
}
