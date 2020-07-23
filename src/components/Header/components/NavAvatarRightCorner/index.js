import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gordonColors } from '../../../../theme';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './nav-avatar-right-corner.css';
import '../../../../app.css';
import user from '../../../../services/user';

export const GordonNavAvatarRightCorner = props => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);

  GordonNavAvatarRightCorner.propTypes = {
    onSignOut: PropTypes.func.isRequired,
  };

  // Creates the styling of the Avatar
  const useStyles = makeStyles({
    root: {
      width: '3.125rem',
      height: '3.125rem',
      padding: '0rem',
      '&:hover': {
        transition: 'box-shadow 0.2s',
        boxShadow: '0px 3px 10px 0px rgba(0, 0, 0, 0.5)',
      },
      '&:not(:hover)': {
        transition: 'box-shadow 0.3s',
        boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.5)',
      },
      '&_placeholder': {
        backgroundColor: gordonColors.primary.cyan,
      },
    },
    tooltip: {
      backgroundColor: gordonColors.neutral.darkGray,
    },
  });
  const classes = useStyles();

  // Re-creates the Avatar whenever authentication changes
  useEffect(() => {
    loadAvatar(props.Authentication);
  }, [props.Authentication]);

  /* Used to re-render the page when the user's profile picture changes
   *  The origin of the message is checked to prevent cross-site scripting attacks
   */
  useEffect(() => {
    window.addEventListener('message', event => {
      if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
        loadAvatar(props.Authentication);
      }
    });

    return window.removeEventListener('message', () => {});
  }, [props.Authentication]);

  // Avatar Button
  let avatar = createAvatarButton(props.Authentication, image, getInitials);

  /**
   * Gets the initials of the current user
   *
   * @returns {String} The initials of the user if available
   */
  function getInitials() {
    if (username) {
      return username
        .split('.') // Split name into separate words
        .map(name => name[0]) // Get first letter of each part of name
        .join('')
        .toUpperCase(); // Join initials back into a string
    }
    return '';
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
  function createAvatarButton(authenticated, avatarImage, getInitials) {
    let avatarButton;
    // Authenticated
    if (authenticated) {
      // Authenticated - Profile Image Available
      if (avatarImage) {
        avatarButton = (
          <Avatar
            className={`gc360-nav-avatar-rc_size ${classes.root}`}
            src={`data:image/jpg;base64,${avatarImage}`}
            sizes="4.375rem"
          />
        );
      }
      // Authenticated - Profile Image Unavailable
      else {
        avatarButton = (
          <Avatar
            className={`gc360-nav-avatar-rc_size gc360-nav-avatar-rc_placeholder ${classes.root}`}
          >
            {getInitials()}
          </Avatar>
        );
      }
    }
    // Not Authenticated
    else {
      avatarButton = (
        <Avatar className={`nav-avatar nav-avatar-placeholder ${classes.root}`}>Guest</Avatar>
      );
    }

    return avatarButton;
  }

  /**
   * Creates the Avatar image of the current user
   *
   * @param {Boolean} authentication Determines if the user is authenticated
   */
  async function loadAvatar(authentication) {
    if (authentication) {
      const { name, user_name: username } = user.getLocalInfo();
      setName(name);
      setUsername(username);
      const { def: defaultImage, pref: preferredImage } = await user.getImage();
      const image = preferredImage || defaultImage;
      setImage(image);
    } else {
      setName('Guest');
      setUsername('Guest');
    }
  }

  return (
    <section className="right-side-container">
      <Tooltip classes={classes} id="tooltip-avatar" title={name}>
        <IconButton
          className={`gc360-nav-avatar-rc ${classes.root}`}
          aria-label="More"
          aria-owns={'global-menu'}
          aria-haspopup="true"
          onClick={event => {
            // Handles opening the menu
            props.onClick();
          }}
        >
          {avatar}
        </IconButton>
      </Tooltip>
    </section>
  );
};
