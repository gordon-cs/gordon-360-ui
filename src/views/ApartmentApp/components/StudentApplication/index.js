//Student apartment application page
import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import { Collapse, Grid } from '@material-ui/core/';
import GordonLoader from '../../../../components/Loader';
import GordonDialogBox from '../../../../components/GordonDialogBox';
import GordonSnackbar from '../../../../components/Snackbar';
import InstructionsCard from './components/InstructionsCard';
import ApplicationDataTable from './components/ApplicationDataTable';
import ApplicantList from './components/ApplicantList';
import HallSelection from './components/HallSelection';
import OffCampusSection from './components/OffCampusSection';
import Agreements from './components/Agreements';
import BottomBar from './components/BottomBar';
import housing from '../../../../services/housing';
import user from '../../../../services/user';

const MAX_NUM_APPLICANTS = 8;
const BLANK_APPLICATION_DETAILS = {
  ApplicationID: null,
  DateSubmitted: null,
  DateModified: null,
  EditorProfile: null,
  Applicants: [],
  ApartmentChoices: [],
};

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 * @typedef { import('services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('services/housing').ApartmentChoice } ApartmentChoice
 * @typedef { import('services/housing').ApplicationDetails } ApplicationDetails
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
  const [canEditApplication, setCanEditApplication] = useState(false);
  const [agreements, setAgreements] = useState(false); // Represents the state of the agreements card. True if all checkboxes checked, false otherwise

  /** @type {[ApplicationDetails, React.Dispatch<React.SetStateAction<ApplicationDetails>>]} */
  const [applicationDetails, setApplicationDetails] = useState(BLANK_APPLICATION_DETAILS);

  /** @type {[StudentProfileInfo, React.Dispatch<React.SetStateAction<StudentProfileInfo>>]} */
  const [newEditorProfile, setNewEditorProfile] = useState(null); // Stores the StudentProfileInfo of the new editor before the user confirms the change

  const [applicationCardsOpen, setApplicationCardsOpen] = useState(false);
  const [changeEditorDialogOpen, setChangeEditorDialogOpen] = useState(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const [saveButtonAlertTimeout, setSaveButtonAlertTimeout] = useState(null);

  /**
   * Load the user's saved apartment application, if one exists
   */
  useEffect(() => {
    const initializeNewApplication = () => {
      const initialApplicants = [{ Profile: userProfile, OffCampusProgram: '' }];
      setUnsavedChanges(true);
      setApplicationDetails({
        ...BLANK_APPLICATION_DETAILS,
        EditorProfile: userProfile,
        Gender: userProfile.Gender,
        Applicants: initialApplicants,
      });
      setCanEditApplication(true);
    };

    /**
     * Load the user's saved apartment application, if one exists
     *
     * @async
     * @function loadApplication
     */
    const loadApplication = async () => {
      try {
        setLoading(true);
        // Check if the current user is on an application. Returns the application ID number if found
        const newApplicationID = await housing.getCurrentApplicationID();
        if (newApplicationID === null || newApplicationID === -1) {
          initializeNewApplication();
        } else {
          setUnsavedChanges(false);
          const newApplicationDetails = await housing.getApartmentApplication(newApplicationID);
          if (newApplicationDetails) {
            setApplicationDetails(newApplicationDetails);
            setCanEditApplication(
              userProfile.AD_Username === newApplicationDetails.EditorProfile.AD_Username ?? false,
            );
            setUnsavedChanges(false);
          }
        }
      } catch (error) {
        initializeNewApplication();
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [userProfile]);

  //! DEBUG
  useEffect(() => {
    //! DEBUG
    console.debug('Array state variable. Printing contents:');
    //! DEBUG
    console.debug('EditorUsername:');
    console.debug(applicationDetails?.EditorProfile?.AD_Username);
    //! DEBUG
    console.debug('Applicants:');
    applicationDetails?.Applicants?.forEach((element) => {
      console.debug(`${element?.Profile?.AD_Username}, ${element.OffCampusProgram}`);
    });
    //! DEBUG
    console.debug('Preferred Halls:');
    applicationDetails?.ApartmentChoices?.forEach((element) => {
      console.debug(`${element?.HallName}, ${element?.HallRank}`);
    });
    //! DEBUG
  }, [applicationDetails]);

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
   * Check whether a given applicant is valid for this current application
   *
   * @async
   * @function isApplicantValid
   * @param {ApartmentApplicant} applicant The applicant to be checked
   * @return {Boolean} True if valid, otherwise false
   */
  const isApplicantValid = async (applicant) => {
    // Check that the applicant contains the required fields
    if (applicant?.Profile === null) {
      createSnackbar(
        'Something went wrong while trying to add this person. Please try again.',
        'error',
      );
      return false;
    }

    if (applicant.Profile.fullName === null) {
      applicant.Profile = user.formatName(applicant.Profile);
    }

    if (applicant?.OffCampusProgram === null) {
      applicant.OffCampusProgram = '';
    }

    if (applicationDetails.Applicants.length >= MAX_NUM_APPLICANTS) {
      // Display an error if the user try to add an applicant when the list is full
      createSnackbar(`You cannot have more than ${MAX_NUM_APPLICANTS} applicants`, 'warning');
      return false;
    }

    if (!String(applicant.Profile.PersonType).includes('stu')) {
      // Display an error if the selected user is not a student
      createSnackbar(
        `Could not add ${applicant.Profile.fullName} as an applicant because they are not a student.`,
        'warning',
      );
      return false;
    }

    if (applicant.Profile.Gender !== applicationDetails.Gender) {
      // Display an error if the selected user is not the same gender
      createSnackbar(
        `Could not add ${applicant.Profile.fullName} as an applicant because they are not the same gender as the other applicants.`,
        'warning',
      );
      return false;
    }

    // Check if the selected user is already saved on an application in the database
    try {
      let existingAppID = await housing.getCurrentApplicationID(applicant.Profile.AD_Username);
      if (existingAppID > 0 && existingAppID !== applicationDetails.ApplicationID) {
        // Display an error if the given applicant is already on a different application in the database
        createSnackbar(
          `${applicant.Profile.fullName} is already on another application for this semester.`,
          'warning',
        );
        return false;
      }
    } catch {
      // Do nothing
    }

    return true;
  };

  /**
   * Add an applicant to the list, identified by username
   *
   * @async
   * @function addApplicant
   * @param {String} newApplicantUsername Username for the new applicant
   */
  const addApplicant = async (newApplicantUsername) => {
    try {
      // Get the profile of the selected user
      const newApplicantProfile = await user.getProfileInfo(newApplicantUsername);
      let newApplicantObject = {
        ApplicationID: applicationDetails.ApplicationID,
        Profile: newApplicantProfile,
        OffCampusProgram: '',
      };

      if (
        applicationDetails.Applicants.some(
          (applicant) => applicant.Profile.AD_Username === newApplicantUsername,
        )
      ) {
        // Display an error if the selected user is already in the list
        createSnackbar(String(newApplicantProfile.fullName) + ' is already in the list.', 'info');
      } else {
        let applicantIsValid = await isApplicantValid(newApplicantObject);
        if (applicantIsValid) {
          // Add the profile object to the list of applicants
          setApplicationDetails((prevApplicationDetails) => ({
            ...prevApplicationDetails,
            Applicants: [...prevApplicationDetails.Applicants, newApplicantObject],
          }));
          setUnsavedChanges(true);
          return;
        }
      }
    } catch (error) {
      createSnackbar(
        'Something went wrong while trying to add this person. Please try again.',
        'error',
      );
    }
  };

  /**
   * Callback for changing the application editor
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  const handleChangeEditor = (profile) => {
    if (profile) {
      if (
        applicationDetails.Applicants.some(
          (applicant) => applicant.Profile.AD_Username === profile.AD_Username,
        )
      ) {
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
      if (applicationDetails.ApplicationID > 0) {
        changeApplicationEditor(newEditorProfile.AD_Username); //! Will be deprecated eventually...
      } else {
        try {
          saveApartmentApplication({ ...applicationDetails, EditorProfile: newEditorProfile }); //* Ideal solution
        } catch {
          saveApartmentApplication(applicationDetails);
          changeApplicationEditor(newEditorProfile.AD_Username); //! Will be deprecated eventually...
        }
      }
      handleCloseOkay();
    } else {
      createSnackbar(
        'Something went wrong while trying to save the new application editor.',
        'error',
      );
      setSaving('failed');
    }
  };

  /**
   * Update the application editor of the application to the database
   *
   * @async
   * @function changeApplicationEditor
   * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
   */
  const changeApplicationEditor = async (newEditorUsername) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    try {
      const result = await housing.changeApartmentAppEditor(
        applicationDetails.ApplicationID,
        newEditorUsername,
      );
      console.log(result); //! DEBUG
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        EditorProfile: newEditorProfile,
      }));
      setSaving('success');
      setUnsavedChanges(true);
      // loadApplication(); //? Coming soon to a feature near you
    } catch {
      createSnackbar(
        'Something went wrong while trying to save the new application editor.',
        'error',
      );
      setSaving('failed');
    } finally {
      if (saveButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setSaveButtonAlertTimeout(
          setTimeout(() => {
            setSaveButtonAlertTimeout(null);
            setSaving(false);
          }, 6000),
        );
      }
    }
  };

  /**
   * Callback for applicant list remove button
   * @param {String} usernameToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  const handleApplicantRemove = (usernameToRemove) => {
    if (usernameToRemove) {
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        Applicants: prevApplicationDetails.Applicants.filter(
          (applicant) => applicant.Profile.AD_Username !== usernameToRemove,
        ),
      }));
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
      let newApartmentChoice = {
        ApplicationID: applicationDetails.ApplicationID,
        HallRank: Number(hallRankValue) ?? applicationDetails.ApartmentChoices[index].HallRank,
        HallName: hallNameValue ?? applicationDetails.ApartmentChoices[index].HallName,
      };

      // Error checking on the hallNameValue before modifying the newHallInfo object
      if (
        hallNameValue !== applicationDetails.ApartmentChoices[index].HallName &&
        applicationDetails.ApartmentChoices.some((hallInfo) => hallInfo.HallName === hallNameValue)
      ) {
        // Display an error if the selected hall is already in the list
        createSnackbar(`${String(hallNameValue)} is already in the list.`, 'info');

        // Set the new hall info back to the name it was previously
        newApartmentChoice.HallName = applicationDetails.ApartmentChoices[index].HallName;
      }

      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        ApartmentChoices: sortBy(
          prevApplicationDetails.ApartmentChoices.map((prevApartmentChoice, j) =>
            j === index ? newApartmentChoice : prevApartmentChoice,
          ),
          ['HallRank', 'HallName'], // Sort halls by rank and name
        ),
      }));

      setUnsavedChanges(true);
    } else {
      createSnackbar(
        'Something went wrong while trying to edit this hall. Please try again.',
        'error',
      );
    }
  };

  /**
   * Callback for hall list remove button
   * @param {Number} indexToRemove The index of the hall to be removed from the list of preferred halls
   */
  const handleHallRemove = (indexToRemove) => {
    if (indexToRemove !== null && indexToRemove !== -1) {
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        ApartmentChoices: prevApplicationDetails.ApartmentChoices.filter(
          (_hall, index) => index !== indexToRemove,
        ).map((apartmentChoice, _index, apartmentChoices) =>
          // If any rank value is greater than the new maximum, then set it to that new max rank
          apartmentChoice.HallRank > apartmentChoices.length
            ? { ...apartmentChoice, HallRank: apartmentChoices.length }
            : apartmentChoice,
        ),
      }));
      setUnsavedChanges(true);
    }
  };

  /**
   * Callback for hall list add button
   */
  const handleHallAdd = () => {
    const newPlaceholderHall = {
      HallRank: applicationDetails.ApartmentChoices.length + 1,
      HallName: '',
    };
    setApplicationDetails((prevApplicationDetails) => ({
      ...prevApplicationDetails,
      ApartmentChoices: [...prevApplicationDetails.ApartmentChoices, newPlaceholderHall],
    }));
  };

  /**
   * Callback for changes to off-campus program info
   * @param {String} offCampusProgramValue The program that the applicant is doing an OC program for
   * @param {Number} index The index of the applicant in the list
   */
  const handleOffCampusInputChange = (offCampusProgramValue, index) => {
    if (index !== null && index >= 0) {
      let newApplicant = {
        ...applicationDetails.Applicants[index],
        OffCampusProgram: offCampusProgramValue,
      };
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        Applicants: prevApplicationDetails.Applicants.map((prevApplicant, j) =>
          j === index ? newApplicant : prevApplicant,
        ),
      }));
      setUnsavedChanges(true);
    } else {
      createSnackbar(
        'Something went wrong while trying to change the off-campus program. Please try again.',
        'error',
      );
    }
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
    // The method is separated from callback because the housing API service must be handled inside an async method
    saveApartmentApplication(applicationDetails);
  };

  /**
   * Save the current state of the application to the database
   *
   * @async
   * @function saveApartmentApplication
   * @param {ApplicationDetails} applicationDetails the ApplicationDetails object representing the state of this application
   */
  const saveApartmentApplication = async (applicationDetails) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = null;
    try {
      if (
        applicationDetails.Applicants.length === 0 ||
        applicationDetails.Applicants.every((applicant) => isApplicantValid(applicant))
      ) {
        const result = await housing.saveApartmentApplication(applicationDetails);
        console.log('result of saving: ' + result); //! DEBUG
        setApplicationDetails((prevApplicationDetails) => ({
          ...prevApplicationDetails,
          ApplicationID: result ?? prevApplicationDetails.ApplicationID,
        }));
        setSaving('success');
        setUnsavedChanges(false);
        // loadApplication(); //? Coming soon to a feature near you
      } else {
        // The `isApplicantValid` function will handle the snackbar message
        setSaving('failed');
      }
    } catch {
      createSnackbar('Something went wrong while trying to save the application.', 'error');
      setSaving('failed');
    } finally {
      if (saveButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setSaveButtonAlertTimeout(
          setTimeout(() => {
            setSaveButtonAlertTimeout(null);
            setSaving(false);
          }, 6000),
        );
      }
      return result;
    }
  };

  /**
   * Callback for apartment application submit button
   */
  const handleSubmitButtonClick = () => {
    let debugMessage = 'DEBUG: Submit button was clicked'; //! DEBUG
    console.log(debugMessage); //! DEBUG
    let saveResult = saveApartmentApplication(applicationDetails);
    if (saveResult) {
      setSubmitDialogOpen(true);
    }
  };

  const handleSubmitAppAccepted = () => {
    // The method is separated from callback because the housing API service must be handled inside an async method
    submitApplication();
    handleCloseOkay();
  };

  /**
   * Submit the current application as completed
   *
   * @async
   * @function submitApplication
   */
  const submitApplication = async () => {
    const genericSubmitErrorMessage =
      'Something went wrong while trying to submit the application.';

    if (!applicationDetails.Applicants.every((applicant) => isApplicantValid(applicant))) {
      console.log('Not all applicants are valid'); //! DEBUG:
    } else if (applicationDetails.ApplicationID > 0) {
      console.log('All applicants are valid'); //! DEBUG:
      housing
        .submitApplication(applicationDetails.ApplicationID)
        .then((result) => {
          if (!result) {
            createSnackbar(genericSubmitErrorMessage, 'error');
          } else {
            setApplicationCardsOpen(false);
            // loadApplication(); //? Coming soon to a feature near you
          }
        })
        .catch((err) => {
          createSnackbar(genericSubmitErrorMessage, 'error');
        });
    } else {
      createSnackbar(genericSubmitErrorMessage, 'error');
    }
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
   * @param {*} _event close event to be handled by callback
   * @param {*} reason the reason the close event was triggered
   */
  const handleCloseDialog = (_event, reason) => {
    // Prevent the dialog box from closing if the user clicks outside the dialog box
    if (reason === 'clickaway') {
      return;
    }
    handleCloseOkay();
  };

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  const changeEditorAlertText = (
    <span>
      If you change the application editor, you will no longer be able to edit this application
      yourself.
      <br />
      Are you sure you want to change the application editor?
    </span>
  );

  if (loading) {
    return (
      <div className="apartment-application">
        <Grid container justify="center">
          <Grid container item xs={12} lg={10} xl={8} justify="center" spacing={2}>
            <Grid item xs={12}>
              <GordonLoader />
            </Grid>
            <Grid item xs={12}>
              <InstructionsCard />
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className="apartment-application">
        <Grid container justify="center">
          <Grid container item xs={12} lg={10} xl={8} justify="center" spacing={2}>
            {!applicationCardsOpen && (
              <Grid item xs={12}>
                <Grid container direction="row" justify="center" spacing={2}>
                  {applicationDetails.ApplicationID > 0 && (
                    <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                      <ApplicationDataTable applicationDetails={applicationDetails} />
                    </Grid>
                  )}
                  <Grid item xs={12} lg>
                    <InstructionsCard />
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Collapse in={applicationCardsOpen} timeout="auto" unmountOnExit>
                <Grid container direction="row" justify="center" spacing={2}>
                  <Grid container item md={7} xl={6} direction="column" spacing={2}>
                    <Grid item>
                      {canEditApplication ? (
                        <ApplicantList
                          maxNumApplicants={MAX_NUM_APPLICANTS}
                          userProfile={userProfile}
                          applicationDetails={applicationDetails}
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
                          applicationDetails={applicationDetails}
                        />
                      )}
                      <GordonDialogBox
                        open={changeEditorDialogOpen}
                        onClose={handleCloseDialog}
                        labelledby={'applicant-warning-dialog'}
                        describedby={'changing-application-editor'}
                        title={'Change application editor?'}
                        text={changeEditorAlertText}
                        buttonClicked={handleChangeEditorAccepted}
                        buttonName={'Accept'}
                        cancelButtonClicked={handleCloseOkay}
                        cancelButtonName={'Cancel'}
                        severity={'warning'}
                      />
                    </Grid>
                    <Grid item>
                      {canEditApplication ? (
                        <HallSelection
                          authentication
                          apartmentChoices={applicationDetails.ApartmentChoices ?? []}
                          onHallAdd={handleHallAdd}
                          onHallInputChange={handleHallInputChange}
                          onHallRemove={handleHallRemove}
                          onSaveButtonClick={handleSaveButtonClick}
                        />
                      ) : (
                        <HallSelection
                          disabled
                          apartmentChoices={applicationDetails.ApartmentChoices ?? []}
                        />
                      )}
                    </Grid>
                    <Grid item>
                      {canEditApplication ? (
                        <OffCampusSection
                          authentication
                          applicants={applicationDetails.Applicants ?? []}
                          onOffCampusInputChange={handleOffCampusInputChange}
                        />
                      ) : (
                        <OffCampusSection
                          disabled
                          authentication
                          applicants={applicationDetails.Applicants ?? []}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid container item md direction="column" spacing={2}>
                    {canEditApplication && (
                      <Grid item>
                        <Agreements onChange={handleAgreementsStateChange} />
                      </Grid>
                    )}
                    {applicationDetails.ApplicationID > 0 && (
                      <Grid item>
                        <ApplicationDataTable applicationDetails={applicationDetails} />
                      </Grid>
                    )}
                  </Grid>
                  <Grid item>
                    <InstructionsCard />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>
            <Grid item xs={12} className={'sticky-page-bottom-bar'}>
              <BottomBar
                applicationCardsOpen={applicationCardsOpen}
                applicationID={applicationDetails.ApplicationID}
                canEditApplication={canEditApplication}
                disableSubmit={
                  !applicationCardsOpen ||
                  !agreements ||
                  !(applicationDetails.Applicants.length > 0) ||
                  !(applicationDetails.ApartmentChoices.length > 0)
                }
                saving={saving}
                submitDialogOpen={submitDialogOpen}
                unsavedChanges={unsavedChanges}
                onCloseDialog={handleCloseDialog}
                onCloseOkay={handleCloseOkay}
                onSaveButtonClick={handleSaveButtonClick}
                onShowApplication={handleShowApplication}
                onSubmitAppAccepted={handleSubmitAppAccepted}
                onSubmitButtonClick={handleSubmitButtonClick}
              />
            </Grid>
          </Grid>
        </Grid>
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={(_event, reason) =>
            reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }))
          }
        />
      </div>
    );
  }
};

export default StudentApplication;
