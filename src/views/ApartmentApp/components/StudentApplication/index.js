//Student apartment application page
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
  Typography,
} from '@material-ui/core/';
import GordonLoader from '../../../../components/Loader';
import GordonDialogBox from '../../../../components/GordonDialogBox';
import SimpleSnackbar from '../../../../components/Snackbar';
import ApartmentHeader from './components/ApartmentHeader';
import InstructionsCard from './components/InstructionsCard';
import ApplicationDataTable from './components/ApplicationDataTable';
import ApplicantList from './components/ApplicantList';
import HallSelection from './components/HallSelection';
import Agreements from './components/Agreements';
import SaveButton from './components/SaveButton';
import housing from '../../../../services/housing';
import user from '../../../../services/user';
const MAX_NUM_APPLICANTS = 8;

/**
 * @typedef { import('../../../../services/user').StudentProfileInfo } StudentProfileInfo
 * @typedef { import('../../../../services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('../../../../services/housing').ApartmentChoice } ApartmentChoice
 * @typedef { import('../../../../services/housing').ApplicationDetails } ApplicationDetails
 */

/**
 * Renders the page for the student apartment application
 * @param {Object} props The React component props
 * @param {*} props.authentication The user authentication
 * @param {StudentProfileInfo} props.userProfile The student profile info of the current user
 * @returns {JSX.Element} JSX Element for the student application web page
 */
