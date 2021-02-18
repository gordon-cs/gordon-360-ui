import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { gordonColors } from '../../theme';
import { useNetworkStatus } from '../../contexts/NetworkContext';

export default function OfflineBanner({ authentication, currentPath }) {
  const isOnline = useNetworkStatus();

  /**
   * Creates the classes for the offline banner depending on the current page
   *
   * @returns {String} The classes to be applied to the offline banner
   */
  const getClass = () => {
    // Class for Home view
    if (currentPath === '/') {
      return 'rounded-corners MuiGrid-grid-md-10';
    }
    // Classes for My Public Profile view
    else if (currentPath === '/myprofile') {
      return 'rounded-corners MuiGrid-grid-lg-10 MuiGrid-grid-md-12';
    }
    // Classes for People Search, Timesheets, Feedback, My Profile, and Public Profile view
    else if (
      currentPath === '/people' ||
      currentPath === '/student-timesheets' ||
      currentPath === '/feedback' ||
      currentPath.includes('/profile/')
    ) {
      return 'rounded-corners MuiGrid-grid-lg-8 MuiGrid-grid-md-8';
    }
    // Classes for any Activity view
    else if (currentPath.includes('/activity/')) {
      return 'rounded-corners MuiGrid-grid-xs-12 MuiGrid-grid-md-8 MuiGrid-grid-lg-5';
    }
    // Classes for Experience Transcript view
    else if (currentPath === '/transcript') {
      return 'rounded-corners MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-6';
    } else {
      return 'rounded-corners MuiGrid-grid-lg-8 MuiGrid-grid-md-12';
    }
  };

  // Network Status: Online
  if (isOnline) {
    return null;
  }
  // Network Status: Offline
  // Shows the offline banner on every page except the Login
  else if (!authentication && currentPath === '/') {
    return null;
  } else {
    return (
      <Grid className={getClass()} style={styles.card} item={true}>
        <Typography>Offline Mode: Information may not be up to date...</Typography>
      </Grid>
    );
  }
}

const styles = {
  card: {
    backgroundColor: gordonColors.primary.blue,
    color: 'white',
    padding: '5px',
    margin: '0px  auto 10px auto',
  },
};
