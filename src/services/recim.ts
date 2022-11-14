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

type Team = {
  ID: number;
  Name: string;
  Logo: string;
  StatusID: number;
  ActivityID: number;
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

const createNewTeam = async (newTeam: Team) => {
  await http.post('recim/teams', newTeam);
};

export { getAllActivities, createNewActivity, getActivityByID, getAllSports, createNewTeam };
