import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { gordonColors } from 'theme';
import React, { useState, useEffect } from 'react';
import user from 'services/user';

import styles from './../../Header.module.css';

/**
 * Gets the initials of the current user
 * @param {String} username the username to extract initials from
 * @returns {String} The initials of the user if available
 */
function getInitials(username) {
  try {
    return (
      username
        ?.split('.') // Split name into separate words
        ?.map((name) => name?.[0]) // Get first letter of each part of name
        ?.join('') // Join initials back into a string
        ?.toUpperCase() ?? null
    );
  } catch {
    return null;
  }
}

const useStyles = makeStyles({
  root: {
    width: '50px',
    height: '50px',
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
});

export const GordonNavAvatarRightCorner = ({ authentication, onClick }) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [image, setImage] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    async function loadAvatar() {
      if (authentication) {
        const { name, user_name } = user.getLocalInfo();
        setName(name);
        setUsername(user_name);
        const { def: defaultImage, pref: preferredImage } = await user.getImage();
        const image = preferredImage || defaultImage;
        setImage(image);
      } else {
        setName('Guest');
        setUsername('Guest');
      }
    }

    loadAvatar();

    if (authentication) {
      // Used to re-render the page when the user's profile picture changes
      // The origin of the message is checked to prevent cross-site scripting attacks
      window.addEventListener('message', (event) => {
        if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
          loadAvatar();
        }
      });

      return window.removeEventListener('message', () => {});
    }
  }, [authentication]);

  const avatar = authentication ? (
    image ? (
      <Avatar
        className={classes.root}
        src={`data:image/jpg;base64,${image}`}
        sizes="70px"
      />
    ) : (
      <Avatar
        className={classes.root}
      >
        {getInitials(username)}
      </Avatar>
    )
  ) : (
    <Avatar className={classes.root}>Guest</Avatar>
  );

  return (
    <section className={styles.right_side_container}>
      <Tooltip className={styles.tooltip} id="tooltip_avatar" title={name ? name : 'Nav Avatar'}>
        <IconButton
          className={classes.root}
          aria-label="More"
          aria-owns={'global-menu'}
          aria-haspopup="true"
          onClick={onClick}
        >
          {avatar}
        </IconButton>
      </Tooltip>
    </section>
  );
};
