import http from '../http';
import { match } from './match';
import { participant } from './participant';

export type team = {
  ID: number;
  Name: string;
  Status: string;
  Logo: string;
  Match: match[];
  Participant: participant[];
  MatchHistory: teamMatchHistory[];
  TeamRecord: teamRecord[];
};

type createdTeam = {
  ID: number;
  Name: string;
  StatusID: number;
  ActivityID: number;
  Logo: string;
};

type teamMatchHistory = {
  MatchID: number;
  Opponent: team;
  OwnScore: number;
  OpposingScore: number;
  Status: string;
  MatchStatusID: number;
  Time: string;
};

export type teamRecord = {
  ID: number;
  Name: string;
  Win: number;
  Loss: number;
  Tie: number;
};

type uploadTeam = {
  Name: string;
  ActivityID: number;
  Logo: string;
};

type patchTeam = {
  Name: string;
  StatusID: number;
  Logo: string;
};

//Team Routes
const createTeam = (username: string, newTeam: uploadTeam): Promise<Object[]> =>
  http.post(`recim/teams?captain=${username}`, newTeam);

const getTeamByID = (ID: number): Promise<Object[]> => http.get(`recim/teams/${ID}`);

const addParticipantToTeam = (username: string, teamID: number): Promise<Object[]> =>
  http.post(`recim/teams/participants?participantUsername=${username}&teamID=${teamID}`);

const editTeam = (ID: number, updatedTeam: patchTeam): Promise<Object[]> =>
  http.patch(`recim/teams/${ID}`, updatedTeam);

export { createTeam, getTeamByID, addParticipantToTeam, editTeam };
