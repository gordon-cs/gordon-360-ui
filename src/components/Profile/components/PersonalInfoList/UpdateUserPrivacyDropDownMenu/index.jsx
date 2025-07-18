import { FormControl, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

const UpdateUserPrivacy = ({ username, fieldList, excludedVisibilityList }) => {
  const [privacySettingList, setPrivacySettingList] = useState();
  const [groupList, setGroupList] = useState([]);
  const [visibleTo, setVisibleTo] = useState('Private'); // default private while loading

  const handlePrivacy = async (event) => {
    try {
      await userService.setUserPrivacy({ Field: fieldList, VisibilityGroup: event.target.value });
    } catch {}
  };

  useEffect(() => {
    const loadData = async () => {
      let visibilityGroupList = await userService.getVisibilityGroups();
      // remove any visibility settings in the excludedVisibilityList
      for (const x of excludedVisibilityList) {
        const index = visibilityGroupList.indexOf(x);
        if (index >= 0) {
          visibilityGroupList.splice(index, 1);
        }
      }
      setGroupList(visibilityGroupList);
      userService.getPrivacySetting(username).then(setPrivacySettingList);
    };
    loadData();
  }, [username]);

  useEffect(() => {
    if (privacySettingList) {
      setVisibleTo(privacySettingList.find((f) => fieldList.includes(f.Field))?.VisibilityGroup);
    }
  }, [privacySettingList]);

  console.log('******************* fieldList', fieldList);
  console.log('******************* visibleTo', visibleTo);
  console.log('******************* groupList', groupList);

  return (
    groupList.length > 0 && (
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
            defaultDisabled={true} // don't display name in drop-down
            select
            size={120}
          />
        </FormControl>
      </Grid>
    )
  );
};

export default UpdateUserPrivacy;
