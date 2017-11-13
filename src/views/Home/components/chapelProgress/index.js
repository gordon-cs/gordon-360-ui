import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import chapelEventsForUser from '../../events-chapel-user-session.json';
import { gordonColors } from '../../../../theme';

export default class ChapelProgress extends Component {
  render() {
    const required = chapelEventsForUser[0].Required;
    // console.log(chapelEvents);
    const numEvents = chapelEventsForUser.length;
    const Data = {
      datasets: [{
        data: [numEvents, required], backgroundColor: [gordonColors.primary.blue] }],
    };
    console.log(numEvents);
    return (
      <Doughnut data={Data} />
    );
  }
}
