import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
// import PeopleIcon from '@material-ui/icons/People';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './nav-links.css';

export default class GordonNavLinks extends Component {
  render() {
    return (
      <List className="gordon-nav-links">
        <NavLink exact to="/" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink exact to="/activities" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <LocalActivityIcon />
            </ListItemIcon>
            <ListItemText primary="Involvements" />
          </ListItem>
        </NavLink>
        <NavLink exact to="/events" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
        </NavLink>
        {/* <NavLink exact to="/transcript" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink> */}
      </List>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
