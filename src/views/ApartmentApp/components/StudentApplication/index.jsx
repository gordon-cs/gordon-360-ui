//Student apartment application page
import { Backdrop, Collapse, Grid } from '@mui/material/';
import GordonDialogBox from 'components/GordonDialogBox';
import GordonLoader from 'components/Loader';
import GordonSnackbar from 'components/Snackbar';
import { sortBy } from 'lodash';
// eslint-disable-next-line no-unused-vars
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'; // eslint disabled because it doesn't recognise type imports that ARE used in JSDoc comments
import { AuthError, createError, NotFoundError } from 'services/error';
import housing from 'services/housing';
import user from 'services/user';
// @TODO CSSMODULES - outside directory
import styles from '../../ApartmentApp.module.css';
import Agreements from './components/Agreements';
import ApplicantList from './components/ApplicantList';
import ApplicationDataTable from './components/ApplicationDataTable';
import BottomBar from './components/BottomBar';
import HallChoiceList from './components/HallChoiceList';
import InstructionsCard from './components/InstructionsCard';
import OffCampusList from './components/OffCampusList';

const DYNAMIC_ICON_TIMEOUT = 6000;
const MAX_NUM_APPLICANTS = 8;
const BLANK_APPLICATION_DETAILS = {
  ApplicationID: null,
  DateSubmitted: null,
  DateModified: null,
  EditorProfile: null,
  Applicants: [],
  ApartmentChoices: [],
};

const DIALOG_PROPS = {
  default: {
    action: 'default',
    title: 'How did you get here?',
    text: 'This text should not be displayed.',
    open: false,
  },
  changeEditor: {
    action: 'changeEditor',
    title: 'Change application editor?',
    text: (
      <span>
        You are about to change the editor.
        <br />
        If you change the application editor, you will no longer be able to edit this application
        yourself. All unsaved changes will be saved automatically.
        <br />
        Are you sure you want to change the application editor?
      </span>
    ),
  },
  delete: {
    action: 'delete',
    title: 'Delete apartment application?',
    text: (
      <span>
        Are you sure you want to delete this application?
        <br />
        This action cannot be undone.
      </span>
    ),
  },
  submit: {
    action: 'submit',
    title: 'Submit apartment application?',
    text: (
      <span>
        Please confirm that all the information you have entered is valid before submitting.
        <br />
        Click "Accept" below to submit this application.
      </span>
    ), // TODO: Improve this text for the users
  },
};

/**
 * @typedef { import('services/user').StudentProfileInfo } StudentProfileInfo
 * @typedef { import('services/housing').ApartmentApplicant } ApartmentApplicant
 * @typedef { import('services/housing').ApartmentChoice } ApartmentChoice
 * @typedef { import('services/housing').ApplicationDetails } ApplicationDetails
 */

/**
 * Renders the page for the student apartment application
 *
 * @param {Object} props The React component props
 * @param {StudentProfileInfo} props.userProfile The student profile info of the current user
 * @returns {JSX.Element} JSX Element for the student application web page
 */
