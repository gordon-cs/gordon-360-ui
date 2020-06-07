import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, MenuItem } from '@material-ui/core';
import user from '../../../../services/user';

/**
 * Creates the Links button.
 *
 * Depending on the status of the network, authentication, and user role, the Links button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Function} onLinkClickOne Determines what occurs when the user clicks on this button.
 * @param {Function} onLinkClickTwo Determines what occurs when the user clicks on this button
 *                                  after onLinkClickOne occurs.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                  this button.
 *
 * @return {JSX} The JSX of the Links button.
 */
export function createLinksButton(networkStatus, onLinkClickOne, onLinkClickTwo, openDialogBox) {
  let linksButton =
    // Network Status: Online
    networkStatus === 'online' ? (
      <MenuItem
        onClick={() => {
          onLinkClickOne();
          onLinkClickTwo();
        }}
        divider="true"
      >
        Links
      </MenuItem>
    ) : (
      // Network Status: Offline
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <MenuItem disabled={true} divider="true">
          Links
        </MenuItem>
      </div>
    );

  return linksButton;
}

/**
 * Creates the Feedback button.
 *
 * Depending on the status of the network, the Feedback button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the Feedback button.
 */
export function createFeedbackButton(networkStatus, onLinkClick, openDialogBox) {
  let feedbackButton =
    // Network Status: Online
    networkStatus === 'online' ? (
      <Link to="/feedback" className="gc360-link">
        <MenuItem
          onClick={() => {
            onLinkClick();
          }}
          divider="true"
        >
          Feedback
        </MenuItem>
      </Link>
    ) : (
      // Network Status: Offline
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <MenuItem disabled={true} divider="true">
          Feedback
        </MenuItem>
      </div>
    );

  return feedbackButton;
}

/**
 * Creates the Admin button.
 *
 * Depending on the status of the network, authentication, and user role, the Admin button is created.
 * The Admin button is only seen if the user is logged in as a staff member.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the Admin button.
 */
export function createAdminButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let adminButton;
  // Authenticated and College role is god
  if (authenticated && user.getLocalInfo().college_role === 'god') {
    // Authenticated - Network Status: Online
    if (networkStatus === 'online') {
      adminButton = (
        <Link to="/admin" className="gc360-link">
          <MenuItem
            onClick={() => {
              onLinkClick();
            }}
            divider="true"
          >
            Admin
          </MenuItem>
        </Link>
      );
    } else {
      // Authenticated - Network Status: Offline
      adminButton = (
        <div onClick={openDialogBox('offline', '')}>
          <MenuItem disabled={true} divider="true">
            Admin
          </MenuItem>
        </div>
      );
    }
  }

  return adminButton;
}

/**
 * Creates the My Profile button.
 *
 * Depending on the status of the network and authentication, the My Profile button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                  this button.
 * @param {Function} currentUser The name of the current user
 *
 * @return {JSX} The JSX of the My Profile button.
 */
export function createMyProfileButton(
  networkStatus,
  authenticated,
  onLinkClick,
  openDialogBox,
  currentUser,
) {
  let myProfileButton;

  // Authenticated
  if (authenticated) {
    /* If online, the user will be directed to their page where they can edit their profile. Otherwise
     * they're directed to their public profile
     */
    let profileLink =
      networkStatus === 'online' ? '/myprofile' : `/profile/${currentUser.replace(' ', '.')}`;

    myProfileButton = (
      <Link to={profileLink} className="gc360-link">
        <MenuItem
          onClick={() => {
            onLinkClick();
          }}
          divider={true}
        >
          My Profile
        </MenuItem>
      </Link>
    );
  }
  // Not Authenticated
  else {
    myProfileButton = (
      <div
        onClick={() => {
          networkStatus === 'online'
            ? // Not Authenticated  - Network Status: Online
              openDialogBox('unauthorized', 'my profile view')
            : // Not Authenticated - Network Status Offline
              openDialogBox('offline', '');
        }}
      >
        <MenuItem
          disabled={true}
          onClick={() => {
            onLinkClick();
          }}
          divider={true}
        >
          My Profile
        </MenuItem>
      </div>
    );
  }

  return myProfileButton;
}

/**
 * Creates the Sign In/Out button.
 *
 * Depending on authentication, the Sign In/Out button is created.
 *
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onSignOut Function that occurs upon clicking this button. Either this
 *                              or onSignIn will occur.
 * @param {Function} onSignIn Function that occurs upon clicking this button. Either this
 *                            or onSignOut will occur.
 *
 * @return {JSX} The JSX of the Sign In/Out button.
 */
export function createSignInOutButton(authenticated, onSignOut, onSignIn) {
  let signInOutButton;
  // Authenticated
  if (authenticated) {
    signInOutButton = (
      <Link to="/" className="gc360-link">
        <MenuItem onClick={onSignOut} divider={true}>
          Sign Out
        </MenuItem>
      </Link>
    );
  }
  // Not Authenticated
  else {
    signInOutButton = (
      <Link to="/" className="gc360-link">
        <MenuItem onClick={onSignIn} divider={true}>
          Sign In
        </MenuItem>
      </Link>
    );
  }

  return signInOutButton;
}

/**
 * Creates the Avatar button.
 *
 * Depending on authentication, the Avatar button is created.
 *
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {String} avatarImage The profile image of the user if available
 * @param {Function} getInitials Gets the initials of the current user
 *
 * @return {JSX} The JSX of the Avatar button.
 */
export function createAvatarButton(authenticated, avatarImage, getInitials) {
  let avatarButton;
  // Authenticated
  if (authenticated) {
    // Authenticated - Profile Image Available
    if (avatarImage) {
      avatarButton = (
        <Avatar className="gc360-nav-avatar-rc_size" src={`data:image/jpg;base64,${avatarImage}`} />
      );
    }
    // Authenticated - Profile Image Unavailable
    else {
      avatarButton = (
        <Avatar className="gc360-nav-avatar-rc_size gc360-nav-avatar-rc_placeholder">
          {getInitials()}
        </Avatar>
      );
    }
  }
  // Not Authenticated
  else {
    avatarButton = <Avatar className="nav-avatar nav-avatar-placeholder">Guest</Avatar>;
  }

  return avatarButton;
}

/**
 * Creates the Help button.
 *
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 *
 * @return {JSX} The JSX of the Help button.
 */
export function createHelpButton(onLinkClick) {
  let helpButton = (
    <Link to="/help" className="gc360-link">
      <MenuItem
        onClick={() => {
          onLinkClick();
        }}
        divider={true}
      >
        Help
      </MenuItem>
    </Link>
  );

  return helpButton;
}

/**
 * Creates the About button.
 *
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 *
 * @return {JSX} The JSX of the About button.
 */
export function createAboutButton(onLinkClick) {
  let aboutButton = (
    <Link to="/about" className="gc360-link">
      <MenuItem
        onClick={() => {
          onLinkClick();
        }}
        divider={true}
      >
        About
      </MenuItem>
    </Link>
  );

  return aboutButton;
}
