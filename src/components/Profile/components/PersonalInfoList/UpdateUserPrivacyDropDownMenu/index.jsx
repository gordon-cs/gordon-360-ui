import { FormControl, Grid } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (username, field) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [privacySettingList, setPrivacySettingList] = useState();
  const [groupList, setGroupList] = useState();
  const [visibleTo, setVisibleTo] = useState('Private'); // default private while loading

  const handlePrivacy = async (event) => {
    try {
      await userService.setUserPrivacy({ Field: field, VisibilityGroup: event.target.value });
      setSnackbar({
        message: 'Your privacy setting will update within a couple hours.',
        severity: 'success',
        open: true,
      });
    } catch {
      setSnackbar({
        message: 'Privacy setting failed to update. Please contact CTS.',
        severity: 'error',
        open: true,
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      userService.getVisibilityGroups().then(setGroupList);
      userService.getPrivacySetting(username).then(setPrivacySettingList);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (privacySettingList) {
      setVisibleTo(privacySettingList.find((f) => f.Field === field[0])?.VisibilityGroup);
    }
  }, [privacySettingList]);

  return (
    <Grid>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <SearchField
          name="visibility"
          value={visibleTo}
          updateValue={(e) => {
            setVisibleTo(e.target.value);
            handlePrivacy(e);
          }}
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
    </Grid>
  );
};

export default UpdateUserPrivacy;
