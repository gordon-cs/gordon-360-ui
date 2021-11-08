import http from './http';
import user from './user';

// TODO Create common type from user, this is a temporary shim type
type StudentProfileInfo = {
  Class: string;
  PersonType: string;
  Gender: string;
};

type ApartmentHall = {
  /** Number of people per room/apartment   (not yet implemented in API) */
  RoomCapacity: number;
  /** Gender ('M', 'F', or '' for both)   (not yet implemented in API) */
  Gender: 'M' | 'F' | '';
  Name: string;
};

type ApartmentApplicant = {
  ApplicationID: number;
  Profile: StudentProfileInfo;
  Username?: string;
  /** The birthday of this applicant (only visible to housing admin) */
  BirthDate?: Date;
  /** The age of the student (in years) (only visible to housing admin) */
  Age?: number;
  Class?: string;
  OffCampusProgram: string;
  /** Indicates whether the student has a disiplinary probation (visble only to housing admin) */
  Probation: string;
  /** The number of application points for this student (only visible to housing admin) */
  Points: number;
};

/**
 * Note: Properties 'HallRank' and 'HallName' must be capitalized to match the backend
 */
type ApartmentChoice = {
  ApplicationID?: number;
  HallRank: number;
  HallName: string;
};

type UnformattedApplicationDetails = {
  ApplicationID: number;
  DateSubmitted?: string;
  DateModified?: string;
  EditorProfile: StudentProfileInfo;
  EditorUsername?: string;
  EditorEmail?: string;
  Gender?: string;
  Applicants: ApartmentApplicant[];
  ApartmentChoices: ApartmentChoice[];
  TotalPoints: number;
  AvgPoints: number;
};

type ApplicationDetails = UnformattedApplicationDetails & {
  NumApplicants: number;
  FirstHall: string;
};

const checkHousingAdmin = async (): Promise<boolean> => {
  return await http.get(`housing/admin`);
};

const addHousingAdmin = (username: string): Promise<boolean> => {
  return http.post(`housing/admin/${username}/`);
};

const deleteHousingAdmin = (username: string): Promise<boolean> => {
  return http.del(`housing/admin/${username}/`);
};

const getApartmentSelectionDate = async (): Promise<string> => {
  return 'Apr. 27';
  // return await http.get('housing/apartment/selection-date); // Not yet implemented in the API
};

const getApartmentHalls = async (): Promise<ApartmentHall[]> => {
  return await http.get('housing/halls/apartments');
};

const getCurrentApplicationID = async (username: string = ''): Promise<number> => {
  return await http.get(`housing/apartment/${username}/`);
};

/**
 * Save the current state of the application to the database
 *
 * @param applicationDetails the ApplicationDetails object representing the state of this application
 * @returns Application's ID number //TODO: Update these API endpoints to return the ApplicationDetails rather than just the ApplicationID (Suggested by Dr. Tuck)
 */
const saveApartmentApplication = async (
  applicationDetails: UnformattedApplicationDetails,
): Promise<number> => {
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

const deleteApartmentApplication = async (applicationID: number): Promise<boolean> => {
  if (applicationID > 0) {
    return await http.del(`housing/apartment/applications/${applicationID}/`);
  } else {
    throw new Error(`Invalid applicationID: ${applicationID}`);
  }
};

const changeApartmentAppEditor = async (
  applicationID: number,
  newEditorUsername: string,
): Promise<boolean> => {
  let newEditorDetails = {
    ApplicationID: applicationID,
    EditorUsername: newEditorUsername,
  };
  return await http.put(
    `housing/apartment/applications/${applicationID}/editor/`,
    newEditorDetails,
  );
};

function formatApplicantInfo(applicant: ApartmentApplicant): ApartmentApplicant {
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
 * @param applicationDetails an object representing all of the details of a given apartment applications
 * @returns Application details after formatting
 */
function formatApplicationDetails(
  applicationDetails: UnformattedApplicationDetails,
): ApplicationDetails {
  console.debug(`formatting application # ${applicationDetails.ApplicationID}`);
  return {
    ...applicationDetails,
    EditorProfile: {
      ...applicationDetails.EditorProfile,
      PersonType: 'stu',
    },
    Gender: applicationDetails.EditorProfile.Gender,
    Applicants: (applicationDetails.Applicants ?? (applicationDetails.Applicants = [])).map(
      (applicant) => formatApplicantInfo(applicant),
    ),
    ApartmentChoices: applicationDetails.ApartmentChoices ?? [],
    NumApplicants: applicationDetails.Applicants?.length ?? 0,
    FirstHall: applicationDetails.ApartmentChoices[0]?.HallName ?? '',
  };
}

const getApartmentApplication = async (
  applicationID: number,
): Promise<UnformattedApplicationDetails> => {
  const applicationResult: UnformattedApplicationDetails = await http.get(
    `housing/apartment/applications/${applicationID}/`,
  );
  formatApplicationDetails(applicationResult);
  return applicationResult;
};

const getSubmittedApartmentApplications = async (): Promise<UnformattedApplicationDetails[]> => {
  const applicationDetailsArray: UnformattedApplicationDetails[] = await http.get(
    `housing/admin/apartment/applications/`,
  );
  applicationDetailsArray.forEach((applicationDetails) =>
    formatApplicationDetails(applicationDetails),
  );
  return applicationDetailsArray;
};

const submitApplication = async (applicationID: number): Promise<boolean> => {
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
