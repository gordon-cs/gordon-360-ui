import Grid from 'material-ui/Grid';
import React, { Component } from 'react';
// import chapelEventsForUser from './events-chapel-user-session.json';
import daysLeft from './sessions-days-left.json';
import ChapelProgress from './components/chapelProgress';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Days Left in Semester</h3>
              {daysLeft[0]} of {daysLeft[1]}

            </figcaption>
          </figure>
        </Grid>
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Christian Life and Worship Credits</h3>
            </figcaption>
          </figure>
          <ChapelProgress />
        </Grid>
      </Grid>
    );
  }
}
