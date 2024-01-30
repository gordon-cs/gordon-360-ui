import { FormControl, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = (username, field) => {
  const [privacySettingList, setPrivacySettingList] = useState();
  const [groupList, setGroupList] = useState();
  const [visibleTo, setVisibleTo] = useState('Private'); // default private while loading

  const handlePrivacy = async (event) => {
    try {
      await userService.setUserPrivacy({ Field: field, VisibilityGroup: event.target.value });
    } catch {}
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
    </Grid>
  );
};

export default UpdateUserPrivacy;
