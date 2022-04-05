import { useIsAuthenticated } from '@azure/msal-react';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';
import GordonNavButton from 'components/NavButton';
import GordonQuickLinksDialog from 'components/QuickLinksDialog';
import { useNetworkStatus } from 'hooks';
import { useState } from 'react';
import { signOut } from 'services/auth';
import storageService from 'services/storage';
import styles from './NavButtonsRightCorner.module.css';

/**
 *
 * @param {Object} props The component props
 * @param {Function} props.onClose action to perform when closing the right side nav menu
 * @param {Function} props.openDialogBox function that opens the dialog for when a feature is unavailable
 * @param {boolean} props.open whether the right side menu is open
 * @param {Object} props.anchorEl The element to anchor on
 * @returns {JSX.Element} The Nav buttons for the rightside NavAvatar
 */
const GordonNavButtonsRightCorner = ({ onClose, openDialogBox, open, anchorEl }) => {
  const [linkOpen, setLinkOpen] = useState(false);
  const isOnline = useNetworkStatus();
  const isAuthenticated = useIsAuthenticated();

  function closeAndSignOut() {
    onClose();
    signOut();
  }

  const myProfileButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !isAuthenticated ? 'unauthorized' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'My Profile'}
      linkPath={'/myprofile'}
    />
  );

  const linksButton = (
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

  const timesheetsButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !isAuthenticated ? 'unauthorized' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'Timesheets'}
      linkPath={'/timesheets'}
    />
  );

  const helpButton = <GordonNavButton onLinkClick={onClose} linkName={'Help'} linkPath={'/help'} />;

  const aboutButton = (
    <GordonNavButton onLinkClick={onClose} linkName={'About'} linkPath={'/about'} />
  );

  const feedbackButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : null}
      onLinkClick={onClose}
      openUnavailableDialog={openDialogBox}
      linkName={'Feedback'}
      linkPath={'/feedback'}
    />
  );

  const adminButton =
    isAuthenticated && storageService.getLocalInfo().college_role === 'god' ? (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onClose}
        openUnavailableDialog={openDialogBox}
        linkName={'Admin'}
        linkPath={'/admin'}
      />
    ) : null;

  const signInOutButton = isAuthenticated ? (
    <GordonNavButton onLinkClick={closeAndSignOut} linkName="Sign Out" />
  ) : null;

  return (
    <>
      <div id="right-side-menu">
        <Popover
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          anchorEl={anchorEl}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={onClose}
          className={styles.right_side_nav_buttons}
        >
          <List id="right-side-menu-list" disablePadding={true}>
            <div class={styles.right_menu_triangle} />
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
    </>
  );
};

export default GordonNavButtonsRightCorner;
