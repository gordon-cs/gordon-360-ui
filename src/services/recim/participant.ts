import http from '../http';
import { Team } from './team';
import { Lookup } from './recim';

export type Participant = {
  Username: string;
  Email: string;
  Role: string;
  AllowEmails: boolean;
  SpecifiedGender: string;
  GamesAttended: number;
  Status: string;
  Notification: ParticipantNotification[];
  IsAdmin: boolean;
  IsCustom: boolean;
  FirstName: string;
  LastName: string;
};

type CustomParticipant = {
  AllowEmails: boolean;
  SpecifiedGender: string;
  FirstName: string;
  LastName: string;
};

type PatchParticipantActivity = {
  ActivityID: number;
  ActivityPrivID: number;
  IsFreeAgent: boolean;
};

type PatchParticipantStatus = {
  StatusID: number;
  EndDate: string;
};

type ParticipantStatus = {
  Username: string;
  Status: string;
  StartDate: string;
  EndDate: string;
};

type CreatedParticipantStatus = {
  ID: number;
  ParticipantUsername: string;
  StatusID: number;
  StartDate: string;
  EndDate?: string;
};

type UploadParticipantNotification = {
  Message: string;
  EndDate: string;
};

type ParticipantNotification = {
  ID: number;
  Message: string;
  DispatchDate: string;
};

type CreatedParticipantNotification = {
  ID: number;
  ParticipantUsername: string;
  Message: string;
  EndDate: string;
  DispatchDate: string;
};

type CreatedParticipantActivity = {
  ID: number;
  ActivityID: number;
  ParticipantUsername: string;
  PrivTypeID: number;
  IsFreeAgent: boolean;
};

//Participant Routes
const createParticipant = (username: string): Promise<Participant> =>
  http.put(`recim/participants/${username}`);

const createCustomParticipant = (
  username: string,
  newcustomParticipant: CustomParticipant,
): Promise<Participant> => http.put(`recim/participants/${username}/custom`, newcustomParticipant);

const getParticipants = async (): Promise<Participant[]> => http.get(`recim/participants`);

const getParticipantByUsername = (username: string): Promise<Participant> =>
  http.get(`recim/participants/${username}`);

const getParticipantTeams = (username: string): Promise<Team[]> =>
  http.get(`recim/participants/${username}/teams`);

const getParticipantStatusHistory = (username: string): Promise<ParticipantStatus[]> =>
  http.get(`recim/participants/${username}/StatusHistory`);

const getParticipantStatusTypes = (): Promise<Lookup[]> =>
  http.get(`recim/participants/lookup?type=status`);

const getParticipantActivityPrivTypes = (): Promise<Lookup[]> =>
  http.get(`recim/participants/lookup?type=activitypriv`);

const sendNotification = (
  username: string,
  notification: UploadParticipantNotification,
): Promise<CreatedParticipantNotification> =>
  http.post(`participants/${username}/notifications`, notification);

const editCustomParticipant = (
  username: string,
  updatedCustomParticipant: CustomParticipant,
): Promise<Participant> =>
  http.patch(`recim/participants/${username}/custom/update`, updatedCustomParticipant);

const editParticipantAdmin = (username: string, isAdmin: boolean): Promise<Participant> =>
  http.patch(`recim/participants/${username}/admin`, isAdmin);

const editParticipantAllowEmails = (username: string, AllowEmails: boolean): Promise<Participant> =>
  http.patch(`recim/participants/${username}/emails`, AllowEmails);

const editParticipantActivity = (
  username: string,
  updatedParticipant: PatchParticipantActivity,
): Promise<CreatedParticipantActivity> =>
  http.patch(`recim/participants/${username}/activities`, updatedParticipant);

const editParticipantStatus = (
  username: string,
  status: PatchParticipantStatus,
): Promise<CreatedParticipantStatus> => http.patch(`recim/participants/${username}/status`, status);

export {
  createParticipant,
  createCustomParticipant,
  getParticipants,
  getParticipantByUsername,
  getParticipantTeams,
  getParticipantStatusHistory,
  getParticipantStatusTypes,
  getParticipantActivityPrivTypes,
  sendNotification,
  editCustomParticipant,
  editParticipantAdmin,
  editParticipantAllowEmails,
  editParticipantActivity,
  editParticipantStatus,
};
