import React from 'react';
import Email from '@material-ui/icons/Email';

import { IconButton, List, ListItem, Typography } from '@material-ui/core';

const ContactList = ({ contacts, listTitle }) => {
  if (contacts.length > 0) {
    return (
      <>
        <Typography variant="body2">
          <strong>{listTitle}:</strong>
        </Typography>
        <List dense disablePadding>
          {contacts.map((contact) => (
            <ListItem key={contact.Email}>
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
  return null;
};

export default ContactList;
