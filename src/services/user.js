/**
 * User
 *
 * @module user
 */

import jwtDecode from 'jwt-decode';

import { AuthError } from './error';
import http from './http';
import session from './session';
import storage from './storage';
import { socialMediaInfo } from 'socialMedia';

/**
 * @global
 * @typedef CLWCredits
 * @property {Number} current User's current CL&W credits
 * @property {Number} required User's required CL&W credits
 */

/**
 * @global
 * @typedef LocalInfo
 * @property {String} aud Audience of token (URL)
 * @property {String} college_role User role
 * @property {Number} exp Token expiration time
 * @property {String} id User ID
 * @property {String} iss Token issuance URL
 * @property {String} name User name (for display purposes)
 * @property {Number} nbf identifies the time before which the JWT MUST NOT be accepted for
 * processing
 * @property {String} user_name Username (firstname.lastname format)
 */

/**
 * @global
 * @typedef StaffProfileInfo
 * @property {String} AD_Username Username
 * @property {String} Barcode Barcode
 * @property {String} BuildingDescription Building description
 * @property {String} Country Country
 * @property {String} Dept Department
 * @property {String} Email Email address
 * @property {String} Facebook Facebook
 * @property {String} FirstName First name
 * @property {String} Gender Gender
 * @property {String} Handshake Handshake
 * @property {String} HomeCity City
 * @property {String} HomeCountry Country
 * @property {String} HomeFax Home fax number
 * @property {String} HomePhone Home phone number
 * @property {String} HomePostalCode Postal code
 * @property {String} HomeState State
 * @property {String} HomeStreet1 Street address line 1
 * @property {String} HomeStreet2 Street address line 2
 * @property {String} ID ID
 * @property {String} Instagram Instagram
 * @property {String} JobTitle Job title
 * @property {String} KeepPrivate Keep private
 * @property {String} LastName Last name
 * @property {String} LinkedIn LinkedIn
 * @property {String} MaidenName Maiden name
 * @property {String} MiddleName Middle name
 * @property {String} NickName Nickname
 * @property {String} OnCampusBuilding Building
 * @property {String} OnCampusDepartment Department
 * @property {String} OnCampusFax Fax number
 * @property {String} OnCampusPhone Phone number
 * @property {String} OnCampusPrivatePhone Private phone number
 * @property {String} OnCampusRoom Room number
 * @property {String} PersonType Type of person
 * @property {String} SpouseName Name of spouse
 * @property {String} Suffix Suffix
 * @property {String} Title Title
 * @property {String} Twitter Twitter
 * @property {String} Type Type
 * @property {String} office_hours Office hours
 * @property {Number} preferred_photo Preferred photo
 * @property {Number} show_pic Whether or not to show picture
 * @property {String} Mail_Location On campus mailstop
 */

