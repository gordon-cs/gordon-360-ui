import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Link as MuiLink } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

/**
 * A Navigation Button for the Right Corner Menu
 *
 * @param {string} unavailable why the page linked to is unavailable. Either 'offline', 'unauthorized', or null
 * @param {Function} onLinkClick function called when link is clicked
 * @param {Function}  openUnavailableDialog function to open the dialog box when the linked page is unavailable
 * @param {boolean} divider whether or to add a divider
 * @param {string} linkName the name of the link
 * @param {string} linkPath the path to be linked to
 * @param {JSX.Element} LinkIcon An optional icon to include in the link
 * @returns {JSX.ELement} A NavButton with the specified content and behavior
 *
 */
const GordonNavButton = ({
  unavailable = null,
  onLinkClick = () => {},
  openUnavailableDialog = () => {},
  divider = true,
  linkName,
  linkPath = null,
  LinkIcon = null,
}) => {
  const link =
    unavailable !== null || linkPath === null ? (
      <ListItem divider={divider} button onClick={onLinkClick} disabled={unavailable !== null}>
        {LinkIcon && (
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
        )}
        <ListItemText primary={linkName} />
      </ListItem>
    ) : (
      <MuiLink
        color="inherit"
        component={NavLink}
        exact
        to={linkPath}
        onClick={onLinkClick}
        className="gc360_link"
      >
        <ListItem divider={divider} button>
          {LinkIcon && (
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
          )}
          <ListItemText primary={linkName} />
        </ListItem>
      </MuiLink>
    );

  if (unavailable) {
    return <div onClick={() => openUnavailableDialog(unavailable)}>{link}</div>;
  } else {
    return link;
  }
};

export default GordonNavButton;
