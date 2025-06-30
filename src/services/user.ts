import { isToday } from 'date-fns';
import { Platform, platforms, socialMediaInfo } from 'services/socialMedia';
import CliftonStrengthsService, { CliftonStrengths } from './cliftonStrengths';
import http from './http';
import { Participation } from './membership';
import { Class } from './peopleSearch';
import { Override } from './utils';

export type ProfileStringItem = {
  value: string;
  isPrivate: boolean;
};

// **** Reserved for future use ****
// type ProfileNumberItem = {
//   value: number;
//   isPrivate: boolean;
// };

enum OnOffCampusStatus {
  'Off Campus' = 'O',
  Away = 'A',
  Remote = 'D',
  'Private' = 'P',
  'On Campus' = '',
}

type OnOffCampusDescription = keyof typeof OnOffCampusStatus;

const onOffCampusDescriptions = {
  O: 'Off Campus' as OnOffCampusDescription,
  A: 'Away' as OnOffCampusDescription,
  D: 'Remote' as OnOffCampusDescription,
  P: 'Private' as OnOffCampusDescription,
  '': 'On Campus' as OnOffCampusDescription,
};

type BaseProfileInfo = {
  ID: string;
  Title: string;
  FirstName: ProfileStringItem;
  MiddleName: ProfileStringItem;
  LastName: ProfileStringItem;
  Suffix: ProfileStringItem;
  MaidenName: ProfileStringItem;
  NickName: ProfileStringItem;
  OnCampusBuilding: string;
  OnCampusRoom: string;
  OnCampusPhone: string;
  OnCampusPrivatePhone: string;
  OnCampusFax: string;
  PersonalEmail?: string;
  WorkEmail?: string;
  altEmail?: string;
  PreferredEmail?: string;
  doNotContact?: boolean;
  doNotMail?: boolean;
  WorkPhone?: string;
  MobilePhone?: ProfileStringItem;
  IsMobilePhonePrivate: number;
  PreferredPhone?: string;
  Mail_Location: string;
  HomeStreet1: ProfileStringItem;
  HomeStreet2: ProfileStringItem;
  HomeCity: ProfileStringItem;
  HomeState: ProfileStringItem;
  HomePostalCode: ProfileStringItem;
  HomeCountry: ProfileStringItem;
  HomePhone: ProfileStringItem;
  HomeFax: string;
  KeepPrivate: string;
  Barcode: string;
  Email: string;
  Gender: string;
  AD_Username: string;
  show_pic: number;
  preferred_photo: number;
  Country: ProfileStringItem;
  BuildingDescription: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  Handshake: string;
  LinkedIn: string;
  Calendar: string;
  PersonType: string;
  fullName?: string;
  CliftonStrengths: CliftonStrengths | null;
  Married?: string;
  SpouseName: ProfileStringItem;
};

export type UnformattedFacStaffProfileInfo = BaseProfileInfo & {
  Dept: string;
  JobTitle: string;
  OnCampusDepartment: string;
  Type: string;
  FirstHireDt: string;
  office_hours: string;
  Mail_Description: string;
};

export type UnformattedStudentProfileInfo = BaseProfileInfo & {
  Entrance_Date: string;
  OnOffCampus: OnOffCampusStatus;
  OffCampusStreet1: string;
  OffCampusStreet2: string;
  OffCampusCity: string;
  OffCampusState: string;
  OffCampusPostalCode: string;
  OffCampusCountry: string;
  OffCampusPhone: string;
  OffCampusFax: string;
  Hall?: string;
  Cohort: string;
  Class: Class;
  Major: string;
  AdvisorIDs: string;
  /** Whether student is married or not ('Y' or 'N') */
  Married: string;
  /** Whether student ia commuter or not ('Y' or 'N') */
  Commuter: string;
  Major2: string;
  /** Whether student is a graduate student or not ('Y' or 'N') */
  grad_student: string;
  GradDate: string;
  Major3: string;
  Minor1: string;
  Minor2: string;
  Minor3: string;
  MobilePhone: ProfileStringItem;
  IsMobilePhonePrivate: number;
  Major1Description: string;
  Major2Description: string;
  Major3Description: string;
  Minor1Description: string;
  Minor2Description: string;
  Minor3Description: string;
  ChapelRequired: number;
  ChapelAttended: number;
  PlannedGradYear: string;
};

type UnformattedAlumniProfileInfo = BaseProfileInfo & {
  WebUpdate?: string;
  HomeEmail: string;
  MaritalStatus: string;
  College: string;
  ClassYear: string;
  PreferredClassYear?: string;
  ShareName: string;
  ShareAddress?: string;
  Majors: string[];
  Major1Description: string;
  Major2Description: string;
};

