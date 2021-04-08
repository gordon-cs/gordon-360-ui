/**
 * Housing API call functions
 * establishes the functions necessary to make calls to the back end.
 * @module housing
 */

import http from './http';
import './user'; // Needed for typedef of StudentProfileInfo

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
 * @property {String} Username The username of this applicant
 * @property {DateTime} [BirthDate] The birthday of this applicant (only visible to housing admin)
 * @property {Number} [Age] The age of the student (in years) (only visible to housing admin)
 * @property {String} Class Class
 * @property {String} OffCampusProgram The name of department of this applicant's off-campus program, or 'None'
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
 * @property {DateTime} [DateSubmitted] The date the application was submitted, or null if not yet submitted
 * @property {DateTime} [DateModified] The date the application was last modified
 * @property {StudentProfileInfo} EditorProfile The StudentProfileInfo object representing the application editor
 * @property {String} EditorUsername Username of the application editor
 * @property {String} [EditorEmail] Email address of the application editor
 * @property {String} [Gender] Gender
 * @property {ApartmentApplicant[]} Applicants Array of ApartmentApplicant objects
 * @property {ApartmentChoice[]} ApartmentChoices Array of ApartmentChoice objects
 * @property {Number} TotalPoints The total application points associated with this application
 * @property {Number} AvgPoints The average application points per applicant
 */

/**
 * Check if the current user is authorized to view the housing staff page for applications
 *
 * @async
 * @function checkHousingAdmin
 * @return {Promise.<Boolean>} True if the user is authorized to view the housing application staff page
 */
const checkHousingAdmin = async () => {
  try {
    return await http.get(`housing/admin`);
  } catch (err) {
    // handle thrown 404 errors
    if (err.status === 404 || err.name.includes('NotFound')) {
      console.log('A 404 code indicates that current user was not found on the list of admins');
    } else {
      throw err;
    }
    return false;
  }
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
  try {
    if (username) {
      return await http.get(`housing/apartment/${username}/`);
    } else {
      return await http.get('housing/apartment');
    }
  } catch (err) {
    // handle thrown 404 errors
    if (err.status === 404 || err.name.includes('NotFound')) {
      console.log('A 404 code indicates that an application was not found for this applicant');
    } else {
      throw err;
    }
    return null;
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
 * Get active apartment application for given application ID number
 *
 * @async
 * @function getApartmentApplication
 * @param {Number} applicationID the application ID number for the desired application
 * @return {Promise.<ApplicationDetails>} Application details
 */
const getApartmentApplication = async (applicationID) => {
  try {
    return await http.get(`housing/apartment/applications/${applicationID}/`);
  } catch (err) {
    if (err?.status === 404 || err?.name?.includes('NotFound')) {
      console.log(
        'Received 404 indicates that the requested application was not found in the database',
      );
    } else {
      throw err;
    }
    return null;
  }
};

/**
 * Get active apartment applications for the current semester
 *
 * @async
 * @function getAllApartmentApplications
 * @return {Promise.<ApplicationDetails>[]} Application details
 */
const getAllApartmentApplications = async () => {
  try {
    return await http.get(`housing/admin/apartment/applications/`);
  } catch (err) {
    if (err?.status === 404 || err?.name?.includes('NotFound')) {
      console.log('Received 404 indicates that no applications were found in the database');
    } else {
      throw err;
    }
    return []; // Return an empty array if no applications were found
  }
};

export default {
  checkHousingAdmin,
  addHousingAdmin,
  deleteHousingAdmin,
  getApartmentHalls,
  getCurrentApplicationID,
  saveApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
  getAllApartmentApplications,
};
