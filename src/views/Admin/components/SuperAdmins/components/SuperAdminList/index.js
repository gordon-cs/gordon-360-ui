import React, { useState } from 'react';
import { gordonColors } from 'theme';
import admin from 'services/admin';

import { Button, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';

const SuperAdminList = ({ Admin, onRemove }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmedRemove = () => {
    admin.removeAdmin(Admin.ADMIN_ID);
    onRemove(Admin.ADMIN_ID);
  };

  const buttonStyle = {
    background: gordonColors.secondary.red,
    color: 'white',
  };

  return (
    <>
      <ListItem divider>
        <ListItemText primary={Admin.USER_NAME} />

        <ListItemSecondaryAction>
          <Button variant="contained" style={buttonStyle} onClick={() => setOpen(true)}>
            Remove
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <GordonDialogBox
        open={open}
        title="Remove Site Admin"
        buttonName="Remove"
        buttonClicked={handleConfirmedRemove}
        cancelButtonClicked={() => setOpen(false)}
      >
        Are you sure you want to remove {Admin.USER_NAME} from being a site admin?
      </GordonDialogBox>
    </>
  );
};

export default SuperAdminList;
