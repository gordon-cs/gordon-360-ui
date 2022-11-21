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
  StatusID: number;
  ActivityID: number;
  PRivate: boolean;
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
  //return await http.patch(`recim/activities`, updatedActivity);
  return [];
};

//Team Routes
const createTeam = async (newTeam: uploadTeam): Promise<Object[]> => {
  return await http.post('recim/teams', newTeam);
};

const getTeamByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/teams/${ID}`);
};

const addParticipantToTeam = async (
  participantUsername: string,
  teamID: number,
): Promise<Object[]> => {
  return await http.post(
    `recim/teams/users?participantUsername=${participantUsername}&teamID=${teamID}`,
  );
};

const editTeam = async (teamID: number, updatedTeam: uploadActivity): Promise<Object[]> => {
  //return await http.patch(`recim/activities`, updatedTeam);
  return [];
};

//Sport Routes
const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

export { getAllActivities, createNewActivity, getActivityByID, getAllSports };