const StudentApplication = ({ userProfile, authentication }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  /** @type {[ApplicationDetails, React.Dispatch<React.SetStateAction<ApplicationDetails>>]} */
  const [applicationDetails, setApplicationDetails] = useState({
    ApplicationID: null,
    DateSubmitted: null,
    DateModified: null,
    EditorUsername: null,
    EditorEmail: null,
    Applicants: [],
    ApartmentChoices: [],
  });
  /** @type {[Number, React.Dispatch<React.SetStateAction<Number>>]} */
  const [applicationID, setApplicationID] = useState(null); // Default value of -1 indicate to backend that the application ID number is not yet known
  const [dateSubmitted, setDateSubmitted] = useState(null); // The date the application was submitted, or null if not yet submitted
  const [dateModified, setDateModified] = useState(null); // The date the application was last modified, or null if not yet saved/modified
  const [editorUsername, setEditorUsername] = useState(null); // The username of the application editor
  /** @type {[ApartmentApplicant[], React.Dispatch<React.SetStateAction<ApartmentApplicant[]>>]} Array of applicant info */
  const [applicants, setApplicants] = useState([]);
  /** @type {[ApartmentChoice[], React.Dispatch<React.SetStateAction<ApartmentChoice[]>>]} Array of apartment choice info */
  const [preferredHalls, setPreferredHalls] = useState([]); // Properties 'HallName' and 'HallRank' must be capitalized to match the backend

  const [agreements, setAgreements] = useState(false); // Represents the state of the agreements card. True if all checkboxes checked, false otherwise

  const [applicationCardsOpen, setApplicationCardsOpen] = useState(false);
  const [newEditorProfile, setNewEditorProfile] = useState(null); // Stores the StudentProfileInfo of the new editor before the user confirms the change
  const [changeEditorDialogOpen, setChangeEditorDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false); // Use this for submitting app (later feature)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [saveButtonAlertTimeout, setSaveButtonAlertTimeout] = useState(null);

  /**
   * Loads the user's saved apartment application, if one exists
   */
  useEffect(() => {
    let isSubscribed = true;

    const handleError = (_error) => {
      // No existing application was found in the database,
      // or an error occurred while attempting to load the application
      setApplicationID(null);
      setEditorUsername((prevEditorUsername) => prevEditorUsername ?? userProfile.AD_Username);
      setApplicants((prevApplicants) =>
        prevApplicants.length ? prevApplicants : [{ Profile: userProfile, OffCampusProgram: '' }],
      );
      setUnsavedChanges(true);
    };

    if (!applicationID || !applicationDetails) {
      setLoading(true);
      // Check if the current user is on an application. Returns the application ID number if found
      housing
        .getCurrentApplicationID()
        .then((newApplicationID) => {
          console.log('Retrieved Application ID: ' + newApplicationID); //! DEBUG
          if (newApplicationID === null || newApplicationID === -1) {
            // Intentionally trigger the 'catch'
            throw new Error("Invalid value of 'newApplicationID' = " + newApplicationID);
          } else if (isSubscribed) {
            setApplicationID(newApplicationID);
            housing
              .getApartmentApplication(newApplicationID)
              .then((newApplicationDetails) => {
                if (isSubscribed && newApplicationDetails) {
                  setApplicationDetails(newApplicationDetails);
                  setDateSubmitted(newApplicationDetails.DateSubmitted ?? null);
                  setDateModified(newApplicationDetails.DateModified ?? null);
                  setEditorUsername(newApplicationDetails.EditorUsername ?? null);
                  if (newApplicationDetails.Applicants) {
                    newApplicationDetails.Applicants.forEach(async (newApplicantInfo) => {
                      if (newApplicantInfo.Profile !== null) {
                        setApplicants((prevApplicants) => [...prevApplicants, newApplicantInfo]);
                      } else {
                        const newApplicantProfile = await user.getProfileInfo(
                          newApplicantInfo.Username,
                        );
                        setApplicants((prevApplicants) => [
                          ...prevApplicants,
                          {
                            Profile: newApplicantProfile,
                            ...newApplicantInfo,
                          },
                        ]);
                      }
                    });
                  }
                  setPreferredHalls(newApplicationDetails?.ApartmentChoices ?? []);
                  setUnsavedChanges(false);
                }
              })
              .catch((error) => {
                handleError(error);
              });
          }
        })
        .catch((error) => {
          handleError(error);
        });
      setLoading(false);
    }

    return () => (isSubscribed = false);
  }, [userProfile, applicationDetails, applicationID, editorUsername, applicants]);

  useEffect(() => {
    // setUnsavedChanges(true);
    //! DEBUG
    console.log('Array state variables changed. Printing contents:');
    console.log('Applicants:');
    applicants.forEach((element) => {
      console.log(element.Profile.AD_Username + ', ' + element.OffCampusProgram);
    });
    console.log('Preferred Halls:');
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
   * @param {String} username Username for the new applicant
   */
  const addApplicant = async (username) => {
    try {
      // Get the profile of the selected user
      const newApplicantProfile = await user.getProfileInfo(username);
      let newApplicantObject = { Profile: newApplicantProfile, OffCampusProgram: '' };

      // Check if the selected user is already saved on an application in the database
      let existingAppID = null;
      try {
        existingAppID = await housing.getCurrentApplicationID(username);
      } catch {
        existingAppID = false;
      }

      if (applicants.length >= MAX_NUM_APPLICANTS) {
        // Display an error if the user try to add an applicant when the list is full
        setSnackbarText('You cannot add more than ' + MAX_NUM_APPLICANTS + ' applicants');
        setSnackbarSeverity('warning');
      } else if (!String(newApplicantProfile.PersonType).includes('stu')) {
        // Display an error if the selected user is not a student
        setSnackbarText(
          'Could not add ' +
            String(newApplicantProfile.fullName) +
            ' because they are not a student.',
        );
        setSnackbarSeverity('warning');
      } else if (newApplicantProfile.Gender && newApplicantProfile.Gender !== userProfile.Gender) {
        // Display an error if the selected user is not the same gender
        setSnackbarText(
          'Could not add ' +
            String(newApplicantProfile.fullName) +
            ' because they are not the same gender as the other applicants.',
        );
        setSnackbarSeverity('warning');
      } else if (applicants.some((applicant) => applicant.Profile.AD_Username === username)) {
        // Display an error if the selected user is already in the list
        setSnackbarText(String(newApplicantProfile.fullName) + ' is already in the list.');
        setSnackbarSeverity('info');
      } else if (existingAppID && existingAppID !== applicationID) {
        // Display an error if the selected user is already on a different application in the database
        setSnackbarText(
          String(newApplicantProfile.fullName) +
            ' is already on another application for this semester.',
        );
        setSnackbarSeverity('warning');
      } else {
        // Add the profile object to the list of applicants
        setApplicants((prevApplicants) => [...prevApplicants, newApplicantObject]);
        setUnsavedChanges(true);
        return;
      }
    } catch (error) {
      setSnackbarText('Something went wrong while trying to add this person. Please try again.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
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

  /**
   * Callback for applying the new application editor
   */
  const handleChangeEditorAccepted = () => {
    if (newEditorProfile?.AD_Username) {
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
      result = await housing.changeApartmentAppEditor(applicationID, newEditorUsername);
    } catch {
      result = false;
    }
    if (result) {
      console.log(result); //! DEBUG
      setEditorUsername(newEditorProfile.AD_Username);
      setSaving('success');
      setUnsavedChanges(true);
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
      setUnsavedChanges(true);
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
      let newHallInfo = {
        HallRank: Number(hallRankValue) ?? preferredHalls[index].HallRank,
        HallName: hallNameValue ?? preferredHalls[index].HallName,
      };

      // Error checking on the hallNameValue before modifying the newHallInfo object
      if (
        hallNameValue !== preferredHalls[index].HallName &&
        preferredHalls.some((hallInfo) => hallInfo.HallName === hallNameValue)
      ) {
        // Display an error if the selected hall is already in the list
        setSnackbarText(String(hallNameValue) + ' is already in the list.');
        setSnackbarSeverity('info');
        setSnackbarOpen(true);

        // Set the new hall info back to the name it was previously
        newHallInfo.HallName = preferredHalls[index].HallName;
      }

      setPreferredHalls((prevPreferredHalls) => {
        // replace the element at index with the new hall info object
        let newPreferredHalls = prevPreferredHalls.map((prevHallInfo, j) => {
          if (j === index) {
            return newHallInfo;
          } else {
            return prevHallInfo;
          }
        });

        if (newPreferredHalls.length > 1) {
          // Sort halls by name
          newPreferredHalls.sort(function (a, b) {
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
          newPreferredHalls.sort(function (a, b) {
            return a.HallRank - b.HallRank;
          });
        }

        return newPreferredHalls;
      });

      setUnsavedChanges(true);
    } else {
      setSnackbarText('Something went wrong while trying to add this hall. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for hall list remove button
   * @param {Number} index The index of the hall to be removed from the list of preferred halls
   */
  const handleHallRemove = (index) => {
    if (index !== null && index !== -1) {
      setPreferredHalls((prevPreferredHalls) => {
        let newPreferredHalls = prevPreferredHalls.filter((_hall, j) => j !== index);

        if (newPreferredHalls.length > 0) {
          // If any rank value is greater than the new maximum, then set it to that new max rank
          let maxRank = newPreferredHalls.length;
          newPreferredHalls.forEach((hallInfo, index) => {
            if (hallInfo.HallRank > maxRank) {
              newPreferredHalls[index].HallRank = maxRank;
            }
          });
        }

        return newPreferredHalls;
      });
      setUnsavedChanges(true);
    }
  };

  /**
   * Callback for hall list add button
   */
  const handleHallAdd = () => {
    const newHallInfo = { HallRank: preferredHalls.length + 1, HallName: '' };
    setPreferredHalls((prevPreferredHalls) => [...prevPreferredHalls, newHallInfo]);
  };

  /**
   * Callback for agreements card
   * @param {Boolean} newAgreementsState The new state of the agreements
   */
  const handleAgreementsStateChange = (newAgreementsState) => {
    setAgreements(newAgreementsState);
  };

  /**
   * Callback for apartment application save button
   */
  const handleSaveButtonClick = () => {
    let debugMessage = 'DEBUG: Save button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    // Filter out any hall entries that do not have a name selected
    const filteredPreferredHalls = preferredHalls.filter((hallInfo) => hallInfo.HallName !== '');
    // The method is separated from callback because the housing API service must be handled inside an async method
    saveApplication(applicationID, editorUsername, applicants, filteredPreferredHalls);
  };

  /**
   * Save the current state of the application to the database
   * @param {Number} applicationID the application ID number if it is known, else it is -1
   * @param {String} editorUsername the student username of the person filling out the application
   * @param {ApartmentApplicant[]} applicants Array of ApartmentApplicant objects
   * @param {ApartmentChoice[]} preferredHalls Array of ApartmentChoice objects
   */
  const saveApplication = async (applicationID, editorUsername, applicants, preferredHalls) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      result = await housing.saveApartmentApplication(
        applicationID,
        editorUsername,
        applicants,
        preferredHalls,
      );
    } catch {
      result = false;
    }
    console.log('result of saving: ' + result); //! DEBUG
    if (result !== null && result !== false && result !== -1 && typeof result === 'number') {
      setApplicationID(result);
      setSaving('success');
      setUnsavedChanges(false);
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

  /**
   * Callback for the alert dialog box "Okay" button
   */
  const handleCloseOkay = () => {
    setChangeEditorDialogOpen(false);
    setSubmitDialogOpen(false);
  };

  /**
   * Callback for closing the alert dialog box
   * @param {*} event close event to be handled by callback
   * @param {*} reason the reason the close event was triggered
   */
  const handleCloseDialog = (event, reason) => {
    // Prevent the dialog box from closing if the user clicks outside the dialog box
    if (reason === 'clickaway') {
      return;
    }
    handleCloseOkay();
  };

  /**
   * Callback for closing the snackbar
   * @param {*} event close event to be handled by callback
   * @param {*} reason the reason the close event was triggered
   */
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
            <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
              <ApartmentHeader
                applicationCardsOpen={applicationCardsOpen}
                applicationID={applicationID}
                editorUsername={editorUsername}
                userProfile={userProfile}
                onShowApplication={handleShowApplication}
              />
            </Collapse>
          </Grid>
          {applicationID && (
            <Grid item xs={12} md={6} lg={4}>
              <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
                <ApplicationDataTable
                  dateSubmitted={dateSubmitted}
                  dateModified={dateModified}
                  editorUsername={editorUsername}
                  editorEmail={applicationDetails?.EditorEmail}
                />
              </Collapse>
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
              <InstructionsCard />
            </Collapse>
          </Grid>
          <Grid item xs={12} lg={10}>
            <Collapse in={!applicationCardsOpen} timeout="auto" unmountOnExit>
              <ApartmentHeader
                applicationCardsOpen={applicationCardsOpen}
                applicationID={applicationID}
                editorUsername={editorUsername}
                userProfile={userProfile}
                onShowApplication={handleShowApplication}
              />
            </Collapse>
          </Grid>
          <Grid item>
            <Collapse in={applicationCardsOpen} timeout="auto" unmountOnExit>
              <Grid container direction="row" justify="center" spacing={2}>
                <Grid container item xs={12} md={8} lg={6} direction="column" spacing={2}>
                  <Grid item>
                    {userProfile.AD_Username === editorUsername ? (
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
                    ) : (
                      <ApplicantList
                        disabled
                        maxNumApplicants={MAX_NUM_APPLICANTS}
                        userProfile={userProfile}
                        editorUsername={editorUsername}
                        applicants={applicants}
                        saving={saving}
                      />
                    )}

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
                  <Grid item>
                    {userProfile.AD_Username === editorUsername ? (
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
                    ) : (
                      <HallSelection
                        disabled
                        authentication
                        editorUsername={editorUsername}
                        preferredHalls={preferredHalls}
                        saving={saving}
                      />
                    )}
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
                <Grid container item xs={12} md={4} direction="column" spacing={2}>
                  {userProfile.AD_Username === editorUsername && (
                    <Grid item>
                      <Agreements onChange={handleAgreementsStateChange} />
                    </Grid>
                  )}
                  <Grid item>
                    <Collapse in={applicationID} timeout="auto" unmountOnExit>
                      <ApplicationDataTable
                        dateSubmitted={dateSubmitted}
                        dateModified={dateModified}
                        editorUsername={editorUsername}
                        editorEmail={applicationDetails.EditorEmail}
                      />
                    </Collapse>
                  </Grid>
                  <Grid item>
                    <InstructionsCard />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" justify="center" spacing={2} className={'save-bar'}>
                <Grid item xs={12} lg={10} className={'save-bar'}>
                  <Card className={'save-bar-card'} variant="outlined">
                    <CardContent>
                      <Grid container direction="row" justify="flex-end" spacing={2}>
                        {userProfile.AD_Username === editorUsername ? (
                          <React.Fragment>
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
                              <SaveButton
                                saving={saving}
                                onClick={handleSaveButtonClick}
                                disabled={!unsavedChanges}
                              />
                            </Grid>
                            <Grid item xs={6} sm={3} lg={2}>
                              <Button
                                variant="contained"
                                onClick={handleSubmitButtonClick}
                                color="primary"
                                fullWidth
                                disabled={
                                  !applicationCardsOpen ||
                                  !agreements ||
                                  !(applicationDetails.Applicants.length > 0) ||
                                  !(applicationDetails.ApartmentChoices.length > 0)
                                }
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
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body1">
                                You are not the editor of this application, so you cannot edit or
                                save changes to this applications.
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
                          </React.Fragment>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
        <SimpleSnackbar
          text={snackbarText}
          severity={snackbarSeverity ?? 'info'}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
        />
      </div>
    );
  }
};

export default StudentApplication;
