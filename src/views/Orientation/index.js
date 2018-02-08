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
  };

  render() {
    let idPhotoAvatar;
    let idPhotoSubheader;
    let financialHoldAvatar = 'yellow-avatar';
    let tasksComplete = Math.round(Math.random() * 100);
    let tasksTotal = Math.round(Math.random() * 100);
    if (tasksTotal < tasksComplete) tasksComplete = tasksTotal;

    if (Math.round(Math.random()) === 0) {
      idPhotoAvatar = 'green-avatar';
      idPhotoSubheader = 'Completed!';
    } else {
      idPhotoAvatar = 'red-avatar';
      idPhotoSubheader = 'Not received';
    }

    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <figure>
            <figcaption>
              <h3>Tasks Complete</h3>
              {tasksComplete} of {tasksTotal}
            </figcaption>
            <LinearProgress
              className="orientation-progress"
              mode="determinate"
              value={tasksComplete / tasksTotal * 100}
            />
          </figure>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={<Avatar className={idPhotoAvatar} />}
                title="ID Photo Received"
                subheader={idPhotoSubheader}
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
                "This is a placeholder string that will be replaced by information about the item
                that needs to be completed."
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <CardHeader
                avatar={<Avatar className={financialHoldAvatar} />}
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
              <CardContent>"More placeholder text."</CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    );
  }
}
