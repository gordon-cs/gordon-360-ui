import Grid from 'material-ui/Grid';
import Card, { CardContent, CardHeader, CardActions } from 'material-ui/Card';
import React, { Component } from 'react';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import { LinearProgress } from 'material-ui/Progress';

import './orientation.css';

export default class Orientation extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Tasks Complete</h3>
              {3} of {5}
            </figcaption>
            <LinearProgress
              className="orientation-progress"
              mode="determinate"
              value={60}
            />
          </figure>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={
                  <Avatar className="green-avatar" />
                }
                title="ID Photo Received"
                subheader="Completed!"
              />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                "This is a placeholder string that will be replaced by information about the
                item that needs to be completed."
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={
                  <Avatar className="yellow-avatar" />
                }
                title="Financial Hold"
                subheader="In Progress"
              />
            </CardContent>
            <CardActions>
              <IconButton
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                "More placeholder text."
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

