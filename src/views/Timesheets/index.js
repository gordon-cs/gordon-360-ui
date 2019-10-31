import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export default class Timesheets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      network: 'online',
    };
  }

  render() {
    return <Typography>Heyyyyy</Typography>;
  }
}
