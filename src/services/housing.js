/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 *
 * @module housing
 */

import http from './http';
import user from './user';

/**
 * @typedef { import('./user').StudentProfileInfo } StudentProfileInfo
 */

/**
 * @global
 * @typedef ApartmentHall
 * @property {number} RoomCapacity Number of people per room/apartment   (not yet implemented in API)
 * @property {string} Gender Gender ('M', 'F', or '' for both)   (not yet implemented in API)
 * @property {string} Name The name of the hall
 */

/**
 * @global
 * @typedef ApartmentApplicant
 * @property {number} ApplicationID Application ID number of this application
 * @property {StudentProfileInfo} Profile The StudentProfileInfo object representing this applicant
 * @property {string} [Username] The username of this applicant
 * @property {DateTime} [BirthDate] The birthday of this applicant (only visible to housing admin)
 * @property {number} [Age] The age of the student (in years) (only visible to housing admin)
 * @property {string} [Class] Class
 * @property {string} OffCampusProgram The name of department of this applicant's off-campus program, or an empty string
 * @property {string} Probation Indicates whether the student has a disiplinary probation (visble only to housing admin)
 * @property {number} Points The number of application points for this student (only visible to housing admin)
 */

/**
 * Note: Properties 'HallRank' and 'HallName' must be capitalized to match the backend
 *
 * @global
 * @typedef ApartmentChoice
 * @property {number} [ApplicationID] Application ID number of this application
 * @property {number} HallRank The rank assigned to this hall by the user
 * @property {string} HallName The name of the apartment hall
 */

/**
 * @global
 * @typedef ApplicationDetails
 * @property {number} ApplicationID Application ID number of this application
 * @property {string} [DateSubmitted] The date the application was submitted, or null if not yet submitted
 * @property {string} [DateModified] The date the application was last modified, or null if not yet saved/modified
 * @property {StudentProfileInfo} EditorProfile The StudentProfileInfo object representing the application editor
 * @property {string} [EditorUsername] Username of the application editor
 * @property {string} [EditorEmail] Email address of the application editor
 * @property {string} [Gender] Gender
 * @property {ApartmentApplicant[]} Applicants Array of ApartmentApplicant objects
 * @property {ApartmentChoice[]} ApartmentChoices Array of ApartmentChoice objects
 * @property {number} TotalPoints The total application points associated with this application
 * @property {number} AvgPoints The average application points per applicant
 */

/**
 * Check if the current user is authorized to view the housing staff page for applications
 *
 * @async
 * @function checkHousingAdmin
 * @returns {Promise.<boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingAdmin = async () => {
  return await http.get(`housing/admin`);
};

/**
 * Add a user to the housing admin whitelist
 *
 * @param {string} username Username in firstname.lastname format
 * @returns {Response} response of http request
 */
const addHousingAdmin = (username) => {
  return http.post(`housing/admin/${username}/`);
};

/**
 * Delete a user to the housing admin whitelist
 *
 * @param {string} username Username in firstname.lastname format
 * @returns {Response} response of http request
 */
const deleteHousingAdmin = (username) => {
  return http.del(`housing/admin/${username}/`);
};

/**
 * Gets the date of apartment selection night
 *
 * @async
 * @function
 * @returns {Promise.<string>} The apartment selection date
 */
const getApartmentSelectionDate = async () => {
  return 'Apr. 27';
  // return await http.get('housing/apartment/selection-date); // Not yet implemented in the API
};

/**
 * Get the list of apartment halls from the database
 *
 * @async
 * @function getApartmentHalls
 * @returns {Promise.<ApartmentHall[]>} List of halls
 */
const getApartmentHalls = async () => {
  return await http.get('housing/halls/apartments');
};

/**
 * Check if a given student is on an existing application from the current semester
 *
 * @async
 * @function getCurrentApplicationID
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<number>} Application's ID number
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
 * @returns {Promise.<number>} Application's ID number //TODO: Update these API endpoints to return the ApplicationDetails rather than just the ApplicationID (Suggested by Dr. Tuck)
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
 * Delete the current application in the database
 *
 * @async
 * @function deleteApartmentApplication
 * @param {number} applicationID the application ID number
 * @returns {Promise.<boolean>} Status of whether or not the operation was successful
 */
