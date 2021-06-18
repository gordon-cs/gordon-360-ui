import React, { useState, useEffect } from 'react';
import Email from '@material-ui/icons/Email';

import { IconButton, List, ListItem, Typography, Grid } from '@material-ui/core';
import IMG from 'react-graceful-image';
import userService from 'services/user';
const rowStyle = {
  margin: '10px 0',
  padding: '10px 0px',
};

const getAvatar = async ({ username }) => {
  let tempAvatar = (
    <svg width="50" height="50" viewBox="0 0 50 50">
      <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
    </svg>
  );
  return tempAvatar;
};

const ContactList = ({ contacts, listTitle }) => {
  const [avatar, setAvatar] = useState();

  // useEffect(() => {
  //   const loadAvatar = async () => {
  //     //console.log(member.AD_username);
  //     const [{ def: defaultImage, pref: preferredImage }] = await Promise.all([
  //       await user.getImage(contacts.AD_Username),
  //     ]);
  //     let tempAvatar;
  //     //console.log(member.AD_Username);
  //     if (member.AD_Username) {
  //       tempAvatar = preferredImage || defaultImage;
  //     } else {
  //       tempAvatar = (
  //         <svg width="50" height="50" viewBox="0 0 50 50">
  //           <rect width="50" height="50" rx="10" ry="10" fill="#CCC" />
  //         </svg>
  //       );
  //     }
  //     setAvatar(tempAvatar);
  //   };
  //   loadAvatar();
  // }, [contacts.AD_Username]);

  if (contacts.length > 0) {
    return (
      <>
        <Typography variant="body2">
          <strong>{listTitle}:</strong>
        </Typography>
        <List dense disablePadding>
          {contacts.map((contact) => (
            <ListItem key={contact.Email}>
              <Grid item xs={1} style={rowStyle}>
                <IMG
                  className="people-search-avatar-mobile"
                  src={`data:image/jpg;base64,${avatar}`}
                  alt=""
                  noLazyLoad="true"
                  placeholderColor="#eeeeee"
                />
              </Grid>
              <IconButton size="small" color="primary" href={`mailto:${contact.Email}`}>
                <Email color="primary" style={{ width: 16, height: 16 }} />
              </IconButton>
              <Typography>
                &emsp;{contact.FirstName} {contact.LastName}
              </Typography>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return null; //
};

export default ContactList;
