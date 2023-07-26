import http from '../http';
import { CreatedSeries } from './series';

type PatchAffiliation = {
  Name: string;
  Logo: string;
};

type AffiliationPoints = {
  TeamID: number;
  SeriesID: number;
  Points: number | null;
};

type Affiliation = {
  Name: string;
  Points: number;
  Series: CreatedSeries[];
};

const getAffiliations = (): Promise<Affiliation[]> => http.get(`recim/affiliations`);

const getAffiliationByName = (name: string): Promise<Affiliation> =>
  http.get(`recim/affiliations/${name}`);

const createAffiliation = (name: string): Promise<string> => http.post(`recim/affiliations`, name);

const assignPointsToAffiliation = async (name: string, points: AffiliationPoints) =>
  http.put(`recim/affiliations/${name}/points`, points);

const updateAffiliation = async (name: string, update: PatchAffiliation): Promise<any> =>
  http.patch(`recim/affiliation/${name}`, update);

const deleteAffiliation = async (name: string) => http.del(`recim/affiliations/${name}`);

export {
  getAffiliations,
  getAffiliationByName,
  createAffiliation,
  updateAffiliation,
  assignPointsToAffiliation,
  deleteAffiliation,
};
