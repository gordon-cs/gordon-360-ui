import { AlertColor, FormControl, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import userService from 'services/user';
import SearchField from 'views/PeopleSearch/components/SearchFieldList/components/SearchField';

type Props = {
  username: string;
  fieldList: string[];
  excludedVisibilityList: Set<string> | null;
  createSnackbar: (message: string, severity: AlertColor, link?: string, linkText?: string) => void;
};

const UpdateUserPrivacy = ({
  username,
  fieldList,
  excludedVisibilityList,
  createSnackbar,
}: Props) => {
  const [groupList, setGroupList] = useState<string[]>([]);
  const [visibleTo, setVisibleTo] = useState<string>('Private'); // default private while loading

  const handlePrivacy = async (
    event: React.ChangeEvent<HTMLInputElement>,
    originalValue: string,
  ) => {
    try {
      await userService.setUserPrivacy({ Field: fieldList, VisibilityGroup: event.target.value });
    } catch {
      createSnackbar('Failed to update privacy setting', 'error');
      setVisibleTo(originalValue);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      let visibilityGroups = await userService.getVisibilityGroups();
      // remove any visibility settings in the excludedVisibilityList
      if (excludedVisibilityList !== null) {
        visibilityGroups = visibilityGroups.filter(
          (visibilityGroup) => !excludedVisibilityList.has(visibilityGroup),
        );
      }
      setGroupList(visibilityGroups);

      const privacySettings = await userService.getPrivacySetting(username);
      const fieldPrivacySetting = privacySettings?.find((f) => fieldList.includes(f.Field));
      if (fieldPrivacySetting !== undefined) {
        setVisibleTo(fieldPrivacySetting.VisibilityGroup);
      }
    };
    loadData();
  }, [excludedVisibilityList, fieldList, username]);

  return (
    groupList?.length > 0 && (
      <Grid>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <SearchField
            name="visibility"
            value={visibleTo}
            updateValue={(e) => {
              setVisibleTo(e.target.value);
              handlePrivacy(e, visibleTo);
            }}
            options={groupList}
            defaultDisabled={true} // don't display name in drop-down
            select
          />
        </FormControl>
      </Grid>
    )
  );
};

export default UpdateUserPrivacy;
