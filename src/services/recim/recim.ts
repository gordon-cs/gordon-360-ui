import { CreatedActivity } from './activity';
import http from '../http';

export type Lookup = {
  ID: number;
  Description: string;
};

type Account = {
  FirstName: string;
  LastName: string;
  Email: string;
  ADUsername: string;
  AccountType: string;
};

type ActivityReport = {
  NumberOfParticipants: number;
  Activity: CreatedActivity;
};

type NewParticipantReport = {
  UserAccount: Account;
  NumberOfActivitiesParticipated: number;
};

type ParticipantReport = {
  Username: string;
  SpecifiedGender: string;
};

type RecIMReport = {
  StartTime: string;
  EndTime: string;
  Activities: ActivityReport[];
  NumberOfNewParticipants: number;
  NewParticipants: NewParticipantReport[];
  NumberOfActiveParticipants: number;
  ActiveParticipants: ParticipantReport[];
};

const getRecIMReport = (startTime: string, endTime: string): Promise<RecIMReport> =>
  http.get(`recim/admin/report?start=${startTime}&end=${endTime}`);

export { getRecIMReport };
