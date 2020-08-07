import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Minors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let content;
    let minorPrefix;
    if (this.props.minors) {
      content = this.props.minors.map(minor => (
        <div>
          <Typography>{minor}</Typography>
        </div>
      ));
    }

    if (this.props.minors.length === 1) {
      minorPrefix = (
        <div>
          <Typography>Minor:</Typography>
        </div>
      );
    } else if (this.props.minors.length > 1) {
      minorPrefix = (
        <div>
          <Typography>Minors:</Typography>
        </div>
      );
    }

    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid item xs={6} sm={6} md={3} lg={6}>
              <Typography>{minorPrefix}</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={9} lg={6} justify="right">
              {content}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}
