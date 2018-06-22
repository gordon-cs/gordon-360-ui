import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import EventIcon from 'material-ui-icons/Event';
import DescriptionIcon from 'material-ui-icons/Description';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import PeopleIcon from 'material-ui-icons/People';

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
            <ListItemText primary="Activities" />
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
        <NavLink exact to="/transcript" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="Transcript" />
          </ListItem>
        </NavLink>
        <NavLink exact to="/transcript" onClick={this.props.onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      </List>
    );
  }
}

GordonNavLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
};
