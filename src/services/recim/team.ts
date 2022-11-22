import http from '../http';
import { Match } from './match';
import { Participant } from './participant';

export type Team = {
  ID: number;
  Name: string;
  Status: string;
  Logo: string;
  Match: Match[];
  Participant: Participant[];
  MatchHistory: TeamMatchHistory[];
  TeamRecord: TeamRecord[];
};

type CreatedTeam = {
  ID: number;
  Name: string;
  StatusID: number;
  ActivityID: number;
  Logo: string;
};

type CreatedTeamParticipant = {
  ID: number;
  TeamID: number;
  ParticipantID: number;
  SignDate: string;
  RoleTypeID: number;
};

type TeamMatchHistory = {
  MatchID: number;
  Opponent: Team;
  OwnScore: number;
  OpposingScore: number;
  Status: string;
  MatchStatusID: number;
  Time: string;
};

export type TeamRecord = {
  ID: number;
  Name: string;
  Win: number;
  Loss: number;
  Tie: number;
};

type UploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

type PatchTeam = {
  Name: string;
  StatusID: number;
  Logo: string;
};

//Team Routes
const createTeam = (username: string, newTeam: UploadTeam): Promise<CreatedTeam> =>
  http.post(`recim/Teams?captain=${username}`, newTeam);

const getTeamByID = (ID: number): Promise<Team> => http.get(`recim/Teams/${ID}`);

const addParticipantToTeam = (username: string, TeamID: number): Promise<CreatedTeamParticipant> =>
  http.post(`recim/Teams/Participants?ParticipantUsername=${username}&TeamID=${TeamID}`);

const editTeam = (ID: number, updatedTeam: PatchTeam): Promise<CreatedTeam> =>
  http.patch(`recim/Teams/${ID}`, updatedTeam);

export { createTeam, getTeamByID, addParticipantToTeam, editTeam };
