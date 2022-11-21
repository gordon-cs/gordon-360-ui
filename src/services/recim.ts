import http from './http';

// all Gordon Rec-IM http requests
type uploadActivity = {
  Name: string;
  RegistrationStart: Date;
  RegistrationEnd: Date;
  SportID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
};

type uploadSeries = {
  Name: string;
  StartDate: Date;
  EndDate: Date;
  ActivityID: number;
  TypeID: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup
};

type uploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

type uploadSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type uploadMatch = {
  StartTime: Date;
  SeriesID: number;
  SurfaceID: number;
  TeamIDs: Array<number>;
};

type uploadParticipantNotification = {
  Message: string;
  EndDate: Date;
};

//Activity Routes
const createNewActivity = async (newActivity: uploadActivity): Promise<Object[]> => {
  return await http.post('recim/activities', newActivity);
};

const getActivityByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/activities/${ID}`);
};

const getAllActivities = async (
  active: boolean,
  time: String,
  registrationOpen: boolean,
): Promise<Object[]> => {
  if (registrationOpen) {
    return await http.get(`recim/activities?registrationOpen=${registrationOpen}`);
  } else {
    if (time) {
      return await http.get(`recim/activities?active=${active}&time=${time}`);
    } else {
      return await http.get(`recim/activities?active=${active}`);
    }
  }
};

const editActivity = async (
  activityID: number,
  updatedActivity: uploadActivity,
): Promise<Object[]> => {
  return await http.patch(`recim/activities/${activityID}`, updatedActivity);
};

//Team Routes
const createTeam = async (newTeam: uploadTeam): Promise<Object[]> => {
  return await http.post('recim/teams', newTeam);
};

const getTeamByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/teams/${ID}`);
};

const addParticipantToTeam = async (username: string, teamID: number): Promise<Object[]> => {
  return await http.post(
    `recim/teams/participants?participantUsername=${username}&teamID=${teamID}`,
  );
};

const editTeam = async (teamID: number, updatedTeam: patchTeam): Promise<Object[]> => {
  return await http.patch(`recim/teams/${teamID}`, updatedTeam);
};

//Participant Routes
const createParticipant = async (participantID: number): Promise<Object[]> => {
  return await http.post(`recim/participants/${participantID}`);
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
  participantUsername: string,
  notification: uploadParticipantNotification,
): Promise<Object[]> => {
  return await http.post(`participants/{username}/notifications`, notification);
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

//Series Routes
const createSeries = async (
  referenceSeriesID: number,
  newSeries: uploadSeries,
): Promise<Object[]> => {
  var subQuery = referenceSeriesID === null ? '' : `?referenceSeriesID=${referenceSeriesID}`;
  return await http.post(`recim/series${subQuery}`, newSeries);
};

const getSeriesByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/series/${ID}`);
};

const getAllSeries = async (): Promise<Object[]> => {
  return await http.get(`recim/series`);
};

const editSeries = async (seriesID: number, updatedSeries: patchSeries): Promise<Object[]> => {
  return await http.patch(`recim/series/${seriesID}`, updatedSeries);
};

//Sport Routes
const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

export { getAllActivities, createNewActivity, getActivityByID, getAllSports };
