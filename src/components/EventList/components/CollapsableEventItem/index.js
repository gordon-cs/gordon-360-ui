import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CollapsableEventItem.module.css';

import { Typography, CardContent, Collapse, Grid } from '@material-ui/core';

//Switched to table rows
export default class GordonCollapsableEventItem extends Component {
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

    return (
      <section>
        <Grid container onClick={this.handleExpandClick} className="event-item">
          <Grid item xs={12}>
            <Typography variant="h6" className="event-heading">
              {' '}
              {event.title}{' '}
            </Typography>
            <Typography className="event-content"> {event.timeRange} </Typography>
            <Typography className="event-content"> {event.date} </Typography>
          </Grid>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography className="event-content  ">Description:</Typography>
              <Typography className="event-content">{event.Description}</Typography>
              <p>
                <nbsp />
              </p>
              <Typography className="event-content">Location:</Typography>
              <Typography className="event-content">{event.location}</Typography>
            </CardContent>
          </Collapse>
        </Grid>
      </section>
    );
  }
}

GordonCollapsableEventItem.propTypes = {
  event: PropTypes.shape({
    Event_ID: PropTypes.string.isRequired,
    Event_Name: PropTypes.string.isRequired,
    Event_Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Occurrences: PropTypes.array,
  }).isRequired,
};