/**
 * @global
 * @typedef StudentProfileInfo
 * @property {String} ID ID
 * @property {String} Title Title
 * @property {String} FirstName First name
 * @property {String} MiddleName Middle name
 * @property {String} LastName Last name
 * @property {String} Suffix Suffix
 * @property {String} MaidenName Maiden name
 * @property {String} NickName Nick name
 * @property {String} OnOffCampus On off campus
 * @property {String} OnCampusBuilding On campus building
 * @property {String} OnCampusRoom On campus room
 * @property {String} OnCampusPhone On campus phone
 * @property {String} OnCampusPrivatePhone On campus private phone
 * @property {String} OnCampusFax On campus fax
 * @property {String} Mail_Location On campus mail location
 * @property {String} OffCampusStreet1 Off campus street 1
 * @property {String} OffCampusStreet2 Off campus street 2
 * @property {String} OffCampusCity Off campus city
 * @property {String} OffCampusState Off campus state
 * @property {String} OffCampusPostalCode Off campus postal code
 * @property {String} OffCampusCountry Off campus country
 * @property {String} OffCampusPhone Off campus phone
 * @property {String} OffCampusFax Off campus fax
 * @property {String} HomeStreet1 Home street 1
 * @property {String} HomeStreet2 Home street 2
 * @property {String} HomeCity Home city
 * @property {String} HomeState Home state
 * @property {String} HomePostalCode Home postal code
 * @property {String} HomeCountry Home country
 * @property {String} HomePhone Home phone
 * @property {String} HomeFax Home fax
 * @property {String} Cohort Cohort
 * @property {String} Class Class
 * @property {String} KeepPrivate Keep private
 * @property {String} Major Major
 * @property {String} Barcode Barcode
 * @property {String} AdvisorIDs Advisor IDs
 * @property {String} Married Whether student is married or not ('Y' or 'N')
 * @property {String} Commuter Whether student ia commuter or not ('Y' or 'N')
 * @property {String} Major2 Second major
 * @property {String} Email Email
 * @property {String} Gender Gender
 * @property {String} grad_student Whether student is a graduate student or not ('Y' or 'N')
 * @property {String} GradDate Date of graduation
 * @property {String} Major3 Third major
 * @property {String} Minor1 Minor
 * @property {String} Minor2 Second minor
 * @property {String} Minor3 Third minor
 * @property {String} MobilePhone Mobile phone number
 * @property {Number} IsMobilePhonePrivate Whether mobile phone number is private or not
 * @property {String} AD_Username Username
 * @property {Number} show_pic Whether or not to show picture
 * @property {Number} preferred_photo Whether or not to show preferred photo
 * @property {String} Country Country
 * @property {String} BuildingDescription Description of building
 * @property {String} Major1Description Description of first major
 * @property {String} Major2Description Description of second major
 * @property {String} Major3Description Description of third major
 * @property {String} Minor1Description Description of first minor
 * @property {String} Minor2Description Description of second minor
 * @property {String} Minor3Description Description of third minor
 * @property {String} Facebook Facebook
 * @property {String} Twitter Twitter
 * @property {String} Instagram Instagram
 * @property {String} Handshake Handshake
 * @property {String} LinkedIn LinkedIn
 * @property {String} PersonType Type of person
 * @property {Number} ChapelRequired The number of CL&W credits the Student needs for this session
 * @property {Number} ChapelAttended The number of CL&W credits the Student has attended
 */

/**
 * @global
 * @typedef StudentAdvisorInfo
 * @property {String} Firstname First Name for advisor
 * @property {String} Lastname Last Name for advisor
 * @property {String} AD_Username User Name for advisor
 */

/**
 * @global
 * @typedef DiningInfo
 * @property {String} ChoiceDescription
 * @property {MealPlanComponent} Swipes
 * @property {MealPlanComponent} DiningDollars
 * @property {MealPlanComponent} CurrentBalance
 */

/**
 * @global
 * @typedef MealPlanComponent
 * @property {String} PlanDescription Description of the meal plan component
 * @property {String} PlanID
 * @property {Number} InitialBalance The initial balance of the meal plan
 * @property {String} CurrentBalance The current remaining meal plan balance
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
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<String>} Image as a Base64-encoded string
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
 * @returns {Response} Determines if the image was reset successfully
 */
const resetImage = () => {
  return http.post('/profiles/image/reset', '');
};

/**
 * upload an ID image for a user to the __ folder
 * @param {String} dataURI of the image being uploaded
 * @return {Response} response of http request
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
 * @param {String} dataURI of the image being uploaded
 * @return {Response} response of http request
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
 * @return {Promise.<LocalInfo>} Local user info
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
 * @return {CLWCredits} An Object of their current and required number of CL&W events,
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
 * @return {Promise.<DiningInfo>} Dining plan info object
 */
const getDiningInfo = async () => {
  return await http.get('dining');
};

/**
 * Get user profile info for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<StaffProfileInfo|StudentProfileInfo>} Profile info
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
  try {
    return await http.get(`profiles/clifton/${username}/`);
  } catch (error) {
    console.log('Clifton strengths error:', error);
    // TODO: currently throws an error whenever clifton strengths are missing,
    // should just return null or empty
  }
};

async function setAdvisors(profile) {
  profile.Advisors = await getAdvisors(profile.AD_Username);
}

async function setCliftonStrengths(profile) {
  const cliftonStrengths = await getCliftonStrengths(profile.AD_Username);
  profile.CliftonStrengths = cliftonStrengths?.Strengths;
}

async function setMobilePhonePrivacy(makePrivate) {
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
 * @param {String} id Identifier for student
 * @return {Request[]} List of requests for student
 */
const getSentMembershipRequests = () => {
  return http.get(`requests/student/`);
};

/**
 * Get memberships for specific student where they hold admin status
 * @param {String} id Identifier for student
 * @return {Request[]} List of memberships
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
