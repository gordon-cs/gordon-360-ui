import { useIsAuthenticated } from '@azure/msal-react';
import {
  Event as EventIcon,
  Home as HomeIcon,
  LocalActivity as LocalActivityIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { AppBar, Button, IconButton, Tab, Tabs, Toolbar, Typography, Link } from '@mui/material';
import RecIMIcon from '@mui/icons-material/SportsFootball';
import GordonDialogBox from 'components/GordonDialogBox';
import { useDocumentTitle, useNetworkStatus, useWindowSize } from 'hooks';
import { projectName } from 'project-name';
import { forwardRef, useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import routes from 'routes';
import { authenticate } from 'services/auth';
import { windowBreakWidths } from 'theme';
import { GordonNavAvatarRightCorner } from './components/NavAvatarRightCorner';
import GordonNavButtonsRightCorner from './components/NavButtonsRightCorner';
import GordonQuickSearch from './components/QuickSearch';
import styles from './Header.module.css';
import gc_360_yellow_logo_72 from './gc_360_yellow_logo_72.png';
import gc_360_yellow_logo_64 from './gc_360_yellow_logo_64.png';
import gc_360_yellow_logo_56 from './gc_360_yellow_logo_56.png';

const ForwardNavLink = forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

// Tab url regular expressions must be listed in the same order as the tabs, since the
// indices of the elements in the array on the next line are mapped to the indices of the tabs
const TabUrlPatterns = [
  /^\/$/,
  /^\/involvements\/?$|^\/activity/,
  /^\/events\/?$/,
  /^\/people$|^\/myprofile|^\/profile/,
  /^\/timesheets$/,
];

/**
 * Update the tab highlight indicator based on the url
 *
 * The checks use regular expressions to check for matches in the url.
 */
const useTabHighlight = () => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const matchedIndex = TabUrlPatterns.findIndex((pattern) => pattern.test(location.pathname));
    setTabIndex(matchedIndex); // This won't cause an update if the new value is the same as the old value
  }, [location.pathname]);

  return tabIndex;
};

const GordonHeader = ({ onDrawerToggle }) => {
  const [dialog, setDialog] = useState('');
  const [width] = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState(null);
  const isOnline = useNetworkStatus();
  const setDocumentTitle = useDocumentTitle();
  const isAuthenticated = useIsAuthenticated();
  const tabIndex = useTabHighlight();

  useEffect(() => {
    if (width < windowBreakWidths.breakMD) {
      setIsMenuOpen(false);
    }
  }, [width]);

  const createDialogBox = () => {
    const isOffline = dialog === 'offline';
    return (
      <GordonDialogBox
        open={dialog}
        onClose={() => setDialog(null)}
        title={isOffline ? 'Unavailabile Offline' : 'Login Required'}
        buttonClicked={() => setDialog(null)}
        buttonName={'Okay'}
      >
        {isOffline
          ? 'That page is not available offline. Please reconnect to internet to access this feature.'
          : 'That page is only available to authenticated users. Please log in to access it.'}
      </GordonDialogBox>
    );
  };

  const requiresAuthTab = (name, icon) => {
    if (!isOnline) {
      return (
        <Tab
          className={`${styles.tab} ${styles.disabled_tab}`}
          icon={icon}
          label={name}
          onClick={() => setDialog('offline')}
        />
      );
    } else if (!isAuthenticated) {
      return (
        <Tab
          className={`${styles.tab} ${styles.disabled_tab}`}
          icon={icon}
          label={name}
          onClick={() => setDialog('unauthorized')}
        />
      );
    } else {
      const route = `/${name.toLowerCase().replace('-', '')}`;
      return (
        <Tab
          className={styles.tab}
          icon={icon}
          label={name}
          component={ForwardNavLink}
          to={route}
        />
      );
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
      className={styles.login_button}
      variant="contained"
      color="secondary"
      onClick={authenticate}
    >
      Login
    </Button>
  );

  function logoSizedForHeader() {
    if (width >= 900) {
      return gc_360_yellow_logo_72;
    } else if (width >= 600) {
      return gc_360_yellow_logo_64;
    } else {
      return gc_360_yellow_logo_56;
    }
  }

  return (
    <section className={styles.gordon_header}>
      <AppBar className={styles.app_bar} position="static">
        <Toolbar>
          <IconButton
            className={styles.menu_button}
            color="primary"
            aria-label="open drawer"
            onClick={onDrawerToggle}
            size="large"
          >
            <MenuIcon className={styles.menu_button_icon} />
          </IconButton>
          <Link
            to="/"
            component={ForwardNavLink}
            value={tabIndex}
            onClick={(event, value) => setTabIndex(value)}
          >
            <img src={logoSizedForHeader()}></img>
          </Link>

          <Typography className={`disable_select ${styles.title}`} variant="h6" color="inherit">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={() => {
                    setDocumentTitle(route.name || projectName);
                    return <span>{route.name || projectName}</span>;
                  }}
                />
              ))}
            </Routes>
          </Typography>
          <div className={styles.center_container}>
            <Tabs textColor="inherit" indicatorColor="secondary" centered value={tabIndex}>
              <Tab
                className={styles.tab}
                icon={<HomeIcon />}
                label="Home"
                component={ForwardNavLink}
                to="/"
              />
              <Tab
                className={styles.tab}
                icon={<LocalActivityIcon />}
                label="Involvements"
                component={ForwardNavLink}
                to="/involvements"
              />
              <Tab
                className={styles.tab}
                icon={<EventIcon />}
                label="Events"
                component={ForwardNavLink}
                to="/events"
              />
              {requiresAuthTab('People', <PeopleIcon />)}
              {requiresAuthTab('Timesheets', <WorkIcon />)}
              {requiresAuthTab('Rec-IM', <RecIMIcon />)}
            </Tabs>
          </div>
          <div className={styles.people_search_container_container}>
            {/* Width is dynamic */}
            <div className={styles.people_search_container}>
              {isAuthenticated ? <GordonQuickSearch /> : loginButton}
            </div>
          </div>
          <GordonNavAvatarRightCorner onClick={handleOpenMenu} menuOpened={isMenuOpen} />
          <GordonNavButtonsRightCorner
            open={isMenuOpen}
            openDialogBox={setDialog}
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
