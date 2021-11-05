import sortBy from 'lodash/sortBy';
import http from './http';

type Activity = {
  ActivityBlurb: string;
  ActivityCode: string;
  ActivityDescription: string;
  ActivityImagePath: string;
  ActivityJoinInfo: string;
  ActivityType: string;
  ActivityTypeDescription: string;
  ActivityURL: string;
  /** Whether the club is private or public to everyone, such as a scholars group etc. false=public true=private */
  Privacy: string;
};

type Person = {
  FirstName: string;
  LastName: string;
  Email: string;
};

const closeActivity = async (activityCode: string, sessionCode: string): Promise<void> => {
  return await http.put(`activities/${activityCode}/session/${sessionCode}/close`);
};

type ActivityEdit = {
  ACT_CDE: string;
  ACT_URL: string;
  ACT_BLURB: string;
  ACT_JOIN_INFO: string;
};

const editActivity = async (activityCode: string, data: ActivityEdit): Promise<ActivityEdit> => {
  return await http.put(`activities/${activityCode}`, data);
};

const setActivityImage = (activityCode: string, dataURI: string): Promise<any> => {
  const imageData = new FormData();
  const blob = dataURItoBlob(dataURI);
  const type = blob.type.replace('image/', '');
  imageData.append('canvasImage', blob, 'canvasImage.' + type);
  return http.post(`activities/${activityCode}/image/`, imageData);
};

// convert data to blob
function dataURItoBlob(dataURI: string) {
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

const get = (activityCode: string): Promise<Activity> => http.get(`activities/${activityCode}`);

const getAll = async (sessionCode: string): Promise<Activity[]> => {
  const activities: Activity[] = await http.get(`activities/session/${sessionCode}`);
  return sortBy(activities, (activity) => activity.ActivityDescription);
};

const getAdvisors = (activityCode: string, sessionCode: string): Promise<Person[]> =>
  http.get(`emails/activity/${activityCode}/advisors/session/${sessionCode}`);

const getGroupAdmins = (activityCode: string, sessionCode: string): Promise<Person[]> =>
  http.get(`emails/activity/${activityCode}/group-admin/session/${sessionCode}`);

const getStatus = (activityCode: string, sessionCode: string): Promise<'OPEN' | 'CLOSED'> =>
  http.get(`activities/${sessionCode}/${activityCode}/status`);

const getTypes = (sessionCode: string): Promise<string[]> =>
  http.get(`activities/session/${sessionCode}/types`);

const getOpen = (): Promise<Activity[]> => http.get(`activities/open`);

const getClosed = (): Promise<Activity[]> => http.get(`activities/closed`);

/**
 * Filter a list of activities by type and description
 *
 * @param activities List of activities
 * @param typeDescription Activity type description to match exactly against
 * @param search Search value to fuzzy match description against
 * @returns Filtered activities
 */
const filter = (
  activities: Activity[],
  typeDescription: string,
  search: string = '',
): Activity[] => {
  if (activities) {
    let filteredActivities = activities;
    if (typeDescription) {
      filteredActivities = filteredActivities.filter(
        (activity) => activity.ActivityTypeDescription === typeDescription,
      );
    }

    if (search !== '') {
      filteredActivities = filteredActivities.filter(({ ActivityDescription: description }) =>
        description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return filteredActivities;
  } else {
    return activities;
  }
};

const reopenActivity = async (activityCode: string, sessionCode: string): Promise<void> => {
  return await http.put(`activities/${activityCode}/session/${sessionCode}/open`);
};

const resetImage = async (activityCode: string): Promise<void> => {
  return await http.post(`activities/${activityCode}/image/reset`);
};

const involvementService = {
  closeActivity,
  editActivity,
  setActivityImage,
  get,
  getAdvisors,
  getAll,
  getGroupAdmins,
  getStatus,
  getTypes,
  getOpen,
  getClosed,
  filter,
  reopenActivity,
  resetImage,
};

export default involvementService;
