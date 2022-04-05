import { useIsAuthenticated } from '@azure/msal-react';
import { Avatar, Button, Typography } from '@material-ui/core';
import { useUser } from 'hooks';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userService from 'services/user';
import styles from './NavAvatar.module.css';

const GordonNavAvatar = ({ onLinkClick }) => {
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    async function loadAvatar() {
      if (isAuthenticated) {
        setName(user.profile.fullName);
        setEmail(user.profile.Email);
        setImage(user.images?.pref || user.images?.def);
      } else {
        setName('Guest');
      }
    }

    loadAvatar();

    if (isAuthenticated) {
      // Used to re-render the page when the user's profile picture changes
      // The origin of the message is checked to prevent cross-site scripting attacks
      window.addEventListener('message', async (event) => {
        if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
          const { def: defaultImage, pref: preferredImage } = await userService.getImage();
          const image = preferredImage || defaultImage;
          setImage(image);
        }
      });

      return window.removeEventListener('message', () => {});
    }
  }, [user, isAuthenticated]);

  const avatar = isAuthenticated ? (
    image ? (
      <Avatar className={`${styles.avatar}`} src={`data:image/jpg;base64,${image}`} />
    ) : (
      <Avatar className={`${styles.avatar} ${styles.placeholder}`}>
        {user.profile?.FirstName?.[0]} {user.profile?.LastName?.[0]}
      </Avatar>
    )
  ) : (
    <Avatar className={`${styles.avatar} ${styles.placeholder}`}>Guest</Avatar>
  );

  const buttonLink = forwardRef((props, ref) => (
    <Link
      {...props}
      innerRef={ref}
      to={isAuthenticated ? `/myprofile` : '/'}
      onClick={onLinkClick}
      className="gc360_link"
    />
  ));

  const label = isAuthenticated ? (
    <>
      <Typography variant="body2" className={styles.avatar_text} align="left" gutterBottom>
        {name}
      </Typography>
      <Typography variant="caption" className={styles.avatar_text} align="left" gutterBottom>
        {email}
      </Typography>
    </>
  ) : (
    <Typography variant="body2" className={styles.avatar_text} align="left" gutterBottom>
      Guest
    </Typography>
  );

  return (
    <Button component={buttonLink}>
      <div className={styles.gordon_nav_avatar}>
        {avatar}
        {label}
      </div>
    </Button>
  );
};

export default GordonNavAvatar;
