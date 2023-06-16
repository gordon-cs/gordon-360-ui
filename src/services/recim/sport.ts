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
const createSport = (newSport: UploadSport): Promise<Sport> => http.post(`recim/sports`, newSport);

const getAllSports = (): Promise<Sport[]> => http.get(`recim/sports`);

const getSportByID = (ID: number): Promise<Sport> => http.get(`recim/sports/${ID}`);

const editSport = (ID: number, updatedSport: PatchSport): Promise<Sport> =>
  http.patch(`recim/sports/${ID}`, updatedSport);

const deleteSport = (ID: number) => http.del(`recim/sports/${ID}`);

export { createSport, getSportByID, editSport, getAllSports, deleteSport };
