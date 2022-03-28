import { Card, CardContent, CardHeader, Grid, List } from '@material-ui/core';
import { useEffect, useState } from 'react';
import goStalk from 'services/goStalk';
// @TODO CSSMODULES - outside directory
import styles from '../../../../ApartmentApp.module.css';
import OffCampusListItem from './components/OffCampusListItem';

/**
 * @typedef { import('services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * Renders the list of selection boxes to choosing which applicants are doing off campus programs.
 *
 * @param {Object} props The React component props
 * @param {boolean} props.disabled boolean to disable the interactive elements of this list item
 * @param {ApartmentApplicant[]} props.applicants Array of applicant info
 * @param {Function} props.onOffCampusInputChange Callback for dropdown menu change
 * @returns {JSX.Element} JSX Element for the off-campus program list
 */
const OffCampusList = ({ disabled, applicants, onOffCampusInputChange }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      // Get the departments that the applicants may be completing off campus programs for
      let unfilteredDepartments = await goStalk.getDepartments();
      //Remove spaces from strings
      let availableDepartments = unfilteredDepartments.map((department) => department.trim());
      setDepartments(availableDepartments);
    };

    loadDepartments();
  }, []);

  return (
    <Card>
      <CardHeader title="Off-Campus Program Credit" className={styles.apartment_card_header} />
      <CardContent>
        <Grid container justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <List
              className={styles.off_campus_list}
              aria-label="apartment applicants off campus programs"
              disablePadding
            >
              {applicants?.length > 0 &&
                applicants.map((applicant, index) => (
                  <OffCampusListItem
                    key={applicant.Profile.AD_Username}
                    disabled={disabled}
                    index={index}
                    profile={applicant.Profile}
                    offCampusProgram={applicant.OffCampusProgram}
                    departments={departments}
                    onOffCampusInputChange={onOffCampusInputChange}
                  />
                ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OffCampusList;
