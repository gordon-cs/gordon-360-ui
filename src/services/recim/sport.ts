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
  IsLogoUpdate: boolean;
};

//Sport Routes
const createSport = async (newSport: UploadSport): Promise<Sport> =>
  http.post(`recim/sports`, newSport);

const getAllSports = async (): Promise<Sport[]> => http.get(`recim/sports`);

const getSportByID = async (ID: number): Promise<Sport> => http.get(`recim/sports/${ID}`);

const editSport = async (ID: number, updatedSport: PatchSport): Promise<Sport> =>
  http.patch(`recim/series/${ID}`, updatedSport);

export { createSport, getSportByID, editSport, getAllSports };
