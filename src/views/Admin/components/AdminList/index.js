import GordonLoader from 'components/Loader';
import { useEffect, useState } from 'react';
import admin from 'services/admin';
import { gordonColors } from 'theme';
import AdminListItem from './components/AdminListItem';

import { Card, Button, TextField, CardHeader, List } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';

const AdminList = () => {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState('');

  useEffect(() => {
    const loadAdmins = async () => {
      setAdmins(await admin.getAdmins());
      setLoading(false);
    };

    loadAdmins();
  }, []);

  const handleSubmit = async () => {
    const [email, username] = newAdmin.toLowerCase().includes('@gordon.edu')
      ? [newAdmin, newAdmin.replace('@gordon.edu', '')]
      : [newAdmin + '@gordon.edu', newAdmin];

    let data = {
      Email: email,
      Username: username,
      IsSuperAdmin: true,
    };
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
          size="small"
          label="Email"
          type="email"
          variant="filled"
          onChange={(e) => setNewAdmin(e.target.value)}
          fullWidth
        />
      </GordonDialogBox>
    </Card>
  );
};

export default AdminList;
