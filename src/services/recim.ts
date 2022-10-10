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
  await http.post('recim/leagues/add_smash');
};

const createNewLeague = async (newLeague: League) => {
  await http.post('recim/leagues', newLeague);
};

const getAllLeagues = async (): Promise<Object[]> => await http.get('recim/leagues');

export { postSmashLeague, getAllLeagues, createNewLeague };
