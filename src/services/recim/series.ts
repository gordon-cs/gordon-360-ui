import http from '../http';
import { match } from './match';
import { teamRecord } from './team';

export type series = {
  ID: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  Type: string;
  Status: string;
  Match: match[];
  TeamStanding: teamRecord[];
};

type createdSeries = {
  ID: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  TypeID: number;
  StatusID: number;
};

type uploadSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup
};

type patchSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  StatusID: number;
};

//Series Routes
const createSeries = async (
  referenceSeriesID: number,
  newSeries: uploadSeries,
): Promise<Object[]> => {
  var subQuery = referenceSeriesID === null ? '' : `?referenceSeriesID=${referenceSeriesID}`;
  return await http.post(`recim/series${subQuery}`, newSeries);
};

const getSeriesByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/series/${ID}`);
};

const getAllSeries = async (): Promise<Object[]> => {
  return await http.get(`recim/series`);
};

const editSeries = async (seriesID: number, updatedSeries: patchSeries): Promise<Object[]> => {
  return await http.patch(`recim/series/${seriesID}`, updatedSeries);
};

export { createSeries, getSeriesByID, getAllSeries, editSeries };
