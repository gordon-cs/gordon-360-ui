/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import { AuthError, NotFoundError } from './error';
import http from './http';
import user from './user';

/**
 * @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef boolean
 * @property {status}
 *
 */

/**
 * @global
 * @typedef ApartmentHall
 * @property {Number} RoomCapacity Number of people per room/apartment   (not yet implemented in API)
 * @property {String} Gender Gender ('M', 'F', or '' for both)   (not yet implemented in API)
 * @property {String} Name The name of the hall
 */

/**
 * @global
 * @typedef ApartmentApplicant
 * @property {Number} ApplicationID Application ID number of this application
 * @property {StudentProfileInfo} Profile The StudentProfileInfo object representing this applicant
 * @property {String} [Username] The username of this applicant
 * @property {DateTime} [BirthDate] The birthday of this applicant (only visible to housing admin)
 * @property {Number} [Age] The age of the student (in years) (only visible to housing admin)
 * @property {String} [Class] Class
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or '' (empty string)
 * @property {String} Probation Indicates whether the student has a disiplinary probation (visble only to housing admin)
 * @property {Number} Points The number of application points for this student (only visible to housing admin)
 */

/**
 * Note: Properties 'HallRank' and 'HallName' must be capitalized to match the backend
 * @global
 * @typedef ApartmentChoice
 * @property {Number} [ApplicationID] Application ID number of this application
 * @property {Number} HallRank The rank assigned to this hall by the user
 * @property {String} HallName The name of the apartment hall
 */

/**
 * @global
 * @typedef ApplicationDetails
 * @property {Number} ApplicationID Application ID number of this application
 * @property {String} [DateSubmitted] The date the application was submitted, or null if not yet submitted
 * @property {String} [DateModified] The date the application was last modified, or null if not yet saved/modified
 * @property {StudentProfileInfo} EditorProfile The StudentProfileInfo object representing the application editor
 * @property {String} [EditorUsername] Username of the application editor
 * @property {String} [EditorEmail] Email address of the application editor
 * @property {String} [Gender] Gender
 * @property {ApartmentApplicant[]} Applicants Array of ApartmentApplicant objects
 * @property {ApartmentChoice[]} ApartmentChoices Array of ApartmentChoice objects
 * @property {Number} TotalPoints The total application points associated with this application
 * @property {Number} AvgPoints The average application points per applicant
 */

// const customErrorHandler = async () => {};

/**
 * Check if the current user is authorized to view the housing staff page for applications
 *
 * @async
 * @function checkHousingAdmin
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingAdmin = async () => {
  return await http.get(`housing/admin`);
};

/**
 * Add a user to the housing admin whitelist
 * @param {String} username Username in firstname.lastname format
 * @return {Response} response of http request
 */
const addHousingAdmin = (username) => {
  return http.post(`housing/admin/${username}/`);
};

/**
 * Delete a user to the housing admin whitelist
 * @param {String} username Username in firstname.lastname format
 * @return {Response} response of http request
 */
const deleteHousingAdmin = (username) => {
  return http.del(`housing/admin/${username}/`);
};

/**
 * Gets the date of apartment selection night
 *
 * @async
 * @function
 * @returns {Promise.<String>} The apartment selection date
 */
const getApartmentSelectionDate = async () => {
  return 'Apr. 27';
  // return http.get('housing/apartment/selection-date); // Not yet implemented in the API
};

/**
 * Get the list of apartment halls from the database
 *
 * @async
 * @function getApartmentHalls
 * @return {Promise.<ApartmentHall[]>} List of halls
 */
const getApartmentHalls = async () => {
  return http.get('housing/halls/apartments');
};

/**
 * Check if a given student is on an existing application from the current semester
 *
 * @async
 * @function getCurrentApplicationID
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<Number>} Application's ID number
 */
const getCurrentApplicationID = async (username) => {
  if (username) {
    return await http.get(`housing/apartment/${username}/`);
  } else {
    return await http.get('housing/apartment');
  }
};

/**
 * Save the current state of the application to the database
 *
 * @async
 * @function saveApartmentApplication
 * @param {ApplicationDetails} applicationDetails the ApplicationDetails object representing the state of this application
 * @return {Promise.<Number>} Application's ID number //TODO: Update these API endpoints to return the ApplicationDetails rather than just the ApplicationID (Suggested by Dr. Tuck)
 */
