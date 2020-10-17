import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
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
 *                                this button.
 *
 * @return {JSX} The JSX of the Links button.
 */
export function createLinksButton(networkStatus, onLinkClickOne, onLinkClickTwo, openDialogBox) {
  let linksButton =
    // Network Status: Online
    networkStatus === 'online' ? (
      <ListItem
        divider
        button
        onClick={() => {
          onLinkClickOne();
          onLinkClickTwo();
        }}
      >
        <ListItemText primary="Links" />
      </ListItem>
    ) : (
      // Network Status: Offline
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem divider button disabled={true}>
          <ListItemText primary="Links" />
        </ListItem>
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
      <NavLink exact to="/feedback" onClick={onLinkClick} className="gc360-link">
        <ListItem divider button>
          <ListItemText primary="Feedback" />
        </ListItem>
      </NavLink>
    ) : (
      // Network Status: Offline
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem divider button disabled={true}>
          <ListItemText primary="Feedback" />
        </ListItem>
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
        <NavLink exact to="/admin" onClick={onLinkClick} className="gc360-link">
          <ListItem divider button>
            <ListItemText primary="Admin" />
          </ListItem>
        </NavLink>
      );
    } else {
      // Authenticated - Network Status: Offline
      adminButton = (
        <div
          onClick={() => {
            openDialogBox('offline', '');
          }}
        >
          <ListItem divider button disabled={true}>
            <ListItemText primary="Admin" />
          </ListItem>
        </div>
      );
    }
  }

  return adminButton;
}

/**
 * Creates the Timesheets button.
 *
 * Depending on the status of the network, authentication, and user role, the Timesheets
 * button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the Timesheets button.
 */
export function createTimesheetsButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let timesheetsButton;
  // Network Status: Online
  if (networkStatus === 'online') {
    // Network Status: Online - Authenticated
    if (authenticated) {
      timesheetsButton = (
        <NavLink exact to="/timesheets" onClick={onLinkClick} className="gc360-link">
          <ListItem divider button>
            <ListItemText primary="Timesheets" />
          </ListItem>
        </NavLink>
      );
    }
    // Network Status: Online - Not Authenticated
    else {
      timesheetsButton = (
        <div
          onClick={() => {
            openDialogBox('unauthorized', 'timesheets view');
          }}
        >
          <ListItem divider button disabled={true}>
            <ListItemText primary="Timesheets" />
          </ListItem>
        </div>
      );
    }
  }
  // Network Status: Offline
  else {
    timesheetsButton = (
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem divider button disabled={true}>
          <ListItemText primary="Timesheets" />
        </ListItem>
      </div>
    );
  }

  return timesheetsButton;
}

/**
 * Creates the Apartment Application button.
 *
 * Depending on the status of the network, authentication, and user role, the Apartment Application
 * button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the Apartment Application button.
 */
export function createApartmentAppButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let apartmentAppButton;
  // Network Status: Online
  if (networkStatus === 'online') {
    // Network Status: Online - Authenticated
    if (authenticated) {
      apartmentAppButton = (
        <NavLink exact to="/ApartApp" onClick={onLinkClick} className="gc360-link">
          <ListItem divider button>
            <ListItemText primary="Apartment Application" />
          </ListItem>
        </NavLink>
      );
    }
    // Network Status: Online - Not Authenticated
    else {
      apartmentAppButton = (
        <div
          onClick={() => {
            openDialogBox('unauthorized', 'apartment app view');
          }}
        >
          <ListItem divider button disabled={true}>
            <ListItemText primary="Apartment Application" />
          </ListItem>
        </div>
      );
    }
  }
  // Network Status: Offline
  else {
    apartmentAppButton = (
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem divider button disabled={true}>
          <ListItemText primary="Apartment Application" />
        </ListItem>
      </div>
    );
  }

  return apartmentAppButton;
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
 *
 * @return {JSX} The JSX of the My Profile button.
 */
export function createMyProfileButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let myProfileButton;

  // Authenticated
  if (authenticated) {
    myProfileButton = (
      <NavLink exact to="/myprofile" onClick={onLinkClick} className="gc360-link">
        <ListItem divider button>
          <ListItemText primary="My Profile" />
        </ListItem>
      </NavLink>
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
        <ListItem divider button disabled={true}>
          <ListItemText primary="My Profile" />
        </ListItem>
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
 * @param {Function} onSignOut Function that occurs upon clicking this button.
 * @param {Function} onSignIn Function that occurs upon clicking this button.
 *
 * @return {JSX} The JSX of the Sign In/Out button.
 */
export function createSignInOutButton(authenticated, onSignOut, onSignIn) {
  let signInOutButton;
  // Authenticated
  if (authenticated) {
    signInOutButton = (
      <NavLink exact to="/" onClick={onSignOut} className="gc360-link">
        <ListItem button>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </NavLink>
    );
  }
  // Not Authenticated
  else {
    signInOutButton = (
      <NavLink exact to="/" onClick={onSignIn} className="gc360-link">
        <ListItem button>
          <ListItemText primary="Sign In" />
        </ListItem>
      </NavLink>
    );
  }

  return signInOutButton;
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
    <NavLink exact to="/help" onClick={onLinkClick} className="gc360-link">
      <ListItem divider button>
        <ListItemText primary="Help" />
      </ListItem>
    </NavLink>
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
    <NavLink className="gc360-link" exact to="/about" onClick={onLinkClick}>
      <ListItem divider button>
        <ListItemText primary="About" />
      </ListItem>
    </NavLink>
  );

  return aboutButton;
}
