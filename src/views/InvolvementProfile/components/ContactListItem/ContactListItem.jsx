import {
  Avatar,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material';
import Email from '@mui/icons-material/Email';
import { useEffect, useState } from 'react';
import user from 'services/user';

const PlaceHolderAvatar = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
  </svg>
);

const ContactListItem = ({ contact }) => {
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    const loadAvatar = async () => {
      if (contact.Email) {
        const AD_Username = contact.Email.slice(0, contact.Email.search('@'));
        const { def: defaultImage, pref: preferredImage } = await user.getImage(AD_Username);
        setAvatar(preferredImage || defaultImage);
      }
    };
    loadAvatar();
  }, [contact]);

  return (
    <ListItem key={contact.Email} divider>
      <ListItemAvatar>
        <Avatar
          alt={`${contact.FirstName} ${contact.LastName}`}
          src={`data:image/jpg;base64,${avatar}`}
          variant="rounded"
          style={{ width: '4rem', height: '4rem', margin: '0 1rem 0 0' }}
        >
          {!avatar && <PlaceHolderAvatar />}
        </Avatar>
      </ListItemAvatar>
      <Link href={`/profile/${contact.Email.split('@')[0]}`} underline="hover">
        <ListItemText
          primary={`${contact.FirstName} ${contact.LastName}`}
          secondary={contact?.Description}
        />
      </Link>
      <ListItemSecondaryAction>
        <IconButton color="primary" href={`mailto:${contact.Email}`} size="large">
          <Email color="primary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default ContactListItem;