const StudentApplication = ({ userProfile }) => {
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [canEditApplication, setCanEditApplication] = useState(false);
  const [agreements, setAgreements] = useState(false); // Represents the state of the agreements card. True if all checkboxes checked, false otherwise

  /** @type {[ApplicationDetails, Dispatch<SetStateAction<ApplicationDetails>>]} */
  const [applicationDetails, setApplicationDetails] = useState(BLANK_APPLICATION_DETAILS);

  /** @type {[StudentProfileInfo, Dispatch<SetStateAction<StudentProfileInfo>>]} */
  const [newEditorProfile, setNewEditorProfile] = useState(null); // Stores the StudentProfileInfo of the new editor before the user confirms the change

  const [applicationCardsOpen, setApplicationCardsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ message: '', severity: '', open: false });
  const [dialogProps, setDialogProps] = useState(DIALOG_PROPS.default);
  const [deleteButtonAlertTimeout, setDeleteButtonAlertTimeout] = useState(null);
  const [saveButtonAlertTimeout, setSaveButtonAlertTimeout] = useState(null);
  const [submitButtonAlertTimeout, setSubmitButtonAlertTimeout] = useState(null);

  /**
   * Load the user's saved apartment application, if one exists
   *
   * @async
   * @function loadApplication
   * @returns {Promise.<boolean>} Indicates whether loading succeeded or failed
   */
  const loadApplication = useCallback(async () => {
    const initializeNewApplication = () => {
      const initialApplicants = [
        { Profile: userProfile, Username: userProfile.AD_Username, OffCampusProgram: '' },
      ];
      setApplicationDetails({
        ...BLANK_APPLICATION_DETAILS,
        EditorProfile: userProfile,
        Gender: userProfile.Gender,
        Applicants: initialApplicants,
      });
      setUnsavedChanges(true);
    };

    let result = false;
    try {
      // Check if the current user is on an application. Returns the application ID number if found
      const newApplicationID = await housing.getCurrentApplicationID();
      if (newApplicationID > 0) {
        const newApplicationDetails = await housing.getApartmentApplication(newApplicationID);
        setApplicationDetails(newApplicationDetails);
        setUnsavedChanges(false);
        result = true;
      } else {
        throw createError(new Error('Invalid application ID'), { status: 404 });
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        initializeNewApplication();
      } else if (e instanceof AuthError) {
        const debugMessage =
          'Received a 401 (Unauthorized) response, which should not be possible in this case. Please try refreshing the page, or contact CTS for support.';
        console.error(`Debug Message: ${debugMessage}`);
        createSnackbar(debugMessage, 'error');
      } else {
        throw e;
      }
    } finally {
      setNewEditorProfile(null);
      return result;
    }
  }, [userProfile]);

  useEffect(() => {
    setLoading(true);
    loadApplication();
    setLoading(false);
  }, [userProfile, loadApplication]);

  useEffect(
    () =>
      setCanEditApplication(
        userProfile?.AD_Username === applicationDetails?.EditorProfile?.AD_Username ?? false,
      ),
    [applicationDetails?.EditorProfile?.AD_Username, userProfile?.AD_Username],
  );

  const createSnackbar = (message, severity) => {
    setSnackbar({ message, severity, open: true });
  };

  const createDialog = (itemProps, text = null) => {
    setDialogProps({ ...itemProps, text: text ?? itemProps.text, open: true });
  };

  /**
   * Check whether a given applicant is valid for this current application
   *
   * @async
   * @function isApplicantValid
   * @param {ApartmentApplicant} applicant The applicant to be checked
   * @returns {Promise.<boolean>} True if valid, otherwise false
   */
  const isApplicantValid = async (applicant) => {
    // Check that the applicant contains the required fields
    if (!applicant?.Profile) {
      createSnackbar(
        'Something went wrong while trying to add this person. Please try again.',
        'error',
      );
      return false;
    }

    if (applicationDetails.Applicants.length >= MAX_NUM_APPLICANTS) {
      // Display an error if the user try to add an applicant when the list is full
      createSnackbar(`You cannot have more than ${MAX_NUM_APPLICANTS} applicants`, 'warning');
      return false;
    }

    applicant.Profile.fullName ??= `${applicant.Profile.FirstName} ${applicant.Profile.LastName}`;

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
    let result = false;
    try {
      let existingAppID = await housing.getCurrentApplicationID(applicant.Profile.AD_Username);
      if (existingAppID > 0 && existingAppID !== applicationDetails.ApplicationID) {
        // Display an error if the given applicant is already on a different application in the database
        createSnackbar(
          `${applicant.Profile.fullName} is already on another application for this semester.`,
          'warning',
        );
      } else {
        result = true;
      }
    } catch (e) {
      if (e instanceof NotFoundError) {
        result = true;
      } else if (e instanceof AuthError) {
        const debugMessage =
          'Received a 401 (Unauthorized) response, which should not be possible in this case. Please try refreshing the page, or contact CTS for support.';
        console.error(`Debug Message: ${debugMessage}`);
        createSnackbar(debugMessage, 'error');
      } else {
        throw e;
      }
    } finally {
      return result;
    }
  };

  /**
   * Add an applicant to the list, identified by username
   *
   * @async
   * @function addApplicant
   * @param {string} newApplicantUsername Username for the new applicant
   */
  const addApplicant = async (newApplicantUsername) => {
    try {
      // Get the profile of the selected user
      const newApplicantProfile = await user.getProfileInfo(newApplicantUsername);
      let newApplicantObject = {
        ApplicationID: applicationDetails.ApplicationID,
        Profile: newApplicantProfile,
        Username: newApplicantUsername, // Used for convenient array sorting.
        OffCampusProgram: '',
      };

      if (
        applicationDetails.Applicants.some(
          (applicant) => applicant.Profile.AD_Username === newApplicantUsername,
        )
      ) {
        // Display an error if the selected user is already in the list
        createSnackbar(`${newApplicantProfile.fullName} is already in the list.`, 'info');
      } else {
        const validApplicant = await isApplicantValid(newApplicantObject);
        // Any relevant errors and snackbar messages are handled by `isApplicantValid()` internally
        if (validApplicant) {
          // Add the profile object to the list of applicants
          setApplicationDetails((prevApplicationDetails) => ({
            ...prevApplicationDetails,
            Applicants: [...prevApplicationDetails.Applicants, newApplicantObject],
          }));
          setUnsavedChanges(true);
        }
      }
    } catch (error) {
      createSnackbar(
        'Something went wrong while trying to add this person. Please try again.',
        'error',
      );
      console.log(error);
    }
  };

  /**
   * Callback for changing the application editor
   *
   * @param {StudentProfileInfo} profile The StudentProfileInfo object for the person who is to be made the application editor
   */
  const handleChangeEditor = (profile) => {
    if (canEditApplication && profile) {
      if (
        applicationDetails.Applicants.some(
          (applicant) => applicant.Profile.AD_Username === profile.AD_Username,
        )
      ) {
        setNewEditorProfile(profile);

        let insertText = '';
        if (profile.fullName) {
          insertText = ` to ${profile.fullName}`;
        } else if (profile?.FirstName && profile?.LastName) {
          insertText = ` to ${profile.FirstName} ${profile.LastName}`;
        }
        const dialogText = (
          <span>
            You are about to change the editor{insertText}.
            <br />
            If you change the application editor, you will no longer be able to edit this
            application yourself. All unsaved changes will be saved automatically.
            <br />
            Are you sure you want to change the application editor?
          </span>
        );
        createDialog(DIALOG_PROPS.changeEditor, dialogText);
      }
    }
  };

  /**
   * Callback for applying the new application editor
   */
  const handleChangeEditorAccepted = () => {
    if (newEditorProfile?.AD_Username) {
      try {
        saveApartmentApplication({ ...applicationDetails, EditorProfile: newEditorProfile }); //* Ideal solution
      } catch {
        console.debug('Using old method to change application editor.');
        changeApplicationEditor(newEditorProfile); //! Will be deprecated eventually...
      }
    } else {
      console.debug(
        'Error: Invalid StudentProfileInfo object set for newEditorProfile when calling handleChangeEditor.',
      );
      createSnackbar(
        'Something went wrong while trying to change the editor: Could not find Profile or Username. Please contact CTS, or refresh the page and try again.',
        'error',
      );
      setSaving('error');
    }
  };

  /**
   * Update the application editor of the application to the database
   *
   * This function will be deprecated in the future
   * It will be replaced with `saveApartmentApplication({ ...applicationDetails, EditorProfile: newEditorProfile })`
   *
   * @async
   * @function changeApplicationEditor
   * @param {StudentProfileInfo} newEditorProfile the StudentProfileInfo object for the person who will be allowed to edit this application
   */
  const changeApplicationEditor = async (newEditorProfile) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    try {
      const result = await housing.changeApartmentAppEditor(
        applicationDetails.ApplicationID,
        newEditorProfile.AD_Username,
      );
      if (result) {
        try {
          const loadingResult = await loadApplication();
          if (!loadingResult) {
            throw new Error('Failed to load apartment application.');
          }
        } catch {
          setApplicationDetails((prevApplicationDetails) => ({
            ...prevApplicationDetails,
            EditorProfile: newEditorProfile,
            Applicants: sortBy(prevApplicationDetails.Applicants, ['Username']),
          }));
        } finally {
          setSaving('success');
          setUnsavedChanges(false);
        }
      }
    } catch (e) {
      if (e instanceof AuthError) {
        createSnackbar('You are not authorized to make changes to this application.', 'error');
      } else if (e instanceof NotFoundError) {
        createSnackbar('Error: This application was not found in the database.', 'error');
      } else {
        createSnackbar(
          'Something went wrong while trying to save the new application editor.',
          'error',
        );
      }
      setSaving('error');
    } finally {
      if (saveButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setSaveButtonAlertTimeout(
          setTimeout(() => {
            setSaveButtonAlertTimeout(null);
            setSaving(false);
          }, DYNAMIC_ICON_TIMEOUT),
        );
      }
    }
  };

  /**
   * Callback for applicant list remove button
   *
   * @param {string} usernameToRemove The StudentProfileInfo object for the person who is to be removed from the list of applicants
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
   * Callback for hall list add button
   */
  const handleHallAdd = () => {
    const newPlaceholderHall = {
      ApplicationID: applicationDetails.ApplicationID,
      HallRank: (applicationDetails.ApartmentChoices?.length ?? 0) + 1,
      HallName: '',
    };
    setApplicationDetails((prevApplicationDetails) => ({
      ...prevApplicationDetails,
      ApartmentChoices: [...(prevApplicationDetails.ApartmentChoices ?? []), newPlaceholderHall],
    }));
  };

  /**
   * Callback for changes to hall list item name and/or rank
   *
   * @param {number} hallRankValue The rank value that the user assigned to this hall
   * @param {string} hallNameValue The name of the hall that was selected
   * @param {number} index The index of the hall in the list
   */
  const handleHallInputChange = (hallRankValue, hallNameValue, index) => {
    if (index >= 0) {
      // Error checking on the hallNameValue before modifying the newHallInfo object
      if (
        hallNameValue !== applicationDetails.ApartmentChoices[index].HallName &&
        applicationDetails.ApartmentChoices.some((hallInfo) => hallInfo.HallName === hallNameValue)
      ) {
        // Display an error if the selected hall is already in the list
        createSnackbar(`${String(hallNameValue)} is already in the list.`, 'info');

        // Leave the ApartmentChoice array unchanged, but refresh the sorting.
        setApplicationDetails((prevApplicationDetails) => ({
          ...prevApplicationDetails,
          ApartmentChoices: sortBy(
            prevApplicationDetails.ApartmentChoices,
            ['HallRank', 'HallName'], // Sort halls by rank and name
          ),
        }));
      }
      if (hallRankValue !== applicationDetails.ApartmentChoices[index].HallRank) {
        // Display an error if the selected rank is already in the list
        createSnackbar(`Rank ${String(hallRankValue)} is already in the list.`, 'info');

        // Leave the ApartmentChoice array unchanged, but refresh the sorting.
        setApplicationDetails((prevApplicationDetails) => ({
          ...prevApplicationDetails,
          ApartmentChoices: sortBy(
            prevApplicationDetails.ApartmentChoices,
            ['HallRank', 'HallName'], // Sort halls by rank and name
          ),
        }));
      } else {
        const newApartmentChoice = {
          ApplicationID: applicationDetails.ApplicationID,
          HallRank: Number(hallRankValue) ?? applicationDetails.ApartmentChoices[index].HallRank,
          HallName: hallNameValue ?? applicationDetails.ApartmentChoices[index].HallName,
        };
        setApplicationDetails((prevApplicationDetails) => ({
          ...prevApplicationDetails,
          ApartmentChoices: sortBy(
            prevApplicationDetails.ApartmentChoices.map((prevApartmentChoice, j) =>
              j === index ? newApartmentChoice : prevApartmentChoice,
            ),
            ['HallRank', 'HallName'], // Sort halls by rank and name
          ),
        }));
      }

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
   *
   * @param {number} indexToRemove The index of the hall to be removed from the list of preferred halls
   */
  const handleHallRemove = (indexToRemove) => {
    if (indexToRemove >= 0) {
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
   * Callback for changes to off-campus program info
   *
   * @param {string} offCampusProgramValue The program that the applicant is doing an OC program for
   * @param {number} index The index of the applicant in the list
   */
  const handleOffCampusInputChange = (offCampusProgramValue, index) => {
    if (index >= 0) {
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
   * Delete the current application in the database
   *
   * @async
   * @function deleteApartmentApplication
   */
  const deleteApartmentApplication = async () => {
    setDeleting(true);
    setDeleteButtonAlertTimeout(null);
    try {
      const result = await housing.deleteApartmentApplication(applicationDetails.ApplicationID);
      if (result) {
        setDeleting('success');
        setSaving((s) => (s === 'success' ? false : s));
        setSubmitStatus((s) => (s === 'success' ? false : s));
        loadApplication();
        setApplicationCardsOpen(false);
      } else {
        throw new Error('Failed to delete application');
      }
    } catch (e) {
      if (e instanceof AuthError) {
        createSnackbar('You are not authorized to make changes to this application.', 'error');
      } else if (e instanceof NotFoundError) {
        createSnackbar('Error: This application was not found in the database.', 'error');
      } else {
        createSnackbar('Something went wrong while trying to delete the application.', 'error');
      }
      setDeleting('error');
    } finally {
      if (deleteButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setDeleteButtonAlertTimeout(
          setTimeout(() => {
            setDeleteButtonAlertTimeout(null);
            setDeleting(false);
          }, DYNAMIC_ICON_TIMEOUT),
        );
      }
    }
  };

  /**
   * Save the current state of the application to the database
   *
   * @async
   * @function saveApartmentApplication
   * @param {ApplicationDetails} applicationDetails the ApplicationDetails object representing the state of this application
   * @returns {Promise.<boolean>} Indicates whether saving succeeded or failed
   */
  const saveApartmentApplication = async (applicationDetails) => {
    setSaving(true);
    setSaveButtonAlertTimeout(null);
    let result = false;
    try {
      if (applicationDetails.Applicants.length < 1) {
        createSnackbar(
          'Error: There are no applicants on this application. This should not be possible. Please refresh the page and try again.',
          'error',
        );
        setSaving('error');
      } else {
        // This will produce an array of booleans. If all are true, then all applicants are valid
        let validApplicants = await Promise.all(
          applicationDetails.Applicants.map((applicant) => isApplicantValid(applicant)),
        );
        // No additional `else` is needed for this, since `isApplicantValid` handles the `createSnackbar` internally
        if (validApplicants.every((v) => v)) {
          // Quick fix since the API is trying
          //  to validate the public profile object but there is no Hall property
          let applicationDetailsNoProfiles = applicationDetails;
          applicationDetailsNoProfiles.Applicants.forEach((a) => (a.Profile.Hall = ''));
          const saveResult = await housing.saveApartmentApplication(applicationDetailsNoProfiles);
          if (saveResult) {
            setApplicationDetails((prevApplicationDetails) => ({
              ...prevApplicationDetails,
              ApplicationID: result ?? prevApplicationDetails.ApplicationID,
            }));
            setSaving('success');
            setUnsavedChanges(false);
            await loadApplication();
            result = true;
          } else {
            throw new Error(
              `Did not receive an http error code, but received the response ${result}`,
            );
          }
        }
      }
    } catch (e) {
      if (e instanceof AuthError) {
        createSnackbar('You are not authorized to save changes to this application.', 'error');
      } else if (e instanceof NotFoundError) {
        createSnackbar('Error: This application was not found in the database.', 'error');
      } else {
        console.log(e);
        createSnackbar('Something went wrong while trying to save the application.', 'error');
      }
      setSaving('error');
    } finally {
      if (saveButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setSaveButtonAlertTimeout(
          setTimeout(() => {
            setSaveButtonAlertTimeout(null);
            setSaving(false);
          }, DYNAMIC_ICON_TIMEOUT),
        );
      }
      return result;
    }
  };

  /**
   * Submit the current application as completed
   *
   * @async
   * @function submitApplication
   */
  const submitApplication = async () => {
    setSubmitStatus(true);
    setSubmitButtonAlertTimeout(null);
    try {
      if (applicationDetails.Applicants.length < 1) {
        createSnackbar(
          'Error: There are no applicants on this application. This should not be possible. Please refresh the page and try again.',
          'error',
        );
        setSaving('error');
      } else {
        // The checking of valid applicants is performed inside `saveApartmentApplication()` function
        const saveResult = await saveApartmentApplication(applicationDetails);
        if (saveResult) {
          const result = await housing.submitApplication(applicationDetails.ApplicationID);
          if (result) {
            setSubmitStatus('success');
            await loadApplication();
          } else {
            throw new Error('Failed to submit application');
          }
        } else {
          throw new Error('Failed to save application');
        }
      }
    } catch (e) {
      if (e instanceof AuthError) {
        createSnackbar('You are not authorized to make changes to this application.', 'error');
      } else if (e instanceof NotFoundError) {
        createSnackbar('Error: This application was not found in the database.', 'error');
      } else {
        createSnackbar('Something went wrong while trying to submit the application.', 'error');
      }
      setSubmitStatus('error');
    } finally {
      if (submitButtonAlertTimeout === null) {
        // Shows the success icon for 6 seconds and then returns back to normal button
        setSubmitButtonAlertTimeout(
          setTimeout(() => {
            setSubmitButtonAlertTimeout(null);
            setSubmitStatus(false);
          }, DYNAMIC_ICON_TIMEOUT),
        );
      }
    }
  };

  if (loading) {
    return <GordonLoader />;
  } else {
    return (
      <div className={styles.apartment_application}>
        <Grid container justifyContent="center">
          <Grid container item xs={12} lg={10} xl={8} justifyContent="center" spacing={2}>
            {!applicationCardsOpen && (
              <Grid item xs={12}>
                <Grid container direction="row" justifyContent="center" spacing={2}>
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
                <Grid container direction="row" justifyContent="center" spacing={2}>
                  <Grid container item md={7} xl={6} direction="column" spacing={2}>
                    <Grid item>
                      <ApplicantList
                        disabled={
                          !canEditApplication ||
                          applicationDetails.Applicants?.length > MAX_NUM_APPLICANTS
                        }
                        editorProfile={applicationDetails.EditorProfile}
                        applicants={applicationDetails.Applicants ?? []}
                        onSearchSubmit={(searchSelection) =>
                          searchSelection && addApplicant(searchSelection)
                        }
                        onChangeEditor={handleChangeEditor}
                        onApplicantRemove={handleApplicantRemove}
                      />
                    </Grid>
                    <Grid item>
                      <HallChoiceList
                        disabled={!canEditApplication}
                        apartmentChoices={applicationDetails.ApartmentChoices ?? []}
                        onHallAdd={handleHallAdd}
                        onHallInputChange={handleHallInputChange}
                        onHallRemove={handleHallRemove}
                      />
                    </Grid>
                    <Grid item>
                      <OffCampusList
                        disabled={!canEditApplication}
                        applicants={applicationDetails.Applicants ?? []}
                        onOffCampusInputChange={handleOffCampusInputChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item md direction="column" spacing={2}>
                    {canEditApplication && (
                      <Grid item>
                        <Agreements
                          deleting={deleting}
                          onChange={(newState) => setAgreements(newState)}
                        />
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
            <Grid item xs={12} className={styles.sticky_page_bottom_bar}>
              <BottomBar
                applicationCardsOpen={applicationCardsOpen}
                applicationID={applicationDetails.ApplicationID}
                canEditApplication={canEditApplication}
                deleting={deleting}
                disableSubmit={
                  applicationDetails?.DateSubmitted ||
                  !(
                    applicationCardsOpen &&
                    agreements &&
                    applicationDetails?.Applicants?.length > 0 &&
                    applicationDetails?.ApartmentChoices?.filter(
                      (apartmentChoice) => apartmentChoice.HallName,
                    )?.length > 0
                  )
                }
                saving={saving}
                submitStatus={applicationDetails.DateSubmitted ? 'success' : submitStatus}
                unsavedChanges={unsavedChanges}
                onDeleteButtonClick={() => createDialog(DIALOG_PROPS.delete)}
                onSaveButtonClick={() => {
                  saveApartmentApplication(applicationDetails);
                }}
                onShowApplication={() => setApplicationCardsOpen(true)}
                onSubmitButtonClick={() => createDialog(DIALOG_PROPS.submit)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Backdrop open={deleting === true || saving === true || submitStatus === true}>
          <GordonLoader />
        </Backdrop>
        <GordonSnackbar
          open={snackbar.open}
          text={snackbar.message}
          severity={snackbar.severity}
          onClose={(_event, reason) =>
            reason !== 'clickaway' && setSnackbar((s) => ({ ...s, open: false }))
          }
        />
        <GordonDialogBox
          open={dialogProps.open}
          onClose={(_event, reason) =>
            reason !== 'clickaway' && setDialogProps((s) => ({ ...s, open: false }))
          }
          buttonClicked={() => {
            setDialogProps((prevProps) => {
              switch (prevProps.action) {
                case 'changeEditor':
                  handleChangeEditorAccepted();
                  break;
                case 'delete':
                  deleteApartmentApplication();
                  break;
                case 'submit':
                  submitApplication();
                  break;
                default:
                  console.error('Invalid dialog state');
              }
              return { ...prevProps, open: false };
            });
          }}
          buttonName={'Accept'}
          cancelButtonClicked={() => setDialogProps((s) => ({ ...s, open: false }))}
          severity={'warning'}
          {...dialogProps}
        >
          {dialogProps.text}
        </GordonDialogBox>
      </div>
    );
  }
};

export default StudentApplication;
