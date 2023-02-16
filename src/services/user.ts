import { DateTime } from 'luxon';
import { Platform, platforms, socialMediaInfo } from 'services/socialMedia';
import CliftonStrengthsService, { CliftonStrengths } from './cliftonStrengths';
import { Class } from './peopleSearch';
import http from './http';
import { Override } from './utils';

type CLWCredits = {
  current: number;
  required: number;
};

enum OnOffCampusStatus {
  'Off Campus' = 'O',
  Away = 'A',
  Remote = 'D',
  'Private as requested.' = 'P',
  'On Campus' = '',
}

type OnOffCampusDescription = keyof typeof OnOffCampusStatus;

const onOffCampusDescriptions = {
  O: 'Off Campus' as OnOffCampusDescription,
  A: 'Away' as OnOffCampusDescription,
  D: 'Remote' as OnOffCampusDescription,
  P: 'Private as requested.' as OnOffCampusDescription,
  '': 'On Campus' as OnOffCampusDescription,
};

type BaseProfileInfo = {
  ID: string;
  Title: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix: string;
  MaidenName: string;
  NickName: string;
  OnCampusBuilding: string;
  OnCampusRoom: string;
  OnCampusPhone: string;
  OnCampusPrivatePhone: string;
  OnCampusFax: string;
  Mail_Location: string;
  HomeStreet1: string;
  HomeStreet2: string;
  HomeCity: string;
  HomeState: string;
  HomePostalCode: string;
  HomeCountry: string;
  HomePhone: string;
  HomeFax: string;
  KeepPrivate: string;
  Barcode: string;
  Email: string;
  Gender: string;
  AD_Username: string;
  show_pic: number;
  preferred_photo: number;
  Country: string;
  BuildingDescription: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  Handshake: string;
  LinkedIn: string;
  PersonType: string;
  fullName?: string;
  CliftonStrengths?: CliftonStrengths | null;
};

export type UnformattedFacStaffProfileInfo = BaseProfileInfo & {
  Dept: string;
  JobTitle: string;
  OnCampusDepartment: string;
  SpouseName: string;
  Type: string;
  office_hours: string;
  Mail_Description: string;
};

export type UnformattedStudentProfileInfo = BaseProfileInfo & {
  OnOffCampus: OnOffCampusStatus;
  OffCampusStreet1: string;
  OffCampusStreet2: string;
  OffCampusCity: string;
  OffCampusState: string;
  OffCampusPostalCode: string;
  OffCampusCountry: string;
  OffCampusPhone: string;
  OffCampusFax: string;
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
  MobilePhone: string;
  IsMobilePhonePrivate: number;
  Major1Description: string;
  Major2Description: string;
  Major3Description: string;
  Minor1Description: string;
  Minor2Description: string;
  Minor3Description: string;
  ChapelRequired: number;
  ChapelAttended: number;
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
  Advisors: StudentAdvisorInfo[];
} & Override<UnformattedStudentProfileInfo, { OnOffCampus: OnOffCampusDescription }>;

export type Profile = FacStaffProfileInfo | StudentProfileInfo | AlumniProfileInfo;

type StudentAdvisorInfo = {
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

const isStudent = (profile: UnformattedProfileInfo): profile is UnformattedStudentProfileInfo =>
  profile?.PersonType.includes('stu') || false;

function formatCountry(profile: UnformattedProfileInfo) {
  if (profile?.Country?.includes(',')) {
    const country = profile.Country;
    const commaIndex = country.indexOf(',');
    profile.Country = `${country.slice(commaIndex + 2)} ${country.slice(0, commaIndex)}`;
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

// TODO: get chapel credits from useUser, making this obsolete.
const getChapelCredits = async (): Promise<CLWCredits | null> => {
  const profile = await getProfile();

  return isStudent(profile)
    ? {
        current: profile.ChapelAttended || 0,
        required: profile.ChapelRequired,
      }
    : null;
};

const getDiningInfo = (): Promise<DiningInfo | string> => http.get('dining');

const getProfile = (username: string = ''): Promise<UnformattedProfileInfo> =>
  http.get(`profiles/${username}`);

const getAdvisors = (username: string): Promise<StudentAdvisorInfo[]> =>
  http.get(`profiles/Advisors/${username}/`);

const getMailboxCombination = () => http.get('profiles/mailbox-combination/');

const setMobilePhoneNumber = (value: number) => http.put(`profiles/mobile_phone_number/${value}/`);

const setMobilePhonePrivacy = (makePrivate: boolean) =>
  http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N')); // 'Y' = private, 'N' = public

const setHomePhonePrivacy = (makePrivate: boolean) =>
  http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N')); // 'Y' = private, 'N' = public

const setImagePrivacy = (makePrivate: boolean) =>
  http.put('profiles/image_privacy/' + (makePrivate ? 'N' : 'Y')); // 'Y' = show image, 'N' = don't show image

const getEmployment = () => http.get('studentemployment/');

const getBirthdate = async (): Promise<DateTime> =>
  DateTime.fromISO(await http.get('profiles/birthdate'));

const isBirthdayToday = async () => {
  const birthday = await getBirthdate();
  return birthday?.toISODate() === DateTime.now().toISODate();
};

// TODO: Add type info
const getEmploymentInfo = () => getEmployment();
//.then(sort(compareBySession))

const getProfileInfo = async (username: string = ''): Promise<Profile | undefined> => {
  const profile = await getProfile(username).then(formatCountry).then(formatSocialMediaLinks);

  if (!profile) return undefined;

  const fullName = `${profile?.FirstName} ${profile?.LastName}`;
  const getCliftonStrengths = await CliftonStrengthsService.getCliftonStrengths(
    profile.AD_Username,
  );

  if (isStudent(profile)) {
    return {
      ...profile,
      fullName,
      Advisors: await getAdvisors(profile.AD_Username),
      CliftonStrengths: getCliftonStrengths,
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
      CliftonStrengths: getCliftonStrengths,
    };
  }
};

const getEmergencyInfo = async (username: string) => {
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
  Value: string;
  Label: string;
};

const requestInfoUpdate = (updatedFields: ProfileFieldUpdate[]) =>
  http.post('profiles/update/', updatedFields);

const userService = {
  setMobilePhonePrivacy,
  setHomePhonePrivacy,
  setMobilePhoneNumber,
  setImagePrivacy,
  getChapelCredits,
  getImage,
  getDiningInfo,
  getProfileInfo,
  getMailboxCombination,
  resetImage,
  postImage,
  postIDImage,
  requestInfoUpdate,
  getEmploymentInfo,
  getEmergencyInfo,
  updateSocialLink,
  isBirthdayToday,
};

export default userService;
