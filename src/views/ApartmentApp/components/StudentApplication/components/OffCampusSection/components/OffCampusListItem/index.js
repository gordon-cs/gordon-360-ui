import React, { useState, useEffect } from 'react';
import {
  Divider,
  FormControl,
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
  const [applicantDepartmentValue, setDepartmentValue] = useState(''); // Department drop-down menu value

  useEffect(() => {
    setDepartmentValue(offCampusProgram ?? '');
  }, [offCampusProgram]);

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

  return (
    <React.Fragment>
      <ListItem key={applicantProfile.AD_Username} className={'list-item'}>
        <Grid container alignItems="flex-end" spacing={1}>
          <Grid item xs={12} sm={4}>
            <ListItemText primary={applicantProfile.fullName} className={'list-item'} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                disabled={disabled}
                value={offCampusProgram}
                onChange={handleDepartmentInputChange}
                input={<Input id={'department' + index} />}
              >
                {departmentOptions}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default OffCampusListItem;
