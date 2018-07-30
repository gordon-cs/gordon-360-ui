import React, { Component } from 'react';
//import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { ProgressBar } from 'react-bootstrap';
//import { Button } from '@material-ui/core';
//import { gordonColors } from '../../../../theme';
import user from '../../../../services/user';
import { CardContent } from '../../../../../node_modules/@material-ui/core';

export default class DiningBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initBalance: [],
      currentBalance: [],
    };
    this.balanceTypes = ['Dining Dollars', 'Swipes', 'Guest Swipes'];
    this.facStaffBalance = '';
  }
  componentWillMount() {
    this.loadData();
  }

  async loadData() {
    let initBal = [];
    let currBal = [];
    const { college_role } = user.getLocalInfo();
    const diningInfo = await user.getDiningInfo();

    if (college_role === 'student') {
      for (let i = 0; i < diningInfo.length; i += 1) {
        initBal.push(diningInfo[i].InitialBalance);
        currBal.push(diningInfo[i].CurrentBalance);

        this.setState({
          initBalance: initBal,
          currentBalance: currBal,
        });
      }
    } else {
      this.facStaffBalance = diningInfo;
    }
    console.log(diningInfo);
  }

  render() {
    let percentageRemaining = [];
    const init = this.state.initBalance;
    const curr = this.state.currentBalance;

    for (let i = 0; i < this.balanceTypes.length; i += 1) {
      percentageRemaining[i] = (parseFloat(curr[i]) / parseFloat(init[i])) * 100;
    }

    const labels = this.balanceTypes.map(result => (
      <Grid item>
        <Typography>{result}</Typography>
      </Grid>
    ));

    const bars = percentageRemaining.map(result => (
      <Grid item>
        <ProgressBar now={result} />
      </Grid>
    ));
    return (
      <Card>
        <CardContent>
          <Typography variant="headline">Dining Balance</Typography>
          <Grid container direction="row">
            <Grid item xs={6}>
              <Grid container direction="column" spacing={8} justify="center">
                {labels}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container direction="column" spacing={16} justify="center">
                {bars}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
