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
    if (this.props.minors) {
      content = this.props.minors.map(minor => (
        <div>
          <Typography>{minor}</Typography>
        </div>
      ));
    }
    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid item xs={5} sm={6} md={3} lg={6}>
              <Typography>Minors(s):</Typography>
            </Grid>
            <Grid item xs={7} sm={5} md={9} lg={6} justify="right">
              {content}
            </Grid>
          </Grid>
        </ListItem>
        <Divider />
      </div>
    );
  }
}
