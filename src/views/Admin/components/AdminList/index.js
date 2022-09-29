import { useEffect, useState } from 'react';
import AdminListItem from './components/AdminListItem';
import GordonLoader from 'components/Loader';
import admin from 'services/admin';
import { gordonColors } from 'theme';
import membership from 'services/membership';

import { Card, Button, TextField, CardHeader, List } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';

const AdminList = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      EMAIL: email,
      USER_NAME: email.split('@')[0],
      SUPER_ADMIN: true, //Used to be distinction between superadmin (godmode), admin, and groupadmin
      //now just superadmin and groupadmin
    };
    // TODO: Add snackbar feedback, especially for errors like 404
    await admin.addAdmin(data);
    setIsDialogOpen(false);
    setAdmins(await admin.getAdmins());
  };

  const handleRemove = async (adminID) => {
    setAdmins((prevAdmins) => prevAdmins.filter((a) => a.ADMIN_ID !== adminID));
  };

  const buttonStyle = {
    margin: '0.5rem',
  };
  const headerStyle = {
    backgroundColor: gordonColors.primary.blue,
    color: '#FFF',
  };

  return (
    <Card>
      <CardHeader title="Site Admins" style={headerStyle} align="center" />
      {loading ? (
        <GordonLoader />
      ) : (
        <List>
          {admins.map((superadmin) => (
            <AdminListItem key={superadmin.ADMIN_ID} Admin={superadmin} onRemove={handleRemove} />
          ))}
        </List>
      )}
      <Button
        variant="contained"
        color="primary"
        style={buttonStyle}
        onClick={() => setIsDialogOpen(true)}
      >
        Add Site Admin
      </Button>

      <GordonDialogBox
        open={isDialogOpen}
        title="Add Site Admin"
        buttonName="Add"
        buttonClicked={handleSubmit}
        cancelButtonClicked={() => setIsDialogOpen(false)}
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

export default AdminList;
