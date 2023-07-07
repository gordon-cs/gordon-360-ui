import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (field) => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [group, setGroup] = useState('');
  const [VisibilityGroups, setVisibilityGroups] = useState([]);

  const handleSubmit = async () => {
    try {
      await userService.setUserPrivacy({ Field: field, VisibilityGroup: group });
      setSnackbar({
        message: 'Your office location will update within a couple hours.',
        severity: 'success',
        open: true,
      });
    } catch {
      setSnackbar({
        message: 'Office location failed to update. Please contact CTS.',
        severity: 'error',
        open: true,
      });
    }
    setOpen(false);
  };

  useEffect(() => {
    userService.getVisibilityGroups().then(setVisibilityGroups);
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <SearchField
          name="privacy"
          value={group}
          updateValue={(event) => setGroup(event.target.value)}
          options={VisibilityGroups}
          select
          size={200}
          onclick={handleSubmit}
        />
      </FormControl>
      <GordonSnackbar
        open={snackbar.open}
        severity={snackbar.severity}
        text={snackbar.message}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

export default UpdateUserPrivacy;
