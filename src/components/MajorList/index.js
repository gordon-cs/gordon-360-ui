import Divider from '@material-ui/core/Divider';
import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class Majors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let content;
    let majorPrefix;
    if (this.props.majors) {
      content = this.props.majors.map(major => (
        <div>
          <Typography>{major}</Typography>
        </div>
      ));
    }

    if (this.props.majors.length === 1) {
      majorPrefix = (
        <div>
          <Typography>Major:</Typography>
        </div>
      );
    } else if (this.props.majors.length > 1) {
      majorPrefix = (
        <div>
          <Typography>Majors:</Typography>
        </div>
      );
    }

    return (
      <div>
        <ListItem>
          <Grid container justify="center">
            <Grid item xs={6} sm={6} md={3} lg={6}>
              <Typography>{majorPrefix}</Typography>
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
