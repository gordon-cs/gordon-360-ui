import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (username, field) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [group, setGroup] = useState('');
  const [groupList, setGroupList] = useState([]);
  let viewer = '';

  const handlePrivacy = async (event) => {
    try {
      await userService.setUserPrivacy({ Field: field, VisibilityGroup: event.target.value });
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
  };

  useEffect(() => {
    userService.getVisibilityGroups().then(setGroupList);
  }, []);

  useEffect(() => {
    userService.getPrivacySetting(username).then(setGroup);
  }, [group]);

  if (group.length != 0) {
    for (let i = 0; i < group.length; i++) {
      console.log(group[0].Field);
      if (group[i].Field === field) {
        viewer = group[i].VisibilityGroup;
      }
    }
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <SearchField
          name="privacy"
          value={viewer}
          updateValue={handlePrivacy}
          options={groupList}
          select
          size={120}
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
