import http from '../http';
import { Participant } from './participant';
import { Team, TeamMatchHistory } from './team';
import { Lookup } from './recim';
import { Activity } from './activity';

export type Match = {
  ID: number;
  Scores: TeamMatchHistory[];
  Activity: Activity; // This will only be used for activity ID and name
  Time: string;
  Surface: string;
  Status: string;
  SeriesID: number;
  Attendance: Participant[];
  Team: Team[];
};

type CreatedMatch = {
  ID: number;
  Time: string;
  SurfaceID: number;
  StatusID: number;
  SeriesID: number;
};

type UploadMatch = {
  StartTime: string;
  SeriesID: number;
  SurfaceID: number;
  TeamIDs: Array<number>;
};

type CreatedMatchStats = {
  ID: number;
  TeamID: number;
  MatchID: number;
  StatusID: number;
  Score: number;
  Sportsmanship: number;
};

type PatchMatchStats = {
  TeamID: number;
  Status: string;
  Score: number;
  Sportsmanship: number;
};

type PatchMatch = {
  Time: string;
  SurfaceID: number;
  StatusID: number;
};

type CreatedAttendance = {
  ID: number;
  MatchID: number;
  ParticipantUsername: string;
};

//Match Routes
const createMatch = (newMatch: UploadMatch): Promise<CreatedMatch> =>
  http.post('recim/matches', newMatch);

const createMatchAttendance = (username: string, matchID: number): Promise<CreatedAttendance> =>
  http.post(`recim/matches/${matchID}/attendance`, username);

const getMatchByID = (ID: number): Promise<Match> => http.get(`recim/matches/${ID}`);

const getMatchStatusTypes = (): Promise<Lookup[]> => http.get(`recim/matches/lookup?type=status`);

const getMatchTeamStatusTypes = (): Promise<Lookup[]> =>
  http.get(`recim/matches/lookup?type=teamstatus`);

const getMatchSurfaces = (): Promise<Lookup[]> => http.get(`recim/matches/lookup?type=surface`);

const updateMatchStats = (
  matchID: number,
  updatedTeamStats: PatchMatchStats,
): Promise<CreatedMatchStats> => http.patch(`recim/matches/${matchID}/stats`, updatedTeamStats);

const updateMatch = (ID: number, updatedMatch: PatchMatch): Promise<CreatedMatch> =>
  http.patch(`recim/matches/${ID}`, updatedMatch);

export {
  createMatch,
  getMatchByID,
  getMatchStatusTypes,
  getMatchTeamStatusTypes,
  getMatchSurfaces,
  updateMatchStats,
  updateMatch,
  createMatchAttendance,
};
