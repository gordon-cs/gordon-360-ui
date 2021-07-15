import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import Email from '@material-ui/icons/Email';
import React, { useEffect, useState } from 'react';
import user from 'services/user';
import { Link } from 'react-router-dom';

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
      <Link className="gc360-link" to={`/profile/${contact.Email.split('@')[0]}`}>
        <ListItemText primary={`${contact.FirstName} ${contact.LastName}`} />
      </Link>
      <ListItemSecondaryAction>
        <IconButton color="primary" href={`mailto:${contact.Email}`}>
          <Email color="primary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default ContactListItem;
