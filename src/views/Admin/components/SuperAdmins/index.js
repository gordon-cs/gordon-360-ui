import React, { useEffect, useState } from 'react';
import SuperAdminList from './components/SuperAdminList';
import GordonLoader from 'components/Loader';
import admin from 'services/admin';
import { gordonColors } from 'theme';
import membership from 'services/membership';

import { Card, Button, TextField, CardHeader } from '@material-ui/core';
import GordonDialogBox from 'components/GordonDialogBox';

const SuperAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false); //add admin dialogue box
  const [newAdminEmail, setNewAdminEmail] = useState('');

  useEffect(() => {
    const loadAdmins = async () => {
      setAdmins(await admin.getAdmins());
      setLoading(false);
    };

    loadAdmins();
  }, []);

  const handleSubmit = async () => {
    let email = newAdminEmail;
    if (!newAdminEmail.toLowerCase().includes('@gordon.edu')) {
      email = newAdminEmail + '@gordon.edu';
    }
    // TODO: Refactor API to not require ID?
    const { GordonID: addID } = await membership.getEmailAccount(email);
    let data = {
      ID_NUM: addID,
      EMAIL: newAdminEmail,
      USER_NAME: newAdminEmail.split('@')[0],
      SUPER_ADMIN: true, //Used to be distinction between superadmin (godmode), admin, and groupadmin
      //now just superadmin and groupadmin
    };
    await admin.addAdmin(data);
    setOpen(false);
    window.location.reload(); //refresh
  };

  const buttonStyle = {
    margin: '20px',
    background: gordonColors.primary.blue,
    color: 'white',
  };
  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
    textAlign: 'center',
  };

  let content;
  if (loading === true) {
    content = <GordonLoader />;
  } else {
    content = admins.map((superadmin) => (
      <SuperAdminList key={superadmin.ADMIN_ID} Admin={superadmin} />
    ));
  }

  return (
    <Card>
      <CardHeader title="Site Admins" style={headerStyle} />
      {content}
      <Button style={buttonStyle} onClick={() => setOpen(true)}>
        Add Super Admin
      </Button>
      {/*
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add Super Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Super Admin Email (or username)"
            type="email"
            onChange={(e) => setNewAdminEmail(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Super Admin
          </Button>
        </DialogActions>
      </Dialog> */}

      <GordonDialogBox
        open={open}
        title="Add Site Admin"
        buttonName="Add"
        buttonClicked={handleSubmit}
        cancelButtonClicked={() => setOpen(false)}
      >
        <TextField
          autoFocus
          margin="dense"
          label="Email"
          type="email"
          variant="filled"
          onChange={(e) => setNewAdminEmail(e.target.value)}
          fullWidth
        />
      </GordonDialogBox>
    </Card>
  );
};

export default SuperAdmin;
