import React, { useState, useEffect } from 'react';
import Email from '@material-ui/icons/Email';

import { IconButton, List, ListItem, Typography, Grid } from '@material-ui/core';
import IMG from 'react-graceful-image';
import user from 'services/user';
const rowStyle = {
  margin: '10px 0',
  padding: '10px 0px',
};

const ContactListItem = ({ contact }) => {
  const [avatar, setAvatar] = useState();
  const AD_Username = contact.Email.slice(0, contact.Email.search('@'));
  useEffect(() => {
    const loadAvatar = async () => {
      console.log(contact);
      const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
        await user.getImage(AD_Username),
      ]);
      let tempAvatar;
      if (AD_Username) {
        tempAvatar = preferredImage || defaultImage;
      } else {
        tempAvatar = (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
          </svg>
        );
      }
      setAvatar(tempAvatar);
    };
    loadAvatar();
  }, [AD_Username]);

  return (
    <>
      <ListItem key={contact.Email}>
        <Grid>
          <IMG
            className="people-search-avatar-mobile"
            src={`data:image/jpg;base64,${avatar}`}
            alt=""
            noLazyLoad="true"
            placeholderColor="#eeeeee"
          />
        </Grid>
        <Grid style={rowStyle}>
          <IconButton size="small" color="primary" href={`mailto:${contact.Email}`}>
            <Email color="primary" style={{ width: 20, height: 20 }} />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <Typography>
            &emsp;{contact.FirstName} {contact.LastName}
          </Typography>
        </Grid>
      </ListItem>
    </>
  );
};
export default ContactListItem;
