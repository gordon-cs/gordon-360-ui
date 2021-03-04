import React, { useState, useEffect, useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { Grid, Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core/';
import { DateTime } from 'luxon';
import GordonLoader from '../../../../components/Loader';
import housing from '../../../../services/housing';
import ApplicationsTable from './components/ApplicationTable';
import '../../apartmentApp.css';

const StaffMenu = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [filename, setFilename] = useState('apartment-applications.csv');

  /**
   * Attempt to load an all existing application for the current semester
   */
  const loadAllCurrentApplications = useCallback(async () => {
    // TODO: Implement this once save/load of application data has been implemented in the backend
    setLoading(true);
    let applicationDetailsArray = await housing.getAllApartmentApplications();
    if (applicationDetailsArray) {
      //? Some additional processing may be needed in the future, rather than just directly assigning the state variable.
      //? Details will not be known until the corresponding endpoint has been finalized for the backend
      setApplications(applicationDetailsArray);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllCurrentApplications();

    // Generate the CSV filename using today's date
    let date = new Date();
    let dateText = DateTime.fromJSDate(date).toISODate();
    setFilename('apartment-applications-' + dateText + '.csv');
  }, [userProfile, loadAllCurrentApplications]);

  /**
   * Generate arrays of objects to be converted to a CSV
   * @param {ApplicationDetails[]} applicationDetailsArray an array of ApplicationDetails objects
   * @return {Object[]} Array of literal objects that is compatible with react-csv
   */
  const generateCSVData = (applicationDetailsArray) => {
    let applicationData = [];
    let applicantData = [];
    let apartmentChoiceData = [];
    applicationDetailsArray.forEach((applicationDetails) => {
      let newApplicationData = {
        AprtAppID: applicationDetails.AprtAppID,
        DateSubmitted: applicationDetails.DateSubmitted,
        DateModified: applicationDetails.DateModified,
        EditorUsername: applicationDetails.Username,
        Gender: applicationDetails.Gender,
        Applicants: applicationDetails.Applicants.map((applicant) => applicant.Username),
        ApartmentChoices: applicationDetails.ApartmentChoices.map(
          (apartmentChoice) => String(apartmentChoice.HallRank) + '-' + apartmentChoice.HallName,
        ),
        TotalPoints: applicationDetails.TotalPoints,
        AvgPoints: applicationDetails.AvgPoints,
      };
      applicationData.push(newApplicationData);

      applicationDetails.Applicants.forEach((applicant) => {
        let newApplicantData = {
          AprtAppID: applicationDetails.AprtAppID,
          Username: applicant.Username,
          Age: applicant.Age,
          OffCampusProgram: applicant.OffCampusProgram,
          Probation: applicant.Probation,
          Points: applicant.Point,
        };
        applicantData.push(newApplicantData);
      });

      applicationDetails.ApartmentChoices.forEach((apartmentChoice) => {
        let newApplicantData = {
          AprtAppID: applicationDetails.AprtAppID,
          HallRank: apartmentChoice.HallRank,
          HallName: apartmentChoice.HallName,
        };
        apartmentChoiceData.push(newApplicantData);
      });
    });
    // The other data arrays will be used later, this is still a WIP
    return applicationData;
  };

  const handleDownloadCSV = () => {
    //! This feature is not yet implemented. This is a placeholder
    console.log('Good news: The button worked.');
    console.log('Bad news: This feature is not yet implemented.');
  };

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <Grid container justify="center" spacing={2}>
        <Grid item xs={12} lg={10}>
          <Card>
            <CardHeader title="I'll put a title here in a sec" className="apartment-card-header" />
            <CardContent>
              <Grid container direction="row" justify="flex-end" spacing={2}>
                <Grid item xs={6} sm={8}>
                  <Typography variant="body1">
                    Click the button to download a spreadsheet of the submitted applications for the
                    current semester
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Button
                    variant="contained"
                    onClick={handleDownloadCSV}
                    color="primary"
                    fullWidth
                    disabled={!authentication}
                    component={CSVLink}
                    data={generateCSVData(applications)}
                    filename={filename}
                    target="_blank"
                  >
                    Download
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
