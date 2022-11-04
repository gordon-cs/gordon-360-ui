import http from './http';

type Person = {
  FirstName: string;
  LastName: string;
  Email: string;
  Description: string;
};

type ParticipationType = 'advisor' | 'leader' | 'group-admin' | 'member' | 'guest';

const getPerActivity = (
  activityCode: string,
  sessionCode: string = '',
  participation?: ParticipationType,
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
