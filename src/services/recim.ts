import http from './http';

// all Gordon Rec-IM http requests
type uploadActivity = {
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
};

type patchActivity = {
  ID: number;
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  SportID: number;
  StatusID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
  Completed: boolean;
};

type uploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

type patchTeam = {
  Name: string;
  StatusID: number;
  Logo: string;
};

type patchParticipant = {
  Username: string;
  ActivityID: number;
  ActivityPrivType: string;
  IsFreeAgent: boolean;
  TeamID: number;
  TeamRole: string;
};

type patchParticipantStatus = {
  Username: string;
  StatusDescription: string;
  EndDate: string;
};

type uploadSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup
};

type patchSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  Description: string;
  StatusID: number;
};

type uploadSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type patchSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type uploadMatch = {
  StartTime: string;
  SeriesID: number;
  SurfaceID: number;
  TeamIDs: Array<number>;
};

type uploadParticipantNotification = {
  Message: string;
  EndDate: string;
};

type patchMatchStats = {
  TeamID: number;
  Status: string;
  Score: number;
  Sportsmanship: number;
};

type patchMatch = {
  Time: string;
  SurfaceID: number;
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

const editActivity = async (ID: number, updatedActivity: patchActivity): Promise<Object[]> => {
  return await http.patch(`recim/activities/${ID}`, updatedActivity);
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

const editTeam = async (ID: number, updatedTeam: patchTeam): Promise<Object[]> => {
  return await http.patch(`recim/teams/${ID}`, updatedTeam);
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
const createSport = async (newSport: uploadSport): Promise<Object[]> => {
  return await http.post(`recim/sports`, newSport);
};
const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

const getSportByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/sports/${ID}`);
};

const editSport = async (ID: number, updatedSport: patchSport): Promise<Object[]> => {
  return await http.patch(`recim/series/${ID}`, updatedSport);
};

//Match Routes
const createMatch = async (newMatch: uploadMatch): Promise<Object[]> => {
  return await http.post('recim/matches', newMatch);
};

const getMatchByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/matches/${ID}`);
};

const updateMatchStats = async (
  matchID: number,
  updatedTeamStats: patchMatchStats,
): Promise<Object[]> => {
  return await http.patch(`recim/matches/${matchID}/stats`, updatedTeamStats);
};

const updateMatch = async (ID: number, updatedMatch: patchMatch): Promise<Object[]> => {
  return await http.patch(`recim/matches/${ID}`, updatedMatch);
};

export {
  createNewActivity,
  getActivityByID,
  getAllActivities,
  editActivity,
  createTeam,
  getTeamByID,
  addParticipantToTeam,
  editTeam,
  createParticipant,
  getParticipants,
  getParticipantByUsername,
  getParticipantTeams,
  getParticipantStatusHistory,
  sendNotification,
  editParticipant,
  editParticipantStatus,
  createSeries,
  getSeriesByID,
  getAllSeries,
  editSeries,
  createSport,
  getSportByID,
  editSport,
  getAllSports,
  createMatch,
  getMatchByID,
  updateMatchStats,
  updateMatch,
};
