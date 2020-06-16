import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import EventIcon from '@material-ui/icons/Event';
import PeopleIcon from '@material-ui/icons/People';
import user from '../../../../services/user';
import WorkIcon from '@material-ui/icons/Work';
import WellnessIcon from '@material-ui/icons/LocalHospital';

/**
 * Creates the Links button.
 *
 * Depending on the status of the network, authentication, and user role, the Links button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the Links button.
 */
export function createLinksButton(networkStatus, onLinkClick, openDialogBox) {
  let linksButton =
    // Network Status: Online
    networkStatus === 'online' ? (
      <ListItem
        button
        onClick={() => {
          onLinkClick();
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
        <ListItem button disabled={true}>
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
        <ListItem button>
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
        <ListItem button disabled={true}>
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
          <ListItem button>
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
          <ListItem button disabled={true}>
            <ListItemText primary="Admin" />
          </ListItem>
        </div>
      );
    }
  }

  return adminButton;
}

/**
 * Creates the People button.
 *
 * Depending on the status of the network and authentication, the People button is created.
 *
 * @param {String} networkStatus The status of the network. Either 'online' or 'offline'.
 * @param {Boolean} authenticated Determines if the user is logged in.
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 * @param {Function} openDialogBox Sets the data of a dialog box to be shown if the user clicks on
 *                                this button.
 *
 * @return {JSX} The JSX of the People button.
 */
export function createPeopleButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let peopleButton;
  // Network Status: Online
  if (networkStatus === 'online') {
    // Network Status: Online - Authenticated
    if (authenticated) {
      peopleButton = (
        <NavLink exact to="/people" onClick={onLinkClick} className="gc360-link">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      );
    }
    // Network Status: Online - Not Authenticated
    else {
      peopleButton = (
        <NavLink
          exact
          onClick={() => {
            openDialogBox('unauthorized', 'people search');
          }}
          className="gc360-link"
        >
          <ListItem button disabled={true}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="People" />
          </ListItem>
        </NavLink>
      );
    }
  }
  // Network Status - Offline
  else {
    peopleButton = (
      <div
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem button disabled={true}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="People" />
        </ListItem>
      </div>
    );
  }

  return peopleButton;
}

/**
 * Creates the Involvements button.
 *
 * Depending on the status of the network and authentication, the Involvements button is created.
 *
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 *
 * @return {JSX} The JSX of the Involvements button.
 */
export function createInvolvementsButton(onLinkClick) {
  let involvementsButton = (
    <NavLink className="gc360-link" exact to="/involvements" onClick={onLinkClick}>
      <ListItem button>
        <ListItemIcon>
          <LocalActivityIcon />
        </ListItemIcon>
        <ListItemText primary="Involvements" />
      </ListItem>
    </NavLink>
  );

  return involvementsButton;
}

/**
 * Creates the Events button.
 *
 * Depending on the status of the network and authentication, the Events button is created.
 *
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 *
 * @return {JSX} The JSX of the Events button.
 */
export function createEventsButton(onLinkClick) {
  let eventsButton = (
    <NavLink className="gc360-link" exact to="/events" onClick={onLinkClick}>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
      </ListItem>
    </NavLink>
  );

  return eventsButton;
}

/**
 * Creates the Home button.
 *
 * @param {Function} onLinkClick Determines what occurs when the user clicks on this button.
 *
 * @return {JSX} The JSX of the Home button.
 */
export function createHomeButton(onLinkClick) {
  let homeButton = (
    <NavLink className="gc360-link" exact to="/" onClick={onLinkClick}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
  );

  return homeButton;
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
      <ListItem button>
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
      <ListItem button>
        <ListItemText primary="About" />
      </ListItem>
    </NavLink>
  );

  return aboutButton;
}

/**
 * Creates the Timesheets button.
 *
 * Depending on the status of the network and authentication, the Timesheets button is created.
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
        <NavLink className="gc360-link" exact to="/student-timesheets" onClick={onLinkClick}>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Timesheets" />
          </ListItem>
        </NavLink>
      );
    }
    // Network Status: Online - Not Authenticated
    else {
      timesheetsButton = (
        <NavLink
          className="gc360-link"
          onClick={() => {
            openDialogBox('unauthorized', 'timesheets view');
          }}
        >
          <ListItem button disabled={true}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Timesheets" />
          </ListItem>
        </NavLink>
      );
    }
  }
  // Network Status: Offline
  else {
    timesheetsButton = (
      <NavLink
        className="gc360-link"
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem button disabled={true}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheets" />
        </ListItem>
      </NavLink>
    );
  }

  return timesheetsButton;
}
 /**
   * THE CODE FOR THE WELLNESS CHECK TABS.
   *
   */
export function createWellnessButton(networkStatus, authenticated, onLinkClick, openDialogBox) {
  let wellnessButton;
  // Network Status: Online
  if (networkStatus === 'online') {
  // Network Status: Online - Authenticated
    if (authenticated) {      
      wellnessButton = (
        <NavLink className="gc360-link" exact to="/Wellness" onClick={onLinkClick} >
          <ListItem button>
            <ListItemIcon>
              <WellnessIcon />
            </ListItemIcon>
            <ListItemText primary="Wellness" />
          </ListItem>
        </NavLink>
      );
    }
    // Network Status: Online - Not Authenticated
    else{
      wellnessButton = (
        <NavLink
          className="gc360-link"
          onClick={() => {
            openDialogBox('unauthorized', 'wellness check');
          }}
        >
          <ListItem button disabled={true}>
            <ListItemIcon>
              <WellnessIcon />
            </ListItemIcon>
            <ListItemText primary="Wellness" />
          </ListItem>
        </NavLink>
      );
    }
  } 
  // Network Status: Offline
  else {
    wellnessButton = (
      <NavLink
        className="gc360-link"
        onClick={() => {
          openDialogBox('offline', '');
        }}
      >
        <ListItem button disabled={true}>
          <ListItemIcon>
            <WellnessIcon />
          </ListItemIcon>
          <ListItemText primary="Wellness" />
        </ListItem>
      </NavLink>
    );
  }
      
  return wellnessButton;
}