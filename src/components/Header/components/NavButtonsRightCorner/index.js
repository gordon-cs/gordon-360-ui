import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import { signOut } from 'services/auth';
import user from 'services/user';
import GordonQuickLinksDialog from 'components/QuickLinksDialog';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonNavButton from 'components/NavButton';
import useNetworkStatus from 'hooks/useNetworkStatus';
import styles from './NavButtonsRightCorner.module.css';
import { Switch } from '@material-ui/core';
import { themes, setPreferredTheme, preferredTheme } from 'services/preferences';

/**
 *
 * @param {Function} onClose action to perform when closing the right side nav menu
 * @param {Function} onSignOut action to perform when signing out
 * @param {boolean} authentication whether the user is authenticated
 * @param {Function} openDialogBox function that opens the dialog for when a feature is unavailable
 * @param {boolean} open whether the right side menu is open
 * @returns {JSX.Element} The Nav buttons for the rightside NavAvatar
 */
const GordonNavButtonsRightCorner = ({
  onClose,
  onSignOut,
  authentication,
  openDialogBox,
  open,
  anchorEl,
}) => {
  const [linkOpen, setLinkOpen] = useState(false);
  const [expFeaturesOpen, setExpFeaturesOpen] = useState(false);
  const isOnline = useNetworkStatus();

  function closeAndSignOut() {
    onClose();
    signOut();
    onSignOut();
  }

  const myProfileButton = (
    <GordonNavButton
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
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
      unavailable={!isOnline ? 'offline' : !authentication ? 'unauthorized' : null}
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
    authentication && user.getLocalInfo().college_role === 'god' ? (
      <GordonNavButton
        unavailable={!isOnline ? 'offline' : null}
        onLinkClick={onClose}
        openUnavailableDialog={openDialogBox}
        linkName={'Admin'}
        linkPath={'/admin'}
      />
    ) : null;

  const coolKidsClub = ['cameron.abbot', 'evan.platzer'];
  const expFeaturesButton = authentication &&
    coolKidsClub.includes(user.getLocalInfo().user_name) && (
      <GordonNavButton
        unavailable={isOnline ? null : 'offline'}
        divider={true}
        onLinkClick={() => {
          setExpFeaturesOpen(true);
        }}
        linkName={'Experiments'}
      />
    );

  const signInOutButton = (
    <GordonNavButton
      onLinkClick={authentication ? closeAndSignOut : onClose}
      linkName={authentication ? 'Sign Out' : 'Sign In'}
      linkPath={'/'}
    />
  );

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
            {expFeaturesButton}
            {signInOutButton}
          </List>
        </Popover>
      </div>

      <GordonQuickLinksDialog
        handleLinkClickOpen={() => setLinkOpen(true)}
        handleLinkClose={() => setLinkOpen(false)}
        linkopen={linkOpen}
      />

      <GordonDialogBox
        onClose={() => {
          setExpFeaturesOpen(false);
        }}
        open={expFeaturesOpen}
        title="Experimental Features"
      >
        Enable Dark Theme:
        <Switch
          // checked={preferredTheme === themes.dark}
          checked={localStorage.getItem('preferredTheme') === 'dark'}
          onChange={() => {
            // setPreferredTheme(
            //   localStorage.getItem('preferredTheme') === 'light' ? 'dark' : 'light',
            // );
            // setPreferredTheme(preferredTheme === themes.dark ? themes.light : themes.dark);
          }}
        />
      </GordonDialogBox>
    </>
  );
};

export default GordonNavButtonsRightCorner;
