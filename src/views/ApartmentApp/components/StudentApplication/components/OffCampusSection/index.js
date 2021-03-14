import React, { useState, useEffect } from 'react';
import { Grid, Card, CardHeader, CardContent, List, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HallListItem from './components/HallListItem';
import goStalk from '../../../../../../services/goStalk';

// Create a list of selection boxes to choosing preferred halls
const OffCampusSection = ({
  offCampusApplicantList,
  availableApplicants,
  onOffCampusApplicantAdd,
  onOffCampusApplicantRemove
}) => {
  const [availableMajors, setAvailableMajors] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      let unfilteredDepartments;
      try {
        // Get the halls available for apartments, filtered by the gender of the application editor
        unfilteredDepartments = await goStalk.getMajors();
      }
      catch {
        // Get the halls available for apartments, filtered by the gender of the application editor
        unfilteredDepartments = await goStalk.getMajors();
      }
      //Remove spaces from strings
      setAvailableMajors(unfilteredDepartments.map((major) => major.trim()));
    };

    loadDepartments();
  });

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
      <CardHeader title="Preferred Halls" className="card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List className="hall-list" aria-label="apartment preferred halls" disablePadding>
              {offCampusApplicantList ? (
                offCampusApplicantList.map((memberInfo, index) => (
                  <ProgramListItem
                    key={memberInfo.applicantMember + memberInfo.memberDepartment}
                    index={index}
                    offCampusApplicantList={offCampusApplicantList}
                    availableApplicants={availableApplicants}
                    availableMajors={availableMajors}
                    onOffCampusApplicantRemove={handleRemove}
                  />
                ))
              ) : (
                <ProgramListItem
                  key={''}
                  index={0}
                  offCampusApplicantList={offCampusApplicantList}
                  availableApplicants={availableApplicants}
                  availableMajors={availableMajors}
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
