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

// temporary example (hard coded league object in API)
const postSmashLeague = async () => {
  await http.post('recim/activities/add_smash');
};

const createNewLeague = async (newActivity: Activity) => {
  await http.post('recim/activities', newActivity);
};

const getAllLeagues = async (): Promise<Object[]> => await http.get('recim/activities');

export { postSmashLeague, getAllLeagues, createNewLeague };
