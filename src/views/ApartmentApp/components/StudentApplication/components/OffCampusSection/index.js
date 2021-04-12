import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, CardHeader, CardContent, List } from '@material-ui/core';
import OffCampusListItem from './components/OffCampusListItem';
import goStalk from '../../../../../../services/goStalk';

// Create a list of selection boxes to choosing which applicants are doing off campus programs.
const OffCampusSection = ({ disabled, authentication, applicants, onOffCampusInputChange }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      // Get the departments that the applicants may be completing off campus programs for
      let unfilteredDepartments = await goStalk.getDepartments();
      //Remove spaces from strings
      let availableDepartments = unfilteredDepartments.map((department) => department.trim());
      setDepartments(availableDepartments);
    };

    if (authentication) {
      loadDepartments();
    }
  }, [authentication]);

  /**
   * Callback for changes to off-campus program info
   * @param {String} offCampusListItemValue The program that the applicant is doing an OC program for
   * @param {Number} index The index of the applicant in the list
   */
  const handleInputChange = (offCampusListItemValue, index) => {
    onOffCampusInputChange(offCampusListItemValue, index);
  };

  return (
    <Card>
      <CardHeader title="Off-Campus Work Study" className="apartment-card-header" />
      <CardContent>
        <Grid container justify="space-between" spacing={2}>
          <Grid item xs={12}>
            <List
              className="off-campus-list"
              aria-label="apartment applicants off campus programs"
              disablePadding
            >
              {applicants?.length > 0 &&
                applicants.map((applicant, index) => (
                  <OffCampusListItem
                    key={applicant.Profile.AD_Username}
                    disabled={disabled}
                    index={index}
                    applicantProfile={applicant.Profile}
                    offCampusProgram={applicant.OffCampusProgram}
                    departments={departments}
                    onOffCampusInputChange={handleInputChange}
                  />
                ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

OffCampusSection.propTypes = {
  disabled: PropTypes.bool,
  authentication: PropTypes.any,
  applicants: PropTypes.array.isRequired,
  onOffCampusInputChange: PropTypes.func,
};

export default OffCampusSection;
