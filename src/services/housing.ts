import http from './http';
import { Class } from './peopleSearch';
import { StudentProfileInfo, UnformattedStudentProfileInfo } from './user';
import { map } from './utils';

type ApartmentHall = {
  /** Number of people per room/apartment   (not yet implemented in API) */
  RoomCapacity: number;
  /** Gender ('M', 'F', or '' for both)   (not yet implemented in API) */
  Gender: 'M' | 'F' | '';
  Name: string;
};

type ApartmentApplicant = {
  ApplicationID: number;
  Profile: UnformattedStudentProfileInfo;
  Username?: string;
  /** The birthday of this applicant (only visible to housing admin) */
  BirthDate?: Date;
  /** The age of the student (in years) (only visible to housing admin) */
  Age?: number;
  Class?: Class;
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

const getApartmentSelectionDate = async (): Promise<string> => {
  return 'Apr. 14';
  // return await http.get('housing/apartment/selection-date); // Not yet implemented in the API
};

const getApartmentHalls = (): Promise<ApartmentHall[]> => http.get('housing/halls/apartments');
const getTraditionalHalls = (): Promise<ApartmentHall[]> => http.get('housing/halls/traditionals');
const getAllPreference = (): Promise<ApartmentHall[]> =>
  http.get('housing/housing_lottery/all_preference');
const getAllPreferredHall = (): Promise<ApartmentHall[]> =>
  http.get('housing/housing_lottery/all_preferred_hall');
const getAllApplicant = (): Promise<ApartmentHall[]> =>
  http.get('housing/housing_lottery/all_applicant');
const getAllSchoolYear = (): Promise<ApartmentHall[]> =>
  http.get('housing/housing_lottery/all_school_year');
const getDueDate = (): Promise<ApartmentHall[]> => http.get('housing/housing_lottery/get_due_date');

const getCurrentApplicationID = (username: string = ''): Promise<number> =>
  http.get(username ? `housing/apartment/${username}/` : 'housing/apartment/');

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
  applicant.Profile.fullName = `${applicant.Profile.FirstName} ${applicant.Profile.LastName}`;

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
    FirstHall: applicationDetails.ApartmentChoices?.[0]?.HallName ?? '',
  };
}

const getApartmentApplication = async (applicationID: number): Promise<ApplicationDetails> =>
  http
    .get<UnformattedApplicationDetails>(`housing/apartment/applications/${applicationID}/`)
    .then(formatApplicationDetails);

const getSubmittedApartmentApplications = async (): Promise<ApplicationDetails[]> =>
  http
    .get<UnformattedApplicationDetails[]>(`housing/admin/apartment/applications/`)
    .then(map(formatApplicationDetails));

const submitApplication = (applicationID: number): Promise<boolean> =>
  http.put(`housing/apartment/applications/${applicationID}/submit`);

const addApplicant = (applicantion_id: string, emailList: string[]) =>
  http.put(`housing/housing_lottery/roommate/${applicantion_id}`, emailList);

const addHall = (applicantion_id: string, hallList: string[]) =>
  http.put(`housing/housing_lottery/hall/${applicantion_id}`, hallList);

const addPreference = (applicantion_id: string, preferenceList: string[]) =>
  http.put(`housing/housing_lottery/preference/${applicantion_id}`, preferenceList);

const addDueDate = (dueDate: string) => http.put(`housing/housing_lottery/due_date/`, dueDate);

const housingService = {
  getApartmentSelectionDate,
  getApartmentHalls,
  getTraditionalHalls,
  getAllPreference,
  getAllPreferredHall,
  getAllApplicant,
  getAllSchoolYear,
  getDueDate,
  getCurrentApplicationID,
  saveApartmentApplication,
  deleteApartmentApplication,
  changeApartmentAppEditor,
  getApartmentApplication,
  getSubmittedApartmentApplications,
  submitApplication,
  addApplicant,
  addHall,
  addPreference,
  addDueDate,
};

export default housingService;
