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
  http.post(`recim/Teams?username=${username}`, newTeam);

const getTeamByID = (ID: number): Promise<Team> => http.get(`recim/Teams/${ID}`);

const addParticipantToTeam = async (
  username: string,
  TeamID: number,
  RoleID: number,
): Promise<CreatedTeamParticipant> => {
  var query = RoleID === null ? '' : `?RoleID=${RoleID}`;
  return await http.post(`recim/Teams/Participants?username=${username}&TeamID=${TeamID}${query}`);
};

const editTeamParticipant = async (
  username: string,
  TeamID: number,
  RoleID: number,
): Promise<CreatedTeamParticipant> => {
  var query = RoleID === null ? '' : `?RoleID=${RoleID}`;
  return await http.patch(`recim/Teams/Participants?username=${username}&TeamID=${TeamID}${query}`);
};

const editTeam = (ID: number, updatedTeam: PatchTeam): Promise<CreatedTeam> =>
  http.patch(`recim/Teams/${ID}`, updatedTeam);

export { createTeam, getTeamByID, addParticipantToTeam, editTeamParticipant, editTeam };
