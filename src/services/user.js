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
import { socialMediaInfo } from '../socialMedia';

/**
 * @global
 * @typedef CLWCredits
 * @property {Number} current User's current CL&W credits
 * @property {Number} required User's required CL&W credits
 */

/**
 * @global
 * @typedef AttendedEvent
 * @property {Object} CHDate Start time of the event
 * @property {String} CHTermCD Term code of the event
 * @property {Object} CHTime Time the user's ID was scanned
 * @property {Number} Category_ID Category of the event
 * @property {String} Description Given description of the event
 * @property {String} Event_Name The generic name of the event
 * @property {String} Event_Title Specific title of the event
 * @property {String} Event_Type_Name Term code of the event
 * @property {Array.<String[]>} Occurrences Occurrences of the event, each containing start time,
 * end time, and location
 * @property {String} Organization Organization hosting the event
 * @property {Number} Required Required CL&W credits for the user
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
 * @property {String} LinkedIn LinkedIn
 * @property {String} PersonType Type of person
 */

function formatName(profile) {
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
    profile.Country = profile.Country.replace(/\w\S*/g, function(txt) {
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
function setClass(profile) {
  if (String(profile.PersonType).includes('stu')) {
    switch (profile.Class) {
      case '1':
        profile.Class = 'Freshman';
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
 * Get events attended by the user
 * @param {String} username username of the user
 * @param {String} termCode code for the semester
 * @return {Promise.<AttendedEvent[]>} An object of all CL&W events attended by the user
 */
const getAttendedEvents = (username, termCode) => http.get(`events/chapel/${username}/${termCode}`);

/**
 * Get image for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<String>} Image as a Base64-encoded string
 */
const getImage = async username => {
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
 */
const resetImage = () => {
  http.post('/profiles/image/reset', '');
};

/**
 * upload a photo to user's profile, which is then used as the preferred photo
 * @param {String} dataURI of the image being uploaded
 * @return {Response} response of http request
 */
const postImage = dataURI => {
  let imageData = new FormData();
  let blob = dataURItoBlob(dataURI);
  let type = blob.type.replace('image/', '');
  let headerOptions = {};
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
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

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
 * Get the number of cl&w credits aquired, and number of credits required.
 * @return {Promise.<CLWCredits>} An Object of their current and requiered number of CL&W events,
 */
const getChapelCredits = async () => {
  const { user_name: username } = getLocalInfo();
  const termCode = session.getTermCode();
  const attendedEvents = await getAttendedEvents(username, termCode);

  // Get required number of CL&W credits for the user, defaulting to thirty
  let required = 30;
  if (attendedEvents.length > 0) {
    [{ Required: required }] = attendedEvents;
  }

  return {
    current: attendedEvents.length || 0,
    required,
  };
};

/**
 * Get user profile info for a given user or the current user if `username` is not provided
 * @param {String} [username] Username in firstname.lastname format
 * @return {Promise.<StaffProfileInfo|StudentProfileInfo>} Profile info
 */
const getProfile = username => {
  let profile;
  if (username) {
    profile = http.get(`profiles/${username}/`);
  } else {
    profile = http.get('profiles');
  }
  return profile;
};

function toggleMobilePhonePrivacy() {
  let profile = getProfileInfo();
  let currentPrivacy = profile.IsMobilePhonePrivate;
  let newPrivacy = currentPrivacy ? 'N' : 'Y';
  let setPrivacy = async function(value) {
    return http
      .put('profiles/mobile_privacy/' + value, value)
      .then(res => {})
      .catch(reason => {
        //TODO handle error
      });
  };
  setPrivacy(newPrivacy);
}

async function setImagePrivacy(makePrivate) {
  // 'Y' = show image, 'N' = don't show image
  await http.put('profiles/image_privacy/' + (makePrivate ? 'N' : 'Y'));
}

const getMemberships = async id => {
  let memberships;
  memberships = await http.get(`memberships/student/${id}`);
  return memberships;
};

const getPublicMemberships = async username => {
  let memberships;
  memberships = await http.get(`/memberships/student/username/${username}/`);
  return memberships;
};

const getMembershipsAlphabetically = async id => {
  let memberships;
  memberships = await http.get(`memberships/student/${id}`);
  memberships.sort(compareByTitle);
  return memberships;
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

//compares items by SessionCode, used by getTranscriptInfo to sort by SessionCode
function compareBySession(a, b) {
  const sessA = a.SessionCode;
  const sessB = b.SessionCode;

  let comparison = 0;
  if (sessA > sessB) {
    comparison = 1;
  } else if (sessA < sessB) {
    comparison = -1;
  }
  return comparison;
}

//returns an array of membership objects from backend server,
//using asynchronous http.get request (via getMemberships function)
//sorts by SessionCode
const getTranscriptInfo = async id => {
  let transcriptInfo = await getMemberships(id);
  transcriptInfo.sort(compareBySession);
  return transcriptInfo;
};

const getProfileInfo = async username => {
  let profile = await getProfile(username);
  formatName(profile);
  setClass(profile);
  setClassYear(profile);
  setMajorObject(profile);
  formatCountry(profile);
  setOnOffCampus(profile);
  setMinorObject(profile);
  return profile;
};

function updateSocialLink(type, link) {
  let linkToSend;
  let url;
  //Get link ready to send to API
  //Remove domain names
  switch (type) {
    case 'facebook':
      linkToSend = link.substring(socialMediaInfo.facebook.prefix.length);
      break;
    case 'twitter':
      linkToSend = link.substring(socialMediaInfo.twitter.prefix.length);
      break;
    case 'linkedin': //linkedIn copy-paste leaves trailing slash causing problems
      if (link.charAt(link.length - 1) === '/') {
        linkToSend = link.substring(socialMediaInfo.linkedIn.prefix.length, link.length - 1);
      } else {
        linkToSend = link.substring(socialMediaInfo.linkedIn.prefix.length);
      }
      break;
    case 'instagram':
      linkToSend = link.substring(socialMediaInfo.instagram.prefix.length);
      break;
    default:
      break;
  }
  linkToSend = encodeURIComponent(linkToSend);

  url = {
    [type]: linkToSend,
  };
  //Send put request
  return http.put('profiles/' + type, url).catch(() => {
    console.log('put requested');
  });
}

export default {
  toggleMobilePhonePrivacy,
  setImagePrivacy,
  getMemberships,
  getAttendedEvents,
  getChapelCredits,
  getImage,
  getLocalInfo,
  getPublicMemberships,
  getMembershipsAlphabetically,
  getProfileInfo,
  resetImage,
  postImage,
  getTranscriptInfo,
  updateSocialLink,
};
