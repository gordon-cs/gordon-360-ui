import http from './http';

// all Gordon Rec-IM http requests
type League = {
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
  await http.post('recim/league/add_smash');
};

const createNewLeague = async (newLeague: League) => {
  await http.post('recim/league/add', newLeague);
};

const getAllLeagues = async (): Promise<League[]> => await http.get('recim/league');

export { postSmashLeague, getAllLeagues, createNewLeague };
