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
  index,
  availableMajors,
  availableApplicants,
  onOffCampusChanged,
  onOffCampusApplicantRemove,
}) => {
  const [applicantMemberValue, setMemberValue] = useState(''); // Applicant drop-down menu value
  const [applicantDepartmentValue, setDepartmentValue] = useState(''); // Major drop-down menu value

  useEffect(() => {
    if (isEqual(previousInputs.current, [index, availableApplicants])) {
      return;
    }
    const getMembersFromProps = () => {
      setMemberValue(availableApplicants[index].name);
      setDepartmentValue(availableApplicants[index].major);
    };

    getMembersFromProps();
  });

  const previousInputs = useRef();
  useEffect(() => {
    previousInputs.current = [index, availableApplicants];
  });

  const handleApplicantInputChange = (event) => {
    if (event.target.value !== null) {
      let newApplicantMemberValue = event.target.value;
      onOffCampusChanged(newApplicantMemberValue, applicantDepartmentValue, index);
    }
  };

  const handleDepartmentInputChange = (event) => {
    if (event.target.value !== null) {
      let newApplicantDepartmentValue = event.target.value;
      onOffCampusChanged(applicantMemberValue, newApplicantDepartmentValue, index);
    }
  };

  const handleRemove = () => {
    if (index !== null) {
      // Send this list item's index to the parent component
      onOffCampusApplicantRemove(index);
    }
  };

  const memberOptions = availableApplicants.map((applicantName) => (
    <MenuItem value={applicantName} key={applicantName}>
      {applicantName}
    </MenuItem>
  ));

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
            <FormControl fullWidth>
              <InputLabel>Member</InputLabel>
              <Select
                onChange={handleApplicantInputChange}
                value={applicantMemberValue}
                input={<Input id={'member' + index} />}
              >
                {memberOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9} sm={10}>
            <FormControl fullWidth>
              <InputLabel>department</InputLabel>
              <Select
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
          <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
            <ClearIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default ProgramListItem;
