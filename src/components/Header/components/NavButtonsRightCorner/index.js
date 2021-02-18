import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import { signOut } from '../../../../services/auth';
import user from '../../../../services/user';
import GordonQuickLinksDialog from '../../../QuickLinksDialog';
import { gordonColors } from '../../../../theme';
import GordonNavButton from '../../../NavButton';
import { useNetworkStatus } from '../../../../contexts/NetworkContext';
import './index.css';

/**
 *
 * @param {Function} onClose action to perform when closing the right side nav menu
 * @param {Function} onSignOut action to perform when signing out
 * @param {boolean} authentication whether the user is authenticated
 * @param {Function} openDialogBox function that opens the dialog for when a feature is unavailable
 * @param {boolean} open whether the right side menu is open
 *
 * @returns {JSX.Element} The Nav Buttons for the top right corner navigation menu
 */
const GordonNavButtonsRightCorner = ({
  onClose,
  onSignOut,
  authentication,
  openDialogBox,
  open,
}) => {
  const [linkOpen, setLinkOpen] = useState(false);
  const isOnline = useNetworkStatus();

  const useStyles = makeStyles({
    paper: {
      width: 160,
      border: `1.5px solid ${gordonColors.primary.blue}`,
      borderRadius: '8px',
      overflowX: 'visible',
      overflowY: 'visible',
    },
  });

  const classes = useStyles();

  /**
   * Closes the menu and logs out the user
   */
  function closeAndSignOut() {
    onClose();
    signOut();
    onSignOut();
  }

  let myProfileButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'My Profile'}
      linkPath={'/myprofile'}
    />
  );

  let linksButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : null}
      onLinkClick={() => {
        onClose();
        setLinkOpen(true);
      }}
      openUnavailableDialog={openDialogBox}
      linkName={'Links'}
    />
  );

  let timesheetsButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'Timesheets'}
      linkPath={'/timesheets'}
    />
  );

  let helpButton = <GordonNavButton onLinkClick={onClose} linkName={'Help'} linkPath={'/help'} />;

  let aboutButton = (
    <GordonNavButton onLinkClick={onClose} linkName={'About'} linkPath={'/about'} />
  );

  let feedbackButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'Feedback'}
      linkPath={'/feedback'}
    />
  );

  let adminButton;
  if (authentication && user.getLocalInfo().college_role === 'god') {
    adminButton = (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onClose}
        openUnavailableDialog={openDialogBox}
        linkName={'Admin'}
        linkPath={'/admin'}
      />
    );
  } else {
    adminButton = null;
  }

  let signInOutButton = (
    <GordonNavButton
      onLinkClick={authentication ? closeAndSignOut : onClose}
      linkName={authentication ? 'Sign Out' : 'Sign In'}
      linkPath={'/'}
    />
  );

  return (
    <div>
      <div id="right-side-menu">
        <Popover
          classes={classes}
          anchorOrigin={{
            vertical: 78,
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={onClose}
        >
          <List id="right-side-menu-list" disablePadding={true}>
            <div id="right-menu-triangle" />
            {myProfileButton}
            {linksButton}
            {timesheetsButton}
            {helpButton}
            {aboutButton}
            {feedbackButton}
            {adminButton}
            {signInOutButton}
          </List>
        </Popover>
      </div>

      <GordonQuickLinksDialog
        handleLinkClickOpen={() => setLinkOpen(true)}
        handleLinkClose={() => setLinkOpen(false)}
        linkopen={linkOpen}
      />
    </div>
  );
};

export default GordonNavButtonsRightCorner;
