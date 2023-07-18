import http from '../http';
import { Match } from './match';
import { TeamRecord } from './team';
import { Lookup } from './recim';

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
  Schedule: SeriesSchedule;
};

type SeriesSchedule = {
  ID: number;
  AvailableDays: Record<string, boolean>;
  StartTime: string;
  EndTime: string;
  EstMatchTime: number; //in minutes
  SurfaceIDs: number[];
};

type UploadSeriesSchedule = {
  SeriesID?: number;
  AvailableDays: DaysOfWeek;
  AvailableSurfaceIDs: number[];
  DailyStartTime: string;
  DailyEndTime: string;
  EstMatchTime: number; //estimated match time in minutes
};

type DaysOfWeek = {
  Sun: boolean;
  Mon: boolean;
  Tue: boolean;
  Wed: boolean;
  Thu: boolean;
  Fri: boolean;
  Sat: boolean;
};

type CreatedSeries = {
  ID: number;
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  StatusID: number;
  ScheduleID: number;
};

type UploadSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  ActivityID: number;
  TypeID: number;
  ScheduleID?: number;
  NumberOfTeamsAdmitted: number; //used for subsequent series creation post initial setup, nullable
};

type PatchSeries = {
  Name: string;
  StartDate: string;
  EndDate: string;
  StatusID: number;
  ScheduleID?: number;
};

export type BracketInfo = {
  MatchID: number;
  RoundNumber: number;
  RoundOf: number;
  SeedIndex: number;
  IsLosers: boolean;
};

type AutoScheduleParameters =
  | {
      roundRobinMatchCapacity: number;
    }
  | {
      numberOfLadderMatches: number;
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

const getSeriesStatusTypes = (): Promise<Lookup[]> => http.get(`recim/series/lookup?type=status`);

const getSeriesTypes = (): Promise<Lookup[]> => http.get(`recim/series/lookup?type=series`);

const getAllSeries = (): Promise<Series[]> => http.get(`recim/series`);

const editSeries = (seriesID: number, updatedSeries: PatchSeries): Promise<CreatedSeries> =>
  http.patch(`recim/series/${seriesID}`, updatedSeries);

const getSeriesSchedule = (seriesID: number): Promise<SeriesSchedule> =>
  http.get(`recim/series/${seriesID}/schedule`);

const putSeriesSchedule = (schedule: UploadSeriesSchedule): Promise<SeriesSchedule> =>
  http.put(`recim/series/schedule`, schedule);

const scheduleSeriesMatches = (
  seriesID: number,
  params: AutoScheduleParameters,
): Promise<Match[]> => http.post(`recim/series/${seriesID}/autoschedule`, params);

const deleteSeriesCascade = (seriesID: number): Promise<CreatedSeries> =>
  http.del(`recim/series/${seriesID}`);

const getBracketInfo = (seriesID: number): Promise<BracketInfo[]> =>
  http.get(`recim/series/${seriesID}/bracket`);

export {
  createSeries,
  getSeriesByID,
  getSeriesStatusTypes,
  getSeriesTypes,
  getAllSeries,
  editSeries,
  getSeriesSchedule,
  putSeriesSchedule,
  scheduleSeriesMatches,
  deleteSeriesCascade,
  getBracketInfo,
};
