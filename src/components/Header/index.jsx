import { useIsAuthenticated } from '@azure/msal-react';
import {
  Event as EventIcon,
  LocalActivity as LocalActivityIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { AppBar, Button, IconButton, Tab, Tabs, Toolbar, Typography, Link } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import { useNetworkStatus } from 'hooks';
import { forwardRef, useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { authenticate } from 'services/auth';
import { GordonNavAvatarRightCorner } from './components/NavAvatarRightCorner';
import GordonQuickSearch from './components/QuickSearch';
import styles from './Header.module.css';

// Define header logo image - special image for Pi Day
const todaysDate = new Date(); // Months: 0 = Jan, 1 = Feb, 2 = Mar, etc.
const isPiDay = todaysDate.getMonth() === 2 && todaysDate.getDate() === 14; // March 14 (3/14)
const angleMode = isPiDay ? '2pi' : '360';
const headerLogo72dpi = 'images/gc_' + angleMode + '_yellow_logo_72.png';
const headerLogo64dpi = 'images/gc_' + angleMode + '_yellow_logo_64.png';
const headerLogo56dpi = 'images/gc_' + angleMode + '_yellow_logo_56.png';
const headerLogo56dpiNoText = 'images/gc_' + angleMode + '_yellow_logo_56_vert.png';

const ForwardNavLink = forwardRef((props, ref) => <NavLink innerRef={ref} {...props} />);

// Tab url regular expressions must be listed in the same order as the tabs, since the
// indices of the elements in the array on the next line are mapped to the indices of the tabs
const TabUrlPatterns = [
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
  const navigate = useNavigate();
  const [dialog, setDialog] = useState('');
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();
  const tabIndex = useTabHighlight();

  const handleOpenProfile = () => {
    navigate('/myprofile');
  };

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
      const route = `/${name.toLowerCase()}`;
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

  const loginButton = (
    <Button
      variant="contained"
      color="secondary"
      onClick={authenticate}
    >
      Login
    </Button>
  );

  return (
    <AppBar position="sticky">
      <Toolbar className={styles.toolbar}>
        <div className={styles.side_container}>
          <IconButton
            edge='start'
            aria-label="open drawer"
            onClick={onDrawerToggle}
            size="large"
          >
            <MenuIcon className={styles.menu_icon} />
          </IconButton>

          <Link to="/" component={ForwardNavLink} >
            <picture>
              {/* pick a different image as the screen gets smaller.*/}
              <source srcSet={headerLogo72dpi} media="(min-width: 900px)" />
              <source srcSet={headerLogo64dpi} media="(min-width: 600px)" />
              <source srcSet={headerLogo56dpiNoText} media="(max-width: 375px)" />
              <img src={headerLogo56dpi} alt="Gordon 360 Logo"></img>
            </picture>
          </Link>
        </div>

        <Tabs textColor="inherit" indicatorColor="secondary" centered value={tabIndex} className={styles.center_container}>
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
        </Tabs>

        <div className={styles.side_container}>
          {isAuthenticated ? <GordonQuickSearch /> : loginButton}
          <GordonNavAvatarRightCorner onClick={handleOpenProfile} />
        </div>
        {createDialogBox()}
      </Toolbar>
    </AppBar>
  );
};

export default GordonHeader;
