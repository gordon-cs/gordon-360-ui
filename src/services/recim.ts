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

// temporary example (hard coded activity object in API)
const postSmashActivity = async () => {
  await http.post('recim/activities/add_smash');
};

const createNewActivity = async (newActivity: Activity) => {
  await http.post('recim/activities', newActivity);
};

const getAllActivities = async (): Promise<Object[]> => await http.get('recim/activities');

export { postSmashActivity, getAllActivities, createNewActivity };
