import React, { useState, useEffect, useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { Grid, Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import { DateTime } from 'luxon';
import GordonLoader from '../../../../components/Loader';
import housing from '../../../../services/housing';
import ApplicationsTable from './components/ApplicationTable';
import '../../apartmentApp.css';

/**
 * @typedef { import('../../../../services/housing').ApplicationDetails } ApplicationDetails
 * @typedef { import('../../../../services/housing').FullApplicantInfo } FullApplicantInfo
 * @typedef { import('../../../../services/housing').ApartmentChoice } ApartmentChoice
 */

const StaffMenu = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);

  /**
   * @type {[ApplicationDetails[], React.Dispatch<React.SetStateAction<ApplicationDetails[]>>]} ApplicationDetails
   */
  const [applications, setApplications] = useState([]);

  /**
   * @type {[ApplicationDetails[], React.Dispatch<React.SetStateAction<ApplicationDetails[]>>]} Array of application details, formatted for use with react-csv
   */
  const [applicationJsonArray, setApplicationJsonArray] = useState([]);

  /**
   * @type {[FullApplicantInfo[], React.Dispatch<React.SetStateAction<FullApplicantInfo[]>>]} Array of applicant info, formatted for use with react-csv
   */
  const [applicantJsonArray, setApplicantJsonArray] = useState([]);

  /**
   * @type {[ApartmentChoice[], React.Dispatch<React.SetStateAction<ApartmentChoice[]>>]} Array of apartment choice info, formatted for use with react-csv
   */
  const [apartmentChoiceJsonArray, setApartmentChoiceJsonArray] = useState([]);

  const [dateStr, setDateStr] = useState('');
  const filePrefix = 'apartapp';

  /**
   * Attempt to load an all existing application for the current semester
   */
  const loadAllCurrentApplications = useCallback(async () => {
    setLoading(true);
    let applicationDetailsArray = await housing.getAllApartmentApplications();
    if (applicationDetailsArray) {
      setApplications(applicationDetailsArray);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllCurrentApplications();

    // Generate string of today's date in ISO format for use in CSV filename
    let date = new Date();
    let dateStr = DateTime.fromJSDate(date).toISODate();
    setDateStr(dateStr);
  }, [userProfile, loadAllCurrentApplications]);

  /**
   * Generate arrays of objects to be converted to a CSV
   * @param {ApplicationDetails[]} applicationDetailsArray an array of ApplicationDetails objects
   */
  const generateCSVData = useCallback((applicationDetailsArray) => {
    let applicationsForCsv = [];
    let applicantsForCsv = [];
    let apartmentChoicesForCsv = [];
    applicationDetailsArray.forEach((applicationDetails) => {
      // Only add the applications that have been submitted
      if (applicationDetails.DateSubmitted) {
        let { Applicants, ApartmentChoices, ...filteredApplicationDetails } = applicationDetails;
        applicationsForCsv.push(filteredApplicationDetails);

        Applicants.forEach((applicant) => {
          let filteredApplicantInfo = applicant;
          filteredApplicantInfo.ApplicationID = applicationDetails.ApplicationID;
          applicantsForCsv.push(filteredApplicantInfo);
        });

        ApartmentChoices.forEach((apartmentChoice) => {
          let filteredApartmentChoice = apartmentChoice;
          filteredApartmentChoice.ApplicationID = applicationDetails.ApplicationID;
          apartmentChoicesForCsv.push(filteredApartmentChoice);
        });
      }
    });
    setApplicationJsonArray(applicationsForCsv);
    setApplicantJsonArray(applicantsForCsv);
    setApartmentChoiceJsonArray(apartmentChoicesForCsv);
  }, []);

  useEffect(() => {
    generateCSVData(applications);
  }, [applications, generateCSVData]);

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={10}>
          <Card>
            <CardHeader title="Download Apartment Applications" className="apartment-card-header" />
            <CardContent>
              <Grid container direction="row" spacing={2} padded>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Use the buttons below to download a spreadsheet of the submitted applications
                    for the current semester
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center" alignItems="center" spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GetAppIcon />}
                    disabled={!authentication}
                    component={CSVLink}
                    data={applicationJsonArray}
                    filename={`${filePrefix}-summary-${dateStr}.csv`}
                    target="_blank"
                  >
                    Download Application Group Summary
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GetAppIcon />}
                    disabled={!authentication}
                    component={CSVLink}
                    data={applicantJsonArray}
                    filename={`${filePrefix}-applicants-${dateStr}.csv`}
                    target="_blank"
                  >
                    Download Applicant Information
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GetAppIcon />}
                    disabled={!authentication}
                    component={CSVLink}
                    data={apartmentChoiceJsonArray}
                    filename={`${filePrefix}-halls-${dateStr}.csv`}
                    target="_blank"
                  >
                    Download Apartment Hall Choices
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={10}>
          <ApplicationsTable applications={applications} />
        </Grid>
      </Grid>
    );
  }
};

export default StaffMenu;
