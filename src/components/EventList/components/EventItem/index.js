import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './EventItem.module.css';

import { Typography, CardContent, Collapse, Grid } from '@material-ui/core';

//Switched to table rows
export default class GordonEventItem extends Component {
  constructor(props) {
    super(props);

    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.state = { open: false };
  }
  handleExpandClick() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { event } = this.props;
    let eventDescription = event.Description;
    eventDescription = eventDescription === '' ? 'No description available' : eventDescription;
    return (
      <section>
        <Grid container direction="row" onClick={this.handleExpandClick} className="event-item">
          <Grid item xs={4}>
            <Typography className="event-column">{event.title}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className="event-column">{event.location}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className="event-column">{event.date}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className="event-column">{event.timeRange}</Typography>
          </Grid>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className="descriptionText">Description:</Typography>
              <Typography type="caption" className="descriptionText">
                {eventDescription}
              </Typography>
            </CardContent>
          </Collapse>
        </Grid>
      </section>
    );
  }
}

GordonEventItem.propTypes = {
  event: PropTypes.shape({
    Event_ID: PropTypes.string.isRequired,
    Event_Name: PropTypes.string.isRequired,
    Event_Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Occurrences: PropTypes.array,
  }).isRequired,
};
