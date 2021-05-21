import React from 'react';
import Email from '@material-ui/icons/Email';

import { IconButton, List, ListItem, Typography } from '@material-ui/core';

const Advisors = ({ advisors }) => {
  if (advisors.length > 0) {
    return (
      <>
        <Typography variant="body2">
          <strong>Advisors:</strong>
        </Typography>
        <List dense disablePadding>
          {advisors.map((advisor) => (
            <ListItem key={advisor.Email}>
              <IconButton size="small" color="primary" href={`mailto:${advisor.Email}`}>
                <Email color="primary" style={{ width: 16, height: 16 }} />
              </IconButton>
              <Typography>
                &emsp;{advisor.FirstName} {advisor.LastName}
              </Typography>
            </ListItem>
          ))}
        </List>
      </>
    );
  }
  return null;
};

export default Advisors;
