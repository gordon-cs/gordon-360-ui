import { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DateTime } from 'luxon';


export default class GordonEventItem extends Component {
  render() {
    const { event } = this.props;

    let time = new Date();
    if (event.Occurrences[0] && event.Occurrences[0][0]) {
      time = DateTime.fromISO(event.Occurrences[0][0]).toFormat('LLL dd yy');
    }
    let title;
    if (event.Event_Title === '') {
      title = event.Event_Name;
    } else {
      title = event.Event_Title;
    }

    return (
      <div>
        <ListItem>
          <ListItemText primary={title} secondary={time} />
        </ListItem>
        <Divider />
      </div>
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
