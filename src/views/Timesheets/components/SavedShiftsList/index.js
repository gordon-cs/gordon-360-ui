import React, { Component } from 'react';
import { Typography, List, Grid } from '@material-ui/core';
import ShiftItem from '../ShiftItem';

export default class SavedShiftsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shifts: [],
    };
  }

  componentDidMount() {
    const { userID } = this.props;
    this.props.getShifts(userID).then(shifts => {
      this.setState({
        shifts: shifts,
      });
    });
  }

  render() {
    console.log('this.state.shifts:', this.state.shifts);

    let shiftsList = this.state.shifts.map(shift => (
      <ShiftItem value={shift} key={shift.EML_DESCRIPTION} />
    ));

    return <>{shiftsList}</>;
  }
}
