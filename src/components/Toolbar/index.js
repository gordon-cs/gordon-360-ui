import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import EventIcon from 'material-ui-icons/Event';
import DescriptionIcon from 'material-ui-icons/Description';
import { NavLink } from 'react-router-dom';

import GordonToolbarNavAvatar from './components/NavAvatar';

import './toolbar.css';

export default class GordonToolbar extends Component {
  render() {
    return (
      <section className="gordon-toolbar">
        <AppBar className="app-bar" position="static" color="rgb(235,234,234)">
          <Toolbar>
            <img
              className="gordon-logo-horiz"
              src={require('../Header/gordon-logo-horiz-black.png')}
              alt=""
            />
            <NavLink exact to="/" onClick={this.props.onLinkClick} style={{ marginLeft: '50pt' }}>
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
            <GordonToolbarNavAvatar />
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

// GordonHeader.propTypes = {
//   onDrawerToggle: PropTypes.func.isRequired,
//   onSignOut: PropTypes.func.isRequired,
// };
