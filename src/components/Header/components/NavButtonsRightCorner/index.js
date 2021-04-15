import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { signOut } from 'services/auth';
import {
  createAboutButton,
  createAdminButton,
  createFeedbackButton,
  createHelpButton,
  createLinksButton,
  createTimesheetsButton,
  createMyProfileButton,
  createSignInOutButton,
} from './navButtons';
import PropTypes from 'prop-types';
import QuickLinksDialog from 'components/QuickLinksDialog';
import { gordonColors } from 'theme';
import storage from 'services/storage';
import './index.css';

import { Popover, List } from '@material-ui/core';

export const GordonNavButtonsRightCorner = (props) => {
  const [linkOpen, setLinkOpen] = useState(false);
  const [network, setNetwork] = useState('online');
  const [showMenu, setShowMenu] = useState(false);

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
  function onSignOut() {
    props.onClose();
    signOut();
    props.onSignOut();
  }

  /**
   * Opens the dialog box containing external links
   */
  function handleLinkClickOpen() {
    setLinkOpen(true);
  }

  /**
   * Closes the dialog box containing external links
   */
  function handleLinkClose() {
    setLinkOpen(false);
  }

  // My Profile Button
  let myProfileButton = createMyProfileButton(
    network,
    props.authentication,
    props.onClose,
    props.openDialogBox,
  );

  // Links Button
  let linksButton = createLinksButton(
    network,
    props.onClose,
    handleLinkClickOpen,
    props.openDialogBox,
  );

  // Timesheets Button
  let timesheetsButton = createTimesheetsButton(
    network,
    props.authentication,
    props.onClose,
    props.openDialogBox,
  );

  // Help Button
  let helpButton = createHelpButton(props.onClose);

  // About Button
  let aboutButton = createAboutButton(props.onClose);

  // Feedback Button
  let feedbackButton = createFeedbackButton(network, props.onClose, props.openDialogBox);

  // Admin Button
  let adminButton = createAdminButton(
    network,
    props.authentication,
    props.onClose,
    props.openDialogBox,
  );

  // Sign In & Out Button
  let signInOutButton = createSignInOutButton(props.authentication, onSignOut, props.onClose);

  useEffect(() => {
    /* Used to re-render the page when the network connection changes.
     *  The state's network variable is compared to the message received to prevent
     *  multiple re-renders that creates extreme performance lost.
     *  The origin of the message is checked to prevent cross-site scripting attacks
     */
    window.addEventListener('message', (event) => {
      if (
        event.data === 'online' &&
        network === 'offline' &&
        event.origin === window.location.origin
      ) {
        setNetwork('online');
      } else if (
        event.data === 'offline' &&
        network === 'online' &&
        event.origin === window.location.origin
      ) {
        setNetwork('offline');
      }
    });
    return window.removeEventListener('message', () => {});
  }, [network]);

  useEffect(() => {
    props.open === true ? setShowMenu(true) : setShowMenu(false);
  }, [props.open]);

  useEffect(() => {
    let networkStatus;
    /* Attempts to get the network status from local storage.
     * If not found, the default value is online
     */
    try {
      networkStatus = storage.get('network-status');
    } catch (error) {
      // Defaults the network to online if not found in local storage
      networkStatus = 'online';
    }

    // Saves the network's status to this component's state
    setNetwork(networkStatus);
  }, [network]);

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
          open={showMenu}
          onClose={props.onClose}
        >
          <List id="right-side-menu-list" disablePadding={true}>
            <div id="right-menu-triangle"></div>
            {/* Whichever button appears last in the list, make sure it's <ListItem> tag doesn't
        contain 'divider'. This is to prevent the last item of the menu showing a bottom border  */}
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

      <QuickLinksDialog
        handleLinkClickOpen={handleLinkClickOpen}
        handleLinkClose={handleLinkClose}
        linkopen={linkOpen}
      />
    </div>
  );
};

GordonNavButtonsRightCorner.propTypes = {
  onSignOut: PropTypes.func.isRequired,
};
