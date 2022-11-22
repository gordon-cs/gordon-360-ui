import http from '../http';

//created sport and sport are the same
export type Sport = {
  ID: number;
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type UploadSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

type PatchSport = {
  Name: string;
  Description: string;
  Rules: string;
  Logo: string;
};

//Sport Routes
const createSport = async (newSport: UploadSport): Promise<Object[]> =>
  http.post(`recim/sports`, newSport);

const getAllSports = async (): Promise<Object[]> => http.get(`recim/sports`);

const getSportByID = async (ID: number): Promise<Object[]> => http.get(`recim/sports/${ID}`);

const editSport = async (ID: number, updatedSport: PatchSport): Promise<Object[]> =>
  http.patch(`recim/series/${ID}`, updatedSport);

export { createSport, getSportByID, editSport, getAllSports };
