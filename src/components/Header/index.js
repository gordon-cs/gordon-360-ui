import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import EventIcon from 'material-ui-icons/Event';
import DescriptionIcon from 'material-ui-icons/Description';

import './header.css';
import GordonGlobalMenu from './components/GlobalMenu';
import GordonPeopleSearch from './components/PeopleSearch';
import routes from '../../routes';

const getRouteName = route => {
  if (route.name) {
    return () => (
      <span>
        <DocumentTitle title={`${route.name} | Gordon 360`} />
        {route.name}
      </span>
    );
  }
  return () => (
    <span>
      <DocumentTitle title="Gordon 360" />
      Gordon 360
    </span>
  );
};

export default class GordonHeader extends Component {
  render() {
    return (
      <section className="gordon-header">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="contrast"
              aria-label="open drawer"
              onClick={this.props.onDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography className="title" type="title" color="inherit">
              <Switch>
                {routes.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={getRouteName(route)}
                  />
                ))}
              </Switch>
            </Typography>

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

            <div className="right-side-container">
              <GordonPeopleSearch />
              <GordonGlobalMenu onSignOut={this.props.onSignOut} />
            </div>
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
