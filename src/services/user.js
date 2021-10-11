/**
 * User
 *
 * @module user
 */

import jwtDecode from 'jwt-decode';
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

/**
 * @global
 * @typedef CLWCredits
 * @property {number} current User's current CL&W credits
 * @property {number} required User's required CL&W credits
 */

/**
 * @global
 * @typedef LocalInfo
 * @property {string} aud Audience of token (URL)
 * @property {string} college_role User role
 * @property {number} exp Token expiration time
 * @property {string} id User ID
 * @property {string} iss Token issuance URL
 * @property {string} name User name (for display purposes)
 * @property {number} nbf identifies the time before which the JWT MUST NOT be accepted for processing
 * @property {string} user_name Username (firstname.lastname format)
 */

/**
 * @global
 * @typedef StaffProfileInfo
 * @property {string} AD_Username Username
 * @property {string} Barcode Barcode
 * @property {string} BuildingDescription Building description
 * @property {string} Country Country
 * @property {string} Dept Department
 * @property {string} Email Email address
 * @property {string} Facebook Facebook
 * @property {string} FirstName First name
 * @property {string} Gender Gender
 * @property {string} Handshake Handshake
 * @property {string} HomeCity City
 * @property {string} HomeCountry Country
 * @property {string} HomeFax Home fax number
 * @property {string} HomePhone Home phone number
 * @property {string} HomePostalCode Postal code
 * @property {string} HomeState State
 * @property {string} HomeStreet1 Street address line 1
 * @property {string} HomeStreet2 Street address line 2
 * @property {string} ID ID
 * @property {string} Instagram Instagram
 * @property {string} JobTitle Job title
 * @property {string} KeepPrivate Keep private
 * @property {string} LastName Last name
 * @property {string} LinkedIn LinkedIn
 * @property {string} MaidenName Maiden name
 * @property {string} MiddleName Middle name
 * @property {string} NickName Nickname
 * @property {string} OnCampusBuilding Building
 * @property {string} OnCampusDepartment Department
 * @property {string} OnCampusFax Fax number
 * @property {string} OnCampusPhone Phone number
 * @property {string} OnCampusPrivatePhone Private phone number
 * @property {string} OnCampusRoom Room number
 * @property {string} PersonType Type of person
 * @property {string} SpouseName Name of spouse
 * @property {string} Suffix Suffix
 * @property {string} Title Title
 * @property {string} Twitter Twitter
 * @property {string} Type Type
 * @property {string} office_hours Office hours
 * @property {number} preferred_photo Preferred photo
 * @property {number} show_pic Whether or not to show picture
 * @property {string} Mail_Location On campus mailstop
 */

/**
 * @global
 * @typedef StudentProfileInfo
 * @property {string} ID ID
 * @property {string} Title Title
 * @property {string} FirstName First name
 * @property {string} MiddleName Middle name
 * @property {string} LastName Last name
 * @property {string} Suffix Suffix
 * @property {string} MaidenName Maiden name
 * @property {string} NickName Nick name
 * @property {string} OnOffCampus On off campus
 * @property {string} OnCampusBuilding On campus building
 * @property {string} OnCampusRoom On campus room
 * @property {string} OnCampusPhone On campus phone
 * @property {string} OnCampusPrivatePhone On campus private phone
 * @property {string} OnCampusFax On campus fax
 * @property {string} Mail_Location On campus mail location
 * @property {string} OffCampusStreet1 Off campus street 1
 * @property {string} OffCampusStreet2 Off campus street 2
 * @property {string} OffCampusCity Off campus city
 * @property {string} OffCampusState Off campus state
 * @property {string} OffCampusPostalCode Off campus postal code
 * @property {string} OffCampusCountry Off campus country
 * @property {string} OffCampusPhone Off campus phone
 * @property {string} OffCampusFax Off campus fax
 * @property {string} HomeStreet1 Home street 1
 * @property {string} HomeStreet2 Home street 2
 * @property {string} HomeCity Home city
 * @property {string} HomeState Home state
 * @property {string} HomePostalCode Home postal code
 * @property {string} HomeCountry Home country
 * @property {string} HomePhone Home phone
 * @property {string} HomeFax Home fax
 * @property {string} Cohort Cohort
 * @property {string} Class Class
 * @property {string} KeepPrivate Keep private
 * @property {string} Major Major
 * @property {string} Barcode Barcode
 * @property {string} AdvisorIDs Advisor IDs
 * @property {string} Married Whether student is married or not ('Y' or 'N')
 * @property {string} Commuter Whether student ia commuter or not ('Y' or 'N')
 * @property {string} Major2 Second major
 * @property {string} Email Email
 * @property {string} Gender Gender
 * @property {string} grad_student Whether student is a graduate student or not ('Y' or 'N')
 * @property {string} GradDate Date of graduation
 * @property {string} Major3 Third major
 * @property {string} Minor1 Minor
 * @property {string} Minor2 Second minor
 * @property {string} Minor3 Third minor
 * @property {string} MobilePhone Mobile phone number
 * @property {number} IsMobilePhonePrivate Whether mobile phone number is private or not
 * @property {string} AD_Username Username
 * @property {number} show_pic Whether or not to show picture
 * @property {number} preferred_photo Whether or not to show preferred photo
 * @property {string} Country Country
 * @property {string} BuildingDescription Description of building
 * @property {string} Major1Description Description of first major
 * @property {string} Major2Description Description of second major
 * @property {string} Major3Description Description of third major
 * @property {string} Minor1Description Description of first minor
 * @property {string} Minor2Description Description of second minor
 * @property {string} Minor3Description Description of third minor
 * @property {string} Facebook Facebook
 * @property {string} Twitter Twitter
 * @property {string} Instagram Instagram
 * @property {string} Handshake Handshake
 * @property {string} LinkedIn LinkedIn
 * @property {string} PersonType Type of person
 * @property {number} ChapelRequired The number of CL&W credits the Student needs for this session
 * @property {number} ChapelAttended The number of CL&W credits the Student has attended
 */