export type UnformattedProfileInfo =
  | UnformattedFacStaffProfileInfo
  | UnformattedStudentProfileInfo
  | UnformattedAlumniProfileInfo
  | null;

export type FacStaffProfileInfo = UnformattedFacStaffProfileInfo & {
  fullName: string;
};

export type AlumniProfileInfo = UnformattedAlumniProfileInfo & {
  fullName: string;
};

export type StudentProfileInfo = {
  fullName: string;
  Majors: string[];
  Minors: string[];
} & Override<UnformattedStudentProfileInfo, { OnOffCampus: OnOffCampusDescription }>;

export type Profile = FacStaffProfileInfo | StudentProfileInfo | AlumniProfileInfo;

export type StudentAdvisorInfo = {
  Firstname: string;
  Lastname: string;
  AD_Username: string;
};

type DiningInfo = {
  ChoiceDescription: string;
  Swipes: MealPlanComponent;
  DiningDollars: MealPlanComponent;
  CurrentBalance: MealPlanComponent;
};

type MealPlanComponent = {
  PlanDescription: string;
  PlanID: string;
  InitialBalance: number;
  CurrentBalance: string;
};

export type ProfileImages = { def: string; pref?: string };

export type OfficeLocationQuery = {
  BuildingCode: string;
  RoomNumber: string;
};

export type UserPrivacyQuery = {
  Field: string[];
  VisibilityGroup: string;
};

export function isStudent(profile: Profile): profile is StudentProfileInfo;
export function isStudent(
  profile: UnformattedProfileInfo,
): profile is UnformattedStudentProfileInfo;
export function isStudent(
  profile: UnformattedProfileInfo | Profile,
): profile is UnformattedStudentProfileInfo | StudentProfileInfo {
  return profile?.PersonType.includes('stu') || false;
}

export function isFacStaff(profile: Profile): profile is FacStaffProfileInfo;
export function isFacStaff(
  profile: UnformattedProfileInfo,
): profile is UnformattedFacStaffProfileInfo;
export function isFacStaff(
  profile: UnformattedProfileInfo | Profile,
): profile is UnformattedStudentProfileInfo | StudentProfileInfo {
  return profile?.PersonType.includes('fac') || false;
}

export function isAlumni(profile: Profile): profile is AlumniProfileInfo;
export function isAlumni(profile: UnformattedProfileInfo): profile is UnformattedAlumniProfileInfo;
export function isAlumni(
  profile: UnformattedProfileInfo | Profile,
): profile is UnformattedAlumniProfileInfo | AlumniProfileInfo {
  return profile?.PersonType.includes('alu') || false;
}

function formatCountry(profile: UnformattedProfileInfo) {
  if (profile?.Country?.value.includes(',')) {
    const country = profile.Country.value;
    const commaIndex = country.indexOf(',');
    profile.Country.value = `${country.slice(commaIndex + 2)} ${country.slice(0, commaIndex)}`;
  }
  return profile;
}

const formatSocialMediaLinks = (profile: UnformattedProfileInfo) => {
  if (profile) {
    platforms.forEach(
      (platform) =>
        (profile[platform] = profile[platform]
          ? socialMediaInfo[platform].prefix + decodeURIComponent(profile[platform])
          : ''),
    );
  }
  return profile;
};

const getImage = (username: string = ''): Promise<ProfileImages> =>
  http.get(`profiles/image/${username}`);

const resetImage = (): Promise<void> => http.post('profiles/image/reset');

const postIDImage = (imageDataURI: string): Promise<void> =>
  http.postImage('profiles/IDimage', imageDataURI);

const postImage = (imageDataURI: string): Promise<void> =>
  http.postImage('profiles/image', imageDataURI);

const getDiningInfo = (): Promise<DiningInfo | string> => http.get('dining');

const getProfile = (username: string = ''): Promise<UnformattedProfileInfo> =>
  http.get(`profiles/${username}`);

const getAdvisors = (username: string): Promise<StudentAdvisorInfo[]> =>
  http.get(`profiles/Advisors/${username}/`);

const getMailboxInformation = (): Promise<{ Combination: string }> =>
  http.get('profiles/mailbox-information/');

const getVisibilityGroups = (): Promise<string[]> => http.get(`profiles/visibility_groups`);

const getPrivacySetting = (username: string): Promise<string> =>
  http.get(`profiles/${username}/privacy_settings/`);

const getMailStops = (): Promise<string[]> => http.get(`profiles/mailstops`);

const setMobilePhoneNumber = (value: number | string) =>
  http.put(`profiles/mobile_phone_number/${value}/`);

const setPlannedGraduationYear = (value: number | string) => {
  const body = { plannedGradYear: value };
  http.put(`profiles/plannedGradYear`, body);
};

