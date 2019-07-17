import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch, NavLink } from 'react-router-dom';
import './header.css';
import GordonPeopleSearch from './components/PeopleSearch';
import GordonNavAvatarRightCorner from './components/NavAvatarRightCorner';
import routes from '../../routes';
import { isAuthenticated } from '../../services/auth';

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
    value: null,
    loginDialogOpen: false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  /**
   * Update the tab highlight indicator based on the url
   *
   * The checks use regular expressions to check for matches in the url.
   */
  updateTabHighlight() {
    let currentPath = window.location.pathname;
    // Tab url regular expressions must be listed in the same order as the tabs, since the
    // indices of the elements in the array on the next line are mapped to the indices of the tabs
    let urls = [/^\/$/, /^\/involvements\/?$|^\/activity/, /^\/events\/?$/, /^\/people$/];
    this.value = false;
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].test(currentPath)) {
        this.value = i;
      }
    }
  }

  componentWillUpdate() {
    this.updateTabHighlight();
  }

  componentWillMount() {
    this.value = false;
    this.updateTabHighlight();
  }

  unAuthenticatedSearch() {
    this.setState({ loginDialogOpen: true });
  }

  handleClose() {
    this.setState({ loginDialogOpen: false });
  }

  render() {
    let content;
    if (isAuthenticated()) {
      content = (
        <Tab
          className="tab"
          icon={<PeopleIcon />}
          label="People"
          component={NavLink}
          to="/people"
        />
      );
    } else {
      content = (
        <Tab
          className="guestTab"
          icon={<PeopleIcon />}
          label="People"
          component={NavLink}
          to="#"
          onClick={clicked => this.unAuthenticatedSearch()}
        />
      );
    }

    return (
      <section className="gordon-header">
        <AppBar className="app-bar" position="static">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="primary"
              aria-label="open drawer"
              onClick={this.props.onDrawerToggle}
            >
              <MenuIcon className="menu-button-icon" />
            </IconButton>
            <Typography className="title" variant="title" color="inherit">
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
              <Tabs centered value={this.value} onChange={this.handleChange}>
                <Tab className="tab" icon={<HomeIcon />} label="Home" component={NavLink} to="/" />
                <Tab
                  className="tab"
                  icon={<LocalActivityIcon />}
                  label="Involvements"
                  component={NavLink}
                  to="/involvements"
                />
                <Tab
                  className="tab"
                  icon={<EventIcon />}
                  label="Events"
                  component={NavLink}
                  to="/events"
                />
                {content}
              </Tabs>
            </div>
            <GordonPeopleSearch />
            <GordonNavAvatarRightCorner onSignOut={this.props.onSignOut} />
          </Toolbar>
        </AppBar>
        <Dialog
          open={this.state.loginDialogOpen}
          onClose={clicked => this.handleClose()}
          aria-labelledby="login-dialog-title"
          aria-describedby="login-dialog-description"
        >
          <DialogTitle id="login-dialog-title">{'Login to use People Search'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="login-dialog-description">
              You are not logged in. Please log in to use People Search.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={clicked => this.handleClose()} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    );
  }
}
GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
