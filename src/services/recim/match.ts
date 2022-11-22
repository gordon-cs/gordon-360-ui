import http from '../http';

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
const createMatch = async (newMatch: uploadMatch): Promise<Object[]> => {
  return await http.post('recim/matches', newMatch);
};

const getMatchByID = async (ID: number): Promise<Object[]> => {
  return await http.get(`recim/matches/${ID}`);
};

const updateMatchStats = async (
  matchID: number,
  updatedTeamStats: patchMatchStats,
): Promise<Object[]> => {
  return await http.patch(`recim/matches/${matchID}/stats`, updatedTeamStats);
};

const updateMatch = async (ID: number, updatedMatch: patchMatch): Promise<Object[]> => {
  return await http.patch(`recim/matches/${ID}`, updatedMatch);
};

export { createMatch, getMatchByID, updateMatchStats, updateMatch };
