import React, { useState } from 'react';
import { gordonColors } from 'theme';
import admin from 'services/admin';

import { Typography, Divider, Grid, Button } from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';

const SuperAdminList = ({ Admin }) => {
  const [open, setOpen] = useState(false);

  const handleConfirmedRemove = () => {
    const adminID = Admin.ADMIN_ID;
    admin.removeAdmin(adminID);
    window.location.reload();
  };

  const itemStyle = {
    padding: '10px',
  };
  const buttonStyle = {
    background: gordonColors.secondary.red,
    color: 'white',
  };

  return (
    <>
      <Grid container style={itemStyle} justify="center" alignItems="center">
        <Grid item xs={8}>
          <Typography>{Admin.USER_NAME}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" style={buttonStyle} onClick={() => setOpen(true)}>
            Remove
          </Button>
        </Grid>
      </Grid>
      <Divider />
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
