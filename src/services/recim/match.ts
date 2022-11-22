import http from '../http';
import { participant } from './participant';
import { team } from './team';

export type match = {
  ID: number;
  Time: string;
  Surface: string;
  Status: string;
  SeriesID: number;
  Attendance: participant[];
  Team: team[];
};

type createdMatch = {
  ID: number;
  Time: string;
  SurfaceID: number;
  StatusID: number;
  SeriesID: number;
};

type uploadMatch = {
  StartTime: string;
  SeriesID: number;
  SurfaceID: number;
  TeamIDs: Array<number>;
};

type patchMatchStats = {
  TeamID: number;
  Status: string;
  Score: number;
  Sportsmanship: number;
};

type patchMatch = {
  Time: string;
  SurfaceID: number;
  StatusID: number;
};

//Match Routes
const createMatch = (newMatch: uploadMatch): Promise<Object[]> =>
  http.post('recim/matches', newMatch);

const getMatchByID = (ID: number): Promise<Object[]> => http.get(`recim/matches/${ID}`);

const updateMatchStats = (matchID: number, updatedTeamStats: patchMatchStats): Promise<Object[]> =>
  http.patch(`recim/matches/${matchID}/stats`, updatedTeamStats);

const updateMatch = (ID: number, updatedMatch: patchMatch): Promise<Object[]> =>
  http.patch(`recim/matches/${ID}`, updatedMatch);

export { createMatch, getMatchByID, updateMatchStats, updateMatch };
