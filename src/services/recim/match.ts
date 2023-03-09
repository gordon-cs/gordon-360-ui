import http from '../http';
import { Participant } from './participant';
import { Team, TeamMatchHistory } from './team';
import { Lookup } from './recim';
import { Activity } from './activity';

export type Match = {
  ID: number;
  Scores: TeamMatchHistory[];
  Activity: Activity; // This will only be used for activity ID and name
  StartTime: string;
  Surface: string;
  Status: string;
  SeriesID: number;
  Attendance: Participant[];
  Team: Team[];
};

type CreatedMatch = {
  ID: number;
  StartTime: string;
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
  SportsmanshipScore: number;
};

type PatchMatchStats = {
  TeamID: number;
  StatusID?: number;
  Score?: number;
  SportsmanshipScore?: number;
};

type PatchMatch = {
  StartTime: string;
  SurfaceID: number;
  StatusID: number;
  TeamIDs?: Array<number>;
};

type MatchAttendance = {
  TeamID: number;
  Attendance: Attendance;
};

type UploadMatchAttendance = {
  TeamID: number;
  Attendance: UploadAttendance[];
};

type UploadAttendance = {
  Username: string;
};

type Attendance = {
  ID: number;
  MatchID: number;
  Username: string;
  TeamID: number;
};

//Match Routes
const createMatch = (newMatch: UploadMatch): Promise<CreatedMatch> =>
  http.post('recim/matches', newMatch);

const createMatchAttendance = (
  attendance: UploadMatchAttendance,
  matchID: number,
): Promise<Attendance[]> => http.put(`recim/matches/${matchID}/attendance`, attendance);

const getMatchAttendance = (matchID: number): Promise<MatchAttendance> =>
  http.get(`recim/matches/${matchID}/attendance`);

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

const deleteMatchCascade = async (matchID: number): Promise<CreatedMatch> =>
  http.del(`recim/matches/${matchID}`);

export {
  createMatch,
  getMatchByID,
  getMatchStatusTypes,
  getMatchTeamStatusTypes,
  getMatchSurfaces,
  updateMatchStats,
  updateMatch,
  createMatchAttendance,
  getMatchAttendance,
  deleteMatchCascade,
};
