import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';
import { Platform, platforms, socialMediaInfo } from 'services/socialMedia';
import {
  CliftonStrength,
  CliftonStrengthColors,
  cliftonStrengthLinks,
  CliftonStrengthsCategory,
  getCategoryOfStrength,
} from './cliftonStrengthsData';
import { AuthError } from './error';
import { Class } from './goStalk';
import http from './http';
import { Membership } from './membership';
import { Request } from './request';
import session from './session';
import storage from './storage';
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

// TODO: Refactor to not depend on array indexing to find link
type CliftonStrengths = {
  Strengths: CliftonStrength[];
  Categories: CliftonStrengthsCategory[];
  Colors: CliftonStrengthColors[];
  Links: string[];
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
  CliftonStrengths?: CliftonStrengths;
};

type LocalInfo = {
  /** Audience of token (URL) */
  aud: string;
  /** User role */
  college_role: string;
  /** Token expiration time */
  exp: number;
  /** User ID */
  id: string;
  /** Token issuance URL */
  iss: string;
  /** User name (for display purposes) */
  name: string;
  /** identifies the time before which the JWT MUST NOT be accepted for processing */
  nbf: number;
  /** Username (firstname.lastname format) */
  user_name: string;
};

export type UnformattedStaffProfileInfo = BaseProfileInfo & {
  Dept: string;
  JobTitle: string;
  OnCampusDepartment: string;
  SpouseName: string;
  Type: string;
  office_hours: string;
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

export type UnformattedProfileInfo = UnformattedStaffProfileInfo | UnformattedStudentProfileInfo;

export type StaffProfileInfo = UnformattedStaffProfileInfo & {
  fullName: string;
};

export type StudentProfileInfo = {
  fullName: string;
  Majors: string[];
  Minors: string[];
  Advisors: StudentAdvisorInfo[];
} & Override<UnformattedStudentProfileInfo, { OnOffCampus: OnOffCampusDescription }>;

export type Profile = StaffProfileInfo | StudentProfileInfo;

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

const isStudent = (profile: UnformattedProfileInfo): profile is UnformattedStudentProfileInfo => {
  return (profile as UnformattedStudentProfileInfo).OnOffCampus !== undefined;
};

const isStaff = (profile: UnformattedProfileInfo): profile is UnformattedStaffProfileInfo => {
  return (profile as UnformattedStaffProfileInfo).Dept !== undefined;
};

const filter =
  <T>(predicate: (element: T, index: number, array: T[]) => boolean) =>
  (array: T[]): T[] =>
    array.filter(predicate);

const sort =
  <T>(predicate?: (a: T, b: T) => number) =>
  (array: T[]): T[] =>
    array.sort(predicate);

const compareByProperty =
  <Type, Key extends keyof Type>(property: Key) =>
  (a: Type, b: Type): -1 | 0 | 1 => {
    if (a[property] > b[property]) {
      return 1;
    } else if (a[property] < b[property]) {
      return -1;
    } else {
      return 0;
    }
  };

function setFullname(profile: UnformattedProfileInfo): UnformattedProfileInfo {
  profile.fullName = `${profile.FirstName}  ${profile.LastName}`;
  return profile;
}

function formatCountry(profile: UnformattedProfileInfo) {
  if (profile.Country) {
    profile.Country = profile.Country.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    if (profile.Country.includes(',')) {
      profile.Country =
        profile.Country.slice(profile.Country.indexOf(',') + 2) +
        ' ' +
        profile.Country.slice(0, profile.Country.indexOf(','));
    }
  }
  return profile;
}

const formatSocialMediaLinks = (profile: UnformattedProfileInfo) => {
  platforms.forEach(
    (platform) =>
      (profile[platform] = profile[platform]
        ? socialMediaInfo[platform].prefix + decodeURIComponent(profile[platform])
        : ''),
  );
  return profile;
};

const getImage = (username: string = ''): Promise<{ def: string; pref?: string }> =>
  http.get(`profiles/Image/${username}/`);

const resetImage = (): Promise<void> => http.post('/profiles/image/reset', '');

const postIDImage = (dataURI: string): Promise<void> => {
  const blob = dataURItoBlob(dataURI);
  const fileType = blob.type.replace('image/', '');
  const imageData = new FormData();
  imageData.append('canvasImage', blob, 'canvasImage.' + fileType);
  return http.post('profiles/IDimage', imageData);
};

const postImage = (dataURI: string): Promise<void> => {
  const blob = dataURItoBlob(dataURI);
  const fileType = blob.type.replace('image/', '');
  const imageData = new FormData();
  imageData.append('canvasImage', blob, 'canvasImage.' + fileType);
  return http.post('profiles/image', imageData);
};

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

/**
 * Get local info encoded in payload of token
 *
 * @returns Local user info
 */
const getLocalInfo = (): Promise<LocalInfo> => {
  let token: string;
  try {
    token = storage.get('token');
  } catch (err) {
    throw new AuthError('Could not get local auth');
  }
  try {
    return jwtDecode(token);
  } catch (err) {
    throw new AuthError(`Saved token "${token}" could not be parsed`);
  }
};

const getChapelCredits = async (): Promise<CLWCredits | null> => {
  const profile = await getProfile();

  return isStudent(profile)
    ? {
        current: profile.ChapelAttended || 0,
        required: profile.ChapelRequired,
      }
    : null;
};

const getDiningInfo = (): Promise<DiningInfo> => http.get('dining');

const getProfile = (username: string = ''): Promise<UnformattedProfileInfo> =>
  http.get(`profiles/${username}/`);

const getAdvisors = (username: string = ''): Promise<StudentAdvisorInfo[]> =>
  http.get(`profiles/Advisors/${username}/`);

const getCliftonStrengths = async (
  username: string = '',
): Promise<CliftonStrengths | undefined> => {
  const { Strengths } = await http.get<{ Strengths?: CliftonStrength[] }>(
    `profiles/clifton/${username}/`,
  );

  if (Strengths) {
    const Categories = Strengths.map((strength) => getCategoryOfStrength(strength));
    return {
      Strengths,
      Categories,
      Colors: Categories.map((category) => CliftonStrengthColors[category]),
      Links: Strengths.map((strength) => cliftonStrengthLinks[strength]),
    };
  } else {
    return undefined;
  }
};

const getMailboxCombination = () => http.get('profiles/mailbox-combination/');

const setMobilePhoneNumber = (value: number) => http.put(`profiles/mobile_phone_number/${value}/`);

const setMobilePhonePrivacy = (makePrivate: boolean) =>
  http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N')); // 'Y' = private, 'N' = public

const setHomePhonePrivacy = (makePrivate: boolean) =>
  http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N')); // 'Y' = private, 'N' = public

const setImagePrivacy = (makePrivate: boolean) =>
  http.put('profiles/image_privacy/' + (makePrivate ? 'N' : 'Y')); // 'Y' = show image, 'N' = don't show image

const getMemberships = (userID: string = ''): Promise<Membership[]> =>
  http.get(`memberships/student/${userID}`);

const getPublicMemberships = (username: string = ''): Promise<Membership[]> =>
  http
    .get<Membership[]>(`memberships/student/username/${username}/`)
    .then(sort(compareByProperty('ActivityDescription')));

const getMembershipsAlphabetically = (userID: string) =>
  getMemberships(userID).then(sort(compareByProperty('ActivityDescription')));

const getMembershipsBySession = (userID: string, sessionCode: string) =>
  getMembershipsAlphabetically(userID).then(filter((m) => m.SessionCode === sessionCode));

const getCurrentMemberships = async (userID: string) =>
  session.getCurrent().then(({ SessionCode }) => getMembershipsBySession(userID, SessionCode));

const getMembershipsWithoutGuests = (id: string) =>
  getMemberships(id).then(filter((i) => i.ParticipationDescription !== 'Guest'));

const getSessionMembershipsWithoutGuests = (userID: string, sessionCode: string) =>
  getMembershipsBySession(userID, sessionCode).then(
    filter((m) => m.ParticipationDescription !== 'Guest'),
  );

const getEmployment = () => http.get('studentemployment/');

const getSentMembershipRequests = (userID: string = ''): Promise<Request[]> =>
  http.get(`requests/student/${userID}`);

const getLeaderPositions = async (userID: string): Promise<Membership[]> =>
  getCurrentMemberships(userID).then(filter((m) => m.GroupAdmin));

const getBirthdate = async (): Promise<DateTime> =>
  DateTime.fromISO(await http.get('profiles/birthdate'));

const isBirthdayToday = async () => {
  const birthday = await getBirthdate();
  return birthday?.toISODate() === DateTime.now().toISODate();
};

const getTranscriptMembershipsInfo = (id: string) =>
  getMembershipsWithoutGuests(id).then(sort(compareByProperty('ActivityCode')));

// TODO: Add type info
const getEmploymentInfo = () => getEmployment();
//.then(sort(compareBySession))

const getProfileInfo = async (username: string = ''): Promise<Profile> =>
  getProfile(username)
    .then(formatCountry)
    .then(formatSocialMediaLinks)
    .then(async (profile) => {
      if (isStudent(profile)) {
        return {
          ...profile,
          fullName: `${profile.FirstName}  ${profile.LastName}`,
          Advisors: await getAdvisors(profile.AD_Username),
          CliftonStrengths: await getCliftonStrengths(profile.AD_Username),
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
      } else if (isStaff(profile)) {
        return {
          ...profile,
          fullName: `${profile.FirstName}  ${profile.LastName}`,
          CliftonStrengths: await getCliftonStrengths(profile.AD_Username),
        };
      } else {
        throw new TypeError();
      }
    });

const getEmergencyInfo = async (username: string = '') => {
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

const userService = {
  setFullname,
  setMobilePhonePrivacy,
  setHomePhonePrivacy,
  setMobilePhoneNumber,
  setImagePrivacy,
  getChapelCredits,
  getImage,
  getLocalInfo,
  getDiningInfo,
  getPublicMemberships,
  getMembershipsAlphabetically,
  getSessionMembershipsWithoutGuests,
  getLeaderPositions,
  getSentMembershipRequests,
  getProfileInfo,
  getMailboxCombination,
  resetImage,
  postImage,
  postIDImage,
  getTranscriptMembershipsInfo,
  getEmploymentInfo,
  getEmergencyInfo,
  updateSocialLink,
  isBirthdayToday,
};

export default userService;
