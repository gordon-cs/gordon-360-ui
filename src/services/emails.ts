import http from './http';
import { Participation } from './membership';

export type Contact = {
  FirstName: string;
  LastName: string;
  Email: string;
  Description: string;
};

const getPerActivity = (
  involvementCode: string,
  queryParams: {
    sessionCode?: string;
    participationTypes?: Participation[];
  },
): Promise<Contact[]> =>
  http.get(`emails/involvement/${involvementCode}${http.toQueryString(queryParams)}`);

const emailsService = {
  getPerActivity,
};

export default emailsService;
