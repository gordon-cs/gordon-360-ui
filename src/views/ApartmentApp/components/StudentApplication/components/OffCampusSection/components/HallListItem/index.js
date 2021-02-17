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
  programMembers,
  availableMajors,
  onMemberInputChange,
  onMemberRemove,
}) => {
  const [applicantMemberValue, setMemberValue] = useState(1); // Rank drop-down menu value
  const [memberDepartmentValue, setDepartmentValue] = useState(''); // Hall drop-down menu value

  useEffect(() => {
    // Manually perform deep checking of the array to force update whenever an element of preferredHalls is changed
    if (isEqual(previousInputs.current, [index, programMembers])) {
      return;
    }
    // Get the hall info for this list item from the component's props
    const getMembersFromProps = () => {
      setMemberValue(programMembers[index].applicantMember);
      setDepartmentValue(programMembers[index].memberDepartment);
    };

    getMembersFromProps();
  });

  const previousInputs = useRef();
  useEffect(() => {
    previousInputs.current = [index, programMembers];
  });

  const handleMemberInputChange = (event) => {
    if (event.target.value !== null) {
      let newMemberValue = event.target.value;
      onMemberInputChange(applicantMemberValue, newMemberValue, index);
    }
  };

  const handleDepartmentInputChange = (event) => {
    if (event.target.value !== null) {
      let newMemberDepartmentValue = event.target.value;
      onMemberInputChange(memberDepartmentValue, newMemberDepartmentValue, index);
    }
  };

  const handleRemove = () => {
    if (index !== null) {
      // Send this list item's index to the parent component
      onMemberRemove(index);
    }
  };

  const memberOptions = programMembers.map((memberName) => (
    <MenuItem value={memberName} key={memberName}>
      {memberName}
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
                value={applicantMemberValue}
                onChange={handleMemberInputChange}
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
                value={memberDepartmentValue}
                onChange={handleDepartmentInputChange}
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
