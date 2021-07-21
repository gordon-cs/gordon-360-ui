import { Avatar, Button, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavAvatar.module.css';
import user from 'services/user';

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

const GordonNavAvatar = ({ authentication, onLinkClick }) => {
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    async function loadAvatar() {
      if (authentication) {
        const { name, user_name } = user.getLocalInfo();
        setName(name);
        setUsername(user_name);

        const [{ Email: email }, { def: defaultImage, pref: preferredImage }] = await Promise.all([
          await user.getProfileInfo(),
          await user.getImage(),
        ]);
        const image = preferredImage || defaultImage;
        setEmail(email);
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
      window.addEventListener('message', async (event) => {
        if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
          const { def: defaultImage, pref: preferredImage } = await user.getImage();
          const image = preferredImage || defaultImage;
          setImage(image);
        }
      });

      return window.removeEventListener('message', () => {});
    }
  }, [authentication]);

  const avatar = authentication ? (
    image ? (
      <Avatar className={`${styles.avatar} ${image}`} src={`data:image/jpg;base64,${image}`} />
    ) : (
      <Avatar className={`${styles.avatar} ${styles.placeholder}`}>{getInitials(username)}</Avatar>
    )
  ) : (
    <Avatar className={`${styles.avatar} ${styles.placeholder}`}>Guest</Avatar>
  );

  const buttonLink = React.forwardRef((props, ref) => (
    <Link
      {...props}
      innerRef={ref}
      to={authentication ? `/myprofile` : '/'}
      onClick={onLinkClick}
      className={styles.gc360-link}
    />
  ));

  const label = authentication ? (
    <>
      <Typography variant="body2" className={styles.avatar-text} align="left" gutterBottom>
        {name}
      </Typography>
      <Typography variant="caption" className={styles.avatar-text} align="left" gutterBottom>
        {email}
      </Typography>
    </>
  ) : (
    <Typography variant="body2" className={styles.avatar-text} align="left" gutterBottom>
      Guest
    </Typography>
  );

  return (
    <Button
      className={` gordon-nav-avatar`}
      classes={{
        root: 'gordon-nav-avatar button',
        label: 'label',
      }}
      component={buttonLink}
    >
      <div className={styles.gordon-nav-avatar}>
        {avatar}
        {label}
      </div>
    </Button>
  );
};

export default GordonNavAvatar;
