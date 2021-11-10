import jwtDecode from 'jwt-decode';
import { DateTime } from 'luxon';
import { socialMediaInfo } from 'socialMedia';
import {
  cliftonStrengthCategories,
  cliftonStrengthColors,
  cliftonStrengthLinks,
} from './cliftonStrengthsData';
import { AuthError } from './error';
import http from './http';
import session from './session';
import storage from './storage';

type CLWCredits = {
  current: number;
  required: number;
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

type StaffProfileInfo = {
  AD_Username: string;
  Barcode: string;
  BuildingDescription: string;
  Country: string;
  Dept: string;
  Email: string;
  Facebook: string;
  FirstName: string;
  Gender: string;
  Handshake: string;
  HomeCity: string;
  HomeCountry: string;
  HomeFax: string;
  HomePhone: string;
  HomePostalCode: string;
  HomeState: string;
  HomeStreet1: string;
  HomeStreet2: string;
  ID: string;
  Instagram: string;
  JobTitle: string;
  KeepPrivate: string;
  LastName: string;
  LinkedIn: string;
  MaidenName: string;
  MiddleName: string;
  NickName: string;
  OnCampusBuilding: string;
  OnCampusDepartment: string;
  OnCampusFax: string;
  OnCampusPhone: string;
  OnCampusPrivatePhone: string;
  OnCampusRoom: string;
  PersonType: string;
  SpouseName: string;
  Suffix: string;
  Title: string;
  Twitter: string;
  Type: string;
  office_hours: string;
  preferred_photo: number;
  show_pic: number;
  Mail_Location: string;
};

type StudentProfileInfo = {
  ID: string;
  Title: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix: string;
  MaidenName: string;
  NickName: string;
  OnOffCampus: string;
  OnCampusBuilding: string;
  OnCampusRoom: string;
  OnCampusPhone: string;
  OnCampusPrivatePhone: string;
  OnCampusFax: string;
  Mail_Location: string;
  OffCampusStreet1: string;
  OffCampusStreet2: string;
  OffCampusCity: string;
  OffCampusState: string;
  OffCampusPostalCode: string;
  OffCampusCountry: string;
  OffCampusPhone: string;
  OffCampusFax: string;
  HomeStreet1: string;
  HomeStreet2: string;
  HomeCity: string;
  HomeState: string;
  HomePostalCode: string;
  HomeCountry: string;
  HomePhone: string;
  HomeFax: string;
  Cohort: string;
  Class: string;
  KeepPrivate: string;
  Major: string;
  Barcode: string;
  AdvisorIDs: string;
  /** Whether student is married or not ('Y' or 'N') */
  Married: string;
  /** Whether student ia commuter or not ('Y' or 'N') */
  Commuter: string;
  Major2: string;
  Email: string;
  Gender: string;
  /** Whether student is a graduate student or not ('Y' or 'N') */
  grad_student: string;
  GradDate: string;
  Major3: string;
  Minor1: string;
  Minor2: string;
  Minor3: string;
  MobilePhone: string;
  IsMobilePhonePrivate: number;
  AD_Username: string;
  show_pic: number;
  /** Whether or not to show preferred photo */
  preferred_photo: number;
  Country: string;
  BuildingDescription: string;
  Major1Description: string;
  Major2Description: string;
  Major3Description: string;
  Minor1Description: string;
  Minor2Description: string;
  Minor3Description: string;
  Facebook: string;
  Twitter: string;
  Instagram: string;
  Handshake: string;
  LinkedIn: string;
  PersonType: string;
  ChapelRequired: number;
  ChapelAttended: number;
};

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

function setFullname(profile) {
  profile.fullName = `${profile.FirstName}  ${profile.LastName}`;
  return profile;
}

function setOnOffCampus(data) {
  switch (data.OnOffCampus) {
    case 'O':
      data.OnOffCampus = 'Off Campus';
      break;
    case 'A':
      data.OnOffCampus = 'Away';
      break;
    case 'D':
      data.OnOffCampus = '';
      break;
    case 'P': //Private
      data.OnOffCampus = 'Private as requested.';
      break;
    default:
      data.OnOffCampus = 'On Campus';
  }
  return data;
}

function setClassYear(data) {
  if (data.PreferredClassYear) {
    data.ClassYear = data.PreferredClassYear;
  }
  return data;
}

function setMajorObject(data) {
  data.Majors = [];
  if (data.Major1Description) {
    data.Majors.push(data.Major1Description);
  }
  if (data.Major2Description) {
    data.Majors.push(data.Major2Description);
  }
  if (data.Major3Description) {
    data.Majors.push(data.Major3Description);
  }
  return data;
}

function setMinorObject(data) {
  data.Minors = [];
  if (data.Minor1Description) {
    data.Minors.push(data.Minor1Description);
  }
  if (data.Minor2Description) {
    data.Minors.push(data.Minor2Description);
  }
  if (data.Minor3Description) {
    data.Minors.push(data.Minor3Description);
  }
  return data;
}

function formatCountry(profile) {
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

const formatSocialMediaLinks = (profile) => {
  socialMediaInfo.platforms.map(
    (platform) =>
      (profile[platform] = profile[platform]
        ? socialMediaInfo[platform].prefix + decodeURIComponent(profile[platform])
        : ''),
  );
  return profile;
};

function setClass(profile) {
  if (String(profile.PersonType).includes('stu')) {
    switch (profile.Class) {
      case '1':
        profile.Class = 'First Year';
        break;
      case '2':
        profile.Class = 'Sophomore';
        break;
      case '3':
        profile.Class = 'Junior';
        break;
      case '4':
        profile.Class = 'Senior';
        break;
      case '5':
        profile.Class = 'Graduate Student';
        break;
      case '6':
        profile.Class = 'Undergraduate Conferred';
        break;
      case '7':
        profile.Class = 'Graduate Conferred';
        break;
      default:
        profile.Class = 'Student';
    }
  }

  return profile;
}

/**
 * Get image for a given user or the current user if `username` is not provided
 *
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<{def: string, pref?: string}>} Image as a Base64-encoded string
 */
const getImage = async (username: string): Promise<{ def: string; pref?: string }> => {
  let pic;
  if (username) {
    pic = await http.get(`profiles/Image/${username}/`);
  } else {
    pic = await http.get('profiles/Image');
  }
  return pic;
};

/**
 * Reset the current user's from preferred image to user's default image
 *
 * @returns {Response} Determines if the image was reset successfully
 */
const resetImage = (): Response => {
  return http.post('/profiles/image/reset', '');
};

/**
 * upload an ID image for a user to the __ folder
 *
 * @param {string} dataURI of the image being uploaded
 * @returns {Response} response of http request
 */
const postIDImage = (dataURI: string): Response => {
  let imageData = new FormData();
  let blob = dataURItoBlob(dataURI);
  let type = blob.type.replace('image/', '');
  let headerOptions = { key: 'this is a post' };
  imageData.append('canvasImage', blob, 'canvasImage.' + type);
  return http.post('profiles/IDimage', imageData, headerOptions);
};

/**
 * upload a photo to user's profile, which is then used as the preferred photo
 *
 * @param {string} dataURI of the image being uploaded
 * @returns {Response} response of http request
 */
const postImage = (dataURI: string): Response => {
  let imageData = new FormData();
  let blob = dataURItoBlob(dataURI);
  let type = blob.type.replace('image/', '');
  let headerOptions = { key: 'this is a post' };
  imageData.append('canvasImage', blob, 'canvasImage.' + type);
  return http.post('profiles/image', imageData, headerOptions);
};

// convert data to blob
function dataURItoBlob(dataURI) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

/**
 * Get local info encoded in payload of token
 *
 * @returns {Promise.<LocalInfo>} Local user info
 */
const getLocalInfo = (): Promise<LocalInfo> => {
  let token;
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

/**
 * Get the number of cl&w credits acquired, and number of credits required.
 *
 * @returns {CLWCredits} An Object of their current and required number of CL&W events,
 */
const getChapelCredits = async (): CLWCredits => {
  const { ChapelRequired: required, ChapelAttended: attended } = await getProfile();

  return {
    current: attended || 0,
    required,
  };
};

const getDiningInfo = async (): Promise<DiningInfo> => {
  return await http.get('dining');
};

const getProfile = (username: string = ''): Promise<StaffProfileInfo | StudentProfileInfo> =>
  http.get(`profiles/${username}/`);

const getAdvisors = async (username) => {
  return await http.get(`profiles/Advisors/${username}/`);
};

const getCliftonStrengths = async (username) => {
  let cliftonStrengths = await http.get(`profiles/clifton/${username}/`);

  if (cliftonStrengths?.Strengths?.[0]) {
    cliftonStrengths.Categories = cliftonStrengths.Strengths.map((strength) =>
      cliftonStrengthCategories.Executing.includes(strength)
        ? 'Executing'
        : cliftonStrengthCategories.Influencing.includes(strength)
        ? 'Influencing'
        : cliftonStrengthCategories.Relationship.includes(strength)
        ? 'Relationship'
        : cliftonStrengthCategories.Thinking.includes(strength)
        ? 'Thinking'
        : null,
    );

    cliftonStrengths.Colors = cliftonStrengths.Categories.map(
      (category) => cliftonStrengthColors[category],
    );

    cliftonStrengths.Links = cliftonStrengths.Strengths.map(
      (strength) => cliftonStrengthLinks[strength],
    );
  } else {
    cliftonStrengths = null;
  }

  return cliftonStrengths;
};

const getMailboxCombination = async () => {
  return await http.get(`profiles/mailbox-combination/`);
};

async function setAdvisors(profile) {
  profile.Advisors = await getAdvisors(profile.AD_Username);
}

async function setCliftonStrengths(profile) {
  profile.CliftonStrengths = await getCliftonStrengths(profile.AD_Username);
}

async function setMobilePhoneNumber(value) {
  await http.put(`profiles/mobile_phone_number/${value}/`);
}

async function setMobilePhonePrivacy(makePrivate) {
  // 'Y' = private, 'N' = public
  await http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N'));
}
async function setHomePhonePrivacy(makePrivate) {
  // 'Y' = private, 'N' = public
  await http.put('profiles/mobile_privacy/' + (makePrivate ? 'Y' : 'N'));
}

async function setImagePrivacy(makePrivate) {
  // 'Y' = show image, 'N' = don't show image
  await http.put('profiles/image_privacy/' + (makePrivate ? 'N' : 'Y'));
}

const getMemberships = async (id) => {
  let memberships;
  memberships = await http.get(`memberships/student/${id}`);
  return memberships;
};

const getPublicMemberships = async (username) => {
  let memberships;
  memberships = await http.get(`memberships/student/username/${username}/`);
  memberships.sort(compareByTitle);
  return memberships;
};

const getMembershipsAlphabetically = async (id) => {
  let memberships;
  memberships = await http.get(`memberships/student/${id}`);
  memberships.sort(compareByTitle);
  return memberships;
};

//Take student's memberships and filter for current only
const getCurrentMemberships = async (id) => {
  let myInvolvements = await getMembershipsAlphabetically(id);
  let myCurrentInvolvements = [];
  const { SessionCode: sessionCode } = await session.getCurrent();
  for (let i = 0; i < myInvolvements.length; i += 1) {
    if (myInvolvements[i].SessionCode === sessionCode) {
      myCurrentInvolvements.push(myInvolvements[i]);
    }
  }
  return myCurrentInvolvements;
};

//Take student's memberships and filter out "Guest" memberships
const getMembershipsWithoutGuests = async (id) => {
  let myInvolvements = await getMemberships(id);
  let myInvolvementsWithoutGuests = [];
  for (let i = 0; i < myInvolvements.length; i += 1) {
    if (!(myInvolvements[i].ParticipationDescription === 'Guest')) {
      myInvolvementsWithoutGuests.push(myInvolvements[i]);
    }
  }
  return myInvolvementsWithoutGuests;
};

//Take student's non-"Guest" memberships and filter for current only
const getCurrentMembershipsWithoutGuests = async (id) => {
  let myInvolvements = await getMembershipsWithoutGuests(id);
  let myCurrentInvolvementsWithoutGuests = [];
  const { SessionCode: sessionCode } = await session.getCurrent();
  for (let i = 0; i < myInvolvements.length; i += 1) {
    if (myInvolvements[i].SessionCode === sessionCode) {
      myCurrentInvolvementsWithoutGuests.push(myInvolvements[i]);
    }
  }
  return myCurrentInvolvementsWithoutGuests;
};

const getEmployment = async () => {
  let employments;
  employments = await http.get(`studentemployment/`);
  return employments;
};

//Take student's non-"Guest" memberships and filter for specifiied session only
const getSessionMembershipsWithoutGuests = async (id, session) => {
  let myInvolvements = await getMembershipsWithoutGuests(id);
  let myCurrentInvolvementsWithoutGuests = [];
  for (let i = 0; i < myInvolvements.length; i += 1) {
    if (myInvolvements[i].SessionCode === session) {
      myCurrentInvolvementsWithoutGuests.push(myInvolvements[i]);
    }
  }
  return myCurrentInvolvementsWithoutGuests;
};

/**
 * Get requests sent by a specific student
 *
 * @param {string} [id] Identifier for student
 * @returns {Request[]} List of requests for student
 */
const getSentMembershipRequests = (id: string = ''): Request[] => {
  return http.get(`requests/student/${id}`);
};

/**
 * Get memberships for specific student where they hold admin status
 *
 * @param {string} id Identifier for student
 * @returns {Request[]} List of memberships
 */
const getLeaderPositions = async (id: string): Request[] => {
  let leaderPositions = [];
  let allMemberships = await getCurrentMemberships(id);
  for (let i = 0; i < allMemberships.length; i += 1) {
    if (allMemberships[i].GroupAdmin) {
      leaderPositions.push(allMemberships[i]);
    }
  }
  return leaderPositions;
};

/**
 * Get the birthdate of the current user
 *
 * @returns {Date} The birthdate of the current user
 */
const getBirthdate = async (): Date => {
  return DateTime.fromISO(await http.get(`profiles/birthdate`));
};

const isBirthdayToday = async () => {
  const birthday = await getBirthdate();
  return birthday && birthday.toISODate() === DateTime.now().toISODate();
};

//compares items by ActivityDescription, used by getMembershipsAlphabetically to sort by ActivityDescription
function compareByTitle(a, b) {
  const involvementA = a.ActivityDescription;
  const involvementB = b.ActivityDescription;

  let comparison = 0;
  if (involvementA > involvementB) {
    comparison = 1;
  } else if (involvementA < involvementB) {
    comparison = -1;
  }
  return comparison;
}

//compares items by ActivityCode, used by getTranscriptMembershipsInfo to sort by ActivityCode
function compareByActCode(a, b) {
  const codeA = a.ActivityCode;
  const codeB = b.ActivityCode;

  let comparison = 0;
  if (codeA > codeB) {
    comparison = 1;
  } else if (codeA < codeB) {
    comparison = -1;
  }
  return comparison;
}

//returns an array of membership objects from backend server,
//not including Guest memberships
//using asynchronous http.get request (via getMemberships function)
//sorts by SessionCode and ActivityCode
const getTranscriptMembershipsInfo = async (id) => {
  let transcriptInfo = await getMembershipsWithoutGuests(id);
  transcriptInfo.sort(compareByActCode);
  return transcriptInfo;
};

//returns an array of employment objects from backend server
//using asynchronous http.get request (via getEmployment function)
//sorts by
const getEmploymentInfo = async () => {
  let employmentInfo = await getEmployment();
  //employmentInfo.sort(compareBySession);
  return employmentInfo;
};

const getProfileInfo = async (username) => {
  let profile = await getProfile(username);
  setFullname(profile);
  setClass(profile);
  setClassYear(profile);
  setMajorObject(profile);
  formatCountry(profile);
  setOnOffCampus(profile);
  setMinorObject(profile);
  await setAdvisors(profile);
  await setCliftonStrengths(profile);
  formatSocialMediaLinks(profile);
  return profile;
};

const getEmergencyInfo = async (username) => {
  return await http.get(`profiles/emergency-contact/${username}/`);
};

function updateSocialLink(platform, link) {
  let linkToSend;
  if (link.indexOf(socialMediaInfo[platform].prefix2) === 0) {
    linkToSend = link.substring(socialMediaInfo[platform].prefix2.length);
  } else {
    linkToSend = link.substring(socialMediaInfo[platform].prefix.length);
  }

  const body = {
    [platform]: encodeURIComponent(linkToSend),
  };

  return http.put('profiles/' + platform.toLowerCase(), body);
}

const userService = {
  setFullname,
  setClass,
  setMobilePhonePrivacy,
  setHomePhonePrivacy,
  setMobilePhoneNumber,
  setImagePrivacy,
  getMemberships,
  getChapelCredits,
  getImage,
  getLocalInfo,
  getDiningInfo,
  getPublicMemberships,
  getMembershipsAlphabetically,
  getCurrentMemberships,
  getCurrentMembershipsWithoutGuests,
  getSessionMembershipsWithoutGuests,
  getLeaderPositions,
  getSentMembershipRequests,
  getProfileInfo,
  getMailboxCombination,
  getAdvisors,
  getCliftonStrengths,
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
