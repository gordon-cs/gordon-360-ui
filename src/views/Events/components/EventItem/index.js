// import { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import './event-item.css';

//Expansion panels caused performance issues, reverted back to cards
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
    const subheader = `${event.date}, ${event.timeRange}`;

    return (
      <section>
        <Card onClick={this.handleExpandClick}>
          <CardContent>
            <Typography>{event.title}</Typography>
            <Typography type="caption">{subheader}</Typography>
            <Typography type="caption">{event.location}</Typography>
          </CardContent>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Description</Typography>
              <Typography type="caption">{event.Description}</Typography>
              {/* {content} */}
            </CardContent>
          </Collapse>
        </Card>
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
