import http from './http';

// all Gordon Rec-IM http requests

type Activity = {
  ID: number;
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
type Team = {
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
    return await http.get(`recim/activities?${active}&${time}`);
  } else {
    return await http.get(`recim/activities?${active}`);
  }
};

const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

const createNewTeam = async (newTeam: Team, captainUsername: string) => {
  return await http.post(`recim/teams?captain=${captainUsername}`, newTeam);
};

export { getAllActivities, createNewActivity, getActivityByID, getAllSports, createNewTeam };
