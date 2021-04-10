import React, { useState, useEffect, useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { Grid, Card, CardHeader, CardContent, Button, Typography } from '@material-ui/core/';
import GetAppIcon from '@material-ui/icons/GetApp';
import RefreshIcon from '@material-ui/icons/Refresh';
import { DateTime } from 'luxon';
import GordonLoader from '../../../../components/Loader';
import housing from '../../../../services/housing';
import ApplicationsTable from './components/ApplicationTable';

/**
 * @typedef { import('../../../../services/housing').ApplicationDetails } ApplicationDetails
 * @typedef { import('../../../../services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('../../../../services/housing').ApartmentChoice } ApartmentChoice
 */

/**
 * Renders the page for the apartment application housing staff menu
 * @param {Object} props The React component props
 * @param {*} props.authentication The user authentication
 * @param {StudentProfileInfo} props.userProfile The student profile info of the current user
 * @returns {JSX.Element} JSX Element for the staff menu web page
 */
const StaffMenu = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);

  /** @type {[ApplicationDetails[], React.Dispatch<React.SetStateAction<ApplicationDetails[]>>]} ApplicationDetails */
  const [applications, setApplications] = useState([]);

  /** @type {[ApplicationDetails[], React.Dispatch<React.SetStateAction<ApplicationDetails[]>>]} Array of application details, after being formatted for use with react-csv */
  const [applicationJsonArray, setApplicationJsonArray] = useState([]);

  /** @type {[ApartmentApplicant[], React.Dispatch<React.SetStateAction<ApartmentApplicant[]>>]} Array of applicant info, after being formatted for use with react-csv */
  const [applicantJsonArray, setApplicantJsonArray] = useState([]);

  /** @type {[ApartmentChoice[], React.Dispatch<React.SetStateAction<ApartmentChoice[]>>]} Array of apartment choice info, after being formatted for use with react-csv */
  const [apartmentChoiceJsonArray, setApartmentChoiceJsonArray] = useState([]);

  const [dateStr, setDateStr] = useState('');
  const filePrefix = 'apartapp';

  /**
   * Attempt to load all existing applications for the current semester
   */
  const loadAllCurrentApplications = useCallback(async () => {
    setLoading(true);
    let applicationDetailsArray = await housing.getAllApartmentApplications();
    setApplications(applicationDetailsArray ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllCurrentApplications();

    // Generate string of today's date in ISO format for use in CSV filename
    setDateStr(DateTime.now().toISODate());
  }, [userProfile, loadAllCurrentApplications]);

  useEffect(() => {
    setApplicationJsonArray(
      applications
        ?.filter((applicationDetails) => applicationDetails?.DateSubmitted) // Only add the applications that have been submitted
        ?.map(({ Applicants, ApartmentChoices, ...applicationDetails }) => {
          const applicationID = applicationDetails.ApplicationID;

          setApplicantJsonArray((prevApplicantsJsonArray) => [
            ...prevApplicantsJsonArray,
            ...Applicants.map(({ Profile, StudentID, ...applicant }) => ({
              ApplicationID: applicant.ApplicationID ?? applicationID,
              ...applicant,
            })),
          ]);

          setApartmentChoiceJsonArray((prevApartmentChoiceJsonArray) => [
            ...prevApartmentChoiceJsonArray,
            ...ApartmentChoices.map((apartmentChoice) => ({
              ApplicationID: apartmentChoice.ApplicationID ?? applicationID,
              ...apartmentChoice,
            })),
          ]);

          return applicationDetails;
        }) ?? [],
    );
  }, [applications]);

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
                    disabled={applicationJsonArray?.length < 1} // This check works correctly for both Number and null
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
                    disabled={applicantJsonArray?.length < 1}
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
                    disabled={apartmentChoiceJsonArray?.length < 1}
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
        <Grid item xs={12} sm={9} md={6} lg={3}>
          <Card>
            <CardContent>
              <Grid container direction="row" spacing={2} padded>
                <Grid item xs={12}>
                  <Button
                    variant="filled"
                    color="primary"
                    startIcon={<RefreshIcon />}
                    onClick={loadAllCurrentApplications}
                  >
                    Refresh Application Data
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
