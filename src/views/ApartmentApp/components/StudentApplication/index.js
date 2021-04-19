//Student apartment application page
import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import { Collapse, Grid } from '@material-ui/core/';
import GordonLoader from '../../../../components/Loader';
import GordonDialogBox from '../../../../components/GordonDialogBox';
import SimpleSnackbar from '../../../../components/Snackbar';
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
  EditorUsername: null,
  EditorEmail: null,
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

  /** @type {[ApplicationDetails, React.Dispatch<React.SetStateAction<ApplicationDetails>>]} */
  const [applicationDetails, setApplicationDetails] = useState(BLANK_APPLICATION_DETAILS);

  //! Will be deprecated soon, replaced with setApplicationDetails
  const [dateSubmitted, setDateSubmitted] = useState(null); // The date the application was submitted, or null if not yet submitted
  //! Will be deprecated soon, replaced with setApplicationDetails
  const [dateModified, setDateModified] = useState(null); // The date the application was last modified, or null if not yet saved/modified
  //! Will be deprecated soon, replaced with setApplicationDetails
  const [editorUsername, setEditorUsername] = useState(null); // The username of the application editor

  //! Will be deprecated soon, replaced with setApplicationDetails
  /** @type {[ApartmentApplicant[], React.Dispatch<React.SetStateAction<ApartmentApplicant[]>>]} Array of applicant info */
  const [applicants, setApplicants] = useState([]);

  //! Will be deprecated soon, replaced with setApplicationDetails
  /** @type {[ApartmentChoice[], React.Dispatch<React.SetStateAction<ApartmentChoice[]>>]} Array of apartment choice info */

  //! Will be deprecated soon, replaced with setApplicationDetails
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
   * Load the user's saved apartment application, if one exists
   */
  useEffect(() => {
    const initializeNewApplication = () => {
      const initialApplicants = [{ Profile: userProfile, OffCampusProgram: '' }];
      setEditorUsername(userProfile.AD_Username); //! Will be deprecated soon, replaced with setApplicationDetails
      setApplicants(initialApplicants); //! Will be deprecated soon, replaced with setApplicationDetails
      setUnsavedChanges(true);
      setApplicationDetails({
        ...BLANK_APPLICATION_DETAILS,
        EditorUsername: userProfile.AD_Username,
        EditorEmail: userProfile.Email,
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
            setDateSubmitted(newApplicationDetails.DateSubmitted ?? null); //! Will be deprecated soon, replaced with setApplicationDetails
            setDateModified(newApplicationDetails.DateModified ?? null); //! Will be deprecated soon, replaced with setApplicationDetails
            setEditorUsername(newApplicationDetails.EditorUsername ?? null); //! Will be deprecated soon, replaced with setApplicationDetails
            setApplicants(newApplicationDetails?.Applicants ?? []); //! Will be deprecated soon, replaced with setApplicationDetails
            setPreferredHalls(newApplicationDetails?.ApartmentChoices ?? []); //! Will be deprecated soon, replaced with setApplicationDetails
            setUnsavedChanges(false);
            setCanEditApplication(
              userProfile.AD_Username === newApplicationDetails.EditorUsername ?? false,
            );
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

  useEffect(() => {
    // setUnsavedChanges(true);
    //! DEBUG
    console.log('Array state variables changed. Printing contents:');
    console.log('Applicants:');
    applicants.forEach((element) => {
      console.log(element?.Profile?.AD_Username ?? null + ', ' + element.OffCampusProgram);
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
      return false;
    }

    if (applicant?.OffCampusProgram === null) {
      applicant.OffCampusProgram = '';
    }

    if (applicants.length >= MAX_NUM_APPLICANTS) {
      // Display an error if the user try to add an applicant when the list is full
      setSnackbarText(`You cannot have more than ${MAX_NUM_APPLICANTS} applicants'`);
      setSnackbarSeverity('warning');
      return false;
    }

    if (!String(applicant.Profile.PersonType).includes('stu')) {
      // Display an error if the selected user is not a student
      setSnackbarText(
        'Could not add ' +
          String(applicant.Profile.fullName) +
          ' as an applicant because they are not a student.',
      );
      setSnackbarSeverity('warning');
      return false;
    }

    // Use any of the follow sources for the gender of the application
    const applicationGender =
      applicationDetails.Gender ?? applicationDetails.EditorProfile?.Gender ?? userProfile.Gender;

    if (applicant.Profile.Gender && applicant.Profile.Gender !== applicationGender) {
      // Display an error if the selected user is not the same gender
      setSnackbarText(
        'Could not add ' +
          String(applicant.Profile.fullName) +
          ' as an applicant because they are not the same gender as the other applicants.',
      );
      setSnackbarSeverity('warning');
      return false;
    }

    // Check if the selected user is already saved on an application in the database
    let existingAppID = null;
    try {
      existingAppID = await housing.getCurrentApplicationID(applicant.Profile.AD_Username);
      if (existingAppID && existingAppID !== applicationDetails.ApplicationID) {
        // Display an error if the given applicant is already on a different application in the database
        setSnackbarText(
          String(applicant.fullName) + ' is already on another application for this semester.',
        );
        setSnackbarSeverity('warning');
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
   * @param {String} username Username for the new applicant
   */
  const addApplicant = async (username) => {
    try {
      // Get the profile of the selected user
      const newApplicantProfile = await user.getProfileInfo(username);
      let newApplicantObject = { Profile: newApplicantProfile, OffCampusProgram: '' };

      if (applicants.some((applicant) => applicant.Profile.AD_Username === username)) {
        // Display an error if the selected user is already in the list
        setSnackbarText(String(newApplicantProfile.fullName) + ' is already in the list.');
        setSnackbarSeverity('info');
      } else if (isApplicantValid(newApplicantObject)) {
        // Add the profile object to the list of applicants
        setApplicants((prevApplicants) => [...prevApplicants, newApplicantObject]); //! Will be deprecated soon, replaced with setApplicationDetails
        setApplicationDetails((prevApplicationDetails) => ({
          ...prevApplicationDetails,
          Applicants: [...prevApplicationDetails.Applicants, newApplicantObject],
        }));
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
      changeApplicationEditor(newEditorProfile.AD_Username); //! Will be deprecated soon
      // saveApartmentApplication({ ...applicationDetails, EditorProfile: newEditorProfile }); //* Ideal solution
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
      setEditorUsername(newEditorProfile.AD_Username); //! Will be deprecated soon, replaced with setApplicationDetails
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        EditorProfile: newEditorProfile,
        EditorUsername: newEditorProfile.AD_Username,
      }));
      setSaving('success');
      setUnsavedChanges(true);
      // loadApplication(); //? Coming soon to a feature near you
    } catch {
      setSnackbarText('Something went wrong while trying to save the new application editor.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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
   * @param {StudentProfileInfo} profileToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
   */
  const handleApplicantRemove = (profileToRemove) => {
    if (profileToRemove) {
      setApplicants((
        prevApplicants, //! Will be deprecated soon, replaced with setApplicationDetails
      ) =>
        prevApplicants.filter(
          (applicant) => applicant.Profile.AD_Username !== profileToRemove.AD_Username,
        ),
      );
      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        Applicants: prevApplicationDetails.Applicants.filter(
          (applicant) => applicant.Profile.AD_Username !== profileToRemove.AD_Username,
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
        newApartmentChoice.HallName = preferredHalls[index].HallName;
      }

      setPreferredHalls((
        prevPreferredHalls, //! Will be deprecated soon, replaced with setApplicationDetails
      ) =>
        sortBy(
          // replace the element at index with the new hall info object
          prevPreferredHalls.map((prevApartmentChoice, j) =>
            j === index ? newApartmentChoice : prevApartmentChoice,
          ),
          ['HallRank', 'HallName'], // Sort halls by rank and name
        ),
      );

      setApplicationDetails((prevApplicationDetails) => ({
        ...prevApplicationDetails,
        ApartmentChoices: sortBy(
          prevApplicationDetails.ApartmentChoices.map((prevApartmentChoice, j) =>
            j === index ? newApartmentChoice : prevApartmentChoice,
          ),
          ['HallRank', 'HallName'],
        ),
      }));

      setUnsavedChanges(true);
    } else {
      setSnackbarText('Something went wrong while trying to add this hall. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for changes to off-campus program info
   * @param {String} offCampusProgramValue The program that the applicant is doing an OC program for
   * @param {Number} index The index of the applicant in the list
   */
  const handleOffCampusInputChange = (offCampusProgramValue, index) => {
    if (index !== null && index >= 0) {
      // Get the profile of the selected user
      let newApplicant = {
        ...applicants[index],
        OffCampusProgram: offCampusProgramValue ?? applicants[index].OffCampusProgram,
      };
      // Error checking on the hallNameValue before modifying the newHallInfo object
      setApplicants((prevApplicants) =>
        // replace the element at index with the new hall info object
        prevApplicants.map((prevApplicant, j) => (j === index ? newApplicant : prevApplicant)),
      );
    } else {
      setSnackbarText(
        'Something went wrong while trying to change the off-campus program. Please try again.',
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  /**
   * Callback for hall list remove button
   * @param {Number} indexToRemove The index of the hall to be removed from the list of preferred halls
   */
  const handleHallRemove = (indexToRemove) => {
    if (indexToRemove !== null && indexToRemove !== -1) {
      setPreferredHalls((prevPreferredHalls) => {
        //! Will be deprecated soon, replaced with setApplicationDetails
        let newPreferredHalls = prevPreferredHalls.filter(
          (_hall, index) => index !== indexToRemove,
        );

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
    const newHallInfo = { HallRank: preferredHalls.length + 1, HallName: '' };
    setPreferredHalls((prevPreferredHalls) => [...prevPreferredHalls, newHallInfo]); //! Will be deprecated soon, replaced with setApplicationDetails
    setApplicationDetails((prevApplicationDetails) => ({
      ...prevApplicationDetails,
      ApartmentChoices: [...prevApplicationDetails.ApartmentChoices, newHallInfo],
    }));
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
      setSnackbarText('Something went wrong while trying to save the application.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
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
   * @function changeApplicationEditor
   */
  const submitApplication = async () => {
    if (applicationDetails.Applicants.every((applicant) => isApplicantValid(applicant))) {
      console.log('All applicants are valid'); //! DEBUG:
      try {
        //TODO: Feature not yet added to the API
        // housing.submitApplication(applicationDetails);
        setApplicationCardsOpen(false);
      } catch {}
    } else {
      console.log('Not all applicants are valid'); //! DEBUG:
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
                    <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                      <ApplicationDataTable
                        dateSubmitted={dateSubmitted}
                        dateModified={dateModified}
                        applicationDetails={applicationDetails}
                      />
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
                      {userProfile.AD_Username === editorUsername ? (
                        <ApplicantList
                          maxNumApplicants={MAX_NUM_APPLICANTS}
                          userProfile={userProfile}
                          editorUsername={editorUsername}
                          applicants={applicants}
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
                          preferredHalls={preferredHalls}
                          onHallAdd={handleHallAdd}
                          onHallInputChange={handleHallInputChange}
                          onHallRemove={handleHallRemove}
                          onSaveButtonClick={handleSaveButtonClick}
                        />
                      ) : (
                        <HallSelection disabled authentication preferredHalls={preferredHalls} />
                      )}
                    </Grid>
                    <Grid item>
                      {userProfile.AD_Username === editorUsername ? (
                        <OffCampusSection
                          authentication
                          applicants={applicants}
                          onOffCampusInputChange={handleOffCampusInputChange}
                        />
                      ) : (
                        <OffCampusSection disabled authentication applicants={applicants} />
                      )}
                    </Grid>
                  </Grid>
                  <Grid container item md direction="column" spacing={2}>
                    {userProfile.AD_Username === editorUsername && (
                      <Grid item>
                        <Agreements onChange={handleAgreementsStateChange} />
                      </Grid>
                    )}
                    {applicationDetails.ApplicationID > 0 && (
                      <Grid item>
                        <ApplicationDataTable
                          dateSubmitted={dateSubmitted}
                          dateModified={dateModified}
                          editorUsername={applicationDetails.EditorUsername}
                          editorEmail={applicationDetails.EditorEmail}
                        />
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
                editorUsername={editorUsername}
                saving={saving}
                submitDialogOpen={submitDialogOpen}
                unsavedChanges={unsavedChanges}
                userProfile={userProfile}
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
