import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import SessionsLeft from '../../sessions-days-left.json';
import { gordonColors } from '../../../../theme';
import Card, { CardContent } from 'material-ui/Card';

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
      <Card>
        <CardContent>
          <figure>
            <figcaption>
              <h3>Days Left in Semester</h3>
            </figcaption>
          </figure>
          <Doughnut data={Data} />
      </CardContent >
    </Card>
    );
  }
}
