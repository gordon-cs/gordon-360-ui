import React, { useState, useEffect } from 'react';
import {
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core';

const OffCampusListItem = ({
  disabled,
  index,
  applicantProfile,
  offCampusProgram,
  departments,
  onOffCampusInputChange,
}) => {
  const [hasNickName, setHasNickname] = useState(false);
  const [isSelectionValid, setIsSelectionValid] = useState(false);

  useEffect(
    () =>
      setHasNickname(
        applicantProfile.FirstName !== applicantProfile.NickName &&
          applicantProfile.NickName !== '',
      ),
    [applicantProfile],
  );

  useEffect(
    () =>
      setIsSelectionValid(
        offCampusProgram === '' ||
          departments.some((departmentName) => departmentName === offCampusProgram),
      ),
    [offCampusProgram, departments],
  );

  const handleDepartmentInputChange = (event) => {
    if (event.target.value !== null) {
      let newApplicantDepartmentValue = event.target.value;
      onOffCampusInputChange(newApplicantDepartmentValue, index);
    }
  };

  const departmentOptions = departments.map((departmentName) => (
    <MenuItem value={departmentName} key={departmentName}>
      {departmentName}
    </MenuItem>
  ));

  const displayName = hasNickName
    ? `${applicantProfile.FirstName} ${applicantProfile.LastName} (${applicantProfile.NickName})`
    : `${applicantProfile.FirstName} ${applicantProfile.LastName}`;

  return (
    <React.Fragment>
      <ListItem key={applicantProfile.AD_Username} className={'list-item'}>
        <Grid container alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm={4}>
            <ListItemText
              primary={displayName ?? applicantProfile.AD_Username}
              className={'list-item'}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth error={!isSelectionValid}>
              <InputLabel>Department</InputLabel>
              <Select
                disabled={disabled}
                value={isSelectionValid ? offCampusProgram : ''}
                onChange={handleDepartmentInputChange}
                input={<Input id={'department' + index} />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {departmentOptions}
              </Select>
              {!isSelectionValid && (
                <FormHelperText>
                  An error occurred while loading the application data
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default OffCampusListItem;
