import { Avatar, IconButton, Tooltip } from '@mui/material';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import styles from './NavAvatarRightCorner.module.css';

type Props = {
  onClick: () => void;
};

export const GordonNavAvatarRightCorner = ({ onClick }: Props) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const user = useUser();

  useEffect(() => {
    function loadAvatar() {
      if (user.profile) {
        setName(user.profile.fullName);
        const image = user.images.pref || user.images.def;
        setImage(image);
      } else {
        setName('Guest');
      }
    }

    loadAvatar();
  }, [user]);

  const avatar = user.loading ? (
    <GordonLoader size={68} color="secondary" />
  ) : user.profile ? (
    image ? (
      <Avatar className={styles.root} src={`data:image/jpg;base64,${image}`} sizes="70px" />
    ) : (
      <Avatar className={styles.root}>
        {user.profile?.FirstName?.value[0]} {user.profile?.LastName?.value[0]}
      </Avatar>
    )
  ) : (
    <Avatar className={styles.root}>Guest</Avatar>
  );

  return (
    <section className={styles.right_side_container}>
      <Tooltip className={styles.tooltip} id="tooltip_avatar" title={name ?? 'Nav Avatar'}>
        <IconButton
          className={styles.root}
          aria-label="My Profile"
          aria-owns={'global-menu'}
          aria-haspopup="true"
          onClick={onClick}
          size="large"
        >
          {avatar}
        </IconButton>
      </Tooltip>
    </section>
  );
};
