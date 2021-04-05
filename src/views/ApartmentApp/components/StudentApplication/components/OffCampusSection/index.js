import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProgramListItem from './components/ProgramListItem';
import goStalk from '../../../../../../services/goStalk';

// Create a list of selection boxes to choosing which applicants are doing off campus programs.
const OffCampusSection = ({
  availableApplicants,
  onOffCampusChanged,
  onOffCampusAdd,
  onOffCampusRemove,
}) => {
  const [availableMajors, setAvailableMajors] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      let unfilteredDepartments;
      try {
        // Get the majors that the applicants may be completing off campus programs for
        unfilteredDepartments = await goStalk.getMajors();
      } catch {
        // Get the majors that the applicants may be completing off campus programs for
        unfilteredDepartments = await goStalk.getMajors();
      }
      //Remove spaces from strings
      setAvailableMajors(unfilteredDepartments.map((major) => major.trim()));
    };

    loadDepartments();
  });

  const handleInputChange = (ApplicantNameValue, ApplicantMajorValue, index) => {
    onOffCampusChanged(ApplicantNameValue, ApplicantMajorValue, index);
  };

  const handleRemove = (index) => {
    // Make sure the chosen index was not null
    if (index !== null) {
      // Send the selected index to the parent component
      onOffCampusRemove(index);
    }
  };

  const handleAddDropdown = () => {
    onOffCampusAdd();
  };

  return (
    <Card>
      <CardHeader title="Off-Campus Work Study" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List
              className="off-Campus-list"
              aria-label="apartment applicants off campus programs"
              disablePadding
            >
              {availableApplicants ? (
                availableApplicants.map((memberInfo, index) => (
                  <ProgramListItem
                    key={memberInfo.applicantMember + memberInfo.memberDepartment}
                    index={index}
                    availableMajors={availableMajors}
                    availableApplicants={availableApplicants}
                    onOffCampusChanged={handleInputChange}
                    onOffCampusApplicantRemove={handleRemove}
                  />
                ))
              ) : (
                <ProgramListItem
                  key={''}
                  index={0}
                  availableMajors={availableMajors}
                  availableApplicants={availableApplicants}
                  onOffCampusChanged={handleInputChange}
                  onOffCampusApplicantRemove={handleRemove}
                />
              )}
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon fontSize="inherit" />}
              onClick={handleAddDropdown}
            >
              Add an off campus program applicant
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OffCampusSection;
