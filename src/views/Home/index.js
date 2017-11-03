import Grid from 'material-ui/Grid';
import React, { Component } from 'react';

import chapelEventsForUser from './events-chapel-user-session.json';
import daysLeft from './sessions-days-left.json';

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
            <progress
              className="progress-indicator"
              color="primary"
              value={daysLeft[0]}
              max={daysLeft[1]}
            />
          </figure>
        </Grid>
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Christian Life and Worship Credits</h3>
              {chapelEventsForUser.length} of {chapelEventsForUser[0].Required}
            </figcaption>
            <progress
              className="progress-indicator"
              color="primary"
              value={chapelEventsForUser.length}
              max={chapelEventsForUser[0].Required || chapelEventsForUser.length}
            />
          </figure>
        </Grid>
      </Grid>
    );
  }
}
