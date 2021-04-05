import React, { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import {
  Grid,
  Divider,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  FormControl,
  Input,
  InputLabel,
  Select,
  IconButton,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const ProgramListItem = ({
  disabled,
  index,
  availableMajors,
  applicantProgram,
  applicant,
  onOffCampusChanged,
}) => {
  const [applicantDepartmentValue, setDepartmentValue] = useState(''); // Major drop-down menu value

  useEffect(() => {
    setDepartmentValue(applicantProgram);
  });

  const handleDepartmentInputChange = (event) => {
    if (event.target.value !== null) {
      let newApplicantDepartmentValue = event.target.value;
      onOffCampusChanged(applicantMemberValue, newApplicantDepartmentValue, index);
    }
  };

  const departmentOptions = availableMajors.map((programName) => (
    <MenuItem value={programName} key={programName}>
      {programName}
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <ListItem key={index} className={'list-item'}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={3} sm={2}>
          <Typography>{applicant}</Typography>
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
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" disabled={disabled} onClick={handleRemove}>
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default ProgramListItem;
