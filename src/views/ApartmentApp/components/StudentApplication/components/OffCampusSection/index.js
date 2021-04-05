import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';
import ProgramListItem from './components/ProgramListItem';
import goStalk from '../../../../../../services/goStalk';

// Create a list of selection boxes to choosing which applicants are doing off campus programs.
const OffCampusSection = ({
  disabled,
  applicants,
  onOffCampusChanged,
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

  return (
    <Card>
      <CardHeader title="Off-Campus Work Study" className="apartment-card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item>
            <List
              className="off-campus-list"
              aria-label="apartment applicants off campus programs"
              disablePadding
            >
              {applicants.map((memberInfo, index) => (
                  <ProgramListItem
                    key={memberInfo.applicantMember + memberInfo.memberDepartment}
                    disabled={disabled}
                    index={index}
                    applicantProgram={memberInfo.offCampusProgram}
                    applicant={memberInfo.Profile}
                    availableMajors={availableMajors}
                    onOffCampusChanged={handleInputChange}
                  />
                ))
              }
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OffCampusSection;
