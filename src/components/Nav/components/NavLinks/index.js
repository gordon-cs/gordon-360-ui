import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
} from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import EventIcon from 'material-ui-icons/Event';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class GordonNavLinks extends Component {
  render() {
    return (
      <List className="gordon-nav-links">
        <Link to="/" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/activities" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Activities" />
          </ListItem>
        </Link>
        <Link to="/events" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
        </Link>
      </List>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
