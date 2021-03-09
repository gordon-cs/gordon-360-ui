//Student apartment application page
import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core/';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import GordonLoader from '../../../../components/Loader';
import GordonDialogBox from '../../../../components/GordonDialogBox';
import SimpleSnackbar from '../../../../components/Snackbar';
import ApplicantList from './components/ApplicantList';
import HallSelection from './components/HallSelection';
import housing from '../../../../services/housing';
import user from '../../../../services/user';
const MAX_NUM_APPLICANTS = 8;

const InstructionsCard = () => {
  const [apartmentSelectionDate, setApartmentSelectionDate] = useState();
  const [thisYear, setThisYear] = useState();

  useEffect(() => {
    const getYear = () => setThisYear(new Date().getFullYear());

    getYear();

    // let selectionDate = housing.getApartmentSelectionDate();
    let selectionDate = 'Apr. 23'; // API endpoint for this is planned for the future
    setApartmentSelectionDate(selectionDate);
  }, []);

  const rows = [
    { description: 'Current Freshman', points: 1 },
    { description: 'Current Sophomore', points: 2 },
    { description: 'Current Junior', points: 3 },
    { description: 'Current Senior', points: 4 },
    { description: '23+ years old', points: 1 },
    { description: 'Full-time, off-campus program credit', points: 1 },
    { description: 'Academic probation', points: -1 },
    { description: 'Possible academic suspension', points: -2 },
    { description: `${thisYear - 1}-${thisYear} Disciplinary Probation`, points: -3 },
  ];

  return (
    <Card>
      <CardHeader
        title="On-Campus Apartments"
        subheader="Information and Guidelines"
        className="apartment-card-header"
      />
      <CardContent>
        <Typography variant="body1" paragraph>
          Apartments provide an alternative to the traditional residence hall setting and offer a
          unique community experience. To be eligible to live in an apartment, students must be at
          least 20 years old as of Sept. 1, {thisYear} <strong>or</strong> a current junior or
          senior. Students who were on disciplinary probation at any time during the {thisYear - 1}-
          {thisYear} academic year must also receive approval from the Dean of Student Care to be
          eligible to apply for an apartment. Each applicant must be registered as a full-time
          student by apartment selection night ({apartmentSelectionDate}).
        </Typography>
        <Typography variant="body1" paragraph>
          Each group of students desiring to live in a Tavilla or Bromley apartment or in The
          Village must submit an application. Your application can include a student who is studying
          aproad or not enrolled for the Spring {thisYear} semester &ndash; simply list their name
          on the application.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Full-time, off-campus program credit:</strong> Students fulfilling academic
          program requirements through student teaching or a full-time internship will qualify for
          the full-time, off-campus program credit. It is the responsibility of applicants to claim
          this credit on the application.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Applications must be for a full apartment:</strong> If applying for a six-person
          apartment, there must be six people on the application who will be here for the{' '}
          <strong class="over-emphasized">fall semester</strong> (four people on a four-person
          application, etc.). Applications with an incorrect number of applicants will not be
          considered.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>An application is not a guarantee!</strong>
          <br />
          Due to the large number of applications typically recieved for apartments, not all
          applications will be awarded an apartment. If you do not receive an apartment, you will
          need to secure housing through the housing lottery.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>How are apartments awarded?</strong>
          <br />
          Apartments are awarded in order of point total for each type fo apartment (4-person,
          6-person, etc.). Each individual on an application will have points given/taken away using
          the following scale:
        </Typography>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} lg={9}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.description}>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Typography variant="body1" paragraph>
          <strong>If You Are Approved...</strong>
          <br />
          You will be notified of your placement in an apartment/Village{' '}
          <strong>
            <emphasis>building</emphasis>
          </strong>{' '}
          no later than {apartmentSelectionDate}. Further information about specific apartment/room
          selection will be communicated in that email.
        </Typography>
      </CardContent>
    </Card>
  );
};

