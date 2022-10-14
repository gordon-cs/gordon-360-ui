import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import admin from 'services/admin';
import { gordonColors } from 'theme';
import AdminListItem from './components/AdminListItem';

import { Button, Card, CardHeader, List, TextField } from '@material-ui/core';
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
    let email;
    let username;
    if (!newAdminEmail.toLowerCase().includes('@gordon.edu')) {
      email = newAdminEmail + '@gordon.edu';
      username = newAdminEmail;
    } else {
      email = newAdminEmail;
      username = newAdminEmail.replace('@gordon.edu', '');
    }

    let data = {
      Email: email,
      Username: username,
      IsSuperAdmin: true,
    };
    // TODO: Add snackbar feedback, especially for errors like 404
    await admin.addAdmin(data);
    setIsDialogOpen(false);
    setAdmins(await admin.getAdmins());
  };

  const handleRemove = async (Username) => {
    setAdmins((prevAdmins) => prevAdmins.filter((a) => a.Username !== Username));
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
            <AdminListItem key={superadmin.Username} Admin={superadmin} onRemove={handleRemove} />
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
