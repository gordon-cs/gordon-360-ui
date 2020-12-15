import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from 'react-router-dom';

/**
 * A Navigation Button for the Right Corner Menu
 *
 * @param {string} unavailable why the page linked to is unavailable. Either 'offline', 'unauthorized', or null
 * @param {Function} onLinkClick function called when link is clicked
 * @param {Function}  openUnavailableDialog function to open the dialog box when the linked page is unavailable
 * @param {string} linkName the name of the link
 * @param {string} linkPath the path to be linked to
 *
 */
const GordonNavButton = ({
  unavailable = null,
  onLinkClick = () => {},
  openUnavailableDialog = () => {},
  linkName,
  linkPath = null,
}) => {
  const link =
    unavailable !== null || linkPath === null ? (
      <ListItem divider button onClick={onLinkClick} disabled={unavailable !== null}>
        <ListItemText primary={linkName} />
      </ListItem>
    ) : (
      <NavLink exact to={linkPath} onClick={onLinkClick} className="gc360-link">
        <ListItem divider button>
          <ListItemText primary={linkName} />
        </ListItem>
      </NavLink>
    );

  if (unavailable) {
    return <div onClick={() => openUnavailableDialog(unavailable)}>{link}</div>;
  } else {
    return link;
  }
};

export default GordonNavButton;
