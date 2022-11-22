import http from '../http';

//created sport and sport are the same
export type sport = {
  ID: number;
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
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

//Sport Routes
const createSport = async (newSport: uploadSport): Promise<Object[]> =>
  http.post(`recim/sports`, newSport);

const getAllSports = async (): Promise<Object[]> => http.get(`recim/sports`);

const getSportByID = async (ID: number): Promise<Object[]> => http.get(`recim/sports/${ID}`);

const editSport = async (ID: number, updatedSport: patchSport): Promise<Object[]> =>
  http.patch(`recim/series/${ID}`, updatedSport);

export { createSport, getSportByID, editSport, getAllSports };
