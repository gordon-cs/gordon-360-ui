import http from './http';
import { Participation } from './membership';

type Person = {
  FirstName: string;
  LastName: string;
  Email: string;
  Description: string;
};

const getPerActivity = (
  activityCode: string,
  sessionCode: string = '',
  participation?: Participation,
): Promise<Person[]> => {
  let url = `emails/activity/${activityCode}`;
  if (sessionCode && participation) {
    url += `?sessionCode=${sessionCode}&participationType=${participation}`;
  } else if (sessionCode) {
    url += `?sessionCode=${sessionCode}`;
  } else if (participation) {
    url += `?participationType=${participation}`;
  }

  return http.get(url);
};

const emailsService = {
  getPerActivity,
};

export default emailsService;
