import { Avatar, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GordonLoader from 'components/Loader';
import { useUser } from 'hooks';
import { useEffect, useState } from 'react';
import { gordonColors } from 'theme';
import styles from '../../Header.module.css';

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

export const GordonNavAvatarRightCorner = ({ onClick }) => {
  const [name, setName] = useState(null);
  const [image, setImage] = useState(null);
  const classes = useStyles();
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

    if (user.profile) {
      // Used to re-render the page when the user's profile picture changes
      // The origin of the message is checked to prevent cross-site scripting attacks
      window.addEventListener('message', (event) => {
        if (event.data === 'update-profile-picture' && event.origin === window.location.origin) {
          loadAvatar();
        }
      });

      return window.removeEventListener('message', () => {});
    }
  }, [user]);

  const avatar = user.loading ? (
    <GordonLoader size={68} color="secondary" />
  ) : user.profile ? (
    image ? (
      <Avatar className={classes.root} src={`data:image/jpg;base64,${image}`} sizes="70px" />
    ) : (
      <Avatar className={classes.root}>
        {user.profile?.FirstName?.[0]} {user.profile?.LastName?.[0]}
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
