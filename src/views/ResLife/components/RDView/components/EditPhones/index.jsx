import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography, ListItem, ListItemText } from '@mui/material';
import GordonDialogBox from 'components/GordonDialogBox';
import SimpleSnackbar from 'components/Snackbar';
import { getPhoneNumberByName, setPhoneNumberByName } from 'services/residentLife/RD_OnCall';

const PhoneNumberEditor = () => {
  const [open, setOpen] = useState(false);
  const [rdPhone, setRdPhone] = useState('');
  const [stuLifePhone, setStuLifePhone] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: null });

  const createSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const rd = await getPhoneNumberByName('rd');
        const stulife = await getPhoneNumberByName('stulife');
        setRdPhone(typeof rd === 'string' ? rd : rd?.phoneNumber || '');
        setStuLifePhone(typeof stulife === 'string' ? stulife : stulife?.phoneNumber || '');
      } catch (err) {
        console.error('Failed to load phone numbers:', err);
        createSnackbar('Failed to load phone numbers', 'error');
      }
    };

    if (open) loadData();
  }, [open]);

  const handleSave = async () => {
    try {
      await setPhoneNumberByName('rd', rdPhone);
      await setPhoneNumberByName('stulife', stuLifePhone);
      setOpen(false);
      createSnackbar('Phone numbers updated successfully!', 'success');
    } catch (err) {
      console.error('Error saving phone numbers:', err);
      createSnackbar('Failed to update numbers', 'error');
    }
  };

  return (
    <>
      <ListItem
        onClick={() => setOpen(true)}
        className="gc360_text_link"
        style={{ textDecoration: 'none' }}
      >
        <ListItemText primary="Edit RD / Student Life Numbers" />
      </ListItem>

      <GordonDialogBox
        open={open}
        onClose={() => setOpen(false)}
        title={'Edit Contact Numbers'}
        buttonName="Save"
        buttonClicked={handleSave}
        cancelButtonName="Cancel"
        cancelButtonClicked={() => setOpen(false)}
      >
        <Grid container spacing={2} paddingTop={1}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Student Life Phone Number</Typography>
            <TextField
              fullWidth
              value={stuLifePhone}
              onChange={(e) => setStuLifePhone(e.target.value)}
              placeholder="e.g., 978-867-4263"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">RD Phone Number</Typography>
            <TextField
              fullWidth
              value={rdPhone}
              onChange={(e) => setRdPhone(e.target.value)}
              placeholder="e.g., 978-867-4444"
            />
          </Grid>
        </Grid>
      </GordonDialogBox>

      <SimpleSnackbar
        open={snackbar.open}
        text={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </>
  );
};

export default PhoneNumberEditor;
