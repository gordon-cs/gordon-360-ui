import http from '../http';

export type participant = {
  Username: string;
  Email: string;
  Role: string;
  Status: string;
  Notification: participantNotification[];
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
const createParticipant = async (ID: number): Promise<Object[]> => {
  return await http.post(`recim/participants/${ID}`);
};

const getParticipants = async (): Promise<Object[]> => {
  return await http.get(`recim/participants`);
};

const getParticipantByUsername = async (username: string): Promise<Object[]> => {
  return await http.get(`recim/participants/${username}`);
};

const getParticipantTeams = async (username: string): Promise<Object[]> => {
  return await http.get(`recim/participants/${username}/teams`);
};

const getParticipantStatusHistory = async (username: string): Promise<Object[]> => {
  return await http.get(`recim/participants/${username}/StatusHistory`);
};

const sendNotification = async (
  username: string,
  notification: uploadParticipantNotification,
): Promise<Object[]> => {
  return await http.post(`participants/${username}/notifications`, notification);
};

const editParticipant = async (
  username: string,
  updatedParticipant: patchParticipant,
): Promise<Object[]> => {
  return await http.patch(`recim/participants/${username}`, updatedParticipant);
};

const editParticipantStatus = async (
  username: string,
  status: patchParticipantStatus,
): Promise<Object[]> => {
  return await http.patch(`recim/participants/${username}`, status);
};

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
