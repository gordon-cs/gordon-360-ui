import React, { useState, useEffect } from 'react';
import {
  Grid,
  Divider,
  ListItem,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  Typography,
} from '@material-ui/core';

const ProgramListItem = ({
  disabled,
  index,
  applicant,
  offCampusProgram,
  departments,
  onOffCampusInputChange,
}) => {
  const [applicantDepartmentValue, setDepartmentValue] = useState(''); // Major drop-down menu value

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
      <ListItem key={index} className={'list-item'}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={3} sm={2}>
            <Typography>{applicant.fullName}</Typography>
          </Grid>
          <Grid item xs={9} sm={10}>
            <FormControl fullWidth>
              <InputLabel>department</InputLabel>
              <Select
                disabled={disabled}
                onChange={handleDepartmentInputChange}
                value={applicantDepartmentValue}
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

export default ProgramListItem;
