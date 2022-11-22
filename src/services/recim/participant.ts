import http from '../http';

export type participant = {
  Username: string;
  Email: string;
  Role: string;
  Status: string;
  Notification: participantNotification[];
};

type createdParticipant = {
  ID: number;
};

type patchParticipant = {
  ActivityID: number;
  ActivityPrivType: string;
  IsFreeAgent: boolean;
  TeamID: number;
  TeamRole: string;
};

type patchParticipantStatus = {
  StatusDescription: string;
  EndDate: string;
};

type participantStatus = {
  Username: string;
  Status: string;
  StartDate: string;
  EndDate: string;
};

type uploadParticipantNotification = {
  Message: string;
  EndDate: string;
};

type participantNotification = {
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
  notification: uploadParticipantNotification,
): Promise<Object[]> => http.post(`participants/${username}/notifications`, notification);

const editParticipant = (
  username: string,
  updatedParticipant: patchParticipant,
): Promise<Object[]> => http.patch(`recim/participants/${username}`, updatedParticipant);

const editParticipantStatus = (
  username: string,
  status: patchParticipantStatus,
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
