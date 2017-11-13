import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import SessionsLeft from '../../sessions-days-left.json';
import { gordonColors } from '../../../../theme';

export default class DaysLeft extends Component {
  render() {
    const daysleft = SessionsLeft[0];
    const totalDays = SessionsLeft[1];
    const Data = {
      datasets: [{
        data: [daysleft, totalDays], backgroundColor: [gordonColors.primary.blue] }],
    };
    console.log();
    return (
      <Doughnut data={Data} />
    );
  }
}
