import { FormControl, IconButton, Input, InputLabel } from '@mui/material';
import GordonSnackbar from 'components/Snackbar';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (username, field) => {
  const [snackbar, setSnackbar] = useState({ message: '', severity: null, open: false });
  const [privacySettingList, setPrivacySettingList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  let visibleTo = '';

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
    userService.getVisibilityGroups().then(setGroupList);
  }, []);

  useEffect(() => {
    userService.getPrivacySetting(username).then(setPrivacySettingList);
  }, [privacySettingList]);

  // let tempField = field;
  // if (field == 'HomeCity HomeState') {
  //   field = 'HomeCity';
  // } else if (field == 'Country HomeCountry') {
  //   field = 'Country';
  // }

  // get user's privacy setting (Public, Privacy, FacStaff) for this field
  for (let i = 0; i < privacySettingList.length; i++) {
    if (privacySettingList[i].Field === field[0]) {
      visibleTo = privacySettingList[i].VisibilityGroup;
    }
  }

  // field = tempField;

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <SearchField
          name="visibility"
          value={visibleTo}
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