/**
 * @global
 * @typedef StudentAdvisorInfo
 * @property {string} Firstname First Name for advisor
 * @property {string} Lastname Last Name for advisor
 * @property {string} AD_Username User Name for advisor
 */

/**
 * @global
 * @typedef DiningInfo
 * @property {string} ChoiceDescription A description of the mealplan choice
 * @property {MealPlanComponent} Swipes The swipes info
 * @property {MealPlanComponent} DiningDollars The dining dollars info
 * @property {MealPlanComponent} CurrentBalance The Current balance
 */

/**
 * @global
 * @typedef MealPlanComponent
 * @property {string} PlanDescription Description of the meal plan component
 * @property {string} PlanID The plan ID
 * @property {number} InitialBalance The initial balance of the meal plan
 * @property {string} CurrentBalance The current remaining meal plan balance
 */

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
const getImage = async (username) => {
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
const resetImage = () => {
  return http.post('/profiles/image/reset', '');
};

/**
 * upload an ID image for a user to the __ folder
 *
 * @param {string} dataURI of the image being uploaded
 * @returns {Response} response of http request
 */
const postIDImage = (dataURI) => {
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
const postImage = (dataURI) => {
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
const getLocalInfo = () => {
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
const getChapelCredits = async () => {
  const { ChapelRequired: required, ChapelAttended: attended } = await getProfile();

  return {
    current: attended || 0,
    required,
  };
};

/**
 * Get all relevant info about user's dining plan
 *
 * @returns {Promise.<DiningInfo>} Dining plan info object
 */
const getDiningInfo = async () => {
  return await http.get('dining');
};

/**
 * Get user profile info for a given user or the current user if `username` is not provided
 *
 * @param {string} [username] Username in firstname.lastname format
 * @returns {Promise.<StaffProfileInfo|StudentProfileInfo>} Profile info
 */
const getProfile = (username) => {
  let profile;
  if (username) {
    profile = http.get(`profiles/${username}/`);
  } else {
    profile = http.get('profiles');
  }
  return profile;
};

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
const getSentMembershipRequests = (id = '') => {
  return http.get(`requests/student/${id}`);
};

/**
 * Get memberships for specific student where they hold admin status
 *
 * @param {string} id Identifier for student
 * @returns {Request[]} List of memberships
 */
const getLeaderPositions = async (id) => {
  let leaderPositions = [];
  let allMemberships = await getCurrentMemberships(id);
  for (let i = 0; i < allMemberships.length; i += 1) {
    if (allMemberships[i].GroupAdmin) {
      leaderPositions.push(allMemberships[i]);
    }
  }
  return leaderPositions;
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
};

export default userService;