const ApplicationDataTable = ({ dateSubmitted, dateModified, editorUsername }) => {
  function createData(label, value) {
    return { label, value };
  }

  let rows = [];

  if (dateSubmitted) {
    rows.push(createData('Last Submitted: ', dateSubmitted));
  } else {
    rows.push(createData('Last Submitted: ', 'Not yet submitted'));
  }

  if (dateModified) {
    rows.push(createData('Last Modified: ', dateModified));
  }

  if (editorUsername) {
    rows.push(createData('Application Editor: ', editorUsername));
  }

  return (
    <Card>
      <CardHeader title="Your Application Details" className="apartment-card-header" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.label}>
                  <TableCell component="th" scope="row">
                    {row.label}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

const SaveButton = ({ disabled, saving, onClick }) => {
  const loaderSize = 20;

  if (saving) {
    if (saving === 'success') {
      return <CheckCircleIcon className="success" />;
    } else if (saving === 'failed') {
      return <ErrorIcon className="error" />;
    } else {
      return <GordonLoader size={loaderSize} />;
    }
  } else {
    return (
      <Button
        disabled={disabled || saving}
        variant="contained"
        color="primary"
        fullWidth
        onClick={onClick}
      >
        Save & Continue
      </Button>
    );
  }
};

const StudentApplication = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [applicationID, setApplicationID] = useState(-1); // Default value of -1 indicate to backend that the application ID number is not yet known
  const [dateSubmitted, setDateSubmitted] = useState(null); // The date the application was submitted, or null if not yet submitted
  const [dateModified, setDateModified] = useState(null); // The date the application was submitted, or null if not yet submitted
  const [editorUsername, setEditorUsername] = useState(null); // The username of the application editor
  const [applicants, setApplicants] = useState([]);
  const [preferredHalls, setPreferredHalls] = useState([]);

  const [applicationCardsOpen, setApplicationCardsOpen] = useState(false);
  const [newEditorProfile, setNewEditorProfile] = useState(null); // Stores the StudentProfileInfo of the new editor before the user confirms the change
  const [changeEditorDialogOpen, setChangeEditorDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false); // Use this for submitting app (later feature)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [saveButtonAlertTimeout, setSaveButtonAlertTimeout] = useState(null);

  /**
   * Attempt to load an existing application from the database if one exists
   */
  const loadSavedApplication = useCallback(async () => {
    // TODO: Implement this once save/load of application data has been implemented in the backend
    setLoading(true);
    // Check if the current user is on an application. Returns the application ID number if found
    let newApplicationID = -1; // await housing.getApplicationID();
    if (newApplicationID !== null && newApplicationID !== -1) {
      setApplicationID(newApplicationID);
      let applicationDetails = await housing.getApartmentApplication(newApplicationID);
      if (applicationDetails) {
        if (applicationDetails.DateSubmitted) {
          setDateSubmitted(applicationDetails.DateSubmitted);
        }
        if (applicationDetails.DateModified) {
          setDateModified(applicationDetails.DateModified);
        }
        if (applicationDetails.Username) {
          setEditorUsername(applicationDetails.Username);
        }
        if (applicationDetails.Applicants) {
          setApplicants(applicationDetails.Applicants);
        }
      }
    } else {
      // No existing application was found in the database
      setApplicationID(-1);
      if (!editorUsername) {
        setEditorUsername(userProfile.AD_Username);
      }
      if (
        applicants.every((applicant) => applicant.Profile.AD_Username !== userProfile.AD_Username)
      ) {
        setApplicants((prevApplicants) =>
          prevApplicants.concat({ Profile: userProfile, OffCampusProgram: '' }),
        );
      }
    }
    setLoading(false);
  }, [userProfile, editorUsername, applicants]);

  useEffect(() => {
    loadSavedApplication();
  }, [userProfile, loadSavedApplication]);

  useEffect(() => {
    //! DEBUG
    console.log('Array state variables changed. Printing contents:');
    applicants.forEach((element) => {
      console.log(element.Profile.AD_Username);
    });
    preferredHalls.forEach((element) => {
      console.log(element.HallName + ', ' + element.HallRank);
    });
  }, [applicants, preferredHalls]);

  const handleShowApplication = () => {
    setApplicationCardsOpen(true);
  };

  /**
   * Callback for apartment people search submission
   * @param {String} searchSelection Username for student
   */
  const handleSearchSubmit = (searchSelection) => {
    if (searchSelection) {
      // The method is separated from callback because user API service must be handled inside an async method
      addApplicant(searchSelection);
    }
  };

  /**
   * Add an applicant to the list, identified by username
   * @param {String} username Username for student
   */
  const addApplicant = async (username) => {
    try {
      // Get the profile of the selected user
      let newApplicantProfile = await user.getProfileInfo(username);
      let newApplicantObject = { Profile: newApplicantProfile, OffCampusProgram: '' };
      if (applicants.length >= MAX_NUM_APPLICANTS) {
        // Display an error if the user try to add an applicant when the list is full
        setSnackbarText('You cannot add more than ' + MAX_NUM_APPLICANTS + ' applicants');
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      } else if (!String(newApplicantProfile.PersonType).includes('stu')) {
        // Display an error if the selected user is not a student
        setSnackbarText(
          'Could not add ' +
            String(newApplicantProfile.fullName) +
            ' because they are not a student.',
        );
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      } else if (newApplicantProfile.Gender && newApplicantProfile.Gender !== userProfile.Gender) {
        // Display an error if the selected user is not the same gender
        setSnackbarText(
          'Could not add ' +
            String(newApplicantProfile.fullName) +
            ' because they are not the same gender as the other applicants.',
        );
        setSnackbarSeverity('warning');
        setSnackbarOpen(true);
      } else if (applicants.some((applicant) => applicant.Profile.AD_Username === username)) {
        // Display an error if the selected user is already in the list
        setSnackbarText(String(newApplicantProfile.fullName) + ' is already in the list.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      } else {
        // Add the profile object to the list of applicants
        setApplicants((prevApplicants) => prevApplicants.concat(newApplicantObject));
        if (applicants.some((applicant) => applicant.Profile.AD_Username === username)) {
          setSnackbarText(
            String(newApplicantProfile.fullName) + ' was successfully added to the list.',
          );
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        }
      }
    } catch (error) {
      setSnackbarText('Something went wrong while trying to add this person. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  const handleChangeEditor = (profile) => {
    if (profile) {
      if (applicants.some((applicant) => applicant.Profile.AD_Username === profile.AD_Username)) {
        setNewEditorProfile(profile);
        setChangeEditorDialogOpen(true);
      }
    }
  };

  const handleChangeEditorAccepted = () => {
    if (newEditorProfile && newEditorProfile.AD_Username) {
      // The method is separated from callback because the housing API service must be handled inside an async method
      changeApplicationEditor(applicationID, newEditorProfile.AD_Username);
      handleCloseOkay();
    } else {
      setSnackbarText('Something went wrong while trying to save the new application editor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
  };

  /**
   * Update the application editor of the application to the database
   * @param {Number} applicationID the application ID number
   * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
   */
  const changeApplicationEditor = async (applicationID, newEditorUsername) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      result = await housing.changeApplicationEditor(applicationID, newEditorUsername);
    } catch {
      result = false;
    }
    if (result) {
      console.log(result); //! DEBUG
      setEditorUsername(newEditorProfile.AD_Username);
      setSaving('success');
    } else {
      setSnackbarText('Something went wrong while trying to save the new application editor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
    if (saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      setSaveButtonAlertTimeout(
        setTimeout(() => {
          setSaveButtonAlertTimeout(null);
          setSaving(false);
        }, 6000),
      );
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  const handleApplicantRemove = (profileToRemove) => {
    if (profileToRemove) {
      setApplicants((prevApplicants) =>
        prevApplicants.filter(
          (applicant) => applicant.Profile.AD_Username !== profileToRemove.AD_Username,
        ),
      );
    }
  };

  /**
   * Callback for changes to hall list item name and/or rank
   * @param {Number} hallRankValue The rank value that the user assigned to this hall
   * @param {String} hallNameValue The name of the hall that was selected
   * @param {Number} index The index of the hall in the list
   */
  const handleHallInputChange = (hallRankValue, hallNameValue, index) => {
    if (index !== null && index >= 0) {
      // Get the custom hallInfo object at the given index
      let newHallInfo = preferredHalls[index];

      // Error checking on the hallRankValue before modifying the newHallInfo object
      if (hallRankValue !== null) {
        newHallInfo.HallRank = Number(hallRankValue);
      }

      // Error checking on the hallNameValue before modifying the newHallInfo object
      if (
        hallNameValue !== null &&
        hallNameValue !== preferredHalls[index].HallName &&
        preferredHalls.some((hallInfo) => hallInfo.HallName === hallNameValue)
      ) {
        // Display an error if the selected hall is already in the list
        setSnackbarText(String(hallNameValue) + ' is already in the list.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);
      } else if (hallNameValue !== null) {
        newHallInfo.HallName = hallNameValue;
      }

      // replace the element at index with the new hall info object
      setPreferredHalls((prevPreferredHalls) => prevPreferredHalls.splice(index, 1, newHallInfo));

      let newPreferredHalls = preferredHalls; // make a separate copy of the array

      // Sort halls by name
      newPreferredHalls.sort(function(a, b) {
        var nameA = a.HallName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.HallName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      // Sort halls by rank
      newPreferredHalls.sort(function(a, b) {
        return a.HallRank - b.HallRank;
      });

      setPreferredHalls(newPreferredHalls);
    } else {
      setSnackbarText('Something went wrong while trying to add this hall. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for hall list remove button
   * @param {Number} index The index of the hall to be removed from the list of perferred halls
   */
  const handleHallRemove = (index) => {
    if (index !== null && index !== -1) {
      let newPreferredHalls = preferredHalls; // make a separate copy of the array
      // Remove the selected hall if the list has more than one element
      newPreferredHalls.splice(index, 1);

      if (preferredHalls.length > 0) {
        // If any rank value is greater than the new maximum, then set it to that new max rank
        let maxRank = newPreferredHalls.length;
        newPreferredHalls.forEach((hallInfo, index) => {
          if (hallInfo.HallRank > maxRank) {
            newPreferredHalls[index].HallRank = maxRank;
          }
        });
      }
      setPreferredHalls(newPreferredHalls);
    }
  };

  /**
   * Callback for hall list add button
   */
  const handleHallAdd = () => {
    let newHallRank = preferredHalls.length + 1;
    setPreferredHalls((prevPreferredHalls) =>
      prevPreferredHalls.concat({ HallRank: newHallRank, HallName: '' }),
    );
  };

  /**
   * Callback for apartment application save button
   */
  const handleSaveButtonClick = () => {
    let debugMessage = 'DEBUG: Save button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    // The method is separated from callback because the housing API service must be handled inside an async method
    saveApplication(applicationID, editorUsername, applicants);
  };

  /**
   * Save the current state of the application to the database
   * @param {Number} applicationID the application ID number if it is known, else it is -1
   * @param {String} editorUsername the student username of the person filling out the application
   * @param {StudentProfileInfo[]} applicants Array of StudentProfileInfo objects
   */
  const saveApplication = async (applicationID, editorUsername, applicants) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      result = await housing.saveApartmentApplication(applicationID, editorUsername, applicants);
    } catch {
      result = false;
    }
    if (result !== null && result !== false) {
      console.log('result of saving: ' + result); //! DEBUG
      setApplicationID(result);
      setSaving('success');
    } else {
      setSnackbarText('Something went wrong while trying to save the application.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      setSaving('failed');
    }
    if (saveButtonAlertTimeout === null) {
      // Shows the success icon for 6 seconds and then returns back to normal button
      setSaveButtonAlertTimeout(
        setTimeout(() => {
          setSaveButtonAlertTimeout(null);
          setSaving(false);
        }, 6000),
      );
    }
  };

  /**
   * Callback for apartment application submit button
   */
  const handleSubmitButtonClick = () => {
    let debugMessage = 'DEBUG: Submit button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    setSubmitDialogOpen(true);
  };

  const handleSubmitAppAccepted = () => {
    // The method is separated from callback because the housing API service must be handled inside an async method
    submitApplication();
    handleCloseOkay();
  };

  const submitApplication = async () => {
    //! Placeholder
    setApplicationCardsOpen(false);
  };

  const handleCloseOkay = () => {
    setChangeEditorDialogOpen(false);
    setSubmitDialogOpen(false);
  };

  const handleCloseDialog = (event, reason) => {
    // Prevent the dialog box from closing if the user clicks outside the dialog box
    if (reason === 'clickaway') {
      return;
    }
    handleCloseOkay();
  };

  const handleCloseSnackbar = (event, reason) => {
    // Prevent the snackbar from closing if the user clicks outside the snackbar
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const changeEditorAlertText = (
    <span>
      If you change the application editor, you will no longer be able to edit this application
      yourself.
      <br />
      Are you sure you want to change the application editor?
    </span>
  );

  const submitAlertText = (
    <span>
      This feature is not yet implemented.
      <br />
      Clicking the "Accept" button will hide the application cards.
    </span>
  );

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <div className="apartment-application">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} lg={10}>
            <Card>
              <CardContent>
                <Grid container direction="row" justify="flex-end" spacing={2}>
                  <Grid item xs={6} sm={8}>
                    {applicationID === -1 ? (
                      <Typography variant="body1">
                        Placeholder Text
                        <br />
                        No existing applications found
                      </Typography>
                    ) : userProfile.AD_Username === editorUsername ? (
                      <Typography variant="body1">
                        Existing application for this semester:
                      </Typography>
                    ) : (
                      <Typography variant="body1">
                        Only the application editor may edit the application.
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    {applicationID === -1 ? (
                      <Button
                        variant="contained"
                        onClick={handleShowApplication}
                        color="primary"
                        fullWidth
                        disabled={applicationCardsOpen}
                      >
                        Create a new application
                      </Button>
                    ) : userProfile.AD_Username === editorUsername ? (
                      <Button
                        variant="contained"
                        onClick={handleShowApplication}
                        color="primary"
                        fullWidth
                        disabled={applicationCardsOpen}
                      >
                        Edit your application
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleShowApplication}
                        color="primary"
                        fullWidth
                        disabled={applicationCardsOpen}
                      >
                        View your application
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
              {applicationID === -1 ? (
                <Grid container direction="row" justify="center" spacing={2}>
                  <Grid item xs={12} md={8}>
                    <InstructionsCard />
                  </Grid>
                </Grid>
              ) : (
                <Grid container direction="row" justify="center" spacing={2}>
                  <Grid item xs={12} md={6} lg={4}>
                    <ApplicationDataTable
                      dateSubmitted={dateSubmitted}
                      dateModified={dateModified}
                      editorUsername={editorUsername}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <InstructionsCard />
                  </Grid>
                </Grid>
              )}
            </Collapse>
          </Grid>
          <Grid item>
            <Collapse in={applicationCardsOpen} timeout="auto" unmountOnExit>
              <Grid container direction="row-reverse" justify="center" spacing={2}>
                <Grid item xs={12} md={4}>
                  <InstructionsCard />
                </Grid>
                <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                  <Grid item>
                    <ApplicantList
                      maxNumApplicants={MAX_NUM_APPLICANTS}
                      userProfile={userProfile}
                      editorUsername={editorUsername}
                      applicants={applicants}
                      saving={saving}
                      onSearchSubmit={handleSearchSubmit}
                      onChangeEditor={handleChangeEditor}
                      onApplicantRemove={handleApplicantRemove}
                      onSaveButtonClick={handleSaveButtonClick}
                      authentication={authentication}
                    />
                    <GordonDialogBox
                      open={changeEditorDialogOpen}
                      onClose={handleCloseDialog}
                      labelledby={'applicant-warning-dialog'}
                      describedby={'changing-application-editor'}
                      title={'Change application editor?'}
                      text={changeEditorAlertText}
                      confirmButtonClicked={handleChangeEditorAccepted}
                      confirmButtonName={'Accept'}
                      cancelButtonClicked={handleCloseOkay}
                      cancelButtonName={'Cancel'}
                      severity={'warning'}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" spacing={2}>
                <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                  <Grid item>
                    <HallSelection
                      authentication
                      editorUsername={editorUsername}
                      preferredHalls={preferredHalls}
                      saving={saving}
                      onHallAdd={handleHallAdd}
                      onHallInputChange={handleHallInputChange}
                      onHallRemove={handleHallRemove}
                      onSaveButtonClick={handleSaveButtonClick}
                    />
                  </Grid>
                  <Grid item>
                    <Card>
                      <CardHeader title="Off-Campus Work Study" className="apartment-card-header" />
                      <CardContent>
                        <Typography variant="body1">Placeholder text</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader title="Agreements" className="apartment-card-header" />
                    <CardContent>
                      <Typography variant="body1">Placeholder text</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} lg={10} className={'save-bar'}>
                  <Card className={'save-bar-card'} variant="outlined">
                    <CardContent>
                      {userProfile.AD_Username === editorUsername ? (
                        <Grid container direction="row" justify="flex-end" spacing={2}>
                          <Grid item xs={12} sm={6}>
                            {saving === 'failed' ? (
                              <Typography variant="overline" color="error">
                                Something went wrong while trying to save the application
                              </Typography>
                            ) : (
                              <Typography variant="body1">Placeholder Text</Typography>
                            )}
                          </Grid>
                          <Grid item xs={6} sm={3} lg={2}>
                            <SaveButton saving={saving} onClick={handleSaveButtonClick} />
                          </Grid>
                          <Grid item xs={6} sm={3} lg={2}>
                            <Button
                              variant="contained"
                              onClick={handleSubmitButtonClick}
                              color="primary"
                              fullWidth
                              disabled={!applicationCardsOpen}
                            >
                              Save & Submit
                            </Button>
                          </Grid>
                          <GordonDialogBox
                            open={submitDialogOpen}
                            onClose={handleCloseDialog}
                            labelledby={'submit-application-dialog'}
                            describedby={'confirm-application'}
                            title={'Submit apartment application?'}
                            text={submitAlertText}
                            buttonClicked={handleSubmitAppAccepted}
                            buttonName={'Accept'}
                            cancelButtonClicked={handleCloseOkay}
                            cancelButtonName={'Cancel'}
                            severity={'warning'}
                          />
                        </Grid>
                      ) : (
                        <Grid container direction="row" justify="flex-end" spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                              Placeholder Text for when the user is NOT the primary applicant
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sm={3} lg={2}>
                            <SaveButton disabled />
                          </Grid>
                          <Grid item xs={6} sm={3} lg={2}>
                            <Button variant="contained" color="primary" fullWidth disabled>
                              Save & Submit
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <SimpleSnackbar
          text={snackbarText}
          severity={snackbarSeverity}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
        />
      </div>
    );
  }
};

export default StudentApplication;
