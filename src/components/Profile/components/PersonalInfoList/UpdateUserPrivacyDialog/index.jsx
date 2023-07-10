import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (field) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  // const [group, setGroup] = useState('');
  const [groups, setGroups] = useState([]);

  // const handleSubmit = async () => {
  //   debugger;
  //   try {
  //     await userService.setUserPrivacy({ Field: field, VisibilityGroup: group });
  //     setSnackbar({
  //       message: 'Your office location will update within a couple hours.',
  //       severity: 'success',
  //       open: true,
  //     });
  //   } catch {
  //     setSnackbar({
  //       message: 'Office location failed to update. Please contact CTS.',
  //       severity: 'error',
  //       open: true,
  //     });
  //   }
  // };

  const handlePrivacy = async (event) => {
    // setGroup(event.target.value);
    // handleSubmit();
    debugger;
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
    userService.getVisibilityGroups().then(setGroups);
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <SearchField
          name="privacy"
          // value={group}
          updateValue={handlePrivacy}
          options={groups}
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
