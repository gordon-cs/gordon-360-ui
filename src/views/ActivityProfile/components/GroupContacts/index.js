import React from 'react';
import Email from '@material-ui/icons/Email';

import { IconButton, List, ListItem, Typography } from '@material-ui/core';

const GroupContacts = ({ groupAdmin: groupAdmins }) => {
  if (groupAdmins.length > 0) {
    return (
      <>
        <Typography variant="body2">
          <strong>Group Contacts:</strong>
        </Typography>
        <List dense disablePadding>
          {groupAdmins.map((activityGroupAdmin) => (
            <ListItem key={activityGroupAdmin.Email}>
              <IconButton size="small" color="primary" href={`mailto:${activityGroupAdmin.Email}`}>
                <Email color="primary" style={{ width: 16, height: 16 }} />
              </IconButton>
              <Typography>
                &emsp;{activityGroupAdmin.FirstName} {activityGroupAdmin.LastName}
              </Typography>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return null;
};

export default GroupContacts;
