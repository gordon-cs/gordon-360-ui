// import { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
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
    const subheader = `${event.date}, ${event.timeRange}`;

    // let content;
    // if (event.Occurrences.length > 1) {
    //   content = event.Occurrences
    //     .map(locations => (
    //       <ListItem >
    //         <ListItemText key={location[2]} primary={DateTime.fromISO(locations[0]).toFormat('ff')} secondary={locations[2]} />
    //       </ListItem>
    //     ));
    // }
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
              <Typography>Discription</Typography>
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
