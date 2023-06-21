import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

/**
 * A Navigation Button for the Right Corner Menu
 *
 * @param {Object} props the component props
 * @param {string} props.unavailable why the page linked to is unavailable. Either 'offline', 'unauthorized', or null
 * @param {Function} props.onLinkClick function called when link is clicked
 * @param {Function}  props.openUnavailableDialog function to open the dialog box when the linked page is unavailable
 * @param {boolean} props.divider whether or to add a divider
 * @param {string} props.linkName the name of the link
 * @param {string} props.linkPath the path to be linked to
 * @param {JSX.Element} props.LinkIcon An optional icon to include in the link
 * @returns {JSX.ELement} A NavButton with the specified content and behavior
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
      <ListItem
        divider={divider}
        button
        onClick={onLinkClick}
        disabled={unavailable !== null}
        className="gc360_link"
      >
        {LinkIcon && (
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
        )}
        <ListItemText primary={linkName} />
      </ListItem>
    ) : (
      <NavLink end to={linkPath} onClick={onLinkClick}>
        <ListItem divider={divider} button className="gc360_link">
          {LinkIcon && (
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
          )}
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
