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

// temporary example (hard coded activity object in API)
const postSmashActivity = async () => {
  await http.post('recim/activities/add_smash');
};

const createNewActivity = async (newActivity: Activity) => {
  await http.post('recim/activities', newActivity);
};

const getAllActivities = async (): Promise<Object[]> => await http.get('recim/activities');

const createNewTeam = async (newTeam: Team) => {
  await http.post('recim/teams', newTeam);
};

export { postSmashActivity, getAllActivities, createNewActivity, createNewTeam };
