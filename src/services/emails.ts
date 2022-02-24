import http from './http';

const get = (activityCode: string): Promise<string[]> =>
  http.get(`emails/activity/${activityCode}`);

const getForSession = (activityCode: string, SessionId: string): Promise<string[]> =>
  http.get(`emails/activity/${activityCode}/session/${SessionId}`);

const getLeaders = (activityCode: string): Promise<string[]> =>
  http.get(`emails/activity/${activityCode}/leaders`);

const getLeadersForSession = (activityCode: string, SessionId: string) =>
  http.get(`emails/activity/${activityCode}/leaders/session/${SessionId}`);

const getAdvisors = (activityCode: string): Promise<string[]> =>
  http.get(`emails/activity/${activityCode}/advisors`);

const getAdvisorsForSession = (activityCode: string, SessionId: string) =>
  http.get(`emails/activity/${activityCode}/advisors/session/${SessionId}`);

const emailsService = {
  get,
  getForSession,
  getLeaders,
  getLeadersForSession,
  getAdvisors,
  getAdvisorsForSession,
};

export default emailsService;
