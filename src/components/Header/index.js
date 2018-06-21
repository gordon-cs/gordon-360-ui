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
import HomeIcon from 'material-ui-icons/Home';
import LocalActivityIcon from 'material-ui-icons/LocalActivity';
import EventIcon from 'material-ui-icons/Event';
import DescriptionIcon from 'material-ui-icons/Description';
import PeopleIcon from 'material-ui-icons/People';
import Tabs, { Tab } from 'material-ui/Tabs';
import './header.css';
import GordonPeopleSearch from './components/PeopleSearch';
import GordonNavAvatarRightCorner from './components/NavAvatarRightCorner';
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
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
            <img src={require('./GordonSeal.png')} alt="Gordon College" />
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
            <div className="center-container">
              <Tabs value={this.state.value} onChange={this.handleChange} fullWidth>
                <Tab className="tab" icon={<HomeIcon />} label="Home" component={NavLink} to="/" />
                <Tab
                  className="tab"
                  icon={<LocalActivityIcon />}
                  label="Involvements"
                  component={NavLink}
                  to="/activities"
                />
                <Tab
                  className="tab"
                  icon={<EventIcon />}
                  label="Events"
                  component={NavLink}
                  to="/events"
                />
                <Tab
                  className="tab"
                  icon={<DescriptionIcon />}
                  label="Transcript"
                  component={NavLink}
                  to="/transcript"
                />
                <Tab
                  className="tab"
                  icon={<PeopleIcon />}
                  label="People"
                  component={NavLink}
                  to="/transcript"
                />
              </Tabs>
            </div>
            <GordonPeopleSearch />
            <div className="right-side-container">
              <GordonNavAvatarRightCorner onSignOut={this.props.onSignOut} />
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
