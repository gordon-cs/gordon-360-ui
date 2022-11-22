import http from '../http';

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
const createSport = async (newSport: uploadSport): Promise<Object[]> => {
  return await http.post(`recim/sports`, newSport);
};
const getAllSports = async (): Promise<Object[]> => {
  return await http.get(`recim/sports`);
};

const getSportByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/sports/${ID}`);
};

const editSport = async (ID: number, updatedSport: patchSport): Promise<Object[]> => {
  return await http.patch(`recim/series/${ID}`, updatedSport);
};

export { createSport, getSportByID, editSport, getAllSports };
