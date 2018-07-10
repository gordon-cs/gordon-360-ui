import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import './event-item.css';

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
                {event.Description}
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
    Event_Type_Name: PropTypes.string,
    Category_ID: PropTypes.number,
    Description: PropTypes.string,
    Occurrences: PropTypes.array,
  }).isRequired,
};
