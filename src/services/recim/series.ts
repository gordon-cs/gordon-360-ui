import http from '../http';
import { Match } from './match';
import { TeamRecord } from './team';

export type Series = {
  ID: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  Type: string;
  Status: string;
  Match: Match[];
  TeamStanding: TeamRecord[];
};

type CreatedSeries = {
  ID: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  StatusID: number;
};

type UploadSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup
};

type PatchSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  StatusID: number;
};

//Series Routes
const createSeries = async (
  referenceSeriesID: number,
  newSeries: UploadSeries,
): Promise<CreatedSeries> => {
  var subQuery = referenceSeriesID === null ? '' : `?referenceSeriesID=${referenceSeriesID}`;
  return await http.post(`recim/series${subQuery}`, newSeries);
};

const getSeriesByID = (ID: number): Promise<Series> => http.get(`recim/series/${ID}`);

const getAllSeries = (): Promise<Series[]> => http.get(`recim/series`);

const editSeries = (seriesID: number, updatedSeries: PatchSeries): Promise<CreatedSeries> =>
  http.patch(`recim/series/${seriesID}`, updatedSeries);

export { createSeries, getSeriesByID, getAllSeries, editSeries };
