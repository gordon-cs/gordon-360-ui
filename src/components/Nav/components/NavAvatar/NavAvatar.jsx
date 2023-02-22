import { Avatar, Button, Typography } from '@mui/material';
import GordonLoader from 'components/Loader/Loader';
import { useUser } from 'hooks/hooks';
import { forwardRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavAvatar.module.css';

const GordonNavAvatar = ({ onLinkClick }) => {
  const [email, setEmail] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const { profile, images, loading } = useUser();

  useEffect(() => {
    async function loadAvatar() {
      if (profile) {
        setName(profile.fullName);
        setEmail(profile.Email);
        setImage(images.pref || images.def);
      } else {
        setName('Guest');
      }
    }

    loadAvatar();
  }, [profile, images]);

  const avatar = loading ? (
    <GordonLoader />
  ) : profile ? (
    image ? (
      <Avatar className={`${styles.avatar}`} src={`data:image/jpg;base64,${image}`} />
    ) : (
      <Avatar className={`${styles.avatar} ${styles.placeholder}`}>
        {profile.FirstName?.[0]} {profile.LastName?.[0]}
      </Avatar>
    )
  ) : (
    <Avatar className={`${styles.avatar} ${styles.placeholder}`}>Guest</Avatar>
  );

  const buttonLink = forwardRef((props, ref) => (
    <Link
      {...props}
      innerRef={ref}
      to={profile ? `/myprofile` : '/'}
      onClick={onLinkClick}
      className="gc360_link"
    />
  ));

  const label = loading ? (
    <Typography variant="body2" className={styles.avatar_text} align="left" gutterBottom>
      loading profile
    </Typography>
  ) : profile ? (
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
