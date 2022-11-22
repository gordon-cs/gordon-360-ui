import http from '../http';

export type Participant = {
  Username: string;
  Email: string;
  Role: string;
  Status: string;
  Notification: ParticipantNotification[];
};

type CreatedParticipant = {
  ID: number;
};

type PatchParticipant = {
  ActivityID: number;
  ActivityPrivType: string;
  IsFreeAgent: boolean;
  TeamID: number;
  TeamRole: string;
};

type PatchParticipantStatus = {
  StatusDescription: string;
  EndDate: string;
};

type ParticipantStatus = {
  Username: string;
  Status: string;
  StartDate: string;
  EndDate: string;
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

//Participant Routes
const createParticipant = (ID: number): Promise<Object[]> => http.post(`recim/participants/${ID}`);

const getParticipants = (): Promise<Object[]> => http.get(`recim/participants`);

const getParticipantByUsername = (username: string): Promise<Object[]> =>
  http.get(`recim/participants/${username}`);

const getParticipantTeams = (username: string): Promise<Object[]> =>
  http.get(`recim/participants/${username}/teams`);

const getParticipantStatusHistory = (username: string): Promise<Object[]> =>
  http.get(`recim/participants/${username}/StatusHistory`);

const sendNotification = (
  username: string,
  notification: UploadParticipantNotification,
): Promise<Object[]> => http.post(`participants/${username}/notifications`, notification);

const editParticipant = (
  username: string,
  updatedParticipant: PatchParticipant,
): Promise<Object[]> => http.patch(`recim/participants/${username}`, updatedParticipant);

const editParticipantStatus = (
  username: string,
  status: PatchParticipantStatus,
): Promise<Object[]> => http.patch(`recim/participants/${username}`, status);

export {
  createParticipant,
  getParticipants,
  getParticipantByUsername,
  getParticipantTeams,
  getParticipantStatusHistory,
  sendNotification,
  editParticipant,
  editParticipantStatus,
};