const deleteApartmentApplication = async (applicationID) => {
  if (applicationID > 0) {
    return await http.del(`housing/apartment/applications/${applicationID}/`);
  } else {
    throw new Error(`Invalid applicationID: ${applicationID}`);
  }
};

/**
 * Update the application editor of the application to the database
 *
 * @async
 * @function changeApartmentAppEditor
 * @param {number} applicationID the application ID number
 * @param {string} newEditorUsername the student username of the person who will be allowed to edit this application
 * @returns {Promise.<boolean>} Status of whether or not the operation was successful
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
 * @function formatApplicantInfo
 * @param {ApartmentApplicant} applicant an object representing an apartment applicant
 * @returns {ApartmentApplicant} Applicant object after formatting
 */
function formatApplicantInfo(applicant) {
  // //! DEBUG: Temporary workaround for an API bug that causes 'Profile.PersonType' to be undefined
  // user.getProfileInfo(applicant.Username ?? applicant.Profile.AD_Username).then((profile) => {
  //   applicant.Profile = profile;
  // });

  applicant.Profile.PersonType = 'stu';
  user.setFullname(applicant.Profile);
  user.setClass(applicant.Profile);

  // The following 'Class' property is needed for the staff page
  if (applicant.Class === null || Number(applicant.Class)) {
    // Use converted Class from number ('1', '2', '3', ...) to words ('First Year', 'Sophomore', ...)
    applicant.Class = applicant.Profile.Class;
  }

  applicant.OffCampusProgram ?? (applicant.OffCampusProgram = '');

  return applicant;
}
/**
 * Helper function to fill in any missing or implied properties of an ApplicationDetails object, including properties required for the data table on the staff page
 *
 * @function formatApplicationDetails
 * @param {ApplicationDetails} applicationDetails an object representing all of the details of a given apartment applications
 * @returns {ApplicationDetails} Application details after formatting
 */
function formatApplicationDetails(applicationDetails) {
  console.debug(`formatting application # ${applicationDetails.ApplicationID}`);
  applicationDetails.EditorProfile.PersonType = 'stu';
  applicationDetails.Gender = applicationDetails.EditorProfile.Gender;
  applicationDetails.Applicants ?? (applicationDetails.Applicants = []);
  applicationDetails.Applicants = applicationDetails.Applicants.map((applicant) =>
    formatApplicantInfo(applicant),
  );
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
 * @param {number} applicationID the application ID number for the desired application
 * @returns {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  let applicationResult = await http.get(`housing/apartment/applications/${applicationID}/`);
  formatApplicationDetails(applicationResult);
  return applicationResult;
};

/**
 * Get active apartment applications for the current semester
 *
 * @async
 * @function getSubmittedApartmentApplications
 * @returns {Promise.<ApplicationDetails>[]} Application details
 */
const getSubmittedApartmentApplications = async () => {
  let applicationDetailsArray = await http.get(`housing/admin/apartment/applications/`);
  applicationDetailsArray.forEach((applicationDetails) =>
    formatApplicationDetails(applicationDetails),
  );
  return applicationDetailsArray;
};

/**
 * Submit the current application
 *
 * @async
 * @function submitApplication
 * @param {number} applicationID the application ID number for the desired application
 * @returns {Promise.<boolean>} Status of whether the application was successfully marked as submitted
 */
const submitApplication = async (applicationID) => {
  return await http.put(`housing/apartment/applications/${applicationID}/submit`);
};

const housingService = {
  checkHousingAdmin,
  addHousingAdmin,
  deleteHousingAdmin,
  getApartmentSelectionDate,
  getApartmentHalls,
  getCurrentApplicationID,
  saveApartmentApplication,
  deleteApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
  getSubmittedApartmentApplications,
  submitApplication,
};

export default housingService;
