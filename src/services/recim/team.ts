import http from '../http';
import { Match } from './match';
import { Participant } from './participant';
import { Lookup, PatchLogo } from './recim';
import { Activity } from './activity';

export type Team = {
  ID: number;
  Activity: Activity;
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

type UploadTeamParticipant = {
  Username: string;
  RoleTypeID: number;
};

type CreatedTeamParticipant = {
  ID: number;
  TeamID: number;
  ParticipantID: number;
  SignDate: string;
  RoleTypeID: number;
};

export type TeamMatchHistory = {
  MatchID: number;
  TeamID: number;
  Opponent: Team;
  TeamScore: number;
  OpposingTeamScore: number;
  Status: string;
  MatchStatusID: number;
  MatchStartTime: string;
  SportsmanshipScore: number;
};

export type TeamRecord = {
  SeriesID: number;
  TeamID: number;
  Logo: string;
  Name: string;
  WinCount: number;
  LossCount: number;
  TieCount: number;
  SportsmanshipRating: number;
};

type UploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
  Affiliation: string | null;
};

type PatchTeam = {
  Name: string;
  StatusID: number;
  Logo: PatchLogo;
  IsLogoUpdate: boolean;
  Affiliation: string | null;
};

//Team Routes
const getTeams = (active: boolean): Promise<Team[]> => {
  if (active) return http.get(`recim/Teams?active=${active}`);
  return http.get(`recim/Teams`);
};

const createTeam = (username: string, newTeam: UploadTeam): Promise<CreatedTeam> =>
  http.post(`recim/Teams?username=${username}`, newTeam);

const getTeamByID = (ID: number): Promise<Team> => http.get(`recim/Teams/${ID}`);

const getTeamStatusTypes = (): Promise<Lookup[]> => http.get(`recim/Teams/lookup?type=status`);

const getTeamParticipantRoleTypes = (): Promise<Lookup[]> =>
  http.get(`recim/Teams/lookup?type=role`);

const getTeamAffiliations = (): Promise<Lookup[]> =>
  http.get(`recim/Teams/lookup?type=affiliation`);

const addParticipantToTeam = (
  teamID: number,
  teamParticipant: UploadTeamParticipant,
): Promise<CreatedTeamParticipant> =>
  http.post(`recim/Teams/${teamID}/participants`, teamParticipant);

const editTeamParticipant = (
  teamID: number,
  editedParticipant: UploadTeamParticipant,
): Promise<CreatedTeamParticipant> =>
  http.patch(`recim/Teams/${teamID}/participants`, editedParticipant);

const deleteTeamParticipant = async (teamID: number, username: string) =>
  await http.del(`recim/Teams/${teamID}/participants/${username}`);

const editTeam = (ID: number, updatedTeam: PatchTeam): Promise<CreatedTeam> =>
  http.patch(`recim/Teams/${ID}`, updatedTeam);

const getTeamInvites = (): Promise<Team[]> => http.get(`recim/Teams/invites`);

const respondToTeamInvite = (teamID: number, response: string): Promise<CreatedTeamParticipant> =>
  http.patch(`recim/Teams/${teamID}/invite/status`, response);

//temporary solution, may need a cleaner route implementation or have attendance count return in team
const getParticipantAttendanceCountForTeam = (teamID: number, username: string): Promise<number> =>
  http.get(`recim/Teams/${teamID}/participants/${username}/attendance`);

const deleteTeam = (ID: number): Promise<Team> => http.del(`recim/Teams/${ID}`);

export {
  getTeams,
  createTeam,
  getTeamByID,
  getTeamStatusTypes,
  getTeamParticipantRoleTypes,
  getTeamAffiliations,
  addParticipantToTeam,
  editTeamParticipant,
  deleteTeamParticipant,
  editTeam,
  getTeamInvites,
  respondToTeamInvite,
  getParticipantAttendanceCountForTeam,
  deleteTeam,
};
