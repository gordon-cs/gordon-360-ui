
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import List, { ListItem, ListSubheader, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Chip from 'material-ui/Chip';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Collapse from 'material-ui/transitions/Collapse';
import React, { Component } from 'react';
import { DateTime } from 'luxon';

import './event-item.css';

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

    let beginTime;
    let endTime;
    if (event.Occurrences[0] && event.Occurrences[0][0] && event.Occurrences[0][1]) {
      beginTime = DateTime.fromISO(event.Occurrences[0][0]).toFormat('t');
      endTime = DateTime.fromISO(event.Occurrences[0][1]).toFormat('t');
    }
    const timeRange = ` from ${beginTime} to ${endTime}`;

    let date;
    if (event.Occurrences[0] && event.Occurrences[0][0]) {
      date = DateTime.fromISO(event.Occurrences[0][0]).toFormat('LLL dd yy');
    }

    let title;
    if (event.Event_Title === '') {
      title = event.Event_Name;
    } else {
      title = event.Event_Title;
    }

    let location;
    if (event.Occurrences[0] && event.Occurrences[0][2]) {
      location = `${event.Occurrences[0][2]} `;
    }

    let discription = 'No description available';
    if (event.Description) {
      if (event.Description === '' || event.Description.substring(0, 4) === '<res') {
        event.Description = 'No description available';
      }
      event.Description = event.Description.replace(/&(#[0-9]+|[a-zA-Z]+);/g, ' ').replace(/<\/?[^>]+(>|$)/g, ' ');

      discription = `${event.Description} `;
    }
    const subheader = `${date}, ${timeRange} | ${location}`;

    let content;
    if (event.Occurrences.length > 1) {
      content = event.Occurrences
        .map(locations => (
          <ListItem >
            <ListItemText primary={DateTime.fromISO(locations[0]).toFormat('ff')} secondary={locations[2]} />
          </ListItem>
        ));
    }
    return (
      <Card >
        <CardHeader
          action={
            <Button dense color="primary" onClick={this.handleExpandClick}>
              <ExpandMoreIcon />
            </Button>}
          title={title}
          subheader={subheader}
        />
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List>
            <ListItem >
              <ListItemText primary={event.Organization} secondary={discription} />
            </ListItem>
            {content}
          </List>
        </Collapse>
      </Card>
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
