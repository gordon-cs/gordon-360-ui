import Grid from 'material-ui/Grid';
import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Tasks Complete</h3>
              {3} of {5}
            </figcaption>
            <progress
              className="progress-indicator"
              color="primary"
              value={3}
              max={5}
            />
          </figure>
        </Grid>
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Christian Life and Worship Credits</h3>
              {7} of {12}
            </figcaption>
            <progress
              className="progress-indicator"
              color="primary"
              value={20}
              max={30 || 10}
            />
          </figure>
        </Grid>
      </Grid>
    );
  }
}