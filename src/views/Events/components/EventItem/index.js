import { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class GordonEventItem extends Component {
  render() {
    const { event } = this.props;

    let location;
    if (event.Occurrences[0] && event.Occurrences[0][2]) {
      location = (
        <Typography type="subheading">
          { event.Occurrences[0][2] }
        </Typography>
      );
    }

    return (
      <ListItem>
        <Typography type="title">{event.Event_Title}</Typography>
        { location }
      </ListItem>
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
