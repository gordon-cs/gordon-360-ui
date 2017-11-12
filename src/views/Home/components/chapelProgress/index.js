import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import chapelEventsForUser from '../../events-chapel-user-session.json';
import { gordonColors } from '../../../../theme';

export default class ChapelProgress extends Component {
  render() {
    let required = chapelEventsForUser[0].Required;
    let eventsPercent = 0;
    // console.log(chapelEvents);
    const numEvents = chapelEventsForUser.length;
    if (chapelEventsForUser.length >= 1) {
      eventsPercent = Math.round((numEvents * 100) / required);
    } else {
      required = 0;
      eventsPercent = 0;
    }
    const percentRemaining = 100 - eventsPercent;
    const Data = {
      datasets: [{
        data: [eventsPercent, percentRemaining], backgroundColor: [gordonColors.primary.blue] }],
    };
    console.log(eventsPercent);
    return (
      <Doughnut data={Data} />
    );
  }
}
