import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Card, { CardContent } from 'material-ui/Card';

import { gordonColors } from '../../../../theme';
import { authenticate } from '../../../../services/auth';
import user from '../../../../services/user';

authenticate('matthew.felgate', 'Platapus11');

export default class ChapelPsrogress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapelCredits: [],
    };
  }
  async loadChapel() {
    const attedndedEvents = await user.getChapelCredits();
    this.setState({ chapelCredits: attedndedEvents });
  }
  render() {
    // console.log(chapelEvents);
    const remaining = (this.state.chapelCredits.current);
    console.log(this.state.chapelCredits);
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
