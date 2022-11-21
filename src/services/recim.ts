import http from './http';

// all Gordon Rec-IM http requests

type Activity = {
  Name: string;
  RegistrationStart: string;
  RegistrationEnd: string;
  TypeID: number;
  SportID: number;
  StatusID: number;
  MinCapacity: number;
  MaxCapacity: number;
  SoloRegistration: boolean;
  Logo: string;
  Completed: boolean;
};

// Currently just for posting a team,
// need to figure out whether to use StatusID or Status (for get)
type PostTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

const createNewActivity = async (newActivity: Activity) => {
  await http.post('recim/activities', newActivity);
};

const getActivityByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/activities/${ID}`);
};

const getAllActivities = async (active: boolean, time: String): Promise<Object[]> => {
  if (time) {
    return await http.get(`recim/activities?$active={active}&time=${time}`);
  } else {
    return await http.get(`recim/activities?active=${active}`);
  }
};

const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

const createNewTeam = async (newTeam: PostTeam, captainUsername: string) => {
  return await http.post(`recim/teams?captain=${captainUsername}`, newTeam);
};

const getMyTeams = async (username: string): Promise<Object[]> => {
  return await http.get(`recim/participants/${username}/teams`);
};

export {
  getAllActivities,
  createNewActivity,
  getActivityByID,
  getAllSports,
  createNewTeam,
  getMyTeams,
};
