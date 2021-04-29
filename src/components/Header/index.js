import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
// import WorkIcon from '@material-ui/icons/Work';
import WellnessIcon from '@material-ui/icons/LocalHospital';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DocumentTitle from 'react-document-title';
import { Route, Switch, NavLink, Link } from 'react-router-dom';
import './header.css';
import GordonPeopleSearch from './components/PeopleSearch';
import { GordonNavAvatarRightCorner } from './components/NavAvatarRightCorner';
import GordonNavButtonsRightCorner from './components/NavButtonsRightCorner';
import routes from 'routes';
import { projectName } from 'project-name';
import GordonDialogBox from 'components/GordonDialogBox/index';
import { windowBreakWidths } from 'theme';
import useNetworkStatus from 'hooks/useNetworkStatus';

import { AppBar, Toolbar, Typography, IconButton, Tabs, Tab, Button } from '@material-ui/core';

const getRouteName = (route) => {
  if (route.name) {
    return () => (
      <span>
        <DocumentTitle title={`${route.name} | ${projectName}`} />
        {route.name}
      </span>
    );
  }
  return () => (
    <span>
      <DocumentTitle title={`${projectName}`} />
      {projectName}
    </span>
  );
};

const ForwardLink = React.forwardRef((props, ref) => <Link ref={ref} {...props} />);
const ForwardNavLink = React.forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

const GordonHeader = ({ authentication, onDrawerToggle, onSignOut }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [dialog, setDialog] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const isOnline = useNetworkStatus();

  /**
   * Update the tab highlight indicator based on the url
   *
   * The checks use regular expressions to check for matches in the url.
   */
  const updateTabHighlight = () => {
    let currentPath = window.location.pathname;
    // Tab url regular expressions must be listed in the same order as the tabs, since the
    // indices of the elements in the array on the next line are mapped to the indices of the tabs
    let urls = [
      /^\/$/,
      /^\/involvements\/?$|^\/activity/,
      /^\/events\/?$/,
      /^\/people$/,
      /^\/wellness$/,
    ];
    setTabIndex(false);
    for (let i = 0; i < urls.length; i++) {
      if (urls[i].test(currentPath)) {
        setTabIndex(i);
      }
    }
  };

  useEffect(() => {
    updateTabHighlight();
  });

  useEffect(() => {
    const resize = (event) => {
      if (event.target.innerWidth < windowBreakWidths.breakMD) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const createDialogBox = () => {
    if (dialog === 'offline') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          labelledby={'offline-dialog'}
          describedby={'feature-deactivated'}
          title={'Offline Mode'}
          text={
            'This feature is unavailable offline. Please reconnect to internet to access this feature.'
          }
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        />
      );
    } else if (dialog === 'unauthorized') {
      return (
        <GordonDialogBox
          open={dialog}
          onClose={() => setDialog(null)}
          labelledby={'unauthorized-dialog'}
          describedby={'feature-unavailable'}
          title={'Credentials Needed'}
          text={`This feature is unavailable while not logged in. Please log in to access it.`}
          buttonClicked={() => setDialog(null)}
          buttonName={'Okay'}
        />
      );
    } else {
      return null;
    }
  };

  const disablableTab = (name, icon) => {
    if (!isOnline) {
      return (
        <Tab
          className="tab disabled-tab"
          icon={icon}
          label={name}
          onClick={() => setDialog('offline')}
        />
      );
    } else if (!authentication) {
      return (
        <Tab
          className="tab disabled-tab"
          icon={icon}
          label={name}
          onClick={() => setDialog('unauthorized')}
        />
      );
    } else {
      const route = `/${name.toLowerCase()}`;
      return <Tab className="tab" icon={icon} label={name} component={ForwardNavLink} to={route} />;
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorElement(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorElement(null);
    setIsMenuOpen(false);
  };

  const loginButton = (
    <Button
      className="login-button"
      variant="contained"
      color="secondary"
      component={ForwardLink}
      to="/"
    >
      Login
    </Button>
  );

  return (
    <section className="gordon-header">
      <AppBar className="app-bar" position="static">
        <Toolbar>
          <IconButton
            className="menu-button"
            color="primary"
            aria-label="open drawer"
            onClick={onDrawerToggle}
          >
            <MenuIcon className="menu-button-icon" />
          </IconButton>

          <Typography className="title disable-select" variant="h6" color="inherit">
            <Switch>
              {routes.map((route) => (
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
            <Tabs centered value={tabIndex} onChange={(event, value) => setTabIndex(value)}>
              <Tab
                className="tab"
                icon={<HomeIcon />}
                label="Home"
                component={ForwardNavLink}
                to="/"
              />
              <Tab
                className="tab"
                icon={<LocalActivityIcon />}
                label="Involvements"
                component={ForwardNavLink}
                to="/involvements"
              />
              <Tab
                className="tab"
                icon={<EventIcon />}
                label="Events"
                component={ForwardNavLink}
                to="/events"
              />
              {disablableTab('People', <PeopleIcon />)}
              {/* {disablableTab('Timesheets', WorkIcon)} */}
              {disablableTab('Wellness', <WellnessIcon />)}
            </Tabs>
          </div>

          {authentication ? <GordonPeopleSearch authentication={authentication} /> : loginButton}

          <GordonNavAvatarRightCorner
            onSignOut={onSignOut}
            authentication={authentication}
            onClick={handleOpenMenu}
            menuOpened={isMenuOpen}
          />

          <GordonNavButtonsRightCorner
            open={isMenuOpen}
            openDialogBox={setDialog}
            onSignOut={onSignOut}
            authentication={authentication}
            anchorEl={anchorElement}
            onClose={handleCloseMenu}
          />

          {createDialogBox()}
        </Toolbar>
      </AppBar>
    </section>
  );
};

export default GordonHeader;

GordonHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};
