import emailsService from './emails';
import http from './http';
import { compareByProperty, sort } from './utils';

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

const closeActivity = (activityCode: string, sessionCode: string): Promise<void> =>
  http.put(`activities/${activityCode}/session/${sessionCode}/close`);

type ActivityEdit = {
  ACT_CDE: string;
  ACT_URL: string;
  ACT_BLURB: string;
  ACT_JOIN_INFO: string;
};

const editActivity = (activityCode: string, data: ActivityEdit): Promise<ActivityEdit> =>
  http.put(`activities/${activityCode}`, data);

const setActivityImage = (activityCode: string, imageDataURI: string): Promise<any> =>
  http.postImage(`activities/${activityCode}/image/`, imageDataURI);

const get = (activityCode: string): Promise<Activity> => http.get(`activities/${activityCode}`);

const getAll = (sessionCode: string) =>
  http
    .get<Activity[]>(`activities/session/${sessionCode}`)
    .then(sort(compareByProperty('ActivityDescription')));

const getAdvisors = (activityCode: string, sessionCode: string): Promise<Person[]> =>
  emailsService.getPerActivity(activityCode, sessionCode, 'advisor');

const getGroupAdmins = (activityCode: string, sessionCode: string): Promise<Person[]> =>
  emailsService.getPerActivity(activityCode, sessionCode, 'group-admin');

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

const reopenActivity = (activityCode: string, sessionCode: string): Promise<void> =>
  http.put(`activities/${activityCode}/session/${sessionCode}/open`);

const resetImage = (activityCode: string): Promise<void> =>
  http.post(`activities/${activityCode}/image/reset`, '');

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