const updateMailStop = (value: string) => http.put(`profiles/mailstop`, value);

const updateOfficeLocation = (OfficeLocation: OfficeLocationQuery) =>
  http.put(`profiles/office_location`, OfficeLocation);

const updateOfficeHours = (value: string) => http.put(`profiles/office_hours`, value);

const setMobilePhonePrivacy = (makePrivate: boolean) =>
  http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N')); // 'Y' = private, 'N' = public

const setUserPrivacy = (userPrivacy: UserPrivacyQuery) =>
  http.put(`profiles/user_privacy`, userPrivacy);

const setImagePrivacy = (makePrivate: boolean) =>
  http.put('profiles/image_privacy/' + (makePrivate ? 'N' : 'Y')); // 'Y' = show image, 'N' = don't show image

const getBirthdate = (): Promise<Date> =>
  http.get<string>('profiles/birthdate').then((birthdate) => new Date(birthdate));

const isBirthdayToday = (): Promise<boolean> => {
  return getBirthdate().then(
    (birthdate) =>
      birthdate.getMonth() == new Date().getMonth() &&
      birthdate.getDate() == new Date().getDate() &&
      birthdate.getFullYear() > 1800, // Birth in 1800 means no birthday in database
  );
};

const getProfileInfo = async (username: string = ''): Promise<Profile | undefined> => {
  const profile = await getProfile(username).then(formatCountry).then(formatSocialMediaLinks);

  if (!profile) return undefined;

  const fullName = `${profile?.FirstName.value} ${profile?.LastName.value}`;
  const cliftonStrengths = await CliftonStrengthsService.getCliftonStrengths(profile.AD_Username);

  if (isStudent(profile)) {
    return {
      ...profile,
      fullName,
      CliftonStrengths: cliftonStrengths,
      Majors: [
        profile.Major1Description,
        profile.Major2Description,
        profile.Major3Description,
      ].filter(Boolean),
      Minors: [
        profile.Minor1Description,
        profile.Minor2Description,
        profile.Minor3Description,
      ].filter(Boolean),
      OnOffCampus: onOffCampusDescriptions[profile.OnOffCampus],
    };
  } else {
    return {
      ...profile,
      fullName,
      CliftonStrengths: cliftonStrengths,
    };
  }
};

type Contact = {
  FirstName?: string;
  LastName?: string;
  Relationship?: string;
  MobilePhone: string;
  HomePhone: string;
  WorkPhone: string;
};

const getEmergencyInfo = async (username: string): Promise<Contact[]> => {
  return await http.get(`profiles/emergency-contact/${username}/`);
};

function updateSocialLink(platform: Platform, link: string) {
  const { prefix, prefix2 } = socialMediaInfo[platform];
  const linkToSend =
    prefix2 && link.indexOf(prefix2) === 0
      ? link.substring(prefix2.length)
      : link.substring(prefix.length);

  const body = {
    [platform]: encodeURIComponent(linkToSend),
  };

  return http.put('profiles/' + platform.toLowerCase(), body);
}

type ProfileFieldUpdate = {
  Field: string;
  Value: string | boolean;
  Label: string;
};

const requestInfoUpdate = (updatedFields: ProfileFieldUpdate[]) =>
  http.post('profiles/update/', updatedFields);

export type MembershipHistory = {
  ActivityCode: string;
  // TODO: Get ActivityType from DB for categorization
  // activityType: string;
  ActivityDescription: string;
  ActivityImagePath: string;
  Sessions: MembershipHistorySession[];
  LatestDate: string;
};

export type MembershipHistorySession = {
  MembershipID: number;
  SessionCode: string;
  Participation: Participation;
};

export type Graduation = {
  WhenGraduated: string;
  GraduationFlag: string;
};

const getMembershipHistory = (username: string): Promise<MembershipHistory[]> =>
  http.get(`profiles/${username}/memberships-history`);

const getGraduation = (username: string): Promise<Graduation> =>
  http.get(`profiles/${username}/graduation`);

const userService = {
  setMobilePhonePrivacy,
  setUserPrivacy,
  setPlannedGraduationYear,
  setMobilePhoneNumber,
  updateMailStop,
  updateOfficeLocation,
  updateOfficeHours,
  setImagePrivacy,
  getMailStops,
  getImage,
  getDiningInfo,
  getProfileInfo,
  getAdvisors,
  getMailboxInformation,
  getMembershipHistory,
  getVisibilityGroups,
  getPrivacySetting,
  getGraduation,
  resetImage,
  postImage,
  postIDImage,
  requestInfoUpdate,
  getEmergencyInfo,
  updateSocialLink,
  isBirthdayToday,
  isStudent,
};

export default userService;
