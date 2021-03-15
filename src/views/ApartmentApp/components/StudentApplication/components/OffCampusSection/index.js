import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ProgramListItem from './components/ProgramListItem';
import goStalk from '../../../../../../services/goStalk';

// Create a list of selection boxes to choosing which applicants are doing off campus programs.
const OffCampusSection = ({
  offCampusApplicantList,
  availableApplicants,
  onOffCampusChanged,
  onOffCampusApplicantAdd,
  onOffCampusApplicantRemove
}) => {
  const [availableMajors, setAvailableMajors] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      let unfilteredDepartments;
      try {
        // Get the majors that the applicants may be completing off campus programs for
        unfilteredDepartments = await goStalk.getMajors();
      }
      catch {
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
      onOffCampusApplicantRemove(index);
    }
  };

  const handleAddDropdown = () => {
    onOffCampusApplicantAdd();
  };

  return (
    <Card>
      <CardHeader title="Off Campus Program Applicants" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className="off-Campus-list" aria-label="apartment applicants off campus programs" disablePadding>
              {offCampusApplicantList ? (
                offCampusApplicantList.map((memberInfo, index) => (
                  <ProgramListItem
                    key={memberInfo.applicantMember + memberInfo.memberDepartment}
                    index={index}
                    offCampusApplicantList={offCampusApplicantList}
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
                  offCampusApplicantList={offCampusApplicantList}
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
              Add an applicant who is completing an off campus program
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OffCampusSection;