const saveApartmentApplication = async (applicationDetails) => {
  // Filter out any hall entries that do not have a name selected
  applicationDetails = {
    ...applicationDetails,
    ApartmentChoices: applicationDetails.ApartmentChoices.filter(
      (apartmentChoice) => apartmentChoice.HallName,
    ),
  };

  const applicationID = applicationDetails.ApplicationID;
  if (applicationID > 0) {
    return await http.put(`housing/apartment/applications/${applicationID}/`, applicationDetails);
  } else {
    return await http.post(`housing/apartment/applications/`, applicationDetails);
  }
};

/**
 * Update the application editor of the application to the database
 *
 * @async
 * @function changeApartmentAppEditor
 * @param {Number} applicationID the application ID number
 * @param {String} newEditorUsername the student username of the person who will be allowed to edit this application
 * @return {Promise.<Boolean>} Status of whether or not the operation was successful
 */
const changeApartmentAppEditor = async (applicationID, newEditorUsername) => {
  let newEditorDetails = {
    ApplicationID: applicationID,
    EditorUsername: newEditorUsername,
  };
  return await http.put(
    `housing/apartment/applications/${applicationID}/editor/`,
    newEditorDetails,
  );
};

/**
 * Helper function to fill in any missing properties of an applicant object's Profile, OffCampusProgram, etc.
 *
 * @function setApplicantInfo
 * @param {ApartmentApplicant} applicant an object representing an apartment applicant
 * @return {ApartmentApplicant} Application details
 */
function setApplicantInfo(applicant) {
  //! DEBUG: Temporary workaround for an API bug that causes 'Profile.PersonType' to be undefined
  user.getProfileInfo(applicant.Username ?? applicant.Profile.AD_Username).then((profile) => {
    applicant.Profile = profile;
  });

  /**
   * The following commented out commands are implicitly handled by `user.getProfileInfo()`,
   * so these lines are not needed while the above workaround is still in place
   */
  //? This is the ideal solution. Requires more testing after the 'PersonType' issue is fixed in the API
  // user.setFullname(applicant.Profile);
  // user.setClass(applicant.Profile);

  if (applicant.Class === null || Number(applicant.Class)) {
    // Use converted Class from number ('1', '2', '3', ...) to words ('Freshman', 'Sophomore', ...)
    applicant.Class = applicant.Profile.Class;
  }

  applicant.OffCampusProgram ?? (applicant.OffCampusProgram = '');

  return applicant;
}

function setApplicationDetails(applicationDetails) {
  console.debug(`formatting application # ${applicationDetails.ApplicationID}`);
  applicationDetails.Gender = applicationDetails.EditorProfile.Gender;
  applicationDetails.Applicants =
    applicationDetails.Applicants?.map((applicant) => setApplicantInfo(applicant)) ?? [];
  applicationDetails.ApartmentChoices ?? (applicationDetails.ApartmentChoices = []);
  applicationDetails.NumApplicants = applicationDetails.Applicants?.length ?? 0;
  applicationDetails.FirstHall = applicationDetails.ApartmentChoices[0]?.HallName ?? '';
  return applicationDetails;
}

/**
 * Get active apartment application for given application ID number
 *
 * @async
 * @function getApartmentApplication
 * @param {Number} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  let applicationResult = await http.get(`housing/apartment/applications/${applicationID}/`);
  setApplicationDetails(applicationResult);
  return applicationResult;
};

/**
 * Get active apartment applications for the current semester
 *
 * @async
 * @function getSubmittedApartmentApplications
 * @return {Promise.<ApplicationDetails>[]} Application details
 */
const getSubmittedApartmentApplications = async () => {
  let result = [];
  try {
    let applicationDetailsArray = await http.get(`housing/admin/apartment/applications/`);
    applicationDetailsArray.forEach((applicationDetails) =>
      setApplicationDetails(applicationDetails),
    );
    result = applicationDetailsArray; // This is intensionally done first, rather than inside an 'else'
  } catch (err) {
    if (err instanceof AuthError) {
      console.log('Received 401 (Unauthorized)');
    } else if (err instanceof NotFoundError) {
      console.log('Received 404 indicates that no applications were found in the database');
    } else {
      throw err;
    }
    result = []; // Return an empty array if no applications were found
  } finally {
    console.log(result); //! DEBUG:
    return result;
  }
};

/**
 * Submit the current application
 *
 * @async
 * @function submitApplication
 * @param {Number} applicationID the application ID number for the desired application
 * @return {Promise.<Boolean>[]} Application details
 */
const submitApplication = async (applicationID) => {
  return http.post(`housing/apartment/applications/${applicationID}/submit`);
};

export default {
  checkHousingAdmin,
  addHousingAdmin,
  deleteHousingAdmin,
  getApartmentSelectionDate,
  getApartmentHalls,
  getCurrentApplicationID,
  saveApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
  getSubmittedApartmentApplications,
  submitApplication,
};
